import React, { useState } from 'react';
import { 
  Route, Clock, MapPin, Package, Filter, Search,
  TrendingUp, AlertCircle, CheckCircle, XCircle
} from 'lucide-react';
import { TripStats } from '../components/trips/TripStats';
import { TripList } from '../components/trips/TripList';
import { TripMap } from '../components/trips/TripMap';
import { TripDetails } from '../components/trips/TripDetails';
import { format } from 'date-fns';

const trips = [
  {
    id: 'TRIP001',
    driver: {
      name: 'John Doe',
      rating: 4.8,
      phone: '+1 234-567-8900'
    },
    customer: {
      name: 'Alice Smith',
      address: '123 Main St, Downtown',
      phone: '+1 234-567-8901'
    },
    status: 'in_progress',
    pickupLocation: '456 Market St',
    dropoffLocation: '789 Park Ave',
    distance: '3.2 km',
    estimatedTime: '15 mins',
    actualTime: null,
    price: 12.50,
    startTime: new Date().toISOString(),
    packageDetails: {
      type: 'Standard',
      weight: '2.5 kg',
      dimensions: '30x20x15 cm'
    }
  },
  {
    id: 'TRIP002',
    driver: {
      name: 'Jane Smith',
      rating: 4.9,
      phone: '+1 234-567-8902'
    },
    customer: {
      name: 'Bob Johnson',
      address: '321 Oak St, Suburb North',
      phone: '+1 234-567-8903'
    },
    status: 'completed',
    pickupLocation: '654 Pine St',
    dropoffLocation: '987 Elm Ave',
    distance: '4.5 km',
    estimatedTime: '20 mins',
    actualTime: '18 mins',
    price: 15.75,
    startTime: new Date(Date.now() - 3600000).toISOString(),
    packageDetails: {
      type: 'Express',
      weight: '1.8 kg',
      dimensions: '25x15x10 cm'
    }
  }
];

export const Trips = () => {
  const [view, setView] = useState<'list' | 'map'>('list');
  const [selectedTrip, setSelectedTrip] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState('today');
  const [statusFilter, setStatusFilter] = useState('all');

  const stats = [
    {
      label: 'Active Trips',
      value: trips.filter(t => t.status === 'in_progress').length,
      icon: Route,
      trend: '+3',
      trendDirection: 'up'
    },
    {
      label: 'Avg Delivery Time',
      value: '18 mins',
      icon: Clock,
      trend: '-2',
      trendDirection: 'down'
    },
    {
      label: 'Success Rate',
      value: '98.5%',
      icon: CheckCircle,
      trend: '+0.5',
      trendDirection: 'up'
    },
    {
      label: 'Cancelled',
      value: '1.5%',
      icon: XCircle,
      trend: '-0.3',
      trendDirection: 'down'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Trip Management</h1>
        <div className="flex items-center gap-4">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
          <div className="flex rounded-lg overflow-hidden border border-gray-200">
            <button
              onClick={() => setView('list')}
              className={`px-4 py-2 text-sm font-medium ${
                view === 'list'
                  ? 'bg-blue-50 text-blue-600'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              List View
            </button>
            <button
              onClick={() => setView('map')}
              className={`px-4 py-2 text-sm font-medium ${
                view === 'map'
                  ? 'bg-blue-50 text-blue-600'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              Map View
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {stats.map((stat) => (
          <TripStats key={stat.label} {...stat} />
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search trips by ID, driver, or customer..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
              <Filter className="h-5 w-5" />
              More Filters
            </button>
          </div>
        </div>

        <div className="flex">
          <div className={`flex-1 ${selectedTrip ? 'border-r border-gray-200' : ''}`}>
            {view === 'list' ? (
              <TripList 
                trips={trips} 
                onTripSelect={setSelectedTrip} 
                selectedTripId={selectedTrip}
              />
            ) : (
              <TripMap 
                trips={trips} 
                selectedTripId={selectedTrip}
                onTripSelect={setSelectedTrip}
              />
            )}
          </div>
          
          {selectedTrip && (
            <div className="w-96">
              <TripDetails 
                trip={trips.find(t => t.id === selectedTrip)!}
                onClose={() => setSelectedTrip(null)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};