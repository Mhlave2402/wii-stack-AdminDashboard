import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ZoneStatsProps {
  label: string;
  value: number | string;
  icon: LucideIcon;
  trend?: string;
  trendDirection?: 'up' | 'down';
}

export const ZoneStats: React.FC<ZoneStatsProps> = ({
  label,
  value,
  icon: Icon,
  trend,
  trendDirection
}) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{label}</p>
          <p className="text-2xl font-semibold mt-2">{value}</p>
          {trend && (
            <p className={`text-sm mt-2 ${
              trendDirection === 'up' ? 'text-green-600' : 'text-red-600'
            }`}>
              {trend} from last period
            </p>
          )}
        </div>
        <div className="p-3 bg-blue-50 rounded-lg">
          <Icon className="h-6 w-6 text-blue-600" />
        </div>
      </div>
    </div>
  );
};