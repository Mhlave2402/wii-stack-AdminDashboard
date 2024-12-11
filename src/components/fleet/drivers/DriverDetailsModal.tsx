import React from 'react';
import { X, Mail, Phone, MapPin, Calendar, Star, Car } from 'lucide-react';
import { format } from 'date-fns';
import { DriverPerformanceCard } from './DriverPerformanceCard';
import { DriverScheduleCard } from './DriverScheduleCard';
import { DriverVehicleCard } from './DriverVehicleCard';

interface Driver {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  joinDate: string;
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
  vehicle: {
    id: string;
    model: string;
    plate: string;
    status: 'active' | 'maintenance' | 'inactive';
    lastService: string;
    nextService: string;
    mileage: number;
  };
}

interface DriverDetailsModalProps {
  driver: Driver;
  onClose: () => void;
  onScheduleMaintenance: (vehicleId: string) => void;
}

export const DriverDetailsModal: React.FC<DriverDetailsModalProps> = ({
  driver,
  onClose,
  onScheduleMaintenance
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-xl font-medium text-blue-600">
                {driver.name.charAt(0)}
              </span>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">{driver.name}</h2>
              <p className="text-sm text-gray-500">Driver ID: {driver.id}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 grid grid-cols-3 gap-6">
          <div className="col-span-2 space-y-6">
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-sm font-medium text-gray-900">Driver Information</h3>
              </div>
              <div className="p-4 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{driver.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{driver.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{driver.address}</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        Joined {format(new Date(driver.joinDate), 'MMM d, yyyy')}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Car className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        License: {driver.license.number} ({driver.license.class})
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        License Expiry: {format(new Date(driver.license.expiry), 'MMM d, yyyy')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <DriverPerformanceCard performance={driver.performance} />
            <DriverScheduleCard schedules={driver.schedule} />
          </div>

          <div className="space-y-6">
            <DriverVehicleCard
              vehicle={driver.vehicle}
              onScheduleMaintenance={onScheduleMaintenance}
            />
          </div>
        </div>
      </div>
    </div>
  );
};