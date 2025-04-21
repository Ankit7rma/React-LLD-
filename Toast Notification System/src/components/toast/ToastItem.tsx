import React, { useState, useEffect } from 'react';
import { Toast as ToastType } from '../../types/toast';
import { 
  CheckCircle, 
  AlertCircle, 
  Info, 
  AlertTriangle, 
  X 
} from 'lucide-react';

interface ToastItemProps {
  toast: ToastType;
  onClose: () => void;
  index: number;
}

const ToastItem: React.FC<ToastItemProps> = ({ toast, onClose, index }) => {
  const [progress, setProgress] = useState(100);
  const [isExiting, setIsExiting] = useState(false);

  // Set up progress bar
  useEffect(() => {
    if (toast.duration > 0) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev - (100 / (toast.duration / 100));
          return newProgress < 0 ? 0 : newProgress;
        });
      }, 100);

      return () => clearInterval(interval);
    }
  }, [toast.duration]);

  // Handle close with animation
  const handleClose = () => {
    setIsExiting(true);
    // Wait for exit animation to complete
    setTimeout(() => {
      onClose();
    }, 300);
  };

  // Set up keyboard interaction
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Icon based on toast type
  const IconComponent = {
    success: CheckCircle,
    error: AlertCircle,
    warning: AlertTriangle,
    info: Info,
  }[toast.type];

  // Color based on toast type
  const colors = {
    success: {
      bg: 'bg-green-50',
      border: 'border-green-400',
      text: 'text-green-800',
      iconColor: 'text-green-500',
      progressBg: 'bg-green-200',
      progressFill: 'bg-green-500',
    },
    error: {
      bg: 'bg-red-50',
      border: 'border-red-400',
      text: 'text-red-800',
      iconColor: 'text-red-500',
      progressBg: 'bg-red-200',
      progressFill: 'bg-red-500',
    },
    warning: {
      bg: 'bg-amber-50',
      border: 'border-amber-400',
      text: 'text-amber-800',
      iconColor: 'text-amber-500',
      progressBg: 'bg-amber-200',
      progressFill: 'bg-amber-500',
    },
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-400',
      text: 'text-blue-800',
      iconColor: 'text-blue-500',
      progressBg: 'bg-blue-200',
      progressFill: 'bg-blue-500',
    },
  };

  const currentColor = colors[toast.type];

  return (
    <div
      className={`flex flex-col p-4 ${currentColor.bg} rounded-lg shadow-lg border-l-4 ${currentColor.border} 
        transition-all duration-300 ${isExiting ? 'opacity-0 translate-x-full' : 'opacity-100'} 
        transform translate-y-0 scale-100`}
      role="alert"
      aria-live="assertive"
      style={{
        transitionDelay: `${index * 50}ms`,
        animationDelay: `${index * 50}ms`,
      }}
      tabIndex={0}
    >
      <div className="flex items-start">
        <div className={`flex-shrink-0 ${currentColor.iconColor}`}>
          <IconComponent size={20} />
        </div>
        <div className="ml-3 w-0 flex-1">
          {toast.title && (
            <p className={`text-sm font-medium ${currentColor.text}`}>{toast.title}</p>
          )}
          <p className={`text-sm ${currentColor.text} mt-1`}>{toast.message}</p>
          {toast.action && (
            <div className="mt-2">
              <button
                type="button"
                className={`text-sm font-medium ${currentColor.text} hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                onClick={() => {
                  toast.action?.onClick();
                  handleClose();
                }}
              >
                {toast.action.label}
              </button>
            </div>
          )}
        </div>
        <div className="ml-4 flex-shrink-0 flex">
          <button
            className={`${currentColor.text} hover:text-opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-md`}
            onClick={handleClose}
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>
      </div>
      
      {toast.duration > 0 && (
        <div className={`h-1 mt-2 ${currentColor.progressBg} rounded-full overflow-hidden`}>
          <div 
            className={`h-full ${currentColor.progressFill} rounded-full transition-all duration-100 ease-linear`}
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
};

export default ToastItem;