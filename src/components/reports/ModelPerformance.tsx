import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

interface ModelPerformanceProps {
  data: {
    date: string;
    accuracy: number;
    precision: number;
    recall: number;
  }[];
}

export const ModelPerformance: React.FC<ModelPerformanceProps> = ({ data }) => {
  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="accuracy" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1}/>
              <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="precision" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10B981" stopOpacity={0.1}/>
              <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="recall" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.1}/>
              <stop offset="95%" stopColor="#F59E0B" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis 
            dataKey="date" 
            stroke="#6B7280"
            fontSize={12}
            tickLine={false}
          />
          <YAxis 
            stroke="#6B7280"
            fontSize={12}
            tickLine={false}
            tickFormatter={(value) => `${value}%`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #E5E7EB',
              borderRadius: '0.5rem',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            }}
          />
          <Area
            type="monotone"
            dataKey="accuracy"
            stroke="#3B82F6"
            fillOpacity={1}
            fill="url(#accuracy)"
            strokeWidth={2}
            name="Accuracy"
          />
          <Area
            type="monotone"
            dataKey="precision"
            stroke="#10B981"
            fillOpacity={1}
            fill="url(#precision)"
            strokeWidth={2}
            name="Precision"
          />
          <Area
            type="monotone"
            dataKey="recall"
            stroke="#F59E0B"
            fillOpacity={1}
            fill="url(#recall)"
            strokeWidth={2}
            name="Recall"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};