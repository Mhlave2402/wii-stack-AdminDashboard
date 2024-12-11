import React from 'react';
import { Clock, MapPin, Package, User, Phone } from 'lucide-react';
import { format } from 'date-fns';

interface Trip {
  id: string;
  driver: {
    name: string;
    rating: number;
    phone: string;
  };
  customer: {
    name: string;
    address: string;
    phone: string;
  };
  status: string;
  pickupLocation: string;
  dropoffLocation: string;
  distance: string;
  estimatedTime: string;
  actualTime: string | null;
  price: number;
  startTime: string;
  packageDetails: {
    type: string;
    weight: string;
    dimensions: string;
  };
}

interface TripListProps {
  trips: Trip[];
  onTripSelect: (tripId: string) => void;
  selectedTripId: string | null;
}

export const TripList: React.FC<TripListProps> = ({ 
  trips, 
  onTripSelect,
  selectedTripId 
}) => {
  return (
    <div className="divide-y divide-gray-200">
      {trips.map((trip) => (
        <div
          key={trip.id}
          onClick={() => onTripSelect(trip.id)}
          className={`p-4 hover:bg-gray-50 cursor-pointer ${
            selectedTripId === trip.id ? 'bg-blue-50' : ''
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-900">
                {trip.id}
              </span>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                trip.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                trip.status === 'completed' ? 'bg-green-100 text-green-800' :
                'bg-red-100 text-red-800'
              }`}>
                {trip.status.replace('_', ' ')}
              </span>
            </div>
            <span className="text-sm font-medium text-gray-900">
              ${trip.price.toFixed(2)}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <User className="h-4 w-4" />
                <span>{trip.driver.name}</span>
                <span className="text-yellow-500">★</span>
                <span>{trip.driver.rating}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="h-4 w-4" />
                <span className="truncate">{trip.pickupLocation}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Package className="h-4 w-4" />
                <span>{trip.packageDetails.type}</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <User className="h-4 w-4" />
                <span>{trip.customer.name}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="h-4 w-4" />
                <span className="truncate">{trip.dropoffLocation}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="h-4 w-4" />
                <span>{trip.estimatedTime}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};