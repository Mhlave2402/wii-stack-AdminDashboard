import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

interface PredictionDistributionProps {
  data: {
    range: string;
    count: number;
    accuracy: number;
  }[];
}

export const PredictionDistribution: React.FC<PredictionDistributionProps> = ({ data }) => {
  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis 
            dataKey="range" 
            stroke="#6B7280"
            fontSize={12}
            tickLine={false}
          />
          <YAxis 
            stroke="#6B7280"
            fontSize={12}
            tickLine={false}
            yAxisId="left"
          />
          <YAxis 
            stroke="#6B7280"
            fontSize={12}
            tickLine={false}
            yAxisId="right"
            orientation="right"
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
          <Bar 
            dataKey="count" 
            fill="#3B82F6" 
            yAxisId="left"
            radius={[4, 4, 0, 0]}
            name="Predictions"
          />
          <Bar 
            dataKey="accuracy" 
            fill="#10B981" 
            yAxisId="right"
            radius={[4, 4, 0, 0]}
            name="Accuracy"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};