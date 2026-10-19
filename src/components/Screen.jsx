import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavBar, Breadcrumb } from '../ds/nysf.js';
import Menu from './Menu.jsx';
import SignUpBlock from './SignUpBlock.jsx';
import { FollowUs } from '../ds/nysf.js';

/**
 * One screen of the app. Sets the side's theme, draws the top bar (home NavBar
 * or inner-screen Breadcrumb), the full-screen menu, and the shared footer.
 *
 * header: 'nav' for a home screen, or { label, back } for an inner screen.
 *         back: true goes back in history (falling back to `backTo`).
 * footer: 'both' (sign-up + follow us), 'signup', 'follow' or 'none'.
 */
export default function Screen({ theme, header, backTo, footer = 'both', className = '', children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const home = theme === 'fair' ? '/fair' : '/fairgrounds';

  function goBack() {
    const idx = window.history.state?.idx ?? 0;
    if (idx > 0) navigate(-1);
    else navigate(backTo || home);
  }

  return (
    <div className={`screen screen-${theme} ${className}`} data-theme={theme}>
      <div className="screen-bar">
        {header === 'nav' ? (
          <NavBar
            showProfile={false}
            onMenu={() => setMenuOpen(true)}
            onNotifications={() => navigate('/fair/updates')}
          />
        ) : (
          <Breadcrumb label={header.label} back={!!header.back} onBack={goBack} onMenu={() => setMenuOpen(true)} />
        )}
      </div>

      <main className="screen-body">{children}</main>

      {(footer === 'both' || footer === 'signup') && <SignUpBlock />}
      {(footer === 'both' || footer === 'follow') && <FollowUs />}

      <Menu theme={theme} open={menuOpen} onClose={() => setMenuOpen(false)} />
    </div>
  );
}
