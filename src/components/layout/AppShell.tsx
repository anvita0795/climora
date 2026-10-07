import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { TopHeader } from './TopHeader';
import { MOCK_NAVIGATION } from '../../data/mockData';
import type { NavItemId } from '../../types';

interface AppShellProps {
  children: React.ReactNode;
  activeTab?: NavItemId;
  onSelectTab?: (id: NavItemId) => void;
  locationName?: string;
  onSearch?: (query: string) => void;
}

export const AppShell: React.FC<AppShellProps> = ({
  children,
  activeTab: controlledActiveTab,
  onSelectTab: controlledOnSelectTab,
  locationName = 'Chennai, India',
  onSearch,
}) => {
  const [internalActiveTab, setInternalActiveTab] = useState<NavItemId>('home');

  const activeTab = controlledActiveTab ?? internalActiveTab;
  const handleSelectTab = (id: NavItemId) => {
    if (controlledOnSelectTab) {
      controlledOnSelectTab(id);
    } else {
      setInternalActiveTab(id);
    }
  };

  // Dedicated background image per page
  const getBackgroundImage = () => {
    switch (activeTab) {
      case 'data':
        return "url('/assets/data_bg.jpg')";
      case 'analysis':
        return "url('/assets/analysis_bg.jpg')";
      case 'prediction':
        return "url('/assets/prediction_bg.jpg')";
      case 'risk':
        return "url('/assets/risk_bg.jpg')";
      case 'explain':
        return "url('/assets/explain_bg.jpg')";
      case 'system':
        return "url('/assets/system_bg.jpg')";
      case 'home':
      default:
        return "url('/assets/home_bg.jpg')";
    }
  };

  return (
    <div className="relative h-screen w-full bg-[#061A24] text-white flex overflow-hidden select-none font-sans">
      {/* Background Image Layer */}
      <div
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat pointer-events-none transition-all duration-500 ease-in-out"
        style={{
          backgroundImage: getBackgroundImage(),
        }}
      />

      {/* Left Vertical Sidebar (Spec #5, #6: ~92px wide rail) */}
      <Sidebar
        navItems={MOCK_NAVIGATION}
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
      />

      {/* Main Content Area (Spec #5: 32-48px breathing space) */}
      <div className="relative z-10 flex-1 ml-[92px] flex flex-col h-screen overflow-hidden">
        {/* Top Header (Spec #12) */}
        <TopHeader locationName={locationName} onSearch={onSearch} />

        {/* Dynamic Page Content Area */}
        <main
          key={activeTab}
          className="flex-1 px-8 md:px-10 py-4 w-full flex flex-col justify-between overflow-y-auto transition-all duration-300 ease-in-out animate-fadeIn"
        >
          {children}
        </main>
      </div>
    </div>
  );
};
