// Design-system components that take an `href` render a plain <a>. With the
// HashRouter, an in-app path becomes "#/path".
export const href = (path) => `#${path}`;
