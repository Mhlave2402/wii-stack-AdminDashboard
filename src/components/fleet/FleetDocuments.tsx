import React from 'react';
import { FileText, Download, Upload, AlertCircle } from 'lucide-react';

interface Document {
  id: string;
  name: string;
  type: 'insurance' | 'registration' | 'license' | 'permit';
  status: 'valid' | 'expiring_soon' | 'expired';
  expiryDate: string;
  uploadDate: string;
}

interface FleetDocumentsProps {
  documents: Document[];
  onUpload: (type: string) => void;
  onDownload: (documentId: string) => void;
}

export const FleetDocuments: React.FC<FleetDocumentsProps> = ({
  documents,
  onUpload,
  onDownload
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'valid':
        return 'bg-green-100 text-green-800';
      case 'expiring_soon':
        return 'bg-yellow-100 text-yellow-800';
      case 'expired':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Fleet Documents</h3>
        <button
          onClick={() => onUpload('new')}
          className="flex items-center gap-2 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          <Upload className="h-4 w-4" />
          Upload Document
        </button>
      </div>

      <div className="grid gap-4">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200"
          >
            <div className="flex items-center gap-4">
              <div className="p-2 bg-blue-50 rounded-lg">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                <p className="text-sm text-gray-500">Uploaded on {new Date(doc.uploadDate).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(doc.status)}`}>
                {doc.status.replace('_', ' ')}
              </span>
              <button
                onClick={() => onDownload(doc.id)}
                className="p-2 text-gray-400 hover:text-gray-500"
              >
                <Download className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {documents.some(doc => doc.status === 'expired' || doc.status === 'expiring_soon') && (
        <div className="flex items-center gap-3 p-4 bg-yellow-50 rounded-lg">
          <AlertCircle className="h-5 w-5 text-yellow-400" />
          <p className="text-sm text-yellow-700">
            Some of your documents need attention. Please review and update them.
          </p>
        </div>
      )}
    </div>
  );
};