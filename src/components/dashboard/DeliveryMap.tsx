import React from 'react';
import { MapPin } from 'lucide-react';

export const DeliveryMap = () => {
  return (
    <div className="relative h-[400px] bg-gray-100 rounded-lg overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <MapPin className="h-12 w-12 text-blue-500 mx-auto mb-4" />
          <p className="text-gray-600">Live delivery map will be integrated here</p>
          <p className="text-sm text-gray-500 mt-2">Showing real-time delivery locations and routes</p>
        </div>
      </div>
    </div>
  );
};