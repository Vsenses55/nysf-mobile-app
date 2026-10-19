import { Glyph, ResetButton } from '../ds/nysf.js';

// "♥ My Favorites" — a toggle chip that narrows a list to favorited items.
export function FavoritesChip({ active, onClick }) {
  return (
    <button type="button" className={`fav-chip ${active ? 'is-active' : ''}`} aria-pressed={!!active} onClick={onClick}>
      <Glyph name="heartFilled" className="fav-chip-heart" />
      <span>{active ? 'Showing Favorites' : 'My Favorites'}</span>
    </button>
  );
}

export function ResetFilters({ onClick }) {
  return <ResetButton className="reset-chip" label="Reset Filters" onClick={onClick} />;
}

// Empty state shown when filters leave nothing to show.
export function EmptyState({ title, children }) {
  return (
    <div className="empty-state">
      <p className="empty-state-title">{title}</p>
      {children && <p className="empty-state-text">{children}</p>}
    </div>
  );
}
