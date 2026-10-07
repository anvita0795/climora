import React from 'react';
import {
  Home,
  Database,
  BarChart3,
  GitBranch,
  Shield,
  HelpCircle,
  Settings,
  Waves
} from 'lucide-react';
import type { NavItem, NavItemId } from '../../types';

interface SidebarProps {
  navItems: NavItem[];
  activeTab: NavItemId;
  onSelectTab: (id: NavItemId) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  navItems,
  activeTab,
  onSelectTab,
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Home': return <Home className="w-5 h-5 stroke-[1.8]" />;
      case 'Database': return <Database className="w-5 h-5 stroke-[1.8]" />;
      case 'BarChart3': return <BarChart3 className="w-5 h-5 stroke-[1.8]" />;
      case 'GitBranch': return <GitBranch className="w-5 h-5 stroke-[1.8]" />;
      case 'Shield': return <Shield className="w-5 h-5 stroke-[1.8]" />;
      case 'HelpCircle': return <HelpCircle className="w-5 h-5 stroke-[1.8]" />;
      case 'Settings': return <Settings className="w-5 h-5 stroke-[1.8]" />;
      default: return <Home className="w-5 h-5 stroke-[1.8]" />;
    }
  };

  return (
    <aside className="w-[92px] h-screen fixed left-0 top-0 z-40 flex flex-col items-center py-6 spec-sidebar-glass text-white select-none">
      {/* Top Brand Mark Badge */}
      <div className="mb-8 cursor-pointer group">
        <div className="w-11 h-11 rounded-full bg-[#16E0D0] text-[#04131D] flex items-center justify-center shadow-[0_0_20px_rgba(22,224,208,0.5)] group-hover:scale-105 transition-transform duration-300">
          <Waves className="w-6 h-6 stroke-[2.5]" />
        </div>
      </div>

      {/* Vertical Navigation Stack (Order: Home, Data, Analysis, Prediction, Risk, Explain, System) */}
      <nav className="flex-1 flex flex-col gap-3.5 items-center w-full px-2.5">
        {navItems.map((item) => {
          const isActive = item.id === activeTab;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`flex flex-col items-center justify-center w-14 h-14 rounded-2xl transition-all duration-300 ease-in-out cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-b from-[#16E0D0] to-[#00A89A] text-[#04131D] font-bold shadow-[0_0_25px_rgba(22,224,208,0.45)]'
                  : 'text-[#A8BAC4] hover:text-white hover:bg-white/5'
              }`}
            >
              <div className={`transition-colors duration-300 ${isActive ? 'text-[#04131D]' : 'text-[#A8BAC4]'}`}>
                {getIcon(item.icon)}
              </div>
              <span className={`text-[10px] font-semibold mt-1 tracking-tight transition-colors duration-300 ${isActive ? 'text-[#04131D]' : 'text-[#A8BAC4]'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
};
