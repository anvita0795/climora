import React, { useState, useEffect } from 'react';
import { HeroSection } from '../../components/cards/HeroSection';
import { ClimateIntelligenceCard } from '../../components/cards/ClimateIntelligenceCard';
import { RiskCard } from '../../components/cards/RiskCard';
import { ForecastCard } from '../../components/cards/ForecastCard';
import { KpiCard } from '../../components/cards/KpiCard';
import { WatchDemoModal } from '../../components/modals/WatchDemoModal';
import { ClimoraApi } from '../../api/client';
import { LiveBadge, DemoBadge } from '../../components/ui/LiveBadge';
import {
  MOCK_CLIMATE_SUMMARY,
  MOCK_RISK_SUMMARY,
  MOCK_FORECAST_DAYS,
  MOCK_KPIS,
} from '../../data/mockData';
import type { NavItemId } from '../../types';

interface OverviewPageProps {
  onNavigateTab?: (tab: NavItemId) => void;
}

export const OverviewPage: React.FC<OverviewPageProps> = ({ onNavigateTab }) => {
  const [climateData, setClimateData] = useState(MOCK_CLIMATE_SUMMARY);
  const [riskData, setRiskData] = useState(MOCK_RISK_SUMMARY);
  const [forecastDays, setForecastDays] = useState(MOCK_FORECAST_DAYS);
  const [kpiData, setKpiData] = useState(MOCK_KPIS);
  const [isLive, setIsLive] = useState(false);
  const [isWatchDemoOpen, setIsWatchDemoOpen] = useState(false);

  useEffect(() => {
    let isMounted = true;
    ClimoraApi.getDashboardSummary()
      .then((res) => {
        if (!isMounted || !res) return;
        if (res.summary) setClimateData(res.summary);
        if (res.riskSummary) setRiskData(res.riskSummary);
        if (res.forecast) setForecastDays(res.forecast);
        if (res.kpiMetrics) setKpiData(res.kpiMetrics);
        if (res.provenance) setIsLive(true);
      })
      .catch((err) => {
        console.warn('Backend endpoint unavailable, using mock data:', err);
        setIsLive(false);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="h-full flex flex-col justify-between overflow-hidden gap-4">
      {/* Upper Main Section: Hero on Left, Cards Stacked Right Below Header */}
      <div className="grid grid-cols-12 gap-8 flex-1 items-start pt-1 overflow-hidden">
        {/* Left Hero Block (Col Span 7) */}
        <div className="col-span-7 flex flex-col justify-start space-y-5 pt-2 pr-2">
          <div className="flex items-center space-x-2">
            {isLive ? <LiveBadge label="LIVE — /dashboard/summary" /> : <DemoBadge label="DEMO — Sample" />}
          </div>
          <HeroSection
            onExploreData={() => onNavigateTab && onNavigateTab('data')}
            onWatchDemo={() => setIsWatchDemoOpen(true)}
          />
        </div>

        {/* Right Stacked Cards (Col Span 5) - Directly below Header */}
        <div className="col-span-5 flex flex-col justify-start space-y-3 w-full max-w-[480px] ml-auto">
          <ClimateIntelligenceCard data={climateData} />
          <RiskCard data={riskData} />
          <ForecastCard days={forecastDays} />
        </div>
      </div>

      {/* Bottom KPI 5-Card Strip */}
      <div className="grid grid-cols-5 gap-4 shrink-0 pb-1">
        {kpiData.map((kpi) => (
          <KpiCard key={kpi.id} metric={kpi} />
        ))}
      </div>

      {/* Watch Demo Video Modal */}
      <WatchDemoModal
        isOpen={isWatchDemoOpen}
        onClose={() => setIsWatchDemoOpen(false)}
      />
    </div>
  );
};
