import { useMemo, useState } from 'react';
import Screen from '../../components/Screen.jsx';
import { DropdownButton, SearchField, Glyph } from '../../ds/nysf.js';
import { asset } from '../../data/asset.js';
import { MAP_CATEGORIES, MAP_PINS } from '../../data/fair.js';

// The map illustration has its pins baked in, so the interactive layer is a set
// of transparent hotspots positioned over them. Search and Categories highlight
// matching pins; tapping a pin opens the info panel (hidden in the Figma frame).
export default function InteractiveMap() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState(MAP_CATEGORIES[0]);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(null);

  const q = query.trim().toLowerCase();
  const filtering = q.length > 0 || category !== MAP_CATEGORIES[0];
  const matches = useMemo(
    () =>
      new Set(
        MAP_PINS.filter(
          (p) =>
            (category === MAP_CATEGORIES[0] || p.category === category) &&
            (!q || `${p.title} ${p.body} ${p.category}`.toLowerCase().includes(q)),
        ).map((p) => p.id),
      ),
    [q, category],
  );
  const pin = MAP_PINS.find((p) => p.id === active);

  return (
    <Screen theme="fair" header={{ label: 'Interactive Map', back: false }} footer="none" className="map-screen">
      <div className="gutter map-controls">
        <div className="map-search-row">
          <SearchField placeholder="Search" label="Search the map" value={query} onChange={setQuery} className="map-search" />
          <button
            type="button"
            className="map-filter-btn"
            aria-label="Show all pins"
            onClick={() => {
              setQuery('');
              setCategory(MAP_CATEGORIES[0]);
            }}
          >
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
          }}
        />
        {filtering && (
          <p className="map-result" role="status">
            {matches.size} {matches.size === 1 ? 'place' : 'places'} found
          </p>
        )}
      </div>

      <div className="map-frame">
        <div className="map-canvas">
          <img className="map-image" src={asset('fair/map.jpg')} alt="Illustrated map of the Fairgrounds" />
          {MAP_PINS.map((p) => (
            <button
              key={p.id}
              type="button"
              className={`map-pin ${filtering && matches.has(p.id) ? 'is-match' : ''} ${filtering && !matches.has(p.id) ? 'is-dim' : ''} ${active === p.id ? 'is-active' : ''}`}
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
              aria-label={p.title}
              onClick={() => setActive(p.id)}
            />
          ))}
        </div>

        {pin && (
          <div className="map-panel" role="dialog" aria-label={pin.title}>
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
