import { Navigate, useNavigate, useParams } from 'react-router-dom';
import Screen from '../components/Screen.jsx';
import { Button } from '../ds/nysf.js';
import { PLACEHOLDERS } from '../data/fair.js';
import { PLACEHOLDERS_FG } from '../data/fairgrounds.js';

// Stand-in for pages the Figma file links to but doesn't design yet.
export default function Placeholder({ theme, backTo }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const fair = theme === 'fair';
  const page = (fair ? PLACEHOLDERS : PLACEHOLDERS_FG)[id];
  if (!page) return <Navigate to={fair ? '/fair' : '/fairgrounds'} replace />;
  return (
    <Screen theme={theme} header={{ label: page.title, back: true }} backTo={backTo} footer="follow">
      <section className="placeholder">
        <p className="placeholder-eyebrow">Coming soon</p>
        <h2 className="placeholder-title">{page.title}</h2>
        <p className="placeholder-body">{page.body}</p>
        <Button variant="primary" onClick={() => navigate(fair ? '/fair' : '/fairgrounds')}>
          Back to home
        </Button>
      </section>
    </Screen>
  );
}
