import React from 'react';

type NotificationType = 'success' | 'error';

type Props = {
  type: NotificationType;
  message?: string;
  visible: boolean;
  onDismiss: () => void;
};

export default function NotificationBanner({ type, message, visible, onDismiss }: Props) {
  React.useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        onDismiss();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [visible, onDismiss]);

  if (!visible) return null;

  return (
    <div
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 rounded-organic px-6 py-4 shadow-lg max-w-md w-[calc(100%-2rem)] ${
        type === 'success'
          ? 'bg-forest-500 border-2 border-forest-700 text-cream'
          : 'bg-rose-500 border-2 border-rose-700 text-white'
      }`}
    >
      <div className="flex items-center gap-3">
        {type === 'success' ? (
          <span className="text-2xl">😊</span>
        ) : (
          <span className="text-2xl">⚠️</span>
        )}
        <div>
          <p className="font-semibold">
            {type === 'success' ? 'Grade Saved!' : 'Error'}
          </p>
          {message && (
            <p className="text-sm opacity-90">{message}</p>
          )}
        </div>
      </div>
    </div>
  );
}
