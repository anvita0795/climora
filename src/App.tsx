import { useState } from 'react';
import { AppShell } from './components/layout/AppShell';
import { OverviewPage } from './pages/overview/OverviewPage';
import { DataPage } from './pages/data/DataPage';
import { AnalysisPage } from './pages/analysis/AnalysisPage';
import { PredictionPage } from './pages/prediction/PredictionPage';
import { RiskPage } from './pages/risk/RiskPage';
import { ExplainPage } from './pages/explain/ExplainPage';
import { SystemPage } from './pages/system/SystemPage';
import type { NavItemId } from './types';

export function App() {
  const [activeTab, setActiveTab] = useState<NavItemId>('home');
  const [activeLocation, setActiveLocation] = useState('Chennai, India');

  const handleSearch = (query: string) => {
    if (query.trim()) {
      setActiveLocation(query);
    }
  };

  const renderActivePage = () => {
    switch (activeTab) {
      case 'home':
        return <OverviewPage onNavigateTab={(id) => setActiveTab(id)} />;
      case 'data':
        return <DataPage />;
      case 'analysis':
        return <AnalysisPage />;
      case 'prediction':
        return <PredictionPage />;
      case 'risk':
        return <RiskPage />;
      case 'explain':
        return <ExplainPage />;
      case 'system':
        return <SystemPage />;
      default:
        return <OverviewPage onNavigateTab={(id) => setActiveTab(id)} />;
    }
  };

  return (
    <AppShell
      activeTab={activeTab}
      onSelectTab={(id) => setActiveTab(id)}
      locationName={activeLocation}
      onSearch={handleSearch}
    >
      {renderActivePage()}
    </AppShell>
  );
}

export default App;
