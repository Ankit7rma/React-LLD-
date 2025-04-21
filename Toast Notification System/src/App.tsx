import React from 'react';
import { useToast } from './hooks/useToast';
import ToastContainer from './components/toast/ToastContainer';
import DemoControls from './components/DemoControls';

function App() {
  const { toasts, removeToast } = useToast();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Toast Notification System</h1>
      
      <DemoControls />
      
      {/* Toast Container - will display all active toasts */}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
}

export default App;