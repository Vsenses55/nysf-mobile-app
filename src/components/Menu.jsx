import { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IconButton, Toggle, FollowUs } from '../ds/nysf.js';
import { useAppState } from '../state/AppState.jsx';
import { MENU_FAIR, MENU_FAIR_SECONDARY } from '../data/fair.js';
import { MENU_FG, MENU_FG_SECONDARY } from '../data/fairgrounds.js';

// Full-screen menu. The Fair: green with a yellow close ring. Fairgrounds:
// slate with a yellow ×, and the Follow Us footer pinned to the bottom.
export default function Menu({ theme, open, onClose }) {
  const { notifications, setNotifications } = useAppState();
  const { pathname } = useLocation();
  const closeRef = useRef(null);
  const fair = theme === 'fair';
  const items = fair ? MENU_FAIR : MENU_FG;
  const secondary = fair ? MENU_FAIR_SECONDARY : MENU_FG_SECONDARY;

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.classList.add('no-scroll');
    closeRef.current?.querySelector('button')?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.classList.remove('no-scroll');
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className={`menu menu-${theme}`} role="dialog" aria-modal="true" aria-label="Menu" data-theme={theme}>
      <div className="menu-close" ref={closeRef}>
        <IconButton icon={fair ? 'close-circle' : 'close'} label="Close menu" onClick={onClose} />
      </div>

      <nav className="menu-primary">
        {items.map((item) => (
          <Link
            key={item.to + item.label}
            to={item.to}
            className="menu-link"
            aria-current={pathname === item.to ? 'page' : undefined}
            onClick={onClose}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <hr className="menu-rule" />

      <div className="menu-secondary">
        <div className="menu-row">
          <span className="menu-link">Notifications</span>
          <Toggle label="Notifications" checked={notifications} onChange={setNotifications} />
        </div>
        {secondary.map((item) => (
          <Link key={item.to} to={item.to} className="menu-link" onClick={onClose}>
            {item.label}
          </Link>
        ))}
      </div>

      {!fair && <FollowUs className="menu-follow" />}
    </div>
  );
}
