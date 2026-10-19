import { useMemo, useRef, useState } from 'react';
import Screen from '../../components/Screen.jsx';
import PanZoomMap from '../../components/PanZoomMap.jsx';
import MapPin from '../../components/MapPin.jsx';
import { DropdownButton, SearchField, Glyph } from '../../ds/nysf.js';
import { asset } from '../../data/asset.js';
import { MAP_CATEGORIES, MAP_PINS } from '../../data/fair.js';

// Full Fairgrounds illustration: drag to pan, pinch / scroll / double-tap to
// zoom. Pins stay a fixed size at every zoom. Search and Categories filter the
// pins; tapping a pin centres it and opens the info panel.
const MAP_W = 1600; // layout units; the image is 8000×6669 at source
const MAP_H = 1334;
const INITIAL = { x: 51, y: 56, zoom: 1.8 }; // matches the Figma map frame

export default function InteractiveMap() {
  const map = useRef(null);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState(MAP_CATEGORIES[0]);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(null);

  const q = query.trim().toLowerCase();
  const filtering = q.length > 0 || category !== MAP_CATEGORIES[0];
  const visible = useMemo(
    () =>
      MAP_PINS.filter(
        (p) =>
          (category === MAP_CATEGORIES[0] || p.category === category) &&
          (!q || `${p.title} ${p.body} ${p.category}`.toLowerCase().includes(q)),
      ),
    [q, category],
  );
  const pin = MAP_PINS.find((p) => p.id === active);

  function select(p) {
    setActive(p.id);
    // Centre a little above the pin so the info panel doesn't cover it.
    map.current?.focus(p.x, p.y + 6, Math.max(map.current.scale, 2));
  }

  function clearFilters() {
    setQuery('');
    setCategory(MAP_CATEGORIES[0]);
  }

  return (
    <Screen theme="fair" header={{ label: 'Interactive Map', back: false }} footer="none" className="map-screen">
      <div className="gutter map-controls">
        <div className="map-search-row">
          <SearchField placeholder="Search" label="Search the map" value={query} onChange={setQuery} className="map-search" />
          <button type="button" className="map-filter-btn" aria-label="Show all pins" onClick={clearFilters}>
            <img src={asset('fair/filters-icon.svg')} alt="" width="24" height="15" />
          </button>
        </div>
        <DropdownButton
          label={category === MAP_CATEGORIES[0] ? 'Categories' : category}
          options={MAP_CATEGORIES}
          open={open}
          onOpenChange={setOpen}
          onSelect={(o) => {
            setCategory(o);
            setOpen(false);
            setActive(null);
          }}
        />
      </div>

      <div className="map-frame">
        <PanZoomMap
          ref={map}
          src={asset('fair/map-full.jpg')}
          preview={asset('fair/map-full-preview.jpg')}
          width={MAP_W}
          height={MAP_H}
          initial={INITIAL}
          className="map-viewport"
        >
          {visible.map((p) => (
            <button
              key={p.id}
              type="button"
              className={`map-marker ${active === p.id ? 'is-active' : ''}`}
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
              aria-label={p.title}
              onClick={() => select(p)}
            >
              <MapPin pin={p} />
            </button>
          ))}
        </PanZoomMap>

        {filtering && (
          <div className="map-result" role="status" data-map-ui>
            <span>
              {visible.length} {visible.length === 1 ? 'place' : 'places'}
              {category !== MAP_CATEGORIES[0] ? ` • ${category}` : ''}
            </span>
            <button type="button" className="text-button" onClick={clearFilters}>
              Clear
            </button>
          </div>
        )}

        {filtering && visible.length > 0 && !pin && (
          <ul className="map-list" data-map-ui aria-label="Matching places">
            {visible.map((p) => (
              <li key={p.id}>
                <button type="button" onClick={() => select(p)}>
                  <span className="map-list-dot" style={{ background: p.kind === 'amenity' ? '#1f3667' : p.color }}>
                    {p.kind === 'amenity' ? '' : p.label}
                  </span>
                  {p.title}
                </button>
              </li>
            ))}
          </ul>
        )}

        <div className="map-zoom" data-map-ui>
          <button type="button" aria-label="Zoom in" onClick={() => map.current?.zoomBy(1.6)}>
            <Glyph name="plus" />
          </button>
          <button type="button" aria-label="Zoom out" onClick={() => map.current?.zoomBy(1 / 1.6)}>
            <Glyph name="minus" />
          </button>
          <button type="button" aria-label="Reset map view" className="map-zoom-reset" onClick={() => map.current?.reset()}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
              <circle cx="12" cy="12" r="7" />
              <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
            </svg>
          </button>
        </div>

        {pin && (
          <div className="map-panel" role="dialog" aria-label={pin.title} data-map-ui>
            <button type="button" className="map-panel-close" aria-label="Close" onClick={() => setActive(null)}>
              <Glyph name="close" />
            </button>
            <p className="map-panel-eyebrow">{pin.category}</p>
            <h2 className="map-panel-title">{pin.title}</h2>
            <p className="map-panel-body">{pin.body}</p>
          </div>
        )}
      </div>
    </Screen>
  );
}
