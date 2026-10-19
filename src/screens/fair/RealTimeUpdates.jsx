import Screen from '../../components/Screen.jsx';
import { NotificationCard } from '../../ds/nysf.js';
import { useAppState } from '../../state/AppState.jsx';
import { UPDATES } from '../../data/fair.js';

export default function RealTimeUpdates() {
  const { notifications, setNotifications } = useAppState();
  return (
    <Screen theme="fair" header={{ label: 'Real-Time Updates', back: false }} footer="follow">
      <div className="updates">
        {!notifications && (
          <div className="updates-off">
            <p>Push notifications are off. You’ll still see updates here.</p>
            <button type="button" className="text-button" onClick={() => setNotifications(true)}>
              Turn on
            </button>
          </div>
        )}
        {UPDATES.map((u) => (
          <NotificationCard
            key={u.id}
            date={u.date}
            title={u.title}
            body={u.body.map((part, i) => (typeof part === 'string' ? part : <strong key={i}>{part.strong}</strong>))}
          />
        ))}
      </div>
    </Screen>
  );
}
