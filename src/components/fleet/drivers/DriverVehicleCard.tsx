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
}

interface DriverVehicleCardProps {
  vehicle: Vehicle;
  onScheduleMaintenance: (vehicleId: string) => void;
}

export const DriverVehicleCard: React.FC<DriverVehicleCardProps> = ({
  vehicle,
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
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-sm font-medium text-gray-900">Assigned Vehicle</h3>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 bg-blue-50 rounded-lg flex items-center justify-center">
            <Car className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-900">{vehicle.model}</h4>
            <p className="text-sm text-gray-500">{vehicle.plate}</p>
          </div>
          <span className={`ml-auto inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(vehicle.status)}`}>
            {vehicle.status}
          </span>
        </div>

        <div className="mt-4 space-y-3">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-400" />
              <span className="text-gray-600">Last Service</span>
            </div>
            <span className="text-gray-900">
              {format(new Date(vehicle.lastService), 'MMM d, yyyy')}
            </span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-gray-400" />
              <span className="text-gray-600">Next Service</span>
            </div>
            <span className="text-gray-900">
              {format(new Date(vehicle.nextService), 'MMM d, yyyy')}
            </span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <Car className="h-4 w-4 text-gray-400" />
              <span className="text-gray-600">Mileage</span>
            </div>
            <span className="text-gray-900">{vehicle.mileage.toLocaleString()} km</span>
          </div>
        </div>

        <button
          onClick={() => onScheduleMaintenance(vehicle.id)}
          className="mt-4 w-full px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100"
        >
          Schedule Maintenance
        </button>
      </div>
    </div>
  );
};