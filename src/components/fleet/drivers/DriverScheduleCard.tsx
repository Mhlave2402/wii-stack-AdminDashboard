import React from 'react';
import { Calendar, Clock } from 'lucide-react';
import { format } from 'date-fns';

interface Schedule {
  date: string;
  startTime: string;
  endTime: string;
  status: 'scheduled' | 'in-progress' | 'completed';
}

interface DriverScheduleCardProps {
  schedules: Schedule[];
}

export const DriverScheduleCard: React.FC<DriverScheduleCardProps> = ({ schedules }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-sm font-medium text-gray-900">Upcoming Schedule</h3>
      </div>
      <div className="divide-y divide-gray-200">
        {schedules.map((schedule, index) => (
          <div key={index} className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {format(new Date(schedule.date), 'EEEE, MMM d')}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {schedule.startTime} - {schedule.endTime}
                    </span>
                  </div>
                </div>
              </div>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(schedule.status)}`}>
                {schedule.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};