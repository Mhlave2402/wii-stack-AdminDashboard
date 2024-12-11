import React from 'react';

interface Feature {
  name: string;
  importance: number;
  change: number;
}

interface FeatureImportanceProps {
  features: Feature[];
}

export const FeatureImportance: React.FC<FeatureImportanceProps> = ({ features }) => {
  return (
    <div className="space-y-4">
      {features.map((feature) => (
        <div key={feature.name} className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-900">{feature.name}</span>
            <span className="text-sm text-gray-600">{feature.importance.toFixed(2)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full"
              style={{ width: `${feature.importance}%` }}
            />
          </div>
          <div className="mt-1 text-xs">
            <span className={feature.change >= 0 ? 'text-green-600' : 'text-red-600'}>
              {feature.change >= 0 ? '+' : ''}{feature.change}% from last period
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};