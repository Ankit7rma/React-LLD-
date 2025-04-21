import React, { useState } from 'react';
import { useToast } from '../hooks/useToast';
import { ToastPosition, ToastType } from '../types/toast';

const DemoControls: React.FC = () => {
  const { toast, success, error, warning, info, removeAllToasts } = useToast();
  const [message, setMessage] = useState('This is a toast notification');
  const [title, setTitle] = useState('Notification');
  const [position, setPosition] = useState<ToastPosition>('bottom-right');
  const [type, setType] = useState<ToastType>('info');
  const [duration, setDuration] = useState(5000);
  const [showAction, setShowAction] = useState(false);

  const handleShowToast = () => {
    const action = showAction
      ? {
          label: 'Action',
          onClick: () => alert('Action clicked!'),
        }
      : undefined;

    switch (type) {
      case 'success':
        success(message, duration, position, title, action);
        break;
      case 'error':
        error(message, duration, position, title, action);
        break;
      case 'warning':
        warning(message, duration, position, title, action);
        break;
      case 'info':
        info(message, duration, position, title, action);
        break;
      default:
        toast(message, type, duration, position, title, action);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6 space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Toast Demo</h2>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
          />
        </div>
        
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">
            Message
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
            rows={2}
          />
        </div>
        
        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-700">
            Type
          </label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value as ToastType)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
          >
            <option value="info">Info</option>
            <option value="success">Success</option>
            <option value="warning">Warning</option>
            <option value="error">Error</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="position" className="block text-sm font-medium text-gray-700">
            Position
          </label>
          <select
            id="position"
            value={position}
            onChange={(e) => setPosition(e.target.value as ToastPosition)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
          >
            <option value="top-left">Top Left</option>
            <option value="top-center">Top Center</option>
            <option value="top-right">Top Right</option>
            <option value="bottom-left">Bottom Left</option>
            <option value="bottom-center">Bottom Center</option>
            <option value="bottom-right">Bottom Right</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
            Duration (ms)
          </label>
          <input
            type="number"
            id="duration"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            min="0"
            step="1000"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
          />
          <p className="text-sm text-gray-500 mt-1">
            Set to 0 for persistent toast (won't auto-dismiss)
          </p>
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="action"
            checked={showAction}
            onChange={(e) => setShowAction(e.target.checked)}
            className="h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300 rounded"
          />
          <label htmlFor="action" className="ml-2 block text-sm text-gray-700">
            Include action button
          </label>
        </div>
      </div>
      
      <div className="flex space-x-4">
        <button
          onClick={handleShowToast}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Show Toast
        </button>
        <button
          onClick={removeAllToasts}
          className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Clear All
        </button>
      </div>
    </div>
  );
};

export default DemoControls;