import React, { useState } from 'react';
import { 
  Car, Users, Clock, AlertCircle, Plus, Search, Filter, 
  RefreshCw, Copy, Download, Upload, LayoutTemplate, Mail
} from 'lucide-react';
import { FleetStats } from '../../components/fleet/FleetStats';
import { FleetList } from '../../components/fleet/FleetList';
import { CreateFleetModal } from '../../components/fleet/CreateFleetModal';
import { FleetVehicleList } from '../../components/fleet/FleetVehicleList';
import { FleetDriversContent } from '../../components/fleet/drivers/FleetDriversContent';
import { FleetDocuments } from '../../components/fleet/FleetDocuments';

export const FleetManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'vehicles' | 'drivers' | 'documents'>('overview');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');

  const stats = [
    {
      title: 'Total Vehicles',
      value: '45',
      change: '+3 this month',
      icon: Car,
      trend: 'up' as const,
    },
    {
      title: 'Active Drivers',
      value: '38',
      change: '+2 from last week',
      icon: Users,
      trend: 'up' as const,
    },
    {
      title: 'Average Trip Time',
      value: '28 mins',
      change: '-2 mins from last week',
      icon: Clock,
      trend: 'down' as const,
    },
    {
      title: 'Fleet Rating',
      value: '4.8',
      change: '+0.2 from last month',
      icon: AlertCircle,
      trend: 'up' as const,
    }
  ];

  const vehicles = [
    {
      id: '1',
      model: 'Toyota Camry',
      plate: 'ABC123',
      status: 'active' as const,
      lastService: '2022-01-01',
      nextService: '2022-06-01',
      mileage: 50000,
      assignedDriver: 'John Doe',
    },
    {
      id: '2',
      model: 'Honda Civic',
      plate: 'DEF456',
      status: 'maintenance' as const,
      lastService: '2022-02-01',
      nextService: '2022-07-01',
      mileage: 60000,
      assignedDriver: 'Jane Doe',
    },
    {
      id: '3',
      model: 'Ford Focus',
      plate: 'GHI789',
      status: 'inactive' as const,
      lastService: '2022-03-01',
      nextService: '2022-08-01',
      mileage: 70000,
      assignedDriver: 'Bob Smith',
    },
  ];

  const handleCreateFleet = (data: any) => {
    console.log('Creating fleet:', data);
    setShowCreateModal(false);
  };

  const handleAssignDriver = (vehicleId: string) => {
    console.log('Assigning driver to vehicle:', vehicleId);
  };

  const handleScheduleMaintenance = (vehicleId: string) => {
    console.log('Scheduling maintenance for vehicle:', vehicleId);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Fleet Management</h1>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" />
            Create Fleet
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {stats.map((stat) => (
          <FleetStats key={stat.title} {...stat} />
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-6 py-3 text-sm font-medium border-b-2 ${
                activeTab === 'overview'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('vehicles')}
              className={`px-6 py-3 text-sm font-medium border-b-2 ${
                activeTab === 'vehicles'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Vehicles
            </button>
            <button
              onClick={() => setActiveTab('drivers')}
              className={`px-6 py-3 text-sm font-medium border-b-2 ${
                activeTab === 'drivers'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Drivers
            </button>
            <button
              onClick={() => setActiveTab('documents')}
              className={`px-6 py-3 text-sm font-medium border-b-2 ${
                activeTab === 'documents'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Documents
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Fleet Overview</h2>
              <p className="text-gray-600">Total Vehicles: 45</p>
              <p className="text-gray-600">Active Drivers: 38</p>
              <p className="text-gray-600">Average Trip Time: 28 mins</p>
              <p className="text-gray-600">Fleet Rating: 4.8</p>
            </div>
          )}

          {activeTab === 'vehicles' && (
            <FleetVehicleList
              vehicles={vehicles}
              onAssignDriver={handleAssignDriver}
              onScheduleMaintenance={handleScheduleMaintenance}
            />
          )}

          {activeTab === 'drivers' && <FleetDriversContent />}

          {activeTab === 'documents' && (
            <FleetDocuments
              documents={[]}
              onUpload={() => {}}
              onDownload={() => {}}
            />
          )}
        </div>
      </div>

      {showCreateModal && (
        <CreateFleetModal
          onClose={() => setShowCreateModal(false)}
          onSubmit={handleCreateFleet}
        />
      )}
    </div>
  );
};
