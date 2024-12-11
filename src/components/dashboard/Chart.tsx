import React from 'react';

interface ChartProps {
  title: string;
  children: React.ReactNode;
}

export const Chart: React.FC<ChartProps> = ({ title, children }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h3 className="font-semibold text-gray-900 mb-4">{title}</h3>
      {children}
    </div>
  );
};