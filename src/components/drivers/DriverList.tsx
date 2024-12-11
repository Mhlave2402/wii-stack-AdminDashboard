import React from 'react';
import { Mail, Phone, MapPin, Star, Car } from 'lucide-react';
import { format } from 'date-fns';

interface Driver {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  joinDate: string;
  completedTrips: number;
  rating: number;
  earnings: number;
  status: 'active' | 'inactive' | 'pending';
  vehicle: {
    model: string;
    plate: string;
    type: string;
  };
  avatar?: string;
  lastActive: string;
}

interface DriverListProps {
  drivers: Driver[];
  onSelect: (driverId: string) => void;
}

export const DriverList: React.FC<DriverListProps> = ({ drivers, onSelect }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
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
              Contact Info
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Vehicle
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Performance
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {drivers.map((driver) => (
            <tr 
              key={driver.id}
              className="hover:bg-gray-50 cursor-pointer"
              onClick={() => onSelect(driver.id)}
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    {driver.avatar ? (
                      <img
                        src={driver.avatar}
                        alt={driver.name}
                        className="h-10 w-10 rounded-full"
                      />
                    ) : (
                      <span className="text-blue-600 font-medium text-lg">
                        {driver.name.charAt(0)}
                      </span>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{driver.name}</p>
                    <p className="text-sm text-gray-500">{driver.id}</p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="h-4 w-4" />
                    {driver.email}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="h-4 w-4" />
                    {driver.phone}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4" />
                    {driver.address}
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm text-gray-900">
                    <Car className="h-4 w-4" />
                    {driver.vehicle.model}
                  </div>
                  <p className="text-sm text-gray-600">{driver.vehicle.plate}</p>
                  <p className="text-sm text-gray-600">{driver.vehicle.type}</p>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-400" />
                    <span className="text-sm font-medium text-gray-900">{driver.rating}</span>
                  </div>
                  <p className="text-sm text-gray-600">{driver.completedTrips} trips</p>
                  <p className="text-sm font-medium text-gray-900">
                    ${driver.earnings.toFixed(2)} earned
                  </p>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="space-y-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    getStatusColor(driver.status)
                  }`}>
                    {driver.status}
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
  );
};