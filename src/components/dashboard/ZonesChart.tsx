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

interface ZoneData {
  name: string;
  deliveries: number;
  revenue: number;
}

interface ZonesChartProps {
  data: ZoneData[];
}

export const ZonesChart: React.FC<ZonesChartProps> = ({ data }) => {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis 
            dataKey="name" 
            stroke="#6B7280"
            fontSize={12}
            tickLine={false}
          />
          <YAxis 
            stroke="#6B7280"
            fontSize={12}
            tickLine={false}
            yAxisId="left"
            tickFormatter={(value) => value.toLocaleString()}
          />
          <YAxis 
            stroke="#6B7280"
            fontSize={12}
            tickLine={false}
            yAxisId="right"
            orientation="right"
            tickFormatter={(value) => `$${value.toLocaleString()}`}
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
            dataKey="deliveries" 
            fill="#3B82F6" 
            yAxisId="left"
            radius={[4, 4, 0, 0]}
            name="Deliveries"
          />
          <Bar 
            dataKey="revenue" 
            fill="#10B981" 
            yAxisId="right"
            radius={[4, 4, 0, 0]}
            name="Revenue"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};