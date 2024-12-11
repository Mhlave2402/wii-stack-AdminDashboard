import React, { useState } from 'react';
import { 
  Car, TrendingUp, Wrench, AlertCircle, Search, Filter,
  Plus, Download, Upload, MapPin, User, Calendar,
  MoreVertical, Battery, Fuel, Activity
} from 'lucide-react';
import { format } from 'date-fns';
import { CreateVehicleModal } from '../components/vehicles/CreateVehicleModal';

interface Vehicle {
  id: string;
  model: string;
  type: string;
  plate: string;
  status: 'active' | 'maintenance' | 'inactive';
  driver?: {
    name: string;
    id: string;
    phone: string;
  };
  lastLocation: string;
  lastActive: string;
  mileage: number;
  fuelLevel: number;
  nextService: string;
  insurance: {
    provider: string;
    expiryDate: string;
  };
  registration: {
    number: string;
    expiryDate: string;
  };
}

const mockVehicles: Vehicle[] = [
  {
    id: 'VH001',
    model: 'Toyota Camry 2022',
    type: 'Sedan',
    plate: 'NYC 1234',
    status: 'active',
    driver: {
      name: 'John Doe',
      id: 'DRV001',
      phone: '+1 234-567-8900'
    },
    lastLocation: 'Downtown Manhattan',
    lastActive: '2024-03-15T14:30:00Z',
    mileage: 25890,
    fuelLevel: 85,
    nextService: '2024-04-15T00:00:00Z',
    insurance: {
      provider: 'SafeDrive Insurance',
      expiryDate: '2024-12-31T00:00:00Z'
    },
    registration: {
      number: 'REG123456',
      expiryDate: '2024-12-31T00:00:00Z'
    }
  },
  {
    id: 'VH002',
    model: 'Honda CR-V 2023',
    type: 'SUV',
    plate: 'NYC 5678',
    status: 'maintenance',
    lastLocation: 'Brooklyn Heights',
    lastActive: '2024-03-14T18:45:00Z',
    mileage: 15420,
    fuelLevel: 45,
    nextService: '2024-03-20T00:00:00Z',
    insurance: {
      provider: 'SecureAuto Insurance',
      expiryDate: '2025-01-15T00:00:00Z'
    },
    registration: {
      number: 'REG789012',
      expiryDate: '2025-01-15T00:00:00Z'
    }
  }
];

export const Vehicles = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const stats = [
    {
      title: 'Total Vehicles',
      value: '45',
      change: '+3 this month',
      icon: Car,
      trend: 'up'
    },
    {
      title: 'Active Vehicles',
      value: '38',
      change: '+2 from last week',
      icon: Activity,
      trend: 'up'
    },
    {
      title: 'In Maintenance',
      value: '5',
      change: '-1 from last week',
      icon: Wrench,
      trend: 'down'
    },
    {
      title: 'Service Due',
      value: '8',
      change: '+2 from last week',
      icon: AlertCircle,
      trend: 'up'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCreateVehicle = (data: any) => {
    console.log('Creating vehicle:', data);
    setShowCreateModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Vehicle Management</h1>
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
            Add Vehicle
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.title} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-semibold mt-2">{stat.value}</p>
                <p className={`text-sm mt-2 ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                </p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <stat.icon className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
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
                placeholder="Search vehicles..."
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
              <option value="maintenance">In Maintenance</option>
              <option value="inactive">Inactive</option>
            </select>
            <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
              <Filter className="h-5 w-5" />
              More Filters
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vehicle Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Driver
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location & Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Maintenance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Documents
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockVehicles.map((vehicle) => (
                <tr 
                  key={vehicle.id}
                  className="hover:bg-gray-50"
                  onClick={() => setSelectedVehicle(vehicle.id)}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center">
                        <Car className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{vehicle.model}</p>
                        <p className="text-sm text-gray-500">{vehicle.plate}</p>
                        <p className="text-xs text-gray-400">{vehicle.type}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {vehicle.driver ? (
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-gray-900">
                          <User className="h-4 w-4" />
                          {vehicle.driver.name}
                        </div>
                        <p className="text-sm text-gray-500">{vehicle.driver.phone}</p>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-500">Unassigned</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        getStatusColor(vehicle.status)
                      }`}>
                        {vehicle.status}
                      </span>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="h-4 w-4" />
                        {vehicle.lastLocation}
                      </div>
                      <p className="text-xs text-gray-500">
                        Last active: {format(new Date(vehicle.lastActive), 'MMM d, h:mm a')}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Activity className="h-4 w-4" />
                        {vehicle.mileage.toLocaleString()} miles
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Fuel className="h-4 w-4" />
                        {vehicle.fuelLevel}% fuel
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Wrench className="h-4 w-4" />
                        Next service: {format(new Date(vehicle.nextService), 'MMM d, yyyy')}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-2">
                      <div className="text-sm">
                        <p className="text-gray-900">Insurance</p>
                        <p className="text-gray-500">{vehicle.insurance.provider}</p>
                        <p className="text-xs text-gray-400">
                          Expires: {format(new Date(vehicle.insurance.expiryDate), 'MMM d, yyyy')}
                        </p>
                      </div>
                      <div className="text-sm">
                        <p className="text-gray-900">Registration</p>
                        <p className="text-gray-500">{vehicle.registration.number}</p>
                        <p className="text-xs text-gray-400">
                          Expires: {format(new Date(vehicle.registration.expiryDate), 'MMM d, yyyy')}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-gray-400 hover:text-gray-500">
                      <MoreVertical className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing {mockVehicles.length} of {mockVehicles.length} vehicles
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
        <CreateVehicleModal
          onClose={() => setShowCreateModal(false)}
          onSubmit={handleCreateVehicle}
        />
      )}
    </div>
  );
};