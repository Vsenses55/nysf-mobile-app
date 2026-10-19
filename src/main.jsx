import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App.jsx';
import { AppStateProvider } from './state/AppState.jsx';
import './styles/tokens.css';
import './styles/components.css';
import './styles/app.css';

// HashRouter keeps deep links working on GitHub Pages (no server rewrites needed).
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <AppStateProvider>
        <App />
      </AppStateProvider>
    </HashRouter>
  </React.StrictMode>,
);
