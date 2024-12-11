import React from 'react';
import { Clock, LogIn, Settings, Shield } from 'lucide-react';
import { format } from 'date-fns';

interface Activity {
  id: string;
  type: 'login' | 'settings' | 'security';
  description: string;
  timestamp: string;
  location?: string;
  device?: string;
}

interface ActivityHistoryProps {
  activities: Activity[];
}

export const ActivityHistory: React.FC<ActivityHistoryProps> = ({ activities }) => {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'login':
        return <LogIn className="h-5 w-5 text-blue-600" />;
      case 'settings':
        return <Settings className="h-5 w-5 text-green-600" />;
      case 'security':
        return <Shield className="h-5 w-5 text-purple-600" />;
      default:
        return <Clock className="h-5 w-5 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900">Activity History</h3>
        <p className="mt-1 text-sm text-gray-500">
          Recent actions and login activity
        </p>
      </div>

      <div className="space-y-4">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg"
          >
            <div className="p-2 bg-white rounded-lg">
              {getActivityIcon(activity.type)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">
                {activity.description}
              </p>
              <div className="mt-1 flex items-center gap-4 text-sm text-gray-500">
                <span>{format(new Date(activity.timestamp), 'MMM d, h:mm a')}</span>
                {activity.location && (
                  <span className="flex items-center gap-1">
                    <span>•</span>
                    {activity.location}
                  </span>
                )}
                {activity.device && (
                  <span className="flex items-center gap-1">
                    <span>•</span>
                    {activity.device}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};