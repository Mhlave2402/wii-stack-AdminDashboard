import React, { useState } from 'react';
import { PersonalInfo } from '../../components/profile/PersonalInfo';
import { ActivityHistory } from '../../components/profile/ActivityHistory';
import { AccountPreferences } from '../../components/profile/AccountPreferences';
import { Save } from 'lucide-react';

export const Profile = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const [profile, setProfile] = useState({
    personal: {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1 234-567-8900',
      address: '123 Main St, New York, NY 10001',
      joinDate: '2023-06-15T10:00:00Z',
      role: 'admin',
      department: 'operations'
    },
    activities: [
      {
        id: '1',
        type: 'login',
        description: 'Logged in from new device',
        timestamp: '2024-03-15T14:30:00Z',
        location: 'New York, USA',
        device: 'Chrome on Windows'
      },
      {
        id: '2',
        type: 'settings',
        description: 'Updated profile information',
        timestamp: '2024-03-14T10:15:00Z'
      },
      {
        id: '3',
        type: 'security',
        description: 'Changed password',
        timestamp: '2024-03-13T16:45:00Z',
        location: 'New York, USA'
      }
    ],
    preferences: {
      language: 'en',
      theme: 'light' as const,
      emailNotifications: true,
      pushNotifications: true
    }
  });

  const handleUpdate = (section: string, key: string, value: any) => {
    setProfile(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
  };

  const handleSave = () => {
    // Implement profile save logic
    console.log('Saving profile:', profile);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">My Profile</h1>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Save className="h-4 w-4" />
          Save Changes
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('personal')}
              className={`px-6 py-3 text-sm font-medium border-b-2 ${
                activeTab === 'personal'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Personal Info
            </button>
            <button
              onClick={() => setActiveTab('activity')}
              className={`px-6 py-3 text-sm font-medium border-b-2 ${
                activeTab === 'activity'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Activity
            </button>
            <button
              onClick={() => setActiveTab('preferences')}
              className={`px-6 py-3 text-sm font-medium border-b-2 ${
                activeTab === 'preferences'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Preferences
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'personal' && (
            <PersonalInfo
              profile={profile.personal}
              onUpdate={(key, value) => handleUpdate('personal', key, value)}
            />
          )}
          {activeTab === 'activity' && (
            <ActivityHistory activities={profile.activities} />
          )}
          {activeTab === 'preferences' && (
            <AccountPreferences
              preferences={profile.preferences}
              onUpdate={(key, value) => handleUpdate('preferences', key, value)}
            />
          )}
        </div>
      </div>
    </div>
  );
};