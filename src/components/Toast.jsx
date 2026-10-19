import { useAppState } from '../state/AppState.jsx';

export default function Toast() {
  const { toast } = useAppState();
  return (
    <div className="toast-region" aria-live="polite">
      {toast && (
        <div className="toast" key={toast.key}>
          {toast.message}
        </div>
      )}
    </div>
  );
}
