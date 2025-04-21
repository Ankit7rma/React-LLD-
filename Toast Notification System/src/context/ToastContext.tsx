import React, { createContext, useReducer, useCallback, ReactNode } from 'react';
import { Toast, ToastPosition, ToastType } from '../types/toast';

// Define the state structure
interface ToastState {
  toasts: Toast[];
}

// Define action types
type ToastAction =
  | { type: 'ADD_TOAST'; payload: Toast }
  | { type: 'REMOVE_TOAST'; payload: { id: string } }
  | { type: 'REMOVE_ALL_TOASTS' };

// Define context value structure
interface ToastContextValue {
  toasts: Toast[];
  addToast: (
    message: string,
    type?: ToastType,
    duration?: number,
    position?: ToastPosition,
    title?: string,
    action?: { label: string; onClick: () => void }
  ) => string;
  removeToast: (id: string) => void;
  removeAllToasts: () => void;
}

// Create context with default value
export const ToastContext = createContext<ToastContextValue | undefined>(undefined);

// Create reducer function
const toastReducer = (state: ToastState, action: ToastAction): ToastState => {
  switch (action.type) {
    case 'ADD_TOAST':
      return {
        ...state,
        toasts: [...state.toasts, action.payload],
      };
    case 'REMOVE_TOAST':
      return {
        ...state,
        toasts: state.toasts.filter((toast) => toast.id !== action.payload.id),
      };
    case 'REMOVE_ALL_TOASTS':
      return {
        ...state,
        toasts: [],
      };
    default:
      return state;
  }
};

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(toastReducer, { toasts: [] });

  const addToast = useCallback(
    (
      message: string,
      type: ToastType = 'info',
      duration = 5000,
      position: ToastPosition = 'bottom-right',
      title?: string,
      action?: { label: string; onClick: () => void }
    ): string => {
      const id = crypto.randomUUID();
      const toast: Toast = {
        id,
        message,
        type,
        duration,
        position,
        createdAt: Date.now(),
        title,
        action,
      };

      dispatch({ type: 'ADD_TOAST', payload: toast });
      return id;
    },
    []
  );

  const removeToast = useCallback((id: string) => {
    dispatch({ type: 'REMOVE_TOAST', payload: { id } });
  }, []);

  const removeAllToasts = useCallback(() => {
    dispatch({ type: 'REMOVE_ALL_TOASTS' });
  }, []);

  return (
    <ToastContext.Provider
      value={{
        toasts: state.toasts,
        addToast,
        removeToast,
        removeAllToasts,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
};