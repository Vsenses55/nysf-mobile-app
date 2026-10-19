import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';

// App-wide prototype state: favorites and the notifications toggle persist in
// the browser (localStorage) so they survive reloads; toasts are transient.

const AppState = createContext(null);

function load(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function save(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable (private mode) — state still works for the session */
  }
}

export function AppStateProvider({ children }) {
  const [favorites, setFavorites] = useState(() => new Set(load('nysf.favorites', [])));
  const [notifications, setNotifications] = useState(() => load('nysf.notifications', true));
  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);

  useEffect(() => save('nysf.favorites', [...favorites]), [favorites]);
  useEffect(() => save('nysf.notifications', notifications), [notifications]);

  const toggleFavorite = useCallback((id) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const showToast = useCallback((message) => {
    clearTimeout(toastTimer.current);
    setToast({ message, key: Date.now() });
    toastTimer.current = setTimeout(() => setToast(null), 2600);
  }, []);

  const value = useMemo(
    () => ({
      favorites,
      isFavorite: (id) => favorites.has(id),
      toggleFavorite,
      notifications,
      setNotifications,
      toast,
      showToast,
    }),
    [favorites, toggleFavorite, notifications, toast, showToast],
  );

  return <AppState.Provider value={value}>{children}</AppState.Provider>;
}

export function useAppState() {
  return useContext(AppState);
}
