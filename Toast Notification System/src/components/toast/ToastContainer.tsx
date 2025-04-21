import React, { useEffect, useMemo } from 'react';
import { Toast as ToastType, ToastPosition } from '../../types/toast';
import ToastItem from './ToastItem';

interface ToastContainerProps {
  toasts: ToastType[];
  removeToast: (id: string) => void;
}

const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, removeToast }) => {
  // Group toasts by position
  const toastsByPosition = useMemo(() => {
    const grouped: Record<ToastPosition, ToastType[]> = {
      'top-left': [],
      'top-center': [],
      'top-right': [],
      'bottom-left': [],
      'bottom-center': [],
      'bottom-right': [],
    };

    toasts.forEach((toast) => {
      grouped[toast.position].push(toast);
    });

    return grouped;
  }, [toasts]);

  // Set up auto-dismiss for toasts
  useEffect(() => {
    toasts.forEach((toast) => {
      if (toast.duration > 0) {
        const timer = setTimeout(() => {
          removeToast(toast.id);
        }, toast.duration);

        return () => clearTimeout(timer);
      }
    });
  }, [toasts, removeToast]);

  // Position classes
  const positionClasses: Record<ToastPosition, string> = {
    'top-left': 'top-4 left-4',
    'top-center': 'top-4 left-1/2 transform -translate-x-1/2',
    'top-right': 'top-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-center': 'bottom-4 left-1/2 transform -translate-x-1/2',
    'bottom-right': 'bottom-4 right-4',
  };

  return (
    <>
      {Object.entries(toastsByPosition).map(([position, positionToasts]) => (
        positionToasts.length > 0 && (
          <div
            key={position}
            className={`fixed z-50 flex flex-col gap-2 max-w-md w-full ${
              positionClasses[position as ToastPosition]
            }`}
            aria-live="polite"
            aria-atomic="true"
          >
            {positionToasts.map((toast, index) => (
              <ToastItem
                key={toast.id}
                toast={toast}
                onClose={() => removeToast(toast.id)}
                index={index}
              />
            ))}
          </div>
        )
      ))}
    </>
  );
};

export default ToastContainer;