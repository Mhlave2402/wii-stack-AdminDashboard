import React, { useState } from 'react';
import { Search, Filter, Plus, User, Star, MapPin, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { DriverDetailsModal } from './DriverDetailsModal';

interface Driver {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  joinDate: string;
  status: 'active' | 'inactive' | 'on_trip';
  rating: number;
  completedTrips: number;
  vehicle?: {
    model: string;
    plate: string;
  };
  lastActive: string;
  license: {
    number: string;
    expiry: string;
    class: string;
  };
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
  schedule: Array<{
    date: string;
    startTime: string;
    endTime: string;
    status: 'scheduled' | 'in-progress' | 'completed';
  }>;
}

const mockDrivers: Driver[] = [
  {
    id: 'DRV001',
    name: 'John Smith',
    email: 'john@example.com',
    phone: '+1 234-567-8900',
    address: '123 Main St, New York, NY',
    joinDate: '2023-06-15T10:00:00Z',
    status: 'active',
    rating: 4.8,
    completedTrips: 856,
    vehicle: {
      model: 'Toyota Camry 2023',
      plate: 'NYC-1234'
    },
    lastActive: '2024-03-15T14:30:00Z',
    license: {
      number: 'DL123456',
      expiry: '2025-06-15T00:00:00Z',
      class: 'Commercial'
    },
    performance: {
      rating: 4.8,
      completionRate: 98,
      avgResponseTime: '3 mins',
      totalTrips: 856,
      trend: {
        rating: 2.5,
        trips: 12
      }
    },
    schedule: [
      {
        date: '2024-03-16T00:00:00Z',
        startTime: '09:00',
        endTime: '17:00',
        status: 'scheduled'
      },
      {
        date: '2024-03-17T00:00:00Z',
        startTime: '10:00',
        endTime: '18:00',
        status: 'scheduled'
      }
    ]
  },
  // Add more mock drivers as needed
];

export const FleetDriversContent: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'on_trip':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleScheduleMaintenance = (vehicleId: string) => {
    console.log('Scheduling maintenance for vehicle:', vehicleId);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex-1 max-w-lg relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search drivers..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        <div className="flex items-center gap-4">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="on_trip">On Trip</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Plus className="h-4 w-4" />
            Add Driver
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Driver
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Performance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vehicle
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {mockDrivers.map((driver) => (
                <tr
                  key={driver.id}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => setSelectedDriver(driver)}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <User className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{driver.name}</p>
                        <p className="text-sm text-gray-500">{driver.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-400" />
                        <span className="text-sm font-medium text-gray-900">{driver.rating}</span>
                      </div>
                      <p className="text-sm text-gray-600">{driver.completedTrips} trips completed</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {driver.vehicle ? (
                      <div className="space-y-1">
                        <p className="text-sm text-gray-900">{driver.vehicle.model}</p>
                        <p className="text-sm text-gray-600">{driver.vehicle.plate}</p>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-500">No vehicle assigned</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(driver.status)}`}>
                        {driver.status.replace('_', ' ')}
                      </span>
                      <p className="text-xs text-gray-500">
                        Last active: {format(new Date(driver.lastActive), 'MMM d, h:mm a')}
                      </p>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedDriver && (
        <DriverDetailsModal
          driver={selectedDriver}
          onClose={() => setSelectedDriver(null)}
          onScheduleMaintenance={handleScheduleMaintenance}
        />
      )}
    </div>
  );
};