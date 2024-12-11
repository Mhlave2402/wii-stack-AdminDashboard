import React from 'react';
import { Car, Calendar, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';

interface Vehicle {
  id: string;
  model: string;
  plate: string;
  status: 'active' | 'maintenance' | 'inactive';
  lastService: string;
  nextService: string;
  mileage: number;
  assignedDriver?: string;
}

interface FleetVehicleListProps {
  vehicles: Vehicle[];
  onAssignDriver: (vehicleId: string) => void;
  onScheduleMaintenance: (vehicleId: string) => void;
}

export const FleetVehicleList: React.FC<FleetVehicleListProps> = ({
  vehicles,
  onAssignDriver,
  onScheduleMaintenance
}) => {
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

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Vehicle Details
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Maintenance
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Driver
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {vehicles.map((vehicle) => (
            <tr key={vehicle.id} className="hover:bg-gray-50">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center">
                    <Car className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{vehicle.model}</p>
                    <p className="text-sm text-gray-500">{vehicle.plate}</p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(vehicle.status)}`}>
                  {vehicle.status}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4" />
                    Last: {format(new Date(vehicle.lastService), 'MMM d, yyyy')}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <AlertCircle className="h-4 w-4" />
                    Next: {format(new Date(vehicle.nextService), 'MMM d, yyyy')}
                  </div>
                  <p className="text-sm text-gray-600">
                    {vehicle.mileage.toLocaleString()} miles
                  </p>
                </div>
              </td>
              <td className="px-6 py-4">
                {vehicle.assignedDriver ? (
                  <span className="text-sm text-gray-900">{vehicle.assignedDriver}</span>
                ) : (
                  <span className="text-sm text-gray-500">Unassigned</span>
                )}
              </td>
              <td className="px-6 py-4">
                <div className="flex gap-2">
                  <button
                    onClick={() => onAssignDriver(vehicle.id)}
                    className="text-sm text-blue-600 hover:text-blue-700"
                  >
                    Assign Driver
                  </button>
                  <button
                    onClick={() => onScheduleMaintenance(vehicle.id)}
                    className="text-sm text-blue-600 hover:text-blue-700"
                  >
                    Schedule Maintenance
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