import React, { useState } from 'react';
import { Users, Truck, DollarSign, Package, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { StatCard } from '../components/dashboard/StatCard';
import { Chart } from '../components/dashboard/Chart';
import { ActivityFeed } from '../components/dashboard/ActivityFeed';
import { PerformanceChart } from '../components/dashboard/PerformanceChart';
import { ZonesChart } from '../components/dashboard/ZonesChart';
import { DeliveryMap } from '../components/dashboard/DeliveryMap';
import { format } from 'date-fns';

const recentActivities = [
  {
    id: '1',
    type: 'delivery',
    description: 'New delivery request from John Doe',
    time: '5 minutes ago',
    status: 'pending',
    icon: Package,
    color: 'text-blue-600'
  },
  {
    id: '2',
    type: 'driver',
    description: 'Driver Mike Smith completed delivery #1234',
    time: '10 minutes ago',
    status: 'completed',
    icon: Truck,
    color: 'text-green-600'
  },
  {
    id: '3',
    type: 'payment',
    description: 'Payment received for order #5678',
    time: '15 minutes ago',
    status: 'completed',
    icon: DollarSign,
    color: 'text-purple-600'
  },
  {
    id: '4',
    type: 'zone',
    description: 'New high-demand zone detected in Downtown',
    time: '30 minutes ago',
    status: 'alert',
    icon: TrendingUp,
    color: 'text-orange-600'
  }
];

const earningsData = Array.from({ length: 12 }, (_, i) => ({
  month: format(new Date(2024, i, 1), 'MMM'),
  earnings: Math.floor(Math.random() * 50000) + 30000,
  deliveries: Math.floor(Math.random() * 1000) + 500
}));

const topZones = [
  { name: 'Downtown', deliveries: 450, revenue: 12500 },
  { name: 'Suburb North', deliveries: 380, revenue: 10200 },
  { name: 'Business District', deliveries: 320, revenue: 9800 },
  { name: 'University Area', deliveries: 290, revenue: 7600 },
  { name: 'Shopping District', deliveries: 250, revenue: 6900 }
];

const driverPerformance = [
  { name: 'On Time', value: 85 },
  { name: 'Customer Rating', value: 92 },
  { name: 'Completion Rate', value: 98 },
  { name: 'Acceptance Rate', value: 88 }
];

export const Dashboard = () => {
  const [timeRange, setTimeRange] = useState('today');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard Overview</h1>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="px-4 py-2 border border-gray-200 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="year">This Year</option>
        </select>
      </div>

      <div className="grid grid-cols-4 gap-6">
        <StatCard
          title="Total Customers"
          value="12,345"
          change="+12.5%"
          icon={Users}
          trend="up"
        />
        <StatCard
          title="Active Drivers"
          value="890"
          change="+5.2%"
          icon={Truck}
          trend="up"
        />
        <StatCard
          title="Total Revenue"
          value="$45,678"
          change="+8.7%"
          icon={DollarSign}
          trend="up"
        />
        <StatCard
          title="Deliveries Today"
          value="234"
          change="-2.1%"
          icon={Package}
          trend="down"
        />
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <Chart title="Earnings Overview">
            <PerformanceChart data={earningsData} />
          </Chart>
        </div>
        <ActivityFeed activities={recentActivities} />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <Chart title="Top Performing Zones">
          <ZonesChart data={topZones} />
        </Chart>
        <Chart title="Driver Performance Metrics">
          <div className="grid grid-cols-2 gap-4">
            {driverPerformance.map((metric) => (
              <div key={metric.name} className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">{metric.name}</p>
                <div className="mt-2 flex items-end gap-2">
                  <span className="text-2xl font-semibold">{metric.value}%</span>
                  <span className="text-sm text-green-600 flex items-center">
                    <ArrowUpRight className="h-4 w-4" />
                    2.1%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Chart>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="font-semibold text-gray-900 mb-4">Live Delivery Map</h3>
        <DeliveryMap />
      </div>
    </div>
  );
};