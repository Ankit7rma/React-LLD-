import { useContext } from 'react';
import { ToastContext } from '../context/ToastContext';
import { ToastPosition, ToastType } from '../types/toast';

export const useToast = () => {
  const context = useContext(ToastContext);
  
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  
  const { addToast, removeToast, removeAllToasts, toasts } = context;
  
  return {
    toasts,
    toast: (
      message: string,
      type: ToastType = 'info',
      duration = 5000,
      position: ToastPosition = 'bottom-right',
      title?: string,
      action?: { label: string; onClick: () => void }
    ) => addToast(message, type, duration, position, title, action),
    success: (
      message: string,
      duration?: number,
      position?: ToastPosition,
      title?: string,
      action?: { label: string; onClick: () => void }
    ) => addToast(message, 'success', duration, position, title, action),
    error: (
      message: string,
      duration?: number,
      position?: ToastPosition,
      title?: string,
      action?: { label: string; onClick: () => void }
    ) => addToast(message, 'error', duration, position, title, action),
    warning: (
      message: string,
      duration?: number,
      position?: ToastPosition,
      title?: string,
      action?: { label: string; onClick: () => void }
    ) => addToast(message, 'warning', duration, position, title, action),
    info: (
      message: string,
      duration?: number,
      position?: ToastPosition,
      title?: string,
      action?: { label: string; onClick: () => void }
    ) => addToast(message, 'info', duration, position, title, action),
    removeToast,
    removeAllToasts,
  };
};