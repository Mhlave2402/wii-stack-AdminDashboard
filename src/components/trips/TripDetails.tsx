import React from 'react';
import { 
  X, User, Star, Phone, MapPin, Package, 
  Clock, DollarSign, Truck 
} from 'lucide-react';

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

interface TripDetailsProps {
  trip: Trip;
  onClose: () => void;
}

export const TripDetails: React.FC<TripDetailsProps> = ({ trip, onClose }) => {
  return (
    <div className="h-full border-l border-gray-200">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <h3 className="font-medium text-gray-900">Trip Details</h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-500"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="p-4 space-y-6">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-900">{trip.id}</span>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              trip.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
              trip.status === 'completed' ? 'bg-green-100 text-green-800' :
              'bg-red-100 text-red-800'
            }`}>
              {trip.status.replace('_', ' ')}
            </span>
          </div>
          <div className="text-sm text-gray-500">
            Started {new Date(trip.startTime).toLocaleTimeString()}
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg space-y-3">
            <h4 className="text-sm font-medium text-gray-900">Driver</h4>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                <User className="h-6 w-6 text-gray-500" />
              </div>
              <div>
                <div className="text-sm font-medium text-gray-900">
                  {trip.driver.name}
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <Star className="h-4 w-4 text-yellow-400" />
                  {trip.driver.rating}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Phone className="h-4 w-4" />
              {trip.driver.phone}
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg space-y-3">
            <h4 className="text-sm font-medium text-gray-900">Customer</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <User className="h-4 w-4" />
                {trip.customer.name}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="h-4 w-4" />
                {trip.customer.address}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone className="h-4 w-4" />
                {trip.customer.phone}
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg space-y-3">
            <h4 className="text-sm font-medium text-gray-900">Package Details</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Package className="h-4 w-4" />
                  {trip.packageDetails.type}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Truck className="h-4 w-4" />
                  {trip.packageDetails.weight}
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="h-4 w-4" />
                  {trip.estimatedTime}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <DollarSign className="h-4 w-4" />
                  ${trip.price.toFixed(2)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {trip.status === 'in_progress' && (
          <div className="flex gap-2">
            <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Contact Driver
            </button>
            <button className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
              Cancel Trip
            </button>
          </div>
        )}
      </div>
    </div>
  );
};