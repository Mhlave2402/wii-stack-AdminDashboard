import React from 'react';
import { User, Star, MapPin, Clock } from 'lucide-react';
import { format } from 'date-fns';

interface Driver {
  id: string;
  name: string;
  phone: string;
  email: string;
  status: 'active' | 'inactive' | 'on_trip';
  rating: number;
  totalTrips: number;
  joinDate: string;
  lastActive: string;
  assignedVehicle?: string;
}

interface FleetDriverListProps {
  drivers: Driver[];
  onAssignVehicle: (driverId: string) => void;
  onViewPerformance: (driverId: string) => void;
}

export const FleetDriverList: React.FC<FleetDriverListProps> = ({
  drivers,
  onAssignVehicle,
  onViewPerformance
}) => {
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

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Driver
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Performance
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Vehicle
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {drivers.map((driver) => (
            <tr key={driver.id} className="hover:bg-gray-50">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center">
                    <User className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{driver.name}</p>
                    <p className="text-sm text-gray-500">{driver.email}</p>
                    <p className="text-sm text-gray-500">{driver.phone}</p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(driver.status)}`}>
                  {driver.status.replace('_', ' ')}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-400" />
                    <span className="text-sm font-medium text-gray-900">{driver.rating}</span>
                  </div>
                  <p className="text-sm text-gray-600">{driver.totalTrips} trips completed</p>
                  <p className="text-sm text-gray-500">
                    Joined {format(new Date(driver.joinDate), 'MMM d, yyyy')}
                  </p>
                </div>
              </td>
              <td className="px-6 py-4">
                {driver.assignedVehicle ? (
                  <span className="text-sm text-gray-900">{driver.assignedVehicle}</span>
                ) : (
                  <span className="text-sm text-gray-500">Unassigned</span>
                )}
              </td>
              <td className="px-6 py-4">
                <div className="flex gap-2">
                  <button
                    onClick={() => onAssignVehicle(driver.id)}
                    className="text-sm text-blue-600 hover:text-blue-700"
                  >
                    Assign Vehicle
                  </button>
                  <button
                    onClick={() => onViewPerformance(driver.id)}
                    className="text-sm text-blue-600 hover:text-blue-700"
                  >
                    View Performance
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};