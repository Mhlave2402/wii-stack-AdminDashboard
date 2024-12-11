import React, { useState } from 'react';
import { X, Plus, Minus } from 'lucide-react';

interface CreateFareModalProps {
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export const CreateFareModal: React.FC<CreateFareModalProps> = ({
  onClose,
  onSubmit
}) => {
  const [formData, setFormData] = useState({
    name: '',
    type: 'fixed',
    basePrice: '',
    zones: [] as string[],
    conditions: {
      hasPeakHours: false,
      peakMultiplier: '',
      minimumDistance: '',
      specialDays: [] as { date: string; multiplier: string }[]
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const addSpecialDay = () => {
    setFormData(prev => ({
      ...prev,
      conditions: {
        ...prev.conditions,
        specialDays: [
          ...prev.conditions.specialDays,
          { date: '', multiplier: '' }
        ]
      }
    }));
  };

  const removeSpecialDay = (index: number) => {
    setFormData(prev => ({
      ...prev,
      conditions: {
        ...prev.conditions,
        specialDays: prev.conditions.specialDays.filter((_, i) => i !== index)
      }
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Create New Fare</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fare Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter fare name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fare Type
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="fixed">Fixed Rate</option>
                <option value="dynamic">Dynamic Pricing</option>
                <option value="zone-based">Zone Based</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Base Price ($)
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.basePrice}
                onChange={(e) => setFormData({ ...formData, basePrice: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter base price"
                required
              />
            </div>

            <div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.conditions.hasPeakHours}
                  onChange={(e) => setFormData({
                    ...formData,
                    conditions: {
                      ...formData.conditions,
                      hasPeakHours: e.target.checked
                    }
                  })}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">Enable Peak Hours</span>
              </label>

              {formData.conditions.hasPeakHours && (
                <div className="mt-2">
                  <input
                    type="number"
                    step="0.1"
                    value={formData.conditions.peakMultiplier}
                    onChange={(e) => setFormData({
                      ...formData,
                      conditions: {
                        ...formData.conditions,
                        peakMultiplier: e.target.value
                      }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Peak hours multiplier (e.g., 1.5)"
                  />
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Minimum Distance (km)
              </label>
              <input
                type="number"
                step="0.1"
                value={formData.conditions.minimumDistance}
                onChange={(e) => setFormData({
                  ...formData,
                  conditions: {
                    ...formData.conditions,
                    minimumDistance: e.target.value
                  }
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter minimum distance"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Special Days
                </label>
                <button
                  type="button"
                  onClick={addSpecialDay}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              
              {formData.conditions.specialDays.map((day, index) => (
                <div key={index} className="flex items-center gap-2 mt-2">
                  <input
                    type="date"
                    value={day.date}
                    onChange={(e) => {
                      const newSpecialDays = [...formData.conditions.specialDays];
                      newSpecialDays[index].date = e.target.value;
                      setFormData({
                        ...formData,
                        conditions: {
                          ...formData.conditions,
                          specialDays: newSpecialDays
                        }
                      });
                    }}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="number"
                    step="0.1"
                    value={day.multiplier}
                    onChange={(e) => {
                      const newSpecialDays = [...formData.conditions.specialDays];
                      newSpecialDays[index].multiplier = e.target.value;
                      setFormData({
                        ...formData,
                        conditions: {
                          ...formData.conditions,
                          specialDays: newSpecialDays
                        }
                      });
                    }}
                    className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Multiplier"
                  />
                  <button
                    type="button"
                    onClick={() => removeSpecialDay(index)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
            >
              Create Fare
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};