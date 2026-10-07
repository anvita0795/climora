import React, { useState } from 'react';
import { UploadCloud, FileText, CheckCircle2, X } from 'lucide-react';

interface UploadDatasetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadSuccess: (datasetName: string) => void;
}

export const UploadDatasetModal: React.FC<UploadDatasetModalProps> = ({
  isOpen,
  onClose,
  onUploadSuccess,
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [format, setFormat] = useState('CSV');
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  if (!isOpen) return null;

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const startUpload = () => {
    if (!selectedFile) return;
    setUploading(true);
    let current = 0;
    const interval = setInterval(() => {
      current += 20;
      setProgress(current);
      if (current >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setUploading(false);
          onUploadSuccess(selectedFile.name.replace(/\.[^/.]+$/, ""));
          onClose();
        }, 400);
      }
    }, 250);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 animate-fadeIn">
      <div className="relative w-full max-w-lg glass-panel p-6 border border-white/20 shadow-2xl rounded-2xl text-white">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-[#00D4C3]/20 flex items-center justify-center text-[#00D4C3]">
            <UploadCloud className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Upload Climate Dataset</h3>
            <p className="text-xs text-gray-300">Import CSV, NetCDF, or GeoJSON spatial datasets</p>
          </div>
        </div>

        {/* Drag & Drop Area */}
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-xl p-6 text-center transition-all ${
            dragActive
              ? 'border-[#00D4C3] bg-[#00D4C3]/10'
              : 'border-white/20 bg-white/5 hover:border-white/40'
          }`}
        >
          <UploadCloud className="w-10 h-10 mx-auto text-[#00D4C3] mb-2 animate-bounce" />
          <p className="text-sm font-medium text-white mb-1">
            Drag and drop your dataset here, or{' '}
            <label className="text-[#00D4C3] cursor-pointer hover:underline font-semibold">
              browse files
              <input
                type="file"
                className="hidden"
                accept=".csv,.nc,.netcdf,.geojson,.json,.parquet"
                onChange={handleFileChange}
              />
            </label>
          </p>
          <p className="text-xs text-gray-400">Supported formats: .csv, .nc, .geojson, .parquet (Max 500MB)</p>
        </div>

        {selectedFile && (
          <div className="mt-4 p-3 bg-white/10 rounded-xl flex items-center justify-between border border-white/15">
            <div className="flex items-center space-x-3">
              <FileText className="w-5 h-5 text-[#00D4C3]" />
              <div>
                <p className="text-xs font-semibold text-white">{selectedFile.name}</p>
                <p className="text-[10px] text-gray-400">{(selectedFile.size / (1024 * 1024)).toFixed(2)} MB</p>
              </div>
            </div>
            <CheckCircle2 className="w-5 h-5 text-[#00D4C3]" />
          </div>
        )}

        {/* Dataset Format Selector */}
        <div className="mt-4">
          <label className="text-xs font-semibold text-gray-300 mb-1 block">Dataset Format</label>
          <div className="grid grid-cols-3 gap-2">
            {['CSV', 'NetCDF4', 'GeoJSON'].map((fmt) => (
              <button
                key={fmt}
                type="button"
                onClick={() => setFormat(fmt)}
                className={`py-2 px-3 rounded-lg text-xs font-medium transition-all ${
                  format === fmt
                    ? 'bg-[#00D4C3] text-[#071722] font-bold shadow-[0_0_15px_rgba(0,212,195,0.4)]'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10'
                }`}
              >
                {fmt}
              </button>
            ))}
          </div>
        </div>

        {/* Uploading progress bar */}
        {uploading && (
          <div className="mt-4 space-y-1">
            <div className="flex justify-between text-xs text-gray-300">
              <span>Ingesting & indexing climate columns...</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#00D4C3] to-[#38BDF8] transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Modal Buttons */}
        <div className="mt-6 flex items-center justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-300 hover:bg-white/10 transition-colors"
          >
            Cancel
          </button>
          <button
            disabled={!selectedFile || uploading}
            onClick={startUpload}
            className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedFile && !uploading
                ? 'btn-cyan-glow cursor-pointer'
                : 'bg-gray-600/50 text-gray-400 cursor-not-allowed'
            }`}
          >
            {uploading ? 'Processing Dataset...' : 'Upload & Analyze'}
          </button>
        </div>
      </div>
    </div>
  );
};
