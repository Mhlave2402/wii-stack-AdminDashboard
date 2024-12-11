import React from 'react';
import { MapPin } from 'lucide-react';

interface Coordinates {
  lat: number;
  lng: number;
}

interface Zone {
  id: string;
  name: string;
  status: string;
  coordinates: Coordinates;
  activeDrivers: number;
  demandLevel: string;
}

interface ZoneMapProps {
  zones: Zone[];
  selectedZone: string | null;
  onZoneSelect: (zoneId: string) => void;
}

export const ZoneMap: React.FC<ZoneMapProps> = ({ zones, selectedZone, onZoneSelect }) => {
  return (
    <div className="relative h-[600px] bg-gray-100">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <MapPin className="h-12 w-12 text-blue-500 mx-auto mb-4" />
          <p className="text-gray-600">Interactive map will be integrated here</p>
          <p className="text-sm text-gray-500 mt-2">Showing zone boundaries and real-time data</p>
        </div>
      </div>

      <div className="absolute top-4 right-4 w-80 bg-white rounded-lg shadow-lg border border-gray-200 p-4">
        <h3 className="font-medium text-gray-900 mb-2">Zone Information</h3>
        {selectedZone ? (
          <div className="space-y-2">
            {zones
              .filter(zone => zone.id === selectedZone)
              .map(zone => (
                <div key={zone.id}>
                  <p className="text-sm font-medium text-gray-900">{zone.name}</p>
                  <div className="mt-2 space-y-1">
                    <p className="text-sm text-gray-600">
                      Active Drivers: {zone.activeDrivers}
                    </p>
                    <p className="text-sm text-gray-600">
                      Demand Level: {zone.demandLevel}
                    </p>
                    <p className="text-sm text-gray-600">
                      Status: {zone.status}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">Select a zone to view details</p>
        )}
      </div>
    </div>
  );
};