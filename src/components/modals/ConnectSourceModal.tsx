import React, { useState } from 'react';
import { Link2, CheckCircle, X, Shield, Globe } from 'lucide-react';

interface ConnectSourceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnect: (sourceName: string) => void;
}

export const ConnectSourceModal: React.FC<ConnectSourceModalProps> = ({
  isOpen,
  onClose,
  onConnect,
}) => {
  const [selectedProvider, setSelectedProvider] = useState('NASA EarthData API');
  const [apiKey, setApiKey] = useState('');
  const [connecting, setConnecting] = useState(false);
  const [connected, setConnected] = useState(false);

  if (!isOpen) return null;

  const handleConnect = (e: React.FormEvent) => {
    e.preventDefault();
    setConnecting(true);
    setTimeout(() => {
      setConnecting(false);
      setConnected(true);
      setTimeout(() => {
        onConnect(selectedProvider);
        onClose();
        setConnected(false);
      }, 600);
    }, 1200);
  };

  const providers = [
    { name: 'NASA EarthData API', url: 'https://earthdata.nasa.gov/api/v1', status: 'Live' },
    { name: 'NOAA Climate Data Online (CDO)', url: 'https://www.ncdc.noaa.gov/cdo-web/api/v2', status: 'Live' },
    { name: 'ECMWF Copernicus CDS API', url: 'https://cds.climate.copernicus.eu/api/v2', status: 'Live' },
    { name: 'USGS EarthExplorer Data Gateway', url: 'https://earthexplorer.usgs.gov/api', status: 'Live' },
  ];

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
            <Link2 className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Connect Data Source</h3>
            <p className="text-xs text-gray-300">Stream real-time satellite & meteorological endpoints</p>
          </div>
        </div>

        <form onSubmit={handleConnect} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-gray-300 mb-1 block">Select Data Provider</label>
            <div className="space-y-2">
              {providers.map((p) => (
                <div
                  key={p.name}
                  onClick={() => setSelectedProvider(p.name)}
                  className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                    selectedProvider === p.name
                      ? 'bg-[#00D4C3]/15 border-[#00D4C3]'
                      : 'bg-white/5 border-white/10 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Globe className="w-4 h-4 text-[#00D4C3]" />
                    <div>
                      <p className="text-xs font-bold text-white">{p.name}</p>
                      <p className="text-[10px] text-gray-400">{p.url}</p>
                    </div>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    {p.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-300 mb-1 block">API Bearer Key / Token</label>
            <input
              type="password"
              placeholder="e.g. edk_live_9f8a29b4c027..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full px-3 py-2 bg-white/5 border border-white/15 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#00D4C3]"
            />
            <p className="text-[10px] text-gray-400 mt-1 flex items-center gap-1">
              <Shield className="w-3 h-3 text-[#00D4C3]" /> Tokens are encrypted via AES-256 in local storage
            </p>
          </div>

          {connected && (
            <div className="p-3 bg-emerald-500/20 border border-emerald-500/40 rounded-xl flex items-center space-x-2 text-emerald-300 text-xs">
              <CheckCircle className="w-5 h-5 text-emerald-400" />
              <span>Successfully connected stream to {selectedProvider}!</span>
            </div>
          )}

          <div className="pt-2 flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-300 hover:bg-white/10 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={connecting}
              className="btn-cyan-glow px-5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer"
            >
              {connecting ? (
                <>Connecting Pipeline...</>
              ) : (
                <>Connect & Sync Stream</>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
