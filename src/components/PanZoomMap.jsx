import { forwardRef, useCallback, useEffect, useImperativeHandle, useLayoutEffect, useRef, useState } from 'react';

/**
 * Pannable, zoomable image with children positioned in % of the image.
 * - drag (mouse or one finger), pinch (two fingers), wheel / trackpad zoom,
 *   double-tap to zoom in, and +/– buttons via the ref API.
 * - The image always covers the viewport (no empty edges).
 * - Children get `--map-scale` so pins can counter-scale and stay a fixed size.
 *
 * Ref API: zoomBy(factor), focus(xPct, yPct, scale?), reset()
 */
const MAX_ZOOM = 4; // relative to the "cover" scale

const PanZoomMap = forwardRef(function PanZoomMap(
  { src, preview, width, height, initial, children, className = '' },
  ref,
) {
  const viewport = useRef(null);
  const [view, setView] = useState(null); // { s, x, y }
  const [animate, setAnimate] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const pointers = useRef(new Map());
  const gesture = useRef(null);
  const lastTap = useRef(0);
  const moved = useRef(false);

  const size = () => {
    const el = viewport.current;
    return el ? { w: el.clientWidth, h: el.clientHeight } : { w: 1, h: 1 };
  };
  const minScale = () => {
    const { w, h } = size();
    return Math.max(w / width, h / height);
  };

  // Keep the image covering the viewport.
  const clamp = useCallback(
    (v) => {
      const { w, h } = size();
      const min = Math.max(w / width, h / height);
      const s = Math.min(Math.max(v.s, min), min * MAX_ZOOM);
      const x = Math.min(0, Math.max(w - width * s, v.x));
      const y = Math.min(0, Math.max(h - height * s, v.y));
      return { s, x, y };
    },
    [width, height],
  );

  // Centre on a point (in % of the image) at a given scale.
  const focus = useCallback(
    (xPct, yPct, scale, smooth = true) => {
      const { w, h } = size();
      setAnimate(smooth);
      setView((v) => {
        const s = scale ?? v?.s ?? minScale();
        return clamp({ s, x: w / 2 - (xPct / 100) * width * s, y: h / 2 - (yPct / 100) * height * s });
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [clamp, width, height],
  );

  // Zoom keeping the point (cx, cy) in viewport px fixed.
  const zoomAt = useCallback(
    (factor, cx, cy, smooth = false) => {
      setAnimate(smooth);
      setView((v) => {
        if (!v) return v;
        const next = clamp({ ...v, s: v.s * factor });
        const k = next.s / v.s;
        return clamp({ s: next.s, x: cx - (cx - v.x) * k, y: cy - (cy - v.y) * k });
      });
    },
    [clamp],
  );

  const reset = useCallback(() => {
    const min = minScale();
    focus(initial.x, initial.y, min * initial.zoom);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focus, initial]);

  useImperativeHandle(ref, () => ({
    zoomBy: (f) => {
      const { w, h } = size();
      zoomAt(f, w / 2, h / 2, true);
    },
    focus: (x, y, zoom) => focus(x, y, zoom ? minScale() * zoom : undefined),
    reset,
    get scale() {
      return view ? view.s / minScale() : 1;
    },
  }));

  // Initial view, and re-clamp when the viewport resizes (rotation, etc.).
  useLayoutEffect(() => {
    const min = minScale();
    focus(initial.x, initial.y, min * initial.zoom, false);
    const ro = new ResizeObserver(() => setView((v) => (v ? clamp(v) : v)));
    ro.observe(viewport.current);
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Wheel / trackpad zoom (non-passive so the page doesn't scroll).
  useEffect(() => {
    const el = viewport.current;
    const onWheel = (e) => {
      e.preventDefault();
      const r = el.getBoundingClientRect();
      zoomAt(Math.exp(-e.deltaY * 0.0025), e.clientX - r.left, e.clientY - r.top);
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [zoomAt]);

  const local = (e) => {
    const r = viewport.current.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };

  function onPointerDown(e) {
    if (e.target.closest('[data-map-ui]')) return; // let panels/buttons work normally
    // Capture only on the empty map; capturing on a pin would retarget its click.
    if (!e.target.closest('button')) viewport.current.setPointerCapture?.(e.pointerId);
    pointers.current.set(e.pointerId, local(e));
    moved.current = false;
    setAnimate(false);
    startGesture();
  }

  function startGesture() {
    const pts = [...pointers.current.values()];
    if (!view) return;
    if (pts.length === 1) gesture.current = { type: 'pan', start: pts[0], view };
    if (pts.length === 2) {
      const mid = { x: (pts[0].x + pts[1].x) / 2, y: (pts[0].y + pts[1].y) / 2 };
      const dist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
      gesture.current = { type: 'pinch', mid, dist, view };
    }
  }

  function onPointerMove(e) {
    if (!pointers.current.has(e.pointerId)) return;
    pointers.current.set(e.pointerId, local(e));
    const g = gesture.current;
    if (!g) return;
    const pts = [...pointers.current.values()];
    if (g.type === 'pan' && pts.length === 1) {
      const dx = pts[0].x - g.start.x;
      const dy = pts[0].y - g.start.y;
      if (Math.abs(dx) + Math.abs(dy) > 4) moved.current = true;
      setView(clamp({ s: g.view.s, x: g.view.x + dx, y: g.view.y + dy }));
    } else if (g.type === 'pinch' && pts.length === 2) {
      moved.current = true;
      const mid = { x: (pts[0].x + pts[1].x) / 2, y: (pts[0].y + pts[1].y) / 2 };
      const dist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
      const s = g.view.s * (dist / g.dist);
      const k = clamp({ ...g.view, s }).s / g.view.s;
      setView(
        clamp({
          s: g.view.s * k,
          x: mid.x - (g.mid.x - g.view.x) * k,
          y: mid.y - (g.mid.y - g.view.y) * k,
        }),
      );
    }
  }

  function onPointerUp(e) {
    const wasTap = !moved.current && pointers.current.size === 1;
    pointers.current.delete(e.pointerId);
    if (pointers.current.size > 0) startGesture();
    else gesture.current = null;
    // Double-tap on empty map zooms in.
    if (wasTap && !e.target.closest('button')) {
      const now = Date.now();
      if (now - lastTap.current < 300) {
        const p = local(e);
        zoomAt(2, p.x, p.y, true);
        lastTap.current = 0;
      } else lastTap.current = now;
    }
  }

  // Swallow the click that ends a drag so pins don't open by accident.
  function onClickCapture(e) {
    if (moved.current) {
      e.stopPropagation();
      e.preventDefault();
      moved.current = false;
    }
  }

  const relScale = view ? view.s / minScale() : 1;

  return (
    <div
      ref={viewport}
      className={`pzm ${className}`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onClickCapture={onClickCapture}
    >
      {view && (
        <div
          className={`pzm-layer ${animate ? 'is-animating' : ''}`}
          style={{
            width,
            height,
            transform: `translate3d(${view.x}px, ${view.y}px, 0) scale(${view.s})`,
            '--map-scale': view.s,
            '--map-zoom': relScale,
          }}
        >
          {preview && <img className="pzm-img pzm-preview" src={preview} alt="" draggable="false" />}
          <img
            className={`pzm-img ${loaded ? 'is-loaded' : ''}`}
            src={src}
            alt="Illustrated map of the New York State Fairgrounds"
            draggable="false"
            onLoad={() => setLoaded(true)}
          />
          {children}
        </div>
      )}
    </div>
  );
});

export default PanZoomMap;
