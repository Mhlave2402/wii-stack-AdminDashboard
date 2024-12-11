import React, { useState } from 'react';
import { 
  Users, TrendingUp, DollarSign, Star, Car,
  Search, Filter, Plus, Download, Upload
} from 'lucide-react';
import { DriverStats } from '../../components/drivers/DriverStats';
import { DriverList } from '../../components/drivers/DriverList';

const mockDrivers = [
  {
    id: 'DRV001',
    name: 'Michael Johnson',
    email: 'michael@example.com',
    phone: '+1 234-567-8900',
    address: '789 Oak St, New York, NY 10001',
    joinDate: '2023-05-15T10:00:00Z',
    completedTrips: 856,
    rating: 4.9,
    earnings: 12580.50,
    status: 'active' as const,
    vehicle: {
      model: 'Toyota Camry 2022',
      plate: 'NYC 1234',
      type: 'Sedan'
    },
    lastActive: '2024-03-15T14:30:00Z'
  },
  {
    id: 'DRV002',
    name: 'Sarah Wilson',
    email: 'sarah@example.com',
    phone: '+1 234-567-8901',
    address: '456 Pine St, New York, NY 10002',
    joinDate: '2023-07-20T14:30:00Z',
    completedTrips: 642,
    rating: 4.8,
    earnings: 9450.75,
    status: 'active' as const,
    vehicle: {
      model: 'Honda CR-V 2023',
      plate: 'NYC 5678',
      type: 'SUV'
    },
    lastActive: '2024-03-15T15:45:00Z'
  }
];

export const Drivers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedDriver, setSelectedDriver] = useState<string | null>(null);

  const stats = [
    {
      title: 'Total Drivers',
      value: '1,234',
      change: '+12.5% from last month',
      icon: Users,
      trend: 'up'
    },
    {
      title: 'Active Drivers',
      value: '890',
      change: '+5.2% from last month',
      icon: Car,
      trend: 'up'
    },
    {
      title: 'Total Earnings',
      value: '$45.6K',
      change: '+8.3% from last month',
      icon: DollarSign,
      trend: 'up'
    },
    {
      title: 'Average Rating',
      value: '4.8',
      change: '+0.2 from last month',
      icon: Star,
      trend: 'up'
    }
  ];

  const handleExportData = () => {
    console.log('Exporting driver data...');
  };

  const handleImportData = () => {
    console.log('Importing driver data...');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Driver Management</h1>
        <div className="flex items-center gap-2">
          <button
            onClick={handleImportData}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            <Upload className="h-4 w-4" />
            Import
          </button>
          <button
            onClick={handleExportData}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            <Download className="h-4 w-4" />
            Export
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Plus className="h-4 w-4" />
            Add Driver
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {stats.map((stat) => (
          <DriverStats key={stat.title} {...stat} />
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search drivers..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
            </select>
            <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
              <Filter className="h-5 w-5" />
              More Filters
            </button>
          </div>
        </div>

        <DriverList 
          drivers={mockDrivers}
          onSelect={setSelectedDriver}
        />

        <div className="px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing {mockDrivers.length} of {mockDrivers.length} drivers
            </p>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-50 rounded-lg">
                Previous
              </button>
              <button className="px-3 py-1 text-sm text-white bg-blue-600 rounded-lg">
                1
              </button>
              <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-50 rounded-lg">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};