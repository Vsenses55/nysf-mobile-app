import { Navigate, useNavigate, useParams } from 'react-router-dom';
import Screen from '../../components/Screen.jsx';
import { MediaCard, PrevNextButton } from '../../ds/nysf.js';
import { NEWS } from '../../data/fair.js';

export default function NewsDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const index = NEWS.findIndex((n) => n.id === id);
  if (index < 0) return <Navigate to="/fair/news" replace />;
  const article = NEWS[index];
  const prev = NEWS[index - 1];
  const next = NEWS[index + 1];

  return (
    <Screen theme="fair" header={{ label: 'Fair News', back: true }} backTo="/fair/news" footer="follow">
      <article className="gutter stack-24 pad-top">
        <MediaCard image={article.hero || article.img} imageAlt="" title={article.title} body={article.dek} />
        <p className="article-date">{article.date}</p>
        <div className="prose prose-article">
          {article.body.map((para) =>
            para === para.toUpperCase() ? <h3 key={para}>{para}</h3> : <p key={para.slice(0, 40)}>{para}</p>,
          )}
        </div>
        <nav className="prevnext-row" aria-label="More news">
          <PrevNextButton direction="previous" disabled={!prev} onClick={() => prev && navigate(`/fair/news/${prev.id}`, { replace: true })} />
          <PrevNextButton direction="next" disabled={!next} onClick={() => next && navigate(`/fair/news/${next.id}`, { replace: true })} />
        </nav>
      </article>
    </Screen>
  );
}
