import React from 'react';
import MainAppLayout from '@/components/layout/MainAppLayout';
import PageHeader from '@/components/Dashboard/PageHeader';
import FunnelChartCard from '@/components/Dashboard/FunnelChartCard';
import SourcesChartCard from '@/components/Dashboard/SourcesChartCard';
import LeadsTrackingChart from '@/components/Dashboard/LeadsTrackingChart';
import DataStatsGrid from '@/components/Dashboard/DataStatsGrid';

/**
 * DashboardPage component
 * 
 * This page assembles the main dashboard overview for leads.
 * It utilizes the MainAppLayout for the overall page structure (sidebar, header, main content area)
 * and arranges various specialized dashboard components within the main content area.
 * 
 * The layout of components within the main content area is as follows:
 * 1. PageHeader: Displays tabs (e.g., Sales, Leads) and a date range filter.
 * 2. A responsive grid row containing:
 *    - FunnelChartCard: Shows a funnel visualization of leads progression (takes up 3/5ths of the width on larger screens).
 *    - SourcesChartCard: Displays a pie chart of lead sources (takes up 2/5ths of the width on larger screens).
 * 3. LeadsTrackingChart: A line chart showing trends in leads closed vs. lost over time.
 * 4. DataStatsGrid: A grid displaying key statistics, such as reasons for lost leads and other miscellaneous data points.
 *
 * All data for these components is self-contained within the respective component files.
 * This page component is primarily responsible for layout and composition.
 */
const DashboardPage: React.FC = () => {
  return (
    <MainAppLayout>
      <PageHeader />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3">
          <FunnelChartCard />
        </div>
        <div className="lg:col-span-2">
          <SourcesChartCard />
        </div>
      </div>

      <LeadsTrackingChart />

      <DataStatsGrid />
    </MainAppLayout>
  );
};

export default DashboardPage;
