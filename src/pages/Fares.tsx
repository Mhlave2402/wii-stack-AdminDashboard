import React, { useState } from 'react';
import { 
  DollarSign, TrendingUp, MapPin, Clock, Search,
  Filter, Plus, Download, Upload
} from 'lucide-react';
import { FareStats } from '../components/fares/FareStats';
import { FareList } from '../components/fares/FareList';
import { CreateFareModal } from '../components/fares/CreateFareModal';

const mockFares = [
  {
    id: 'FARE001',
    name: 'Standard Rate',
    type: 'fixed' as const,
    basePrice: 10.00,
    status: 'active' as const,
    conditions: {
      peakHours: {
        multiplier: 1.5,
        hours: ['07:00-10:00', '16:00-19:00']
      },
      minimumDistance: 2
    },
    zones: ['Downtown', 'Midtown'],
    lastUpdated: '2024-03-01T10:00:00Z',
    nextReview: '2024-06-01T00:00:00Z'
  },
  {
    id: 'FARE002',
    name: 'Zone-Based Rate',
    type: 'zone-based' as const,
    basePrice: 15.00,
    status: 'active' as const,
    conditions: {
      minimumDistance: 3
    },
    zones: ['Suburb North', 'Suburb South', 'Business District'],
    lastUpdated: '2024-02-15T14:30:00Z',
    nextReview: '2024-05-15T00:00:00Z'
  }
];

export const Fares = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const stats = [
    {
      title: 'Average Fare',
      value: '$12.50',
      change: '+5.2% from last month',
      trend: 'up',
      icon: DollarSign
    },
    {
      title: 'Peak Hour Revenue',
      value: '$45.8K',
      change: '+8.3% from last month',
      trend: 'up',
      icon: TrendingUp
    },
    {
      title: 'Active Zones',
      value: '8',
      change: '+2 from last month',
      trend: 'up',
      icon: MapPin
    },
    {
      title: 'Peak Hours',
      value: '6h/day',
      change: 'Same as last month',
      trend: 'up',
      icon: Clock
    }
  ];

  const handleCreateFare = (data: any) => {
    console.log('Creating fare:', data);
    setShowCreateModal(false);
  };

  const handleEditFare = (id: string) => {
    console.log('Editing fare:', id);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Fare Management</h1>
        <div className="flex items-center gap-2">
          <button
            className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            <Upload className="h-4 w-4" />
            Import
          </button>
          <button
            className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            <Download className="h-4 w-4" />
            Export
          </button>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" />
            Create Fare
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {stats.map((stat) => (
          <FareStats key={stat.title} {...stat} />
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
                placeholder="Search fares..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Types</option>
              <option value="fixed">Fixed Rate</option>
              <option value="dynamic">Dynamic</option>
              <option value="zone">Zone Based</option>
            </select>
            <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
              <Filter className="h-5 w-5" />
              More Filters
            </button>
          </div>
        </div>

        <FareList 
          fares={mockFares}
          onEdit={handleEditFare}
        />

        <div className="px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing {mockFares.length} of {mockFares.length} fares
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

      {showCreateModal && (
        <CreateFareModal
          onClose={() => setShowCreateModal(false)}
          onSubmit={handleCreateFare}
        />
      )}
    </div>
  );
};