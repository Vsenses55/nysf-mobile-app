import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

// Swipeable hero carousel (CSS scroll-snap) with dots and gentle auto-advance.
export default function Carousel({ slides }) {
  const track = useRef(null);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  // Keep the dots in sync with manual swipes.
  useEffect(() => {
    const el = track.current;
    if (!el) return undefined;
    const onScroll = () => setIndex(Math.round(el.scrollLeft / el.clientWidth));
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const t = setTimeout(() => go((index + 1) % slides.length), 5000);
    return () => clearTimeout(t);
  });

  function go(i) {
    const el = track.current;
    el?.scrollTo({ left: i * el.clientWidth, behavior: 'smooth' });
  }

  return (
    <section
      className="carousel"
      aria-roledescription="carousel"
      aria-label="Featured events"
      onPointerDown={() => setPaused(true)}
      onFocus={() => setPaused(true)}
    >
      <div className="carousel-track" ref={track}>
        {slides.map((s, i) => (
          <Link
            key={s.id}
            to={`/fairgrounds/events/${s.id}`}
            className="carousel-slide"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${slides.length}: ${s.title}`}
          >
            <img src={s.img} alt="" />
            <span className="carousel-caption">
              <span className="carousel-date">{s.date}</span>
              <span className="carousel-title">{s.title}</span>
            </span>
          </Link>
        ))}
      </div>
      <div className="carousel-dots">
        {slides.map((s, i) => (
          <button
            key={s.id}
            type="button"
            className={`carousel-dot ${i === index ? 'is-active' : ''}`}
            aria-label={`Show slide ${i + 1}`}
            aria-current={i === index}
            onClick={() => {
              setPaused(true);
              go(i);
            }}
          />
        ))}
      </div>
    </section>
  );
}
