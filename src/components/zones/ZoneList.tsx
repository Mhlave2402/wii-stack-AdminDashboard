import React from 'react';
import { MoreVertical, Users, Clock, TrendingUp } from 'lucide-react';

interface Zone {
  id: string;
  name: string;
  status: string;
  activeDrivers: number;
  avgDeliveryTime: string;
  demandLevel: string;
  coverage: string;
  deliveries: {
    completed: number;
    inProgress: number;
    cancelled: number;
  };
}

interface ZoneListProps {
  zones: Zone[];
  onZoneSelect: (zoneId: string) => void;
}

export const ZoneList: React.FC<ZoneListProps> = ({ zones, onZoneSelect }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Zone Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Active Drivers
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Avg Delivery Time
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Coverage
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Deliveries
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {zones.map((zone) => (
            <tr 
              key={zone.id}
              onClick={() => onZoneSelect(zone.id)}
              className="hover:bg-gray-50 cursor-pointer"
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{zone.name}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  zone.status === 'active' ? 'bg-green-100 text-green-800' :
                  zone.status === 'high-demand' ? 'bg-orange-100 text-orange-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {zone.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center text-sm text-gray-900">
                  <Users className="h-4 w-4 mr-1 text-gray-500" />
                  {zone.activeDrivers}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center text-sm text-gray-900">
                  <Clock className="h-4 w-4 mr-1 text-gray-500" />
                  {zone.avgDeliveryTime}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{zone.coverage}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-green-600">{zone.deliveries.completed}</span>
                    <span className="text-blue-600">{zone.deliveries.inProgress}</span>
                    <span className="text-red-600">{zone.deliveries.cancelled}</span>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button className="text-gray-400 hover:text-gray-500">
                  <MoreVertical className="h-5 w-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};