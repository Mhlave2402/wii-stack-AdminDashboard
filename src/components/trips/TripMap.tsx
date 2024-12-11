import React from 'react';
import { MapPin } from 'lucide-react';

interface Trip {
  id: string;
  status: string;
  pickupLocation: string;
  dropoffLocation: string;
}

interface TripMapProps {
  trips: Trip[];
  selectedTripId: string | null;
  onTripSelect: (tripId: string) => void;
}

export const TripMap: React.FC<TripMapProps> = ({
  trips,
  selectedTripId,
  onTripSelect
}) => {
  return (
    <div className="relative h-[600px] bg-gray-100">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <MapPin className="h-12 w-12 text-blue-500 mx-auto mb-4" />
          <p className="text-gray-600">Interactive trip map will be integrated here</p>
          <p className="text-sm text-gray-500 mt-2">Showing real-time trip routes and status</p>
        </div>
      </div>

      <div className="absolute top-4 right-4 w-80 bg-white rounded-lg shadow-lg border border-gray-200 p-4">
        <h3 className="font-medium text-gray-900 mb-2">Active Trips</h3>
        <div className="space-y-2">
          {trips.map((trip) => (
            <button
              key={trip.id}
              onClick={() => onTripSelect(trip.id)}
              className={`w-full text-left p-2 rounded-lg text-sm ${
                selectedTripId === trip.id
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <div className="font-medium">{trip.id}</div>
              <div className="text-xs mt-1">
                From: {trip.pickupLocation}
              </div>
              <div className="text-xs">
                To: {trip.dropoffLocation}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};