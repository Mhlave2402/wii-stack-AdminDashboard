import React from 'react';
import { Link } from 'react-router-dom';
import { 
  UserCircle, Settings, HelpCircle, LogOut, 
  Shield, Bell, Moon, Languages
} from 'lucide-react';

interface ProfileDropdownProps {
  user: {
    name: string;
    email: string;
    avatar?: string;
  };
  onClose: () => void;
}

export const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ user, onClose }) => {
  const menuItems = [
    {
      group: 'Account',
      items: [
        { icon: UserCircle, label: 'My Profile', path: '/profile' },
        { icon: Settings, label: 'Account Settings', path: '/profile/settings' },
        { icon: Shield, label: 'Security', path: '/profile/security' },
      ]
    },
    {
      group: 'Preferences',
      items: [
        { icon: Bell, label: 'Notifications', path: '/profile/notifications' },
        { icon: Languages, label: 'Language', path: '/profile/language' },
        { icon: Moon, label: 'Appearance', path: '/profile/appearance' },
      ]
    },
    {
      group: 'Support',
      items: [
        { icon: HelpCircle, label: 'Help & Support', path: '/support' },
      ]
    }
  ];

  const handleLogout = () => {
    // Implement logout logic
    console.log('Logging out...');
  };

  return (
    <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
      <div className="px-4 py-3 border-b border-gray-100">
        <div className="flex items-center gap-3">
          {user.avatar ? (
            <img 
              src={user.avatar} 
              alt={user.name} 
              className="w-10 h-10 rounded-full"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-blue-600 font-medium text-lg">
                {user.name.charAt(0)}
              </span>
            </div>
          )}
          <div>
            <p className="text-sm font-medium text-gray-900">{user.name}</p>
            <p className="text-xs text-gray-500">{user.email}</p>
          </div>
        </div>
      </div>

      <div className="py-2">
        {menuItems.map((group) => (
          <div key={group.group} className="px-2">
            <p className="px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
              {group.group}
            </p>
            {group.items.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                onClick={onClose}
                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </div>
        ))}
      </div>

      <div className="border-t border-gray-100 mt-2 pt-2 px-2">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-600 rounded-lg hover:bg-red-50 transition-colors"
        >
          <LogOut className="h-4 w-4" />
          Log out
        </button>
      </div>
    </div>
  );
};