import { useState } from 'react';
import { Link } from 'react-router-dom';
import Screen from '../../components/Screen.jsx';
import { MediaCard, PrevNextButton } from '../../ds/nysf.js';
import { NEWS } from '../../data/fair.js';

const PAGE = 3;

export default function News() {
  const [feature, ...rest] = NEWS;
  const [shown, setShown] = useState(PAGE);
  return (
    <Screen theme="fair" header={{ label: 'Fair News', back: false }} footer="signup">
      <Link to={`/fair/news/${feature.id}`} className="gutter pad-top link-reset news-feature">
        <MediaCard image={feature.img} imageAlt="" title={feature.title} />
      </Link>

      <section className="panel panel-green panel-news">
        <ul className="news-list">
          {rest.slice(0, shown).map((n) => (
            <li key={n.id}>
              <Link to={`/fair/news/${n.id}`} className="news-item">
                <span className="news-item-text">
                  <span className="news-item-date">{n.date}</span>
                  <span className="news-item-title">{n.title}</span>
                </span>
                <img className="news-item-thumb" src={n.img} alt="" />
              </Link>
            </li>
          ))}
        </ul>
        {shown < rest.length && <PrevNextButton direction="next" label="More News" onClick={() => setShown((n) => n + PAGE)} />}
      </section>
    </Screen>
  );
}
