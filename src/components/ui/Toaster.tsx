import React from 'react';

interface ToasterProps {
  message?: string;
  type?: 'success' | 'error' | 'warning' | 'info';
}

export const Toaster: React.FC<ToasterProps> = ({ message, type = 'info' }) => {
  if (!message) return null;

  const bgColor = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    warning: 'bg-yellow-500',
    info: 'bg-blue-500'
  }[type];

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className={`${bgColor} text-white px-6 py-3 rounded-lg shadow-lg`}>
        {message}
      </div>
    </div>
  );
};