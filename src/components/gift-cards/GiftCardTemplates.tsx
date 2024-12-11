import React from 'react';
import { X } from 'lucide-react';

interface GiftCardTemplatesProps {
  onClose: () => void;
  onSelect: (templateId: string) => void;
}

const templates = [
  {
    id: 'birthday',
    name: 'Birthday Celebration',
    description: 'Perfect for birthday gifts with a festive design',
    preview: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800&auto=format&fit=crop&q=60',
    icon: '🎂'
  },
  {
    id: 'corporate',
    name: 'Corporate Rewards',
    description: 'Professional design for business incentives',
    preview: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=60',
    icon: '🏢'
  },
  {
    id: 'holiday',
    name: 'Holiday Special',
    description: 'Festive design for holiday season gifting',
    preview: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=800&auto=format&fit=crop&q=60',
    icon: '🎄'
  },
  {
    id: 'thank-you',
    name: 'Thank You',
    description: 'Express gratitude with an elegant design',
    preview: 'https://images.unsplash.com/photo-1606293926075-69a00dbfde81?w=800&auto=format&fit=crop&q=60',
    icon: '🙏'
  }
];

export const GiftCardTemplates: React.FC<GiftCardTemplatesProps> = ({
  onClose,
  onSelect
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Gift Card Templates</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-2 gap-6">
            {templates.map((template) => (
              <div
                key={template.id}
                className="border border-gray-200 rounded-lg overflow-hidden hover:border-blue-500 cursor-pointer transition-colors"
                onClick={() => onSelect(template.id)}
              >
                <img
                  src={template.preview}
                  alt={template.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{template.icon}</span>
                    <h4 className="text-lg font-medium text-gray-900">
                      {template.name}
                    </h4>
                  </div>
                  <p className="text-sm text-gray-600">
                    {template.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
          <p className="text-sm text-gray-600">
            Select a template to start creating your gift card. You can customize colors and messages after selection.
          </p>
        </div>
      </div>
    </div>
  );
};