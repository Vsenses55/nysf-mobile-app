import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Toast from './components/Toast.jsx';
import { preloadAssets } from './state/preload.js';
import Placeholder from './screens/Placeholder.jsx';
import Start from './screens/Start.jsx';

import FairHome from './screens/fair/FairHome.jsx';
import BuyTickets from './screens/fair/BuyTickets.jsx';
import InteractiveMap from './screens/fair/InteractiveMap.jsx';
import DailySchedule from './screens/fair/DailySchedule.jsx';
import Concerts from './screens/fair/Concerts.jsx';
import RealTimeUpdates from './screens/fair/RealTimeUpdates.jsx';
import Activities from './screens/fair/Activities.jsx';
import PlanYourVisit from './screens/fair/PlanYourVisit.jsx';
import Directions from './screens/fair/Directions.jsx';
import Parking from './screens/fair/Parking.jsx';
import Faqs from './screens/fair/Faqs.jsx';
import News from './screens/fair/News.jsx';
import NewsDetail from './screens/fair/NewsDetail.jsx';
import Favorites from './screens/fair/Favorites.jsx';

import FgHome from './screens/fairgrounds/FgHome.jsx';
import UpcomingEvents from './screens/fairgrounds/UpcomingEvents.jsx';
import EventDetail from './screens/fairgrounds/EventDetail.jsx';
import Venues from './screens/fairgrounds/Venues.jsx';
import VenueDetail from './screens/fairgrounds/VenueDetail.jsx';
import RentalOpportunities from './screens/fairgrounds/RentalOpportunities.jsx';

function Preloader() {
  const { pathname } = useLocation();
  // Runs once, after the first screen renders.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => preloadAssets(pathname), []);
  return null;
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => window.scrollTo(0, 0), [pathname]);
  return null;
}

export default function App() {
  return (
    <div className="app">
      <ScrollToTop />
      <Preloader />
      <Routes>
        <Route path="/" element={<Start />} />

        <Route path="/fair" element={<FairHome />} />
        <Route path="/fair/tickets" element={<BuyTickets />} />
        <Route path="/fair/map" element={<InteractiveMap />} />
        <Route path="/fair/schedule" element={<DailySchedule />} />
        <Route path="/fair/concerts" element={<Concerts />} />
        <Route path="/fair/updates" element={<RealTimeUpdates />} />
        <Route path="/fair/activities" element={<Activities />} />
        <Route path="/fair/activities/:id" element={<Placeholder theme="fair" backTo="/fair/activities" />} />
        <Route path="/fair/plan" element={<PlanYourVisit />} />
        <Route path="/fair/plan/directions" element={<Directions />} />
        <Route path="/fair/plan/parking" element={<Parking />} />
        <Route path="/fair/plan/faqs" element={<Faqs />} />
        <Route path="/fair/news" element={<News />} />
        <Route path="/fair/news/:id" element={<NewsDetail />} />
        <Route path="/fair/favorites" element={<Favorites />} />
        <Route path="/fair/:id" element={<Placeholder theme="fair" />} />

        <Route path="/fairgrounds" element={<FgHome />} />
        <Route path="/fairgrounds/events" element={<UpcomingEvents />} />
        <Route path="/fairgrounds/events/:id" element={<EventDetail />} />
        <Route path="/fairgrounds/venues" element={<Venues />} />
        <Route path="/fairgrounds/venues/:id" element={<VenueDetail />} />
        <Route path="/fairgrounds/rentals" element={<RentalOpportunities />} />
        <Route path="/fairgrounds/:id" element={<Placeholder theme="fairgrounds" />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Toast />
    </div>
  );
}
