import React from 'react';
import { Star, TrendingUp, Clock, CheckCircle } from 'lucide-react';

interface DriverPerformanceCardProps {
  performance: {
    rating: number;
    completionRate: number;
    avgResponseTime: string;
    totalTrips: number;
    trend: {
      rating: number;
      trips: number;
    };
  };
}

export const DriverPerformanceCard: React.FC<DriverPerformanceCardProps> = ({ performance }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-400" />
            <span className="text-sm font-medium text-gray-900">Rating</span>
          </div>
          <span className="text-lg font-semibold text-gray-900">{performance.rating}</span>
        </div>
        <div className="mt-2 text-sm text-green-600">
          +{performance.trend.rating}% from last month
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-500" />
            <span className="text-sm font-medium text-gray-900">Total Trips</span>
          </div>
          <span className="text-lg font-semibold text-gray-900">{performance.totalTrips}</span>
        </div>
        <div className="mt-2 text-sm text-green-600">
          +{performance.trend.trips}% from last month
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-purple-500" />
            <span className="text-sm font-medium text-gray-900">Avg Response</span>
          </div>
          <span className="text-lg font-semibold text-gray-900">{performance.avgResponseTime}</span>
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <span className="text-sm font-medium text-gray-900">Completion</span>
          </div>
          <span className="text-lg font-semibold text-gray-900">{performance.completionRate}%</span>
        </div>
      </div>
    </div>
  );
};