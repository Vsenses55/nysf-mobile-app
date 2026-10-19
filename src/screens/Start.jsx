import { Link } from 'react-router-dom';
import { asset } from '../data/asset.js';

// Start screen: choose The Fair or the Fairgrounds.
export default function Start() {
  return (
    <div className="start" data-theme="fairgrounds">
      <h1 className="visually-hidden">New York State Fair and Fairgrounds</h1>
      <Link to="/fair" className="start-card start-card-fair" aria-label="The Great New York State Fair">
        <img className="start-photo" src={asset('shared/start-fair.jpg')} alt="" />
        <img className="start-logo start-logo-fair" src={asset('shared/start-fair-logo.svg')} alt="" />
      </Link>
      <Link to="/fairgrounds" className="start-card start-card-fg" aria-label="New York State Fairgrounds">
        <img className="start-photo" src={asset('shared/start-fairgrounds.jpg')} alt="" />
        <img className="start-logo start-logo-fg" src={asset('shared/start-fg-logo.svg')} alt="" />
      </Link>
    </div>
  );
}
