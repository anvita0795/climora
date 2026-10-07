import React from 'react';
import { Database, Check, X, Search, Sparkles } from 'lucide-react';
import { AVAILABLE_DATASETS, type ClimateDataset } from '../../data/datasetData';

interface BrowseDatasetsModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeDatasetId: string;
  onSelectDataset: (dataset: ClimateDataset) => void;
}

export const BrowseDatasetsModal: React.FC<BrowseDatasetsModalProps> = ({
  isOpen,
  onClose,
  activeDatasetId,
  onSelectDataset,
}) => {
  const [searchTerm, setSearchTerm] = React.useState('');

  if (!isOpen) return null;

  const filtered = AVAILABLE_DATASETS.filter(
    (ds) =>
      ds.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ds.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ds.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 animate-fadeIn">
      <div className="relative w-full max-w-2xl glass-panel p-6 border border-white/20 shadow-2xl rounded-2xl text-white max-h-[85vh] flex flex-col">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-[#00D4C3]/20 flex items-center justify-center text-[#00D4C3]">
            <Database className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Browse Climate Datasets</h3>
            <p className="text-xs text-gray-300">Select an active dataset to inspect and analyze</p>
          </div>
        </div>

        {/* Search input */}
        <div className="relative mb-4">
          <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search datasets by name, source, or keywords..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white/5 border border-white/15 rounded-xl text-xs text-white placeholder-gray-400 focus:outline-none focus:border-[#00D4C3]"
          />
        </div>

        {/* Dataset Cards List */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-1">
          {filtered.map((ds) => {
            const isActive = ds.id === activeDatasetId;
            return (
              <div
                key={ds.id}
                onClick={() => {
                  onSelectDataset(ds);
                  onClose();
                }}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start justify-between ${
                  isActive
                    ? 'bg-[#00D4C3]/10 border-[#00D4C3] shadow-[0_0_20px_rgba(0,212,195,0.2)]'
                    : 'bg-white/5 border-white/10 hover:border-white/30 hover:bg-white/10'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <img
                    src={ds.thumbnailUrl}
                    alt={ds.name}
                    className="w-14 h-14 rounded-lg object-cover border border-white/20 shadow-md shrink-0"
                  />
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="text-sm font-bold text-white">{ds.name}</h4>
                      {isActive && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#00D4C3] text-[#071722]">
                          Active
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-300 mt-0.5">{ds.description}</p>

                    <div className="flex items-center space-x-4 mt-2 text-[10px] text-gray-400">
                      <span>Source: <strong className="text-gray-200">{ds.source}</strong></span>
                      <span>Records: <strong className="text-gray-200">{ds.totalRecords}</strong></span>
                      <span>Format: <strong className="text-gray-200">{ds.format}</strong></span>
                      <span>Size: <strong className="text-gray-200">{ds.fileSize}</strong></span>
                    </div>
                  </div>
                </div>

                <div className="ml-3 shrink-0">
                  {isActive ? (
                    <div className="w-8 h-8 rounded-full bg-[#00D4C3] text-[#071722] flex items-center justify-center font-bold">
                      <Check className="w-5 h-5 stroke-[3]" />
                    </div>
                  ) : (
                    <button className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/10 hover:bg-[#00D4C3] hover:text-[#071722] transition-colors">
                      Select
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-4 pt-3 border-t border-white/10 flex justify-between items-center text-xs text-gray-400">
          <span className="flex items-center gap-1.5 text-[#00D4C3]">
            <Sparkles className="w-3.5 h-3.5" /> Synchronized with NASA & CMIP6 Data Lakes
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-white/10 text-white hover:bg-white/20 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
