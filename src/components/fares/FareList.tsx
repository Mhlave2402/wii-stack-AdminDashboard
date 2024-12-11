import React from 'react';
import { MapPin, Clock, DollarSign } from 'lucide-react';
import { format } from 'date-fns';

interface Fare {
  id: string;
  name: string;
  type: 'fixed' | 'dynamic' | 'zone-based';
  basePrice: number;
  status: 'active' | 'inactive';
  conditions: {
    peakHours?: {
      multiplier: number;
      hours: string[];
    };
    minimumDistance?: number;
    specialDays?: {
      date: string;
      multiplier: number;
    }[];
  };
  zones: string[];
  lastUpdated: string;
  nextReview: string;
}

interface FareListProps {
  fares: Fare[];
  onEdit: (id: string) => void;
}

export const FareList: React.FC<FareListProps> = ({ fares, onEdit }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
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
              Fare Details
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Pricing
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Conditions
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Zones
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {fares.map((fare) => (
            <tr key={fare.id} className="hover:bg-gray-50">
              <td className="px-6 py-4">
                <div>
                  <p className="text-sm font-medium text-gray-900">{fare.name}</p>
                  <p className="text-sm text-gray-500 capitalize">{fare.type.replace('-', ' ')}</p>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-900">
                    ${fare.basePrice.toFixed(2)} base
                    {fare.conditions.peakHours && (
                      <span className="text-gray-500">
                        {' '}(up to ${(fare.basePrice * fare.conditions.peakHours.multiplier).toFixed(2)} peak)
                      </span>
                    )}
                  </span>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="space-y-1">
                  {fare.conditions.peakHours && (
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {fare.conditions.peakHours.multiplier}x during peak hours
                      </span>
                    </div>
                  )}
                  {fare.conditions.minimumDistance && (
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        Min. {fare.conditions.minimumDistance}km
                      </span>
                    </div>
                  )}
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex flex-wrap gap-1">
                  {fare.zones.map((zone) => (
                    <span
                      key={zone}
                      className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800"
                    >
                      {zone}
                    </span>
                  ))}
                </div>
              </td>
              <td className="px-6 py-4">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  getStatusColor(fare.status)
                }`}>
                  {fare.status}
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                <button
                  onClick={() => onEdit(fare.id)}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};