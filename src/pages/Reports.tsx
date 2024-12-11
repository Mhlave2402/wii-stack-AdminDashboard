import React, { useState } from 'react';
import { 
  Brain, TrendingUp, Target, AlertCircle, Search,
  Download, RefreshCw, Calendar
} from 'lucide-react';
import { ModelPerformance } from '../components/reports/ModelPerformance';
import { PredictionDistribution } from '../components/reports/PredictionDistribution';
import { FeatureImportance } from '../components/reports/FeatureImportance';

const performanceData = Array.from({ length: 30 }, (_, i) => ({
  date: `2024-03-${String(i + 1).padStart(2, '0')}`,
  accuracy: 85 + Math.random() * 10,
  precision: 82 + Math.random() * 10,
  recall: 80 + Math.random() * 10
}));

const distributionData = [
  { range: '0-10min', count: 450, accuracy: 92 },
  { range: '10-20min', count: 680, accuracy: 88 },
  { range: '20-30min', count: 420, accuracy: 85 },
  { range: '30-40min', count: 250, accuracy: 82 },
  { range: '40-50min', count: 150, accuracy: 78 },
  { range: '50-60min', count: 80, accuracy: 75 }
];

const featureImportanceData = [
  { name: 'Time of Day', importance: 85, change: 2.5 },
  { name: 'Distance', importance: 78, change: -1.2 },
  { name: 'Weather Conditions', importance: 72, change: 3.8 },
  { name: 'Traffic Density', importance: 68, change: 1.5 },
  { name: 'Vehicle Type', importance: 65, change: -0.8 }
];

export const Reports = () => {
  const [timeRange, setTimeRange] = useState('30d');
  const [modelVersion, setModelVersion] = useState('v1.2.3');

  const stats = [
    {
      title: 'Model Accuracy',
      value: '87.5%',
      change: '+2.3% from last version',
      icon: Target,
      trend: 'up'
    },
    {
      title: 'Predictions Made',
      value: '45.8K',
      change: '+12.5% from last month',
      icon: Brain,
      trend: 'up'
    },
    {
      title: 'Avg. Error Rate',
      value: '3.2%',
      change: '-0.5% from last month',
      icon: AlertCircle,
      trend: 'down'
    },
    {
      title: 'Performance Score',
      value: '92/100',
      change: '+4 points from last version',
      icon: TrendingUp,
      trend: 'up'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">ML Reports</h1>
        <div className="flex items-center gap-2">
          <select
            value={modelVersion}
            onChange={(e) => setModelVersion(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="v1.2.3">Model v1.2.3</option>
            <option value="v1.2.2">Model v1.2.2</option>
            <option value="v1.2.1">Model v1.2.1</option>
          </select>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
            <Download className="h-4 w-4" />
            Export Report
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
            <RefreshCw className="h-4 w-4" />
            Retrain Model
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.title} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-semibold mt-2">{stat.value}</p>
                <p className={`text-sm mt-2 ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                </p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <stat.icon className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Model Performance Trends</h3>
          <ModelPerformance data={performanceData} />
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Prediction Distribution</h3>
          <PredictionDistribution data={distributionData} />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Feature Importance Analysis</h3>
          <FeatureImportance features={featureImportanceData} />
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Model Details</h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-600">Current Version</p>
              <p className="text-lg font-semibold mt-1">{modelVersion}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Last Trained</p>
              <p className="text-lg font-semibold mt-1">March 15, 2024</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Training Dataset</p>
              <p className="text-lg font-semibold mt-1">125,890 samples</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Model Type</p>
              <p className="text-lg font-semibold mt-1">Gradient Boosting</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Hyperparameters</p>
              <div className="mt-2 space-y-1">
                <p className="text-sm text-gray-600">Learning Rate: 0.01</p>
                <p className="text-sm text-gray-600">Max Depth: 6</p>
                <p className="text-sm text-gray-600">N Estimators: 100</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};