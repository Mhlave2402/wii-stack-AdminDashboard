import React from 'react';
import { Car, Users, Clock, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { format } from 'date-fns';

interface Fleet {
  id: string;
  ownerName: string;
  ownerId: string;
  status: 'pending' | 'approved' | 'rejected';
  vehicles: {
    total: number;
    active: number;
    maintenance: number;
  };
  drivers: {
    total: number;
    active: number;
  };
  createdAt: string;
  lastUpdated: string;
  approvedBy?: string;
  approvedAt?: string;
}

interface FleetListProps {
  fleets: Fleet[];
}

export const FleetList: React.FC<FleetListProps> = ({ fleets }) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'rejected':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Fleet Details
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Vehicles
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Drivers
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {fleets.map((fleet) => (
            <tr key={fleet.id} className="hover:bg-gray-50">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center">
                    <Car className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{fleet.ownerName}</p>
                    <p className="text-sm text-gray-500">{fleet.id}</p>
                    <p className="text-xs text-gray-400">
                      Created {format(new Date(fleet.createdAt), 'MMM d, yyyy')}
                    </p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Car className="h-4 w-4" />
                    <span>Total: {fleet.vehicles.total}</span>
                  </div>
                  <p className="text-sm text-gray-600">Active: {fleet.vehicles.active}</p>
                  <p className="text-sm text-gray-600">
                    Maintenance: {fleet.vehicles.maintenance}
                  </p>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="h-4 w-4" />
                    <span>Total: {fleet.drivers.total}</span>
                  </div>
                  <p className="text-sm text-gray-600">Active: {fleet.drivers.active}</p>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(fleet.status)}
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      getStatusColor(fleet.status)
                    }`}>
                      {fleet.status}
                    </span>
                  </div>
                  {fleet.approvedBy && (
                    <div className="text-xs text-gray-500">
                      Approved by {fleet.approvedBy}
                      <br />
                      {format(new Date(fleet.approvedAt!), 'MMM d, yyyy h:mm a')}
                    </div>
                  )}
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="space-y-2">
                  <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                    View Details
                  </button>
                  {fleet.status === 'pending' && (
                    <>
                      <button className="block text-sm text-green-600 hover:text-green-700 font-medium">
                        Approve
                      </button>
                      <button className="block text-sm text-red-600 hover:text-red-700 font-medium">
                        Reject
                      </button>
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};