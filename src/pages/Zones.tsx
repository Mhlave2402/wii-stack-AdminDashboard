import React, { useState } from 'react';
import { 
  MapPin, Plus, Search, Filter, MoreVertical, Edit, Trash2, 
  Users, TrendingUp, Clock, AlertCircle 
} from 'lucide-react';
import { ZoneMap } from '../components/zones/ZoneMap';
import { ZoneList } from '../components/zones/ZoneList';
import { CreateZoneModal } from '../components/zones/CreateZoneModal';
import { ZoneStats } from '../components/zones/ZoneStats';

const zones = [
  {
    id: '1',
    name: 'Downtown',
    status: 'active',
    activeDrivers: 45,
    avgDeliveryTime: '18 mins',
    demandLevel: 'high',
    coordinates: { lat: 40.7128, lng: -74.0060 },
    coverage: '2.5 km²',
    deliveries: {
      completed: 234,
      inProgress: 12,
      cancelled: 3
    }
  },
  {
    id: '2',
    name: 'Suburb North',
    status: 'active',
    activeDrivers: 32,
    avgDeliveryTime: '22 mins',
    demandLevel: 'medium',
    coordinates: { lat: 40.7328, lng: -74.0160 },
    coverage: '3.8 km²',
    deliveries: {
      completed: 156,
      inProgress: 8,
      cancelled: 2
    }
  },
  {
    id: '3',
    name: 'Business District',
    status: 'high-demand',
    activeDrivers: 28,
    avgDeliveryTime: '20 mins',
    demandLevel: 'very-high',
    coordinates: { lat: 40.7528, lng: -74.0260 },
    coverage: '1.9 km²',
    deliveries: {
      completed: 198,
      inProgress: 15,
      cancelled: 1
    }
  }
];

export const Zones = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const [view, setView] = useState<'map' | 'list'>('map');

  const stats = [
    {
      label: 'Total Zones',
      value: zones.length,
      icon: MapPin,
      trend: '+2',
      trendDirection: 'up'
    },
    {
      label: 'Active Drivers',
      value: zones.reduce((acc, zone) => acc + zone.activeDrivers, 0),
      icon: Users,
      trend: '+5',
      trendDirection: 'up'
    },
    {
      label: 'Avg Delivery Time',
      value: '20 mins',
      icon: Clock,
      trend: '-2',
      trendDirection: 'down'
    },
    {
      label: 'High Demand Zones',
      value: zones.filter(z => z.demandLevel === 'high' || z.demandLevel === 'very-high').length,
      icon: TrendingUp,
      trend: '+1',
      trendDirection: 'up'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Zone Management</h1>
        <div className="flex items-center gap-4">
          <div className="flex rounded-lg overflow-hidden border border-gray-200">
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
          </div>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
            Create Zone
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {stats.map((stat) => (
          <ZoneStats key={stat.label} {...stat} />
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search zones..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
              <Filter className="h-5 w-5" />
              Filters
            </button>
          </div>
        </div>

        {view === 'map' ? (
          <ZoneMap zones={zones} selectedZone={selectedZone} onZoneSelect={setSelectedZone} />
        ) : (
          <ZoneList zones={zones} onZoneSelect={setSelectedZone} />
        )}
      </div>

      {isCreateModalOpen && (
        <CreateZoneModal onClose={() => setIsCreateModalOpen(false)} />
      )}
    </div>
  );
};