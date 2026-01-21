import React, { useState, useMemo } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from 'recharts';

// Data from PEI 2025-2026 Fiscal Update and Capital Estimates
const expenditureData = [
  { name: 'Health PEI', budget: 1075.3, forecast: 1146.2, variance: 70.9, category: 'Healthcare', color: '#E63946' },
  { name: 'Public Schools Branch', budget: 322.2, forecast: 328.8, variance: 6.6, category: 'Education', color: '#457B9D' },
  { name: 'Transportation & Infrastructure', budget: 232.7, forecast: 223.5, variance: -9.3, category: 'Infrastructure', color: '#2A9D8F' },
  { name: 'Social Development & Seniors', budget: 217.7, forecast: 231.5, variance: 13.8, category: 'Social Services', color: '#E9C46A' },
  { name: 'Workforce & Advanced Learning', budget: 183.6, forecast: 179.3, variance: -4.3, category: 'Education', color: '#457B9D' },
  { name: 'Health and Wellness (Dept)', budget: 166.4, forecast: 170.4, variance: 4.1, category: 'Healthcare', color: '#E63946' },
  { name: 'Environment & Climate Action', budget: 119.3, forecast: 121.5, variance: 2.1, category: 'Environment', color: '#52B788' },
  { name: 'Education & Early Years', budget: 117.3, forecast: 117.3, variance: 0, category: 'Education', color: '#457B9D' },
  { name: 'Finance', budget: 94.2, forecast: 92.1, variance: -2.0, category: 'Administration', color: '#6C757D' },
  { name: 'Justice & Public Safety', budget: 92.7, forecast: 93.2, variance: 0.5, category: 'Public Safety', color: '#F4A261' },
  { name: 'Innovation PEI', budget: 72.2, forecast: 78.7, variance: 6.4, category: 'Economic Dev', color: '#9B5DE5' },
  { name: 'PEI Housing Corporation', budget: 76.2, forecast: 76.4, variance: 0.1, category: 'Housing', color: '#00BBF9' },
  { name: 'General Government', budget: 48.3, forecast: 61.9, variance: 13.5, category: 'Administration', color: '#6C757D' },
  { name: 'PEI Agricultural Insurance', budget: 60.9, forecast: 80.9, variance: 20.0, category: 'Agriculture', color: '#90BE6D' },
  { name: 'Housing, Land & Communities', budget: 58.9, forecast: 58.7, variance: -0.2, category: 'Housing', color: '#00BBF9' },
  { name: 'Tourism PEI', budget: 34.0, forecast: 34.4, variance: 0.5, category: 'Tourism', color: '#FF6B6B' },
  { name: 'Employee Benefits', budget: 34.4, forecast: 33.6, variance: -0.9, category: 'Administration', color: '#6C757D' },
  { name: 'La Commission scolaire', budget: 28.0, forecast: 29.0, variance: 1.0, category: 'Education', color: '#457B9D' },
  { name: 'Agriculture', budget: 24.0, forecast: 23.5, variance: -0.5, category: 'Agriculture', color: '#90BE6D' },
  { name: 'Fisheries, Tourism, Sport & Culture', budget: 21.5, forecast: 21.5, variance: 0, category: 'Tourism', color: '#FF6B6B' },
];

const revenueData = [
  { name: 'Taxes', budget: 1640.1, forecast: 1616.5, variance: -23.6 },
  { name: 'Government of Canada', budget: 1321.0, forecast: 1318.1, variance: -2.9 },
  { name: 'Fees and Services', budget: 118.5, forecast: 124.0, variance: 5.5 },
  { name: 'Licenses and Permits', budget: 49.6, forecast: 47.5, variance: -2.1 },
  { name: 'Other Revenue', budget: 46.7, forecast: 10.6, variance: -36.1 },
  { name: 'Investments/Sinking Fund', budget: 31.9, forecast: 34.4, variance: 2.6 },
  { name: 'Business Enterprises', budget: 58.3, forecast: 56.6, variance: -1.7 },
  { name: 'Consolidated Agencies', budget: 77.0, forecast: 76.8, variance: -0.2 },
];

const capitalData = [
  { name: 'Education & Early Years', amount: 115.8, category: 'Education' },
  { name: 'Health and Wellness', amount: 104.0, category: 'Healthcare' },
  { name: 'Health PEI', amount: 93.1, category: 'Healthcare' },
  { name: 'Transportation & Infrastructure', amount: 87.3, category: 'Infrastructure' },
  { name: 'PEI Housing Corporation', amount: 32.4, category: 'Housing' },
  { name: 'Finance (IT)', amount: 17.6, category: 'Technology' },
  { name: 'Justice & Public Safety', amount: 8.7, category: 'Public Safety' },
  { name: 'Fisheries, Tourism, Sport & Culture', amount: 6.9, category: 'Tourism' },
  { name: 'General Government', amount: 5.0, category: 'Administration' },
  { name: 'Agriculture', amount: 3.6, category: 'Agriculture' },
  { name: 'Social Development & Seniors', amount: 3.3, category: 'Social Services' },
  { name: 'Environment & Climate Action', amount: 2.9, category: 'Environment' },
];

const economicIndicators = [
  { label: 'Population (July 2025)', value: '182,657', change: '+1.6%', positive: true },
  { label: 'Real GDP Growth (2024)', value: '3.8%', change: 'Highest in Canada', positive: true },
  { label: 'Employment Growth (YTD)', value: '+1.0%', change: '~92,800 jobs', positive: true },
  { label: 'Housing Starts (Q3 2025)', value: '1,451', change: '+8.5%', positive: true },
  { label: 'Inflation (YTD)', value: '1.2%', change: 'Below target', positive: true },
  { label: 'Weekly Earnings', value: '$1,127', change: '+5.5%', positive: true },
];

const fiscalSummary = {
  totalRevenue: { budget: 3343.0, forecast: 3284.4 },
  totalExpenditure: { budget: 3527.0, forecast: 3651.8 },
  deficit: { budget: 184.0, forecast: 367.4 },
  netDebt: { budget: 3561.9, forecast: 3734.3 },
};

const gdpHistory = [
  { year: '2019', growth: 2.8 },
  { year: '2020', growth: -2.5 },
  { year: '2021', growth: 6.2 },
  { year: '2022', growth: 5.1 },
  { year: '2023', growth: 2.9 },
  { year: '2024', growth: 3.8 },
  { year: '2025f', growth: 2.4 },
];

const categoryColors = {
  'Healthcare': '#E63946',
  'Education': '#457B9D',
  'Infrastructure': '#2A9D8F',
  'Social Services': '#E9C46A',
  'Environment': '#52B788',
  'Administration': '#6C757D',
  'Public Safety': '#F4A261',
  'Economic Dev': '#9B5DE5',
  'Housing': '#00BBF9',
  'Agriculture': '#90BE6D',
  'Tourism': '#FF6B6B',
  'Technology': '#3D5A80',
};

// Demographics & Labour Data (from PEI Statistics Bureau)
const populationHistory = [
  { year: '2016', population: 148.6, growth: 1.5 },
  { year: '2017', population: 152.0, growth: 2.3 },
  { year: '2018', population: 156.9, growth: 3.2 },
  { year: '2019', population: 159.6, growth: 1.7 },
  { year: '2020', population: 159.2, growth: -0.3 },
  { year: '2021', population: 164.3, growth: 3.2 },
  { year: '2022', population: 172.1, growth: 4.7 },
  { year: '2023', population: 179.7, growth: 4.4 },
  { year: '2024', population: 182.7, growth: 1.6 },
  { year: '2025f', population: 183.9, growth: 0.7 },
];

const populationProjections = [
  { year: '2024', low: 178.6, medium: 178.6, high: 178.6 },
  { year: '2030', low: 188.0, medium: 199.0, high: 210.0 },
  { year: '2035', low: 192.0, medium: 210.0, high: 230.0 },
  { year: '2040', low: 195.0, medium: 220.0, high: 248.0 },
  { year: '2049', low: 200.4, medium: 225.7, high: 258.9 },
];

const ageDistribution = [
  { group: '0-14', current: 15.8, projected2030: 15.2, color: '#4CAF50' },
  { group: '15-24', current: 12.1, projected2030: 11.5, color: '#2196F3' },
  { group: '25-44', current: 24.8, projected2030: 26.2, color: '#9C27B0' },
  { group: '45-64', current: 26.7, projected2030: 23.8, color: '#FF9800' },
  { group: '65+', current: 20.6, projected2030: 23.3, color: '#F44336' },
];

const immigrationData = [
  { year: '2020', international: 1245, interprovincial: 892 },
  { year: '2021', international: 2156, interprovincial: 1543 },
  { year: '2022', international: 3206, interprovincial: 1234 },
  { year: '2023', international: 4149, interprovincial: 456 },
  { year: '2024', international: 2843, interprovincial: 82 },
];

const employmentBySector = [
  { sector: 'Healthcare & Social', employment: 15.2, change: 4.6 },
  { sector: 'Retail Trade', employment: 11.8, change: -0.5 },
  { sector: 'Construction', employment: 9.7, change: 15.6 },
  { sector: 'Accommodation & Food', employment: 8.4, change: 5.3 },
  { sector: 'Manufacturing', employment: 7.7, change: -3.8 },
  { sector: 'Public Administration', employment: 7.5, change: 0.0 },
  { sector: 'Education', employment: 6.8, change: 4.5 },
  { sector: 'Agriculture', employment: 4.2, change: -4.9 },
];

// Trade & Export Data
const exportData = [
  { year: '2019', total: 1.71, usShare: 78.2 },
  { year: '2020', total: 1.64, usShare: 76.5 },
  { year: '2021', total: 1.69, usShare: 75.8 },
  { year: '2022', total: 1.98, usShare: 75.3 },
  { year: '2023', total: 2.32, usShare: 74.8 },
  { year: '2024', total: 2.50, usShare: 73.8 },
];

const exportsByProduct = [
  { product: 'Frozen Food Products', value: 774.1, share: 30.7, change: 11.1 },
  { product: 'Seafood Products', value: 350.3, share: 13.9, change: 6.5 },
  { product: 'Vegetables & Melons', value: 191.0, share: 7.6, change: -17.6 },
  { product: 'Pharmaceuticals', value: 163.2, share: 6.5, change: -4.5 },
  { product: 'Aerospace Products', value: 142.0, share: 5.6, change: 8.2 },
  { product: 'Other', value: 879.4, share: 35.7, change: 5.8 },
];

const exportDestinations = [
  { destination: 'United States', share: 73.8, value: 1845 },
  { destination: 'European Union', share: 8.2, value: 205 },
  { destination: 'China', share: 4.1, value: 103 },
  { destination: 'Japan', share: 2.8, value: 70 },
  { destination: 'Other', share: 11.1, value: 277 },
];

// Federal Transfer Data
const federalTransfers = [
  { year: '2020-21', equalization: 484.5, healthTransfer: 189.2, socialTransfer: 61.2, infrastructure: 89.3, other: 156.8 },
  { year: '2021-22', equalization: 505.2, healthTransfer: 199.8, socialTransfer: 65.4, infrastructure: 112.4, other: 178.2 },
  { year: '2022-23', equalization: 533.8, healthTransfer: 211.5, socialTransfer: 68.9, infrastructure: 98.7, other: 145.6 },
  { year: '2023-24', equalization: 561.2, healthTransfer: 222.9, socialTransfer: 71.2, infrastructure: 126.6, other: 132.8 },
  { year: '2024-25', equalization: 609.5, healthTransfer: 227.8, socialTransfer: 74.0, infrastructure: 112.9, other: 152.3 },
  { year: '2025-26f', equalization: 640.0, healthTransfer: 235.0, socialTransfer: 76.5, infrastructure: 95.0, other: 145.0 },
];

const federalDependency = [
  { province: 'PEI', share: 40.1 },
  { province: 'NB', share: 36.8 },
  { province: 'NS', share: 34.2 },
  { province: 'MB', share: 32.5 },
  { province: 'NL', share: 28.9 },
  { province: 'QC', share: 25.4 },
  { province: 'SK', share: 18.2 },
  { province: 'ON', share: 16.8 },
  { province: 'BC', share: 15.2 },
  { province: 'AB', share: 11.5 },
];

// Debt Sustainability Data
const debtHistory = [
  { year: '2019-20', netDebt: 2198, debtToGDP: 27.8, interestCosts: 98.5 },
  { year: '2020-21', netDebt: 2299, debtToGDP: 29.2, interestCosts: 95.2 },
  { year: '2021-22', netDebt: 2309, debtToGDP: 26.1, interestCosts: 92.8 },
  { year: '2022-23', netDebt: 2453, debtToGDP: 25.7, interestCosts: 104.5 },
  { year: '2023-24', netDebt: 2758, debtToGDP: 27.2, interestCosts: 132.8 },
  { year: '2024-25f', netDebt: 3028, debtToGDP: 29.9, interestCosts: 158.4 },
  { year: '2025-26f', netDebt: 3734, debtToGDP: 32.9, interestCosts: 171.2 },
  { year: '2026-27f', netDebt: 4150, debtToGDP: 34.5, interestCosts: 185.0 },
  { year: '2027-28f', netDebt: 4520, debtToGDP: 35.9, interestCosts: 198.0 },
];

const provincialDebtComparison = [
  { province: 'NL', debtToGDP: 43.2 },
  { province: 'QC', debtToGDP: 38.5 },
  { province: 'MB', debtToGDP: 36.8 },
  { province: 'PEI (2027-28f)', debtToGDP: 35.9 },
  { province: 'NB', debtToGDP: 34.2 },
  { province: 'ON', debtToGDP: 33.8 },
  { province: 'NS', debtToGDP: 32.1 },
  { province: 'PEI (Current)', debtToGDP: 29.9 },
  { province: 'SK', debtToGDP: 22.5 },
  { province: 'BC', debtToGDP: 18.2 },
  { province: 'AB', debtToGDP: 11.8 },
];

const formatMoney = (value) => `$${value.toFixed(1)}M`;

export default function PEIBudgetTracker() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [hstReduction, setHstReduction] = useState(0);

  // HST Calculator - PEI's provincial portion is 10% (HST total 15% = 5% federal + 10% provincial)
  // Based on ~$475M in sales tax revenue (2025-26 forecast), each 1% = ~$47.5M
  const hstImpact = useMemo(() => {
    const revenuePerPoint = 47.5; // $47.5M per 1% HST
    const revenueLoss = hstReduction * revenuePerPoint;
    const newDeficit = fiscalSummary.deficit.forecast + revenueLoss;
    const newNetDebt = fiscalSummary.netDebt.forecast + revenueLoss;
    
    // Economic stimulus estimates (conservative multiplier of 0.5-0.7 for consumption taxes)
    const consumerSavings = revenueLoss; // Direct savings to consumers
    const estimatedGDPBoost = revenueLoss * 0.6; // Multiplier effect
    const retailBoost = (revenueLoss / fiscalSummary.totalRevenue.forecast) * 100 * 1.5; // Retail uplift estimate
    
    return {
      revenueLoss,
      newDeficit,
      newNetDebt,
      consumerSavings,
      estimatedGDPBoost,
      retailBoost,
      currentRate: 15,
      newRate: 15 - hstReduction,
      provincialPortion: 10 - hstReduction,
    };
  }, [hstReduction]);

  const categoryTotals = useMemo(() => {
    const totals = {};
    expenditureData.forEach(item => {
      if (!totals[item.category]) {
        totals[item.category] = { budget: 0, forecast: 0, color: categoryColors[item.category] };
      }
      totals[item.category].budget += item.budget;
      totals[item.category].forecast += item.forecast;
    });
    return Object.entries(totals).map(([name, data]) => ({
      name,
      budget: data.budget,
      forecast: data.forecast,
      color: data.color,
    })).sort((a, b) => b.forecast - a.forecast);
  }, []);

  const filteredExpenditure = selectedCategory 
    ? expenditureData.filter(item => item.category === selectedCategory)
    : expenditureData;

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          background: 'rgba(20, 30, 40, 0.95)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '8px',
          padding: '12px 16px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
        }}>
          <p style={{ color: '#fff', fontWeight: 600, marginBottom: '4px' }}>{label || payload[0].name}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color, fontSize: '14px', margin: '2px 0' }}>
              {entry.name}: {typeof entry.value === 'number' ? formatMoney(entry.value) : entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0D1B2A 0%, #1B263B 50%, #0D1B2A 100%)',
      fontFamily: "'Source Sans 3', 'Segoe UI', sans-serif",
      color: '#E0E6ED',
      padding: '0',
    }}>
      {/* Header */}
      <header style={{
        background: 'linear-gradient(90deg, rgba(46, 125, 50, 0.9) 0%, rgba(27, 94, 32, 0.9) 100%)',
        padding: '24px 32px',
        borderBottom: '3px solid #4CAF50',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.05\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          opacity: 0.5,
        }} />
        <div style={{ position: 'relative', maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '8px' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
            }}>🌲</div>
            <div>
              <h1 style={{
                fontSize: '28px',
                fontWeight: 700,
                margin: 0,
                color: '#fff',
                textShadow: '0 2px 4px rgba(0,0,0,0.2)',
              }}>Prince Edward Island Budget Tracker</h1>
              <p style={{
                fontSize: '14px',
                margin: '4px 0 0 0',
                color: 'rgba(255,255,255,0.85)',
              }}>Fiscal Year 2025-2026 • Updated December 2025</p>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav style={{
        background: 'rgba(0,0,0,0.3)',
        padding: '0 32px',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', gap: '4px' }}>
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'spending', label: 'Spending' },
            { id: 'revenue', label: 'Revenue' },
            { id: 'capital', label: 'Capital' },
            { id: 'economy', label: 'Economy' },
            { id: 'demographics', label: 'Demographics' },
            { id: 'trade', label: 'Trade' },
            { id: 'transfers', label: 'Fed. Transfers' },
            { id: 'debt', label: 'Debt' },
            { id: 'taxpolicy', label: 'Tax Policy' },
            { id: 'analysts', label: 'Analysts' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '16px 24px',
                background: activeTab === tab.id ? 'rgba(76, 175, 80, 0.2)' : 'transparent',
                border: 'none',
                borderBottom: activeTab === tab.id ? '3px solid #4CAF50' : '3px solid transparent',
                color: activeTab === tab.id ? '#4CAF50' : 'rgba(255,255,255,0.7)',
                fontSize: '15px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main style={{ maxWidth: '1400px', margin: '0 auto', padding: '32px' }}>
        
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div style={{ animation: 'fadeIn 0.4s ease' }}>
            {/* Fiscal Alert */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(230, 57, 70, 0.15) 0%, rgba(230, 57, 70, 0.05) 100%)',
              border: '1px solid rgba(230, 57, 70, 0.3)',
              borderRadius: '12px',
              padding: '20px 24px',
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'rgba(230, 57, 70, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
              }}>⚠️</div>
              <div>
                <h3 style={{ margin: 0, fontSize: '16px', color: '#E63946' }}>Fiscal Update Alert</h3>
                <p style={{ margin: '4px 0 0 0', fontSize: '14px', color: 'rgba(255,255,255,0.8)' }}>
                  The projected deficit has increased by <strong>$183.4M</strong> since the April 2025 budget, 
                  now forecasting <strong>$367.4M</strong> for FY2025-2026.
                </p>
              </div>
            </div>

            {/* Key Metrics */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '20px',
              marginBottom: '32px',
            }}>
              {[
                { label: 'Total Revenue', value: fiscalSummary.totalRevenue.forecast, budget: fiscalSummary.totalRevenue.budget, icon: '💰', color: '#4CAF50' },
                { label: 'Total Expenditure', value: fiscalSummary.totalExpenditure.forecast, budget: fiscalSummary.totalExpenditure.budget, icon: '📊', color: '#E63946' },
                { label: 'Projected Deficit', value: fiscalSummary.deficit.forecast, budget: fiscalSummary.deficit.budget, icon: '📉', color: '#F4A261' },
                { label: 'Net Debt (EOY)', value: fiscalSummary.netDebt.forecast, budget: fiscalSummary.netDebt.budget, icon: '🏦', color: '#457B9D' },
              ].map((metric, i) => (
                <div key={i} style={{
                  background: 'linear-gradient(145deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)',
                  borderRadius: '16px',
                  padding: '24px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  position: 'relative',
                  overflow: 'hidden',
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '-20px',
                    right: '-20px',
                    fontSize: '80px',
                    opacity: 0.05,
                  }}>{metric.icon}</div>
                  <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', marginBottom: '8px' }}>
                    {metric.label}
                  </div>
                  <div style={{ fontSize: '32px', fontWeight: 700, color: metric.color }}>
                    ${(metric.value / 1000).toFixed(2)}B
                  </div>
                  <div style={{
                    fontSize: '13px',
                    color: metric.value > metric.budget ? '#E63946' : '#4CAF50',
                    marginTop: '8px',
                  }}>
                    {metric.value > metric.budget ? '▲' : '▼'} {formatMoney(Math.abs(metric.value - metric.budget))} vs budget
                  </div>
                </div>
              ))}
            </div>

            {/* Charts Row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
              {/* Spending by Category */}
              <div style={{
                background: 'rgba(255,255,255,0.05)',
                borderRadius: '16px',
                padding: '24px',
                border: '1px solid rgba(255,255,255,0.1)',
              }}>
                <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: 600 }}>
                  Spending by Category
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categoryTotals}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={2}
                      dataKey="forecast"
                    >
                      {categoryTotals.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '8px',
                  marginTop: '16px',
                  justifyContent: 'center',
                }}>
                  {categoryTotals.slice(0, 6).map((cat, i) => (
                    <div key={i} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '12px',
                    }}>
                      <div style={{
                        width: '10px',
                        height: '10px',
                        borderRadius: '2px',
                        background: cat.color,
                      }} />
                      <span style={{ color: 'rgba(255,255,255,0.7)' }}>{cat.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* GDP Growth */}
              <div style={{
                background: 'rgba(255,255,255,0.05)',
                borderRadius: '16px',
                padding: '24px',
                border: '1px solid rgba(255,255,255,0.1)',
              }}>
                <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: 600 }}>
                  Real GDP Growth
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={gdpHistory}>
                    <XAxis dataKey="year" stroke="rgba(255,255,255,0.5)" fontSize={12} />
                    <YAxis stroke="rgba(255,255,255,0.5)" fontSize={12} tickFormatter={v => `${v}%`} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="growth" radius={[4, 4, 0, 0]}>
                      {gdpHistory.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={entry.growth >= 0 ? '#4CAF50' : '#E63946'} 
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Economic Indicators */}
            <div style={{
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '16px',
              padding: '24px',
              border: '1px solid rgba(255,255,255,0.1)',
            }}>
              <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: 600 }}>
                Key Economic Indicators
              </h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(6, 1fr)',
                gap: '16px',
              }}>
                {economicIndicators.map((ind, i) => (
                  <div key={i} style={{
                    textAlign: 'center',
                    padding: '16px',
                    background: 'rgba(0,0,0,0.2)',
                    borderRadius: '12px',
                  }}>
                    <div style={{ fontSize: '24px', fontWeight: 700, color: '#fff' }}>
                      {ind.value}
                    </div>
                    <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', marginTop: '4px' }}>
                      {ind.label}
                    </div>
                    <div style={{
                      fontSize: '12px',
                      color: ind.positive ? '#4CAF50' : '#E63946',
                      marginTop: '8px',
                    }}>
                      {ind.change}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Spending Tab */}
        {activeTab === 'spending' && (
          <div style={{ animation: 'fadeIn 0.4s ease' }}>
            {/* Category Filter */}
            <div style={{
              display: 'flex',
              gap: '8px',
              marginBottom: '24px',
              flexWrap: 'wrap',
            }}>
              <button
                onClick={() => setSelectedCategory(null)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '20px',
                  border: 'none',
                  background: !selectedCategory ? '#4CAF50' : 'rgba(255,255,255,0.1)',
                  color: '#fff',
                  fontSize: '13px',
                  fontWeight: 500,
                  cursor: 'pointer',
                }}
              >
                All Categories
              </button>
              {Object.keys(categoryColors).map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '20px',
                    border: 'none',
                    background: selectedCategory === cat ? categoryColors[cat] : 'rgba(255,255,255,0.1)',
                    color: '#fff',
                    fontSize: '13px',
                    fontWeight: 500,
                    cursor: 'pointer',
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Spending Comparison Chart */}
            <div style={{
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '16px',
              padding: '24px',
              border: '1px solid rgba(255,255,255,0.1)',
              marginBottom: '24px',
            }}>
              <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: 600 }}>
                Budget vs Forecast by Department
              </h3>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={filteredExpenditure.slice(0, 10)} layout="vertical">
                  <XAxis type="number" stroke="rgba(255,255,255,0.5)" fontSize={12} tickFormatter={v => `$${v}M`} />
                  <YAxis type="category" dataKey="name" stroke="rgba(255,255,255,0.5)" fontSize={11} width={180} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar dataKey="budget" fill="#457B9D" name="Budget" radius={[0, 4, 4, 0]} />
                  <Bar dataKey="forecast" fill="#E63946" name="Forecast" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Detailed Table */}
            <div style={{
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '16px',
              padding: '24px',
              border: '1px solid rgba(255,255,255,0.1)',
            }}>
              <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: 600 }}>
                Detailed Expenditure Breakdown
              </h3>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid rgba(255,255,255,0.1)' }}>
                      <th style={{ textAlign: 'left', padding: '12px', fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>Department</th>
                      <th style={{ textAlign: 'left', padding: '12px', fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>Category</th>
                      <th style={{ textAlign: 'right', padding: '12px', fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>Budget</th>
                      <th style={{ textAlign: 'right', padding: '12px', fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>Forecast</th>
                      <th style={{ textAlign: 'right', padding: '12px', fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>Variance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredExpenditure.map((item, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <td style={{ padding: '12px', fontSize: '14px' }}>{item.name}</td>
                        <td style={{ padding: '12px' }}>
                          <span style={{
                            padding: '4px 10px',
                            borderRadius: '12px',
                            background: `${categoryColors[item.category]}20`,
                            color: categoryColors[item.category],
                            fontSize: '12px',
                          }}>
                            {item.category}
                          </span>
                        </td>
                        <td style={{ textAlign: 'right', padding: '12px', fontSize: '14px' }}>{formatMoney(item.budget)}</td>
                        <td style={{ textAlign: 'right', padding: '12px', fontSize: '14px' }}>{formatMoney(item.forecast)}</td>
                        <td style={{
                          textAlign: 'right',
                          padding: '12px',
                          fontSize: '14px',
                          color: item.variance > 0 ? '#E63946' : item.variance < 0 ? '#4CAF50' : 'inherit',
                        }}>
                          {item.variance > 0 ? '+' : ''}{formatMoney(item.variance)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Revenue Tab */}
        {activeTab === 'revenue' && (
          <div style={{ animation: 'fadeIn 0.4s ease' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
              {/* Revenue Chart */}
              <div style={{
                background: 'rgba(255,255,255,0.05)',
                borderRadius: '16px',
                padding: '24px',
                border: '1px solid rgba(255,255,255,0.1)',
              }}>
                <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: 600 }}>
                  Revenue Sources
                </h3>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={revenueData} layout="vertical">
                    <XAxis type="number" stroke="rgba(255,255,255,0.5)" fontSize={12} tickFormatter={v => `$${v}M`} />
                    <YAxis type="category" dataKey="name" stroke="rgba(255,255,255,0.5)" fontSize={11} width={150} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="forecast" fill="#4CAF50" radius={[0, 4, 4, 0]} name="Forecast" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Revenue Summary */}
              <div style={{
                background: 'rgba(255,255,255,0.05)',
                borderRadius: '16px',
                padding: '24px',
                border: '1px solid rgba(255,255,255,0.1)',
              }}>
                <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: 600 }}>
                  Revenue Highlights
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{
                    padding: '20px',
                    background: 'rgba(230, 57, 70, 0.1)',
                    borderRadius: '12px',
                    borderLeft: '4px solid #E63946',
                  }}>
                    <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)' }}>Revenue Shortfall</div>
                    <div style={{ fontSize: '28px', fontWeight: 700, color: '#E63946' }}>-$58.6M</div>
                    <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', marginTop: '8px' }}>
                      vs April 2025 Budget
                    </div>
                  </div>
                  
                  <div style={{ fontSize: '14px', lineHeight: '1.6' }}>
                    <p><strong>Key factors:</strong></p>
                    <ul style={{ margin: '8px 0', paddingLeft: '20px', color: 'rgba(255,255,255,0.8)' }}>
                      <li>Sales tax down $31.1M due to slower growth</li>
                      <li>Tobacco litigation payment ($36.4M) recorded in FY2024-25</li>
                      <li>Consumption taxes (tobacco, liquor, vape) down $3.7M</li>
                      <li>Property tax up $5.1M from new construction</li>
                      <li>Insurance premium tax up $4.3M</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Revenue Table */}
            <div style={{
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '16px',
              padding: '24px',
              border: '1px solid rgba(255,255,255,0.1)',
            }}>
              <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: 600 }}>
                Revenue by Source
              </h3>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid rgba(255,255,255,0.1)' }}>
                    <th style={{ textAlign: 'left', padding: '12px', fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>Source</th>
                    <th style={{ textAlign: 'right', padding: '12px', fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>Budget</th>
                    <th style={{ textAlign: 'right', padding: '12px', fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>Forecast</th>
                    <th style={{ textAlign: 'right', padding: '12px', fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>Variance</th>
                    <th style={{ textAlign: 'right', padding: '12px', fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>% of Total</th>
                  </tr>
                </thead>
                <tbody>
                  {revenueData.map((item, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <td style={{ padding: '12px', fontSize: '14px' }}>{item.name}</td>
                      <td style={{ textAlign: 'right', padding: '12px', fontSize: '14px' }}>{formatMoney(item.budget)}</td>
                      <td style={{ textAlign: 'right', padding: '12px', fontSize: '14px' }}>{formatMoney(item.forecast)}</td>
                      <td style={{
                        textAlign: 'right',
                        padding: '12px',
                        fontSize: '14px',
                        color: item.variance >= 0 ? '#4CAF50' : '#E63946',
                      }}>
                        {item.variance >= 0 ? '+' : ''}{formatMoney(item.variance)}
                      </td>
                      <td style={{ textAlign: 'right', padding: '12px', fontSize: '14px' }}>
                        {((item.forecast / 3284.4) * 100).toFixed(1)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Capital Tab */}
        {activeTab === 'capital' && (
          <div style={{ animation: 'fadeIn 0.4s ease' }}>
            {/* Capital Summary */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '20px',
              marginBottom: '24px',
            }}>
              {[
                { label: 'Total Capital Budget', value: 486.5, icon: '🏗️' },
                { label: 'Capital Revenue', value: 46.0, icon: '💵' },
                { label: 'Net Capital Investment', value: 440.6, icon: '📈' },
              ].map((item, i) => (
                <div key={i} style={{
                  background: 'linear-gradient(145deg, rgba(76, 175, 80, 0.15) 0%, rgba(76, 175, 80, 0.05) 100%)',
                  borderRadius: '16px',
                  padding: '24px',
                  border: '1px solid rgba(76, 175, 80, 0.2)',
                  textAlign: 'center',
                }}>
                  <div style={{ fontSize: '32px', marginBottom: '8px' }}>{item.icon}</div>
                  <div style={{ fontSize: '28px', fontWeight: 700, color: '#4CAF50' }}>
                    ${item.value.toFixed(1)}M
                  </div>
                  <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', marginTop: '4px' }}>
                    {item.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Capital Projects Chart */}
            <div style={{
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '16px',
              padding: '24px',
              border: '1px solid rgba(255,255,255,0.1)',
              marginBottom: '24px',
            }}>
              <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: 600 }}>
                Capital Investment by Department (2026-2027)
              </h3>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={capitalData} layout="vertical">
                  <XAxis type="number" stroke="rgba(255,255,255,0.5)" fontSize={12} tickFormatter={v => `$${v}M`} />
                  <YAxis type="category" dataKey="name" stroke="rgba(255,255,255,0.5)" fontSize={11} width={200} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="amount" fill="#2A9D8F" radius={[0, 4, 4, 0]} name="Capital Investment" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Major Projects */}
            <div style={{
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '16px',
              padding: '24px',
              border: '1px solid rgba(255,255,255,0.1)',
            }}>
              <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: 600 }}>
                Key Capital Investments
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                {[
                  { title: 'School Construction & Renovations', amount: 97.3, dept: 'Education', desc: 'Including school revitalization fund' },
                  { title: 'Healthcare Facilities', amount: 100.1, dept: 'Health', desc: 'New construction and renovations' },
                  { title: 'Highway & Bridge Work', amount: 71.5, dept: 'Transportation', desc: 'National highways, bridges, provincial paving' },
                  { title: 'Health PEI Equipment', amount: 21.6, dept: 'Health PEI', desc: 'Medical equipment and IT systems' },
                  { title: 'Housing Construction', amount: 23.5, dept: 'Housing Corp', desc: 'New housing units and renovations' },
                  { title: 'IT Modernization', amount: 17.6, dept: 'Finance', desc: 'Hardware, storage, system upgrades' },
                ].map((project, i) => (
                  <div key={i} style={{
                    padding: '20px',
                    background: 'rgba(0,0,0,0.2)',
                    borderRadius: '12px',
                    borderLeft: '4px solid #2A9D8F',
                  }}>
                    <div style={{ fontSize: '16px', fontWeight: 600, marginBottom: '4px' }}>
                      {project.title}
                    </div>
                    <div style={{ fontSize: '24px', fontWeight: 700, color: '#2A9D8F' }}>
                      ${project.amount}M
                    </div>
                    <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', marginTop: '8px' }}>
                      {project.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Economy Tab */}
        {activeTab === 'economy' && (
          <div style={{ animation: 'fadeIn 0.4s ease' }}>
            {/* Economy Summary */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(46, 125, 50, 0.15) 0%, rgba(46, 125, 50, 0.05) 100%)',
              borderRadius: '16px',
              padding: '24px',
              border: '1px solid rgba(46, 125, 50, 0.3)',
              marginBottom: '24px',
            }}>
              <h3 style={{ margin: '0 0 16px 0', fontSize: '20px', fontWeight: 600, color: '#4CAF50' }}>
                PEI Economic Outlook
              </h3>
              <p style={{ margin: 0, fontSize: '15px', lineHeight: '1.7', color: 'rgba(255,255,255,0.85)' }}>
                The PEI economy is performing largely as forecast in April, with strong growth in manufacturing 
                shipments (+10.1% YTD), robust tourism activity, and resilient construction sector. 
                Population growth has moderated to 1.6% as immigration policy changes take effect, 
                supporting a more sustainable growth trajectory.
              </p>
            </div>

            {/* Economic Indicators Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '20px',
              marginBottom: '24px',
            }}>
              {[
                { label: 'Real GDP (2024)', value: '3.8%', sub: 'Highest in Canada', icon: '📊', color: '#4CAF50' },
                { label: 'GDP Forecast (2025)', value: '2.4%', sub: 'Revised from 2.5%', icon: '📈', color: '#457B9D' },
                { label: 'Nominal GDP (2025)', value: '$11.4B', sub: '+4.3% growth', icon: '💰', color: '#E9C46A' },
                { label: 'Population', value: '182,657', sub: '+1.6% annual growth', icon: '👥', color: '#9B5DE5' },
                { label: 'Employment', value: '~92,800', sub: '+1.0% YTD', icon: '💼', color: '#00BBF9' },
                { label: 'Unemployment Rate', value: '8.1%', sub: '+0.3pp YoY', icon: '📉', color: '#F4A261' },
              ].map((ind, i) => (
                <div key={i} style={{
                  background: 'rgba(255,255,255,0.05)',
                  borderRadius: '16px',
                  padding: '24px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  textAlign: 'center',
                }}>
                  <div style={{ fontSize: '32px', marginBottom: '8px' }}>{ind.icon}</div>
                  <div style={{ fontSize: '28px', fontWeight: 700, color: ind.color }}>
                    {ind.value}
                  </div>
                  <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', marginTop: '4px' }}>
                    {ind.label}
                  </div>
                  <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', marginTop: '4px' }}>
                    {ind.sub}
                  </div>
                </div>
              ))}
            </div>

            {/* Sector Performance */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              <div style={{
                background: 'rgba(255,255,255,0.05)',
                borderRadius: '16px',
                padding: '24px',
                border: '1px solid rgba(255,255,255,0.1)',
              }}>
                <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: 600 }}>
                  Sector Highlights
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {[
                    { sector: 'Manufacturing Shipments', change: '+10.1%', positive: true, note: 'Fastest in Canada' },
                    { sector: 'Exports', change: '+12.8%', positive: true, note: '73.8% to USA' },
                    { sector: 'Housing Starts', change: '+8.5%', positive: true, note: '1,451 units (Q3)' },
                    { sector: 'Tourism (Overnight Stays)', change: '+8.7%', positive: true, note: 'Fixed roof +10.2%' },
                    { sector: 'Retail Trade', change: '+2.7%', positive: true, note: 'Slowest in Canada' },
                    { sector: 'Air Traffic', change: '-6.0%', positive: false, note: 'Cruise -28%' },
                  ].map((item, i) => (
                    <div key={i} style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '12px',
                      background: 'rgba(0,0,0,0.2)',
                      borderRadius: '8px',
                    }}>
                      <div>
                        <div style={{ fontSize: '14px', fontWeight: 500 }}>{item.sector}</div>
                        <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>{item.note}</div>
                      </div>
                      <div style={{
                        fontSize: '16px',
                        fontWeight: 700,
                        color: item.positive ? '#4CAF50' : '#E63946',
                      }}>
                        {item.change}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{
                background: 'rgba(255,255,255,0.05)',
                borderRadius: '16px',
                padding: '24px',
                border: '1px solid rgba(255,255,255,0.1)',
              }}>
                <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: 600 }}>
                  Risks & Challenges
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {[
                    { risk: 'Trade Uncertainty', desc: 'Potential US trade policy disruptions', severity: 'high' },
                    { risk: 'Immigration Changes', desc: 'Federal/provincial policy shifts affecting growth', severity: 'medium' },
                    { risk: 'Agricultural Yields', desc: 'Potato yields down 17.8% due to dry conditions', severity: 'high' },
                    { risk: 'Oyster Disease', desc: 'Ongoing impact on aquaculture sector', severity: 'medium' },
                    { risk: 'Extreme Weather', desc: 'Increasing frequency affecting primary sector', severity: 'medium' },
                  ].map((item, i) => (
                    <div key={i} style={{
                      padding: '12px',
                      background: 'rgba(0,0,0,0.2)',
                      borderRadius: '8px',
                      borderLeft: `4px solid ${item.severity === 'high' ? '#E63946' : '#F4A261'}`,
                    }}>
                      <div style={{ fontSize: '14px', fontWeight: 500 }}>{item.risk}</div>
                      <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginTop: '4px' }}>
                        {item.desc}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Demographics & Labour Tab */}
        {activeTab === 'demographics' && (
          <div style={{ animation: 'fadeIn 0.4s ease' }}>
            {/* Population Overview */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(155, 93, 229, 0.15) 0%, rgba(155, 93, 229, 0.05) 100%)',
              borderRadius: '16px',
              padding: '24px',
              border: '1px solid rgba(155, 93, 229, 0.3)',
              marginBottom: '24px',
            }}>
              <h3 style={{ margin: '0 0 16px 0', fontSize: '20px', fontWeight: 600, color: '#9B5DE5' }}>
                Population Overview
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
                {[
                  { label: 'Current Population', value: '182,657', sub: 'July 2025', color: '#9B5DE5' },
                  { label: 'Annual Growth', value: '+1.6%', sub: '2nd highest in Canada', color: '#4CAF50' },
                  { label: 'Median Age', value: '41.3', sub: 'Down from 44.0 in 2016', color: '#457B9D' },
                  { label: 'Natural Growth', value: '-245', sub: 'Deaths exceed births', color: '#E63946' },
                ].map((item, i) => (
                  <div key={i} style={{
                    background: 'rgba(0,0,0,0.2)',
                    borderRadius: '12px',
                    padding: '20px',
                    textAlign: 'center',
                  }}>
                    <div style={{ fontSize: '28px', fontWeight: 700, color: item.color }}>{item.value}</div>
                    <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', marginTop: '4px' }}>{item.label}</div>
                    <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', marginTop: '2px' }}>{item.sub}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Population Chart and Projections */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
              <div style={{
                background: 'rgba(255,255,255,0.05)',
                borderRadius: '16px',
                padding: '24px',
                border: '1px solid rgba(255,255,255,0.1)',
              }}>
                <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: 600 }}>
                  Population Growth History
                </h3>
                <div style={{ height: '250px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={populationHistory}>
                      <XAxis dataKey="year" stroke="rgba(255,255,255,0.5)" fontSize={12} />
                      <YAxis stroke="rgba(255,255,255,0.5)" fontSize={12} domain={[145, 190]} />
                      <Tooltip 
                        contentStyle={{ background: '#1B263B', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                        formatter={(value) => [`${value}K`, 'Population']}
                      />
                      <Line type="monotone" dataKey="population" stroke="#9B5DE5" strokeWidth={3} dot={{ fill: '#9B5DE5' }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div style={{
                background: 'rgba(255,255,255,0.05)',
                borderRadius: '16px',
                padding: '24px',
                border: '1px solid rgba(255,255,255,0.1)',
              }}>
                <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: 600 }}>
                  Population Projections to 2049
                </h3>
                <div style={{ height: '250px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={populationProjections}>
                      <XAxis dataKey="year" stroke="rgba(255,255,255,0.5)" fontSize={12} />
                      <YAxis stroke="rgba(255,255,255,0.5)" fontSize={12} domain={[170, 270]} />
                      <Tooltip 
                        contentStyle={{ background: '#1B263B', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                        formatter={(value) => [`${value}K`, '']}
                      />
                      <Legend />
                      <Line type="monotone" dataKey="high" stroke="#4CAF50" strokeWidth={2} name="High Growth" dot={false} />
                      <Line type="monotone" dataKey="medium" stroke="#457B9D" strokeWidth={2} name="Medium Growth" dot={false} />
                      <Line type="monotone" dataKey="low" stroke="#E63946" strokeWidth={2} name="Low Growth" dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginTop: '12px', textAlign: 'center' }}>
                  Source: Statistics Canada Population Projections (Jan 2025)
                </div>
              </div>
            </div>

            {/* Age Distribution and Immigration */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
              <div style={{
                background: 'rgba(255,255,255,0.05)',
                borderRadius: '16px',
                padding: '24px',
                border: '1px solid rgba(255,255,255,0.1)',
              }}>
                <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: 600 }}>
                  Age Distribution (% of Population)
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {ageDistribution.map((age, i) => (
                    <div key={i}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <span style={{ fontSize: '14px' }}>{age.group}</span>
                        <span style={{ fontSize: '14px', color: age.color }}>{age.current}% → {age.projected2030}%</span>
                      </div>
                      <div style={{ height: '8px', background: 'rgba(0,0,0,0.3)', borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{ width: `${age.current * 4}%`, height: '100%', background: age.color, borderRadius: '4px' }} />
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{
                  marginTop: '16px',
                  padding: '12px',
                  background: 'rgba(244, 67, 54, 0.1)',
                  borderRadius: '8px',
                  fontSize: '13px',
                  color: 'rgba(255,255,255,0.8)',
                }}>
                  <strong>Key Trend:</strong> Seniors (65+) projected to grow from 20.6% to 23.3% by 2030, 
                  increasing healthcare and pension pressures.
                </div>
              </div>

              <div style={{
                background: 'rgba(255,255,255,0.05)',
                borderRadius: '16px',
                padding: '24px',
                border: '1px solid rgba(255,255,255,0.1)',
              }}>
                <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: 600 }}>
                  Migration Trends
                </h3>
                <div style={{ height: '220px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={immigrationData}>
                      <XAxis dataKey="year" stroke="rgba(255,255,255,0.5)" fontSize={12} />
                      <YAxis stroke="rgba(255,255,255,0.5)" fontSize={12} />
                      <Tooltip 
                        contentStyle={{ background: '#1B263B', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                      />
                      <Legend />
                      <Bar dataKey="international" fill="#9B5DE5" name="International" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="interprovincial" fill="#457B9D" name="Interprovincial" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div style={{
                  marginTop: '12px',
                  padding: '12px',
                  background: 'rgba(244, 162, 97, 0.1)',
                  borderRadius: '8px',
                  fontSize: '13px',
                }}>
                  <strong>2024-25:</strong> Immigration down 31.4% to 2,843 as federal policy changes take effect. 
                  Interprovincial migration slowed to +82.
                </div>
              </div>
            </div>

            {/* Labour Force Section */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(0, 187, 249, 0.15) 0%, rgba(0, 187, 249, 0.05) 100%)',
              borderRadius: '16px',
              padding: '24px',
              border: '1px solid rgba(0, 187, 249, 0.3)',
              marginBottom: '24px',
            }}>
              <h3 style={{ margin: '0 0 20px 0', fontSize: '20px', fontWeight: 600, color: '#00BBF9' }}>
                Labour Force
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '20px' }}>
                {[
                  { label: 'Employment (2024)', value: '92,500', sub: 'All-time high', color: '#4CAF50' },
                  { label: 'Unemployment Rate', value: '8.0%', sub: 'Up 0.8pp from 2023', color: '#F4A261' },
                  { label: 'Participation Rate', value: '66.5%', sub: '+0.3pp from 2023', color: '#457B9D' },
                  { label: 'Avg Weekly Earnings', value: '$1,127', sub: '+5.5% (fastest in Canada)', color: '#9B5DE5' },
                ].map((item, i) => (
                  <div key={i} style={{
                    background: 'rgba(0,0,0,0.2)',
                    borderRadius: '12px',
                    padding: '16px',
                    textAlign: 'center',
                  }}>
                    <div style={{ fontSize: '24px', fontWeight: 700, color: item.color }}>{item.value}</div>
                    <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', marginTop: '4px' }}>{item.label}</div>
                    <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)' }}>{item.sub}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Employment by Sector */}
            <div style={{
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '16px',
              padding: '24px',
              border: '1px solid rgba(255,255,255,0.1)',
            }}>
              <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: 600 }}>
                Employment by Sector (2024)
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                {employmentBySector.map((sector, i) => (
                  <div key={i} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '12px 16px',
                    background: 'rgba(0,0,0,0.2)',
                    borderRadius: '8px',
                  }}>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 500 }}>{sector.sector}</div>
                      <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>{sector.employment}K employed</div>
                    </div>
                    <div style={{
                      fontSize: '14px',
                      fontWeight: 600,
                      color: sector.change > 0 ? '#4CAF50' : '#E63946',
                    }}>
                      {sector.change > 0 ? '+' : ''}{sector.change}%
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Trade & Export Dependency Tab */}
        {activeTab === 'trade' && (
          <div style={{ animation: 'fadeIn 0.4s ease' }}>
            {/* Trade Overview */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(42, 157, 143, 0.15) 0%, rgba(42, 157, 143, 0.05) 100%)',
              borderRadius: '16px',
              padding: '24px',
              border: '1px solid rgba(42, 157, 143, 0.3)',
              marginBottom: '24px',
            }}>
              <h3 style={{ margin: '0 0 16px 0', fontSize: '20px', fontWeight: 600, color: '#2A9D8F' }}>
                Export Overview
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
                {[
                  { label: 'Total Exports (2024)', value: '$2.5B', sub: 'All-time high', color: '#4CAF50' },
                  { label: 'Export Growth', value: '+7.8%', sub: 'Fastest among provinces', color: '#2A9D8F' },
                  { label: 'US Share', value: '73.8%', sub: 'Significant concentration', color: '#E63946' },
                  { label: 'EU Growth (since CETA)', value: '+192%', sub: 'Since 2017', color: '#457B9D' },
                ].map((item, i) => (
                  <div key={i} style={{
                    background: 'rgba(0,0,0,0.2)',
                    borderRadius: '12px',
                    padding: '20px',
                    textAlign: 'center',
                  }}>
                    <div style={{ fontSize: '28px', fontWeight: 700, color: item.color }}>{item.value}</div>
                    <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', marginTop: '4px' }}>{item.label}</div>
                    <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', marginTop: '2px' }}>{item.sub}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Export Destinations and Products */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
              <div style={{
                background: 'rgba(255,255,255,0.05)',
                borderRadius: '16px',
                padding: '24px',
                border: '1px solid rgba(255,255,255,0.1)',
              }}>
                <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: 600 }}>
                  Export Destinations
                </h3>
                <div style={{ height: '250px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={exportDestinations}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={90}
                        dataKey="share"
                        label={({ destination, share }) => `${destination}: ${share}%`}
                      >
                        {exportDestinations.map((entry, index) => (
                          <Cell key={index} fill={['#E63946', '#457B9D', '#F4A261', '#9B5DE5', '#6C757D'][index]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `${value}%`} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div style={{
                  marginTop: '12px',
                  padding: '12px',
                  background: 'rgba(230, 57, 70, 0.1)',
                  borderRadius: '8px',
                  fontSize: '13px',
                  borderLeft: '3px solid #E63946',
                }}>
                  <strong>US Concentration Risk:</strong> 73.8% of exports go to the US. 
                  Potential 25% tariffs would significantly impact PEI's economy.
                </div>
              </div>

              <div style={{
                background: 'rgba(255,255,255,0.05)',
                borderRadius: '16px',
                padding: '24px',
                border: '1px solid rgba(255,255,255,0.1)',
              }}>
                <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: 600 }}>
                  Top Export Products (2024)
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {exportsByProduct.map((product, i) => (
                    <div key={i} style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '10px 12px',
                      background: 'rgba(0,0,0,0.2)',
                      borderRadius: '8px',
                    }}>
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: 500 }}>{product.product}</div>
                        <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)' }}>${product.value}M ({product.share}%)</div>
                      </div>
                      <div style={{
                        fontSize: '13px',
                        fontWeight: 600,
                        color: product.change > 0 ? '#4CAF50' : '#E63946',
                      }}>
                        {product.change > 0 ? '+' : ''}{product.change}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Tariff Scenario Analysis */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(230, 57, 70, 0.15) 0%, rgba(230, 57, 70, 0.05) 100%)',
              borderRadius: '16px',
              padding: '24px',
              border: '1px solid rgba(230, 57, 70, 0.3)',
              marginBottom: '24px',
            }}>
              <h3 style={{ margin: '0 0 16px 0', fontSize: '20px', fontWeight: 600, color: '#E63946' }}>
                ⚠️ US Tariff Risk Scenario
              </h3>
              <p style={{ margin: '0 0 20px 0', fontSize: '14px', color: 'rgba(255,255,255,0.7)' }}>
                Potential impact of 25% US tariffs on PEI exports
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                {[
                  { label: 'Exports at Risk', value: '$1.85B', sub: '73.8% of total exports', color: '#E63946' },
                  { label: 'Estimated Cost Impact', value: '$460M+', sub: '25% tariff on US exports', color: '#F4A261' },
                  { label: 'GDP Impact (est.)', value: '-3 to -5%', sub: 'If trade significantly reduced', color: '#E63946' },
                ].map((item, i) => (
                  <div key={i} style={{
                    background: 'rgba(0,0,0,0.2)',
                    borderRadius: '12px',
                    padding: '20px',
                    textAlign: 'center',
                  }}>
                    <div style={{ fontSize: '24px', fontWeight: 700, color: item.color }}>{item.value}</div>
                    <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', marginTop: '4px' }}>{item.label}</div>
                    <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)' }}>{item.sub}</div>
                  </div>
                ))}
              </div>
              <div style={{
                marginTop: '20px',
                padding: '16px',
                background: 'rgba(0,0,0,0.2)',
                borderRadius: '12px',
              }}>
                <h4 style={{ margin: '0 0 12px 0', fontSize: '15px', fontWeight: 600 }}>Most Vulnerable Sectors:</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {['Frozen Food Products ($774M)', 'Seafood ($350M)', 'Aerospace ($142M)', 'Potatoes ($191M)'].map((sector, i) => (
                    <span key={i} style={{
                      padding: '6px 12px',
                      background: 'rgba(230, 57, 70, 0.2)',
                      borderRadius: '16px',
                      fontSize: '12px',
                    }}>
                      {sector}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Export Growth History */}
            <div style={{
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '16px',
              padding: '24px',
              border: '1px solid rgba(255,255,255,0.1)',
            }}>
              <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: 600 }}>
                Export Growth Trend
              </h3>
              <div style={{ height: '250px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={exportData}>
                    <XAxis dataKey="year" stroke="rgba(255,255,255,0.5)" fontSize={12} />
                    <YAxis stroke="rgba(255,255,255,0.5)" fontSize={12} domain={[1.5, 2.7]} />
                    <Tooltip 
                      contentStyle={{ background: '#1B263B', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                      formatter={(value) => [`$${value}B`, 'Total Exports']}
                    />
                    <Line type="monotone" dataKey="total" stroke="#2A9D8F" strokeWidth={3} dot={{ fill: '#2A9D8F' }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* Federal Transfer Dependency Tab */}
        {activeTab === 'transfers' && (
          <div style={{ animation: 'fadeIn 0.4s ease' }}>
            {/* Federal Dependency Overview */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(244, 162, 97, 0.15) 0%, rgba(244, 162, 97, 0.05) 100%)',
              borderRadius: '16px',
              padding: '24px',
              border: '1px solid rgba(244, 162, 97, 0.3)',
              marginBottom: '24px',
            }}>
              <h3 style={{ margin: '0 0 16px 0', fontSize: '20px', fontWeight: 600, color: '#F4A261' }}>
                Federal Transfer Dependency
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
                {[
                  { label: 'Total Federal Transfers', value: '$1.32B', sub: 'FY 2024-25 forecast', color: '#F4A261' },
                  { label: '% of Provincial Revenue', value: '40.1%', sub: 'Highest in Canada', color: '#E63946' },
                  { label: 'Equalization', value: '$610M', sub: '+8.6% from prior year', color: '#457B9D' },
                  { label: 'Health Transfer', value: '$228M', sub: 'Canada Health Transfer', color: '#4CAF50' },
                ].map((item, i) => (
                  <div key={i} style={{
                    background: 'rgba(0,0,0,0.2)',
                    borderRadius: '12px',
                    padding: '20px',
                    textAlign: 'center',
                  }}>
                    <div style={{ fontSize: '28px', fontWeight: 700, color: item.color }}>{item.value}</div>
                    <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', marginTop: '4px' }}>{item.label}</div>
                    <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', marginTop: '2px' }}>{item.sub}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Transfer Breakdown and Provincial Comparison */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
              <div style={{
                background: 'rgba(255,255,255,0.05)',
                borderRadius: '16px',
                padding: '24px',
                border: '1px solid rgba(255,255,255,0.1)',
              }}>
                <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: 600 }}>
                  Federal Transfer Composition (2024-25)
                </h3>
                <div style={{ height: '250px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Equalization', value: 609.5 },
                          { name: 'Health Transfer', value: 227.8 },
                          { name: 'Infrastructure', value: 112.9 },
                          { name: 'Social Transfer', value: 74.0 },
                          { name: 'Other', value: 152.3 },
                        ]}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={90}
                        dataKey="value"
                        label={({ name, value }) => `${name}: $${value}M`}
                      >
                        <Cell fill="#F4A261" />
                        <Cell fill="#4CAF50" />
                        <Cell fill="#2A9D8F" />
                        <Cell fill="#457B9D" />
                        <Cell fill="#6C757D" />
                      </Pie>
                      <Tooltip formatter={(value) => `$${value}M`} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div style={{
                background: 'rgba(255,255,255,0.05)',
                borderRadius: '16px',
                padding: '24px',
                border: '1px solid rgba(255,255,255,0.1)',
              }}>
                <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: 600 }}>
                  Federal Dependency by Province
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {federalDependency.map((prov, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '40px', fontSize: '12px', fontWeight: prov.province === 'PEI' ? 700 : 400, color: prov.province === 'PEI' ? '#F4A261' : 'rgba(255,255,255,0.7)' }}>
                        {prov.province}
                      </div>
                      <div style={{ flex: 1, height: '16px', background: 'rgba(0,0,0,0.3)', borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{
                          width: `${prov.share * 2}%`,
                          height: '100%',
                          background: prov.province === 'PEI' ? '#F4A261' : '#457B9D',
                          borderRadius: '4px',
                        }} />
                      </div>
                      <div style={{ width: '45px', fontSize: '12px', textAlign: 'right', color: prov.province === 'PEI' ? '#F4A261' : 'rgba(255,255,255,0.7)' }}>
                        {prov.share}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Transfer Trends */}
            <div style={{
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '16px',
              padding: '24px',
              border: '1px solid rgba(255,255,255,0.1)',
              marginBottom: '24px',
            }}>
              <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: 600 }}>
                Federal Transfer History
              </h3>
              <div style={{ height: '280px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={federalTransfers}>
                    <XAxis dataKey="year" stroke="rgba(255,255,255,0.5)" fontSize={11} />
                    <YAxis stroke="rgba(255,255,255,0.5)" fontSize={12} />
                    <Tooltip 
                      contentStyle={{ background: '#1B263B', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                      formatter={(value) => [`$${value}M`, '']}
                    />
                    <Legend />
                    <Bar dataKey="equalization" stackId="a" fill="#F4A261" name="Equalization" />
                    <Bar dataKey="healthTransfer" stackId="a" fill="#4CAF50" name="Health Transfer" />
                    <Bar dataKey="socialTransfer" stackId="a" fill="#457B9D" name="Social Transfer" />
                    <Bar dataKey="infrastructure" stackId="a" fill="#2A9D8F" name="Infrastructure" />
                    <Bar dataKey="other" stackId="a" fill="#6C757D" name="Other" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Risk Analysis */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(230, 57, 70, 0.1) 0%, rgba(230, 57, 70, 0.05) 100%)',
              borderRadius: '16px',
              padding: '24px',
              border: '1px solid rgba(230, 57, 70, 0.2)',
            }}>
              <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: 600, color: '#E63946' }}>
                ⚠️ Dependency Risks
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                {[
                  { risk: 'Equalization Formula Changes', desc: 'Federal reviews could reduce payments if PEI\'s relative fiscal capacity improves or formula changes' },
                  { risk: 'Federal Fiscal Tightening', desc: 'Federal deficit reduction efforts could constrain transfer growth' },
                  { risk: 'Population-Based Formulas', desc: 'Slower population growth affects per-capita transfer calculations' },
                  { risk: 'Infrastructure Program Expiry', desc: 'Time-limited federal infrastructure programs create funding uncertainty' },
                ].map((item, i) => (
                  <div key={i} style={{
                    padding: '16px',
                    background: 'rgba(0,0,0,0.2)',
                    borderRadius: '10px',
                    borderLeft: '3px solid #E63946',
                  }}>
                    <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '6px' }}>{item.risk}</div>
                    <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', lineHeight: '1.5' }}>{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Debt Sustainability Tab */}
        {activeTab === 'debt' && (
          <div style={{ animation: 'fadeIn 0.4s ease' }}>
            {/* Debt Overview */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(230, 57, 70, 0.15) 0%, rgba(230, 57, 70, 0.05) 100%)',
              borderRadius: '16px',
              padding: '24px',
              border: '1px solid rgba(230, 57, 70, 0.3)',
              marginBottom: '24px',
            }}>
              <h3 style={{ margin: '0 0 16px 0', fontSize: '20px', fontWeight: 600, color: '#E63946' }}>
                Debt Overview
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
                {[
                  { label: 'Net Debt (2025-26f)', value: '$3.73B', sub: '+$706M from prior year', color: '#E63946' },
                  { label: 'Debt-to-GDP', value: '32.9%', sub: 'Projected FY 2025-26', color: '#F4A261' },
                  { label: 'Interest Costs', value: '$171M', sub: '5.2% of revenue', color: '#E63946' },
                  { label: 'Borrowing (2025-26)', value: '$800M', sub: 'Double prior year', color: '#F4A261' },
                ].map((item, i) => (
                  <div key={i} style={{
                    background: 'rgba(0,0,0,0.2)',
                    borderRadius: '12px',
                    padding: '20px',
                    textAlign: 'center',
                  }}>
                    <div style={{ fontSize: '28px', fontWeight: 700, color: item.color }}>{item.value}</div>
                    <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', marginTop: '4px' }}>{item.label}</div>
                    <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', marginTop: '2px' }}>{item.sub}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Debt Trajectory and Provincial Comparison */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
              <div style={{
                background: 'rgba(255,255,255,0.05)',
                borderRadius: '16px',
                padding: '24px',
                border: '1px solid rgba(255,255,255,0.1)',
              }}>
                <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: 600 }}>
                  Debt-to-GDP Trajectory
                </h3>
                <div style={{ height: '250px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={debtHistory}>
                      <XAxis dataKey="year" stroke="rgba(255,255,255,0.5)" fontSize={10} />
                      <YAxis stroke="rgba(255,255,255,0.5)" fontSize={12} domain={[24, 38]} />
                      <Tooltip 
                        contentStyle={{ background: '#1B263B', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                        formatter={(value) => [`${value}%`, 'Debt-to-GDP']}
                      />
                      <Line type="monotone" dataKey="debtToGDP" stroke="#E63946" strokeWidth={3} dot={{ fill: '#E63946' }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div style={{
                  marginTop: '12px',
                  padding: '12px',
                  background: 'rgba(230, 57, 70, 0.1)',
                  borderRadius: '8px',
                  fontSize: '13px',
                }}>
                  <strong>Trajectory:</strong> Debt-to-GDP projected to reach 35.9% by 2027-28 — 
                  highest level since 2014-15, reversing a decade of improvement.
                </div>
              </div>

              <div style={{
                background: 'rgba(255,255,255,0.05)',
                borderRadius: '16px',
                padding: '24px',
                border: '1px solid rgba(255,255,255,0.1)',
              }}>
                <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: 600 }}>
                  Provincial Debt Comparison (Debt-to-GDP)
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {provincialDebtComparison.map((prov, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ 
                        width: '90px', 
                        fontSize: '11px', 
                        fontWeight: prov.province.includes('PEI') ? 700 : 400, 
                        color: prov.province.includes('PEI') ? (prov.province.includes('2027') ? '#E63946' : '#F4A261') : 'rgba(255,255,255,0.7)' 
                      }}>
                        {prov.province}
                      </div>
                      <div style={{ flex: 1, height: '14px', background: 'rgba(0,0,0,0.3)', borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{
                          width: `${prov.debtToGDP * 2}%`,
                          height: '100%',
                          background: prov.province.includes('PEI') ? (prov.province.includes('2027') ? '#E63946' : '#F4A261') : '#457B9D',
                          borderRadius: '4px',
                        }} />
                      </div>
                      <div style={{ 
                        width: '40px', 
                        fontSize: '11px', 
                        textAlign: 'right',
                        color: prov.province.includes('PEI') ? (prov.province.includes('2027') ? '#E63946' : '#F4A261') : 'rgba(255,255,255,0.7)'
                      }}>
                        {prov.debtToGDP}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Interest Costs */}
            <div style={{
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '16px',
              padding: '24px',
              border: '1px solid rgba(255,255,255,0.1)',
              marginBottom: '24px',
            }}>
              <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: 600 }}>
                Interest Cost Trajectory
              </h3>
              <div style={{ height: '250px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={debtHistory}>
                    <XAxis dataKey="year" stroke="rgba(255,255,255,0.5)" fontSize={10} />
                    <YAxis stroke="rgba(255,255,255,0.5)" fontSize={12} />
                    <Tooltip 
                      contentStyle={{ background: '#1B263B', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                      formatter={(value) => [`$${value}M`, 'Interest Costs']}
                    />
                    <Bar dataKey="interestCosts" fill="#F4A261" radius={[4, 4, 0, 0]} name="Interest Costs ($M)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div style={{
                marginTop: '12px',
                padding: '12px',
                background: 'rgba(244, 162, 97, 0.1)',
                borderRadius: '8px',
                fontSize: '13px',
              }}>
                <strong>Cost Pressure:</strong> Interest costs projected to nearly double from $98M (2019-20) to $198M (2027-28), 
                crowding out program spending.
              </div>
            </div>

            {/* Sustainability Scenarios */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(69, 123, 157, 0.15) 0%, rgba(69, 123, 157, 0.05) 100%)',
              borderRadius: '16px',
              padding: '24px',
              border: '1px solid rgba(69, 123, 157, 0.3)',
            }}>
              <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: 600, color: '#457B9D' }}>
                Path to Fiscal Balance
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                {[
                  { 
                    scenario: 'Status Quo', 
                    desc: 'Continue current trajectory', 
                    outcome: 'Debt reaches 35.9% by 2027-28',
                    color: '#E63946',
                    icon: '📉'
                  },
                  { 
                    scenario: 'Expenditure Restraint', 
                    desc: 'Limit spending growth to 2%/year', 
                    outcome: 'Could stabilize debt-to-GDP ~32%',
                    color: '#F4A261',
                    icon: '⚖️'
                  },
                  { 
                    scenario: 'Balanced Budget', 
                    desc: 'Return to balance by 2028-29', 
                    outcome: 'Requires ~$350M in adjustments',
                    color: '#4CAF50',
                    icon: '✅'
                  },
                ].map((item, i) => (
                  <div key={i} style={{
                    padding: '20px',
                    background: 'rgba(0,0,0,0.2)',
                    borderRadius: '12px',
                    borderTop: `4px solid ${item.color}`,
                  }}>
                    <div style={{ fontSize: '24px', marginBottom: '8px' }}>{item.icon}</div>
                    <div style={{ fontSize: '16px', fontWeight: 600, marginBottom: '8px', color: item.color }}>{item.scenario}</div>
                    <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', marginBottom: '8px' }}>{item.desc}</div>
                    <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.9)', fontWeight: 500 }}>{item.outcome}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tax Policy Tab */}
        {activeTab === 'taxpolicy' && (
          <div style={{ animation: 'fadeIn 0.4s ease' }}>
            {/* HST Calculator */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(69, 123, 157, 0.2) 0%, rgba(69, 123, 157, 0.05) 100%)',
              borderRadius: '16px',
              padding: '28px',
              border: '1px solid rgba(69, 123, 157, 0.3)',
              marginBottom: '24px',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                <div>
                  <h3 style={{ margin: '0 0 8px 0', fontSize: '22px', fontWeight: 600, color: '#457B9D' }}>
                    HST Impact Calculator
                  </h3>
                  <p style={{ margin: 0, fontSize: '14px', color: 'rgba(255,255,255,0.7)' }}>
                    Model the fiscal and economic impact of reducing PEI's provincial HST rate
                  </p>
                </div>
                <div style={{
                  background: 'rgba(0,0,0,0.3)',
                  padding: '12px 20px',
                  borderRadius: '12px',
                  textAlign: 'center',
                }}>
                  <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}>Current HST Rate</div>
                  <div style={{ fontSize: '28px', fontWeight: 700, color: '#fff' }}>15%</div>
                  <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)' }}>5% Federal + 10% Provincial</div>
                </div>
              </div>

              {/* Slider Control */}
              <div style={{
                background: 'rgba(0,0,0,0.2)',
                borderRadius: '12px',
                padding: '24px',
                marginBottom: '24px',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <label style={{ fontSize: '16px', fontWeight: 500 }}>
                    Provincial HST Reduction
                  </label>
                  <div style={{
                    background: hstReduction > 0 ? '#E63946' : 'rgba(255,255,255,0.1)',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    fontSize: '18px',
                    fontWeight: 700,
                  }}>
                    -{hstReduction}%
                  </div>
                </div>
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="1"
                  value={hstReduction}
                  onChange={(e) => setHstReduction(Number(e.target.value))}
                  style={{
                    width: '100%',
                    height: '8px',
                    borderRadius: '4px',
                    background: `linear-gradient(to right, #457B9D ${hstReduction * 20}%, rgba(255,255,255,0.2) ${hstReduction * 20}%)`,
                    appearance: 'none',
                    cursor: 'pointer',
                  }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>
                  <span>0% (No change)</span>
                  <span>-1%</span>
                  <span>-2%</span>
                  <span>-3%</span>
                  <span>-4%</span>
                  <span>-5%</span>
                </div>
              </div>

              {/* Impact Metrics */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '16px',
              }}>
                <div style={{
                  background: 'rgba(0,0,0,0.2)',
                  borderRadius: '12px',
                  padding: '20px',
                  textAlign: 'center',
                  borderTop: '3px solid #E63946',
                }}>
                  <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', marginBottom: '8px' }}>
                    Annual Revenue Loss
                  </div>
                  <div style={{ fontSize: '28px', fontWeight: 700, color: '#E63946' }}>
                    -${hstImpact.revenueLoss.toFixed(1)}M
                  </div>
                  <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginTop: '4px' }}>
                    ~$47.5M per 1%
                  </div>
                </div>
                
                <div style={{
                  background: 'rgba(0,0,0,0.2)',
                  borderRadius: '12px',
                  padding: '20px',
                  textAlign: 'center',
                  borderTop: '3px solid #F4A261',
                }}>
                  <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', marginBottom: '8px' }}>
                    New Projected Deficit
                  </div>
                  <div style={{ fontSize: '28px', fontWeight: 700, color: '#F4A261' }}>
                    ${hstImpact.newDeficit.toFixed(1)}M
                  </div>
                  <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginTop: '4px' }}>
                    vs ${fiscalSummary.deficit.forecast}M current
                  </div>
                </div>
                
                <div style={{
                  background: 'rgba(0,0,0,0.2)',
                  borderRadius: '12px',
                  padding: '20px',
                  textAlign: 'center',
                  borderTop: '3px solid #4CAF50',
                }}>
                  <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', marginBottom: '8px' }}>
                    Consumer Savings
                  </div>
                  <div style={{ fontSize: '28px', fontWeight: 700, color: '#4CAF50' }}>
                    +${hstImpact.consumerSavings.toFixed(1)}M
                  </div>
                  <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginTop: '4px' }}>
                    Back in Islanders' pockets
                  </div>
                </div>
                
                <div style={{
                  background: 'rgba(0,0,0,0.2)',
                  borderRadius: '12px',
                  padding: '20px',
                  textAlign: 'center',
                  borderTop: '3px solid #457B9D',
                }}>
                  <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', marginBottom: '8px' }}>
                    New HST Rate
                  </div>
                  <div style={{ fontSize: '28px', fontWeight: 700, color: '#457B9D' }}>
                    {hstImpact.newRate}%
                  </div>
                  <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginTop: '4px' }}>
                    5% Fed + {hstImpact.provincialPortion}% Prov
                  </div>
                </div>
              </div>
            </div>

            {/* Provincial Comparison */}
            <div style={{
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '16px',
              padding: '24px',
              border: '1px solid rgba(255,255,255,0.1)',
              marginBottom: '24px',
            }}>
              <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: 600 }}>
                Atlantic Canada Sales Tax Comparison
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '12px' }}>
                {[
                  { province: 'PEI (Current)', rate: 15, provincial: 10, highlight: false },
                  { province: 'PEI (Proposed)', rate: hstImpact.newRate, provincial: hstImpact.provincialPortion, highlight: true },
                  { province: 'Nova Scotia', rate: 15, provincial: 10, highlight: false },
                  { province: 'New Brunswick', rate: 15, provincial: 10, highlight: false },
                  { province: 'Newfoundland', rate: 15, provincial: 10, highlight: false },
                ].map((prov, i) => (
                  <div key={i} style={{
                    padding: '20px',
                    background: prov.highlight ? 'rgba(76, 175, 80, 0.15)' : 'rgba(0,0,0,0.2)',
                    borderRadius: '12px',
                    textAlign: 'center',
                    border: prov.highlight ? '2px solid #4CAF50' : '1px solid transparent',
                  }}>
                    <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', marginBottom: '8px' }}>
                      {prov.province}
                    </div>
                    <div style={{ 
                      fontSize: '32px', 
                      fontWeight: 700, 
                      color: prov.highlight && hstReduction > 0 ? '#4CAF50' : '#fff' 
                    }}>
                      {prov.rate}%
                    </div>
                    <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', marginTop: '4px' }}>
                      ({prov.provincial}% provincial)
                    </div>
                  </div>
                ))}
              </div>
              {hstReduction > 0 && (
                <div style={{
                  marginTop: '16px',
                  padding: '12px 16px',
                  background: 'rgba(76, 175, 80, 0.1)',
                  borderRadius: '8px',
                  fontSize: '14px',
                  color: '#4CAF50',
                }}>
                  💡 A {hstReduction}% reduction would give PEI the <strong>lowest HST rate in Atlantic Canada</strong>, 
                  creating a competitive advantage for retail and tourism.
                </div>
              )}
            </div>

            {/* Business Competitiveness Analysis */}
            <div style={{
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '16px',
              padding: '24px',
              border: '1px solid rgba(255,255,255,0.1)',
              marginBottom: '24px',
            }}>
              <h3 style={{ margin: '0 0 8px 0', fontSize: '20px', fontWeight: 600 }}>
                Business Competitiveness Considerations
              </h3>
              <p style={{ margin: '0 0 24px 0', fontSize: '14px', color: 'rgba(255,255,255,0.6)' }}>
                Key factors influencing PEI's ability to attract and retain businesses
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
                {/* Advantages */}
                <div>
                  <h4 style={{ 
                    margin: '0 0 16px 0', 
                    fontSize: '16px', 
                    fontWeight: 600,
                    color: '#4CAF50',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}>
                    <span style={{ fontSize: '20px' }}>✓</span> Competitive Advantages
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {[
                      {
                        title: 'Lower Operating Costs',
                        desc: 'Commercial real estate and labour costs significantly below national average. Office space ~40% cheaper than Halifax.',
                      },
                      {
                        title: 'Strong Workforce Growth',
                        desc: 'Weekly earnings up 5.5% YTD (fastest in Canada). Growing skilled workforce through immigration and post-secondary institutions.',
                      },
                      {
                        title: 'Quality of Life',
                        desc: 'Affordable housing, short commutes, safe communities. Key factor in attracting remote workers and retaining talent.',
                      },
                      {
                        title: 'Innovation Ecosystem',
                        desc: 'Innovation PEI tax incentives, aerospace industry support. BioScience cluster and agri-tech opportunities.',
                      },
                      {
                        title: 'Strategic Location',
                        desc: 'Atlantic Time Zone advantages for serving US East Coast and European markets. Gateway to Atlantic Canada.',
                      },
                    ].map((item, i) => (
                      <div key={i} style={{
                        padding: '16px',
                        background: 'rgba(76, 175, 80, 0.1)',
                        borderRadius: '10px',
                        borderLeft: '3px solid #4CAF50',
                      }}>
                        <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '4px' }}>{item.title}</div>
                        <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', lineHeight: '1.5' }}>{item.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Challenges */}
                <div>
                  <h4 style={{ 
                    margin: '0 0 16px 0', 
                    fontSize: '16px', 
                    fontWeight: 600,
                    color: '#E63946',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}>
                    <span style={{ fontSize: '20px' }}>⚠</span> Challenges & Pressures
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {[
                      {
                        title: 'Small Market Size',
                        desc: 'Population of ~183,000 limits local customer base. Businesses must look beyond PEI for growth.',
                      },
                      {
                        title: 'Transportation Costs',
                        desc: 'Island geography adds shipping costs. Bridge tolls and limited air routes impact logistics and business travel.',
                      },
                      {
                        title: 'Labour Market Tightness',
                        desc: 'Immigration slowdown (-31.4% in 2025) may constrain growth. Specialized skills can be hard to source locally.',
                      },
                      {
                        title: 'Tax Burden',
                        desc: 'Combined federal/provincial corporate rate competitive, but HST at 15% matches Atlantic peers. Personal income tax brackets could deter high earners.',
                      },
                      {
                        title: 'Infrastructure Gaps',
                        desc: 'Limited high-speed internet in rural areas. Healthcare access challenges affecting workforce retention.',
                      },
                    ].map((item, i) => (
                      <div key={i} style={{
                        padding: '16px',
                        background: 'rgba(230, 57, 70, 0.1)',
                        borderRadius: '10px',
                        borderLeft: '3px solid #E63946',
                      }}>
                        <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '4px' }}>{item.title}</div>
                        <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', lineHeight: '1.5' }}>{item.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* HST Reduction Trade-offs */}
            <div style={{
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '16px',
              padding: '24px',
              border: '1px solid rgba(255,255,255,0.1)',
            }}>
              <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: 600 }}>
                HST Reduction: Trade-offs & Considerations
              </h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
                <div>
                  <h4 style={{ margin: '0 0 16px 0', fontSize: '15px', fontWeight: 600, color: '#4CAF50' }}>
                    Potential Benefits
                  </h4>
                  <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', lineHeight: '1.8', color: 'rgba(255,255,255,0.85)' }}>
                    <li><strong>Tourism boost:</strong> Lower prices attract visitors; PEI already seeing +8.7% overnight stays</li>
                    <li><strong>Cross-border shopping:</strong> Reduce incentive for Islanders to shop in lower-tax jurisdictions</li>
                    <li><strong>Retail competitiveness:</strong> Support local businesses against online/out-of-province competition</li>
                    <li><strong>Cost of living relief:</strong> Direct benefit to households facing affordability pressures</li>
                    <li><strong>Business attraction:</strong> Signal of business-friendly environment; differentiator vs. other Atlantic provinces</li>
                    <li><strong>Consumption stimulus:</strong> More disposable income can boost local economic activity</li>
                  </ul>
                </div>
                
                <div>
                  <h4 style={{ margin: '0 0 16px 0', fontSize: '15px', fontWeight: 600, color: '#E63946' }}>
                    Risks & Challenges
                  </h4>
                  <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', lineHeight: '1.8', color: 'rgba(255,255,255,0.85)' }}>
                    <li><strong>Revenue shortfall:</strong> ~$47.5M per 1% must be offset by cuts or other revenue</li>
                    <li><strong>Deficit impact:</strong> Already projecting $367.4M deficit; cuts worsen fiscal position</li>
                    <li><strong>Service reductions:</strong> May require cuts to healthcare, education, or infrastructure</li>
                    <li><strong>Credit rating risk:</strong> Higher deficits could impact provincial borrowing costs</li>
                    <li><strong>Regressive nature:</strong> HST cuts benefit higher spenders more; less targeted than rebates</li>
                    <li><strong>Federal coordination:</strong> HST changes require federal agreement; complex process</li>
                  </ul>
                </div>
              </div>

              {hstReduction > 0 && (
                <div style={{
                  marginTop: '24px',
                  padding: '20px',
                  background: 'rgba(244, 162, 97, 0.15)',
                  borderRadius: '12px',
                  border: '1px solid rgba(244, 162, 97, 0.3)',
                }}>
                  <h4 style={{ margin: '0 0 12px 0', fontSize: '16px', fontWeight: 600, color: '#F4A261' }}>
                    📊 Scenario Analysis: {hstReduction}% HST Reduction
                  </h4>
                  <div style={{ fontSize: '14px', lineHeight: '1.7', color: 'rgba(255,255,255,0.85)' }}>
                    <p style={{ margin: '0 0 12px 0' }}>
                      Reducing HST by {hstReduction}% would cost approximately <strong>${hstImpact.revenueLoss.toFixed(1)}M annually</strong>, 
                      increasing the projected deficit to <strong>${hstImpact.newDeficit.toFixed(1)}M</strong>.
                    </p>
                    <p style={{ margin: '0 0 12px 0' }}>
                      To offset this, the province would need to either:
                    </p>
                    <ul style={{ margin: '0 0 12px 0', paddingLeft: '20px' }}>
                      <li>Cut program spending by ${hstImpact.revenueLoss.toFixed(1)}M ({((hstImpact.revenueLoss / 3334.4) * 100).toFixed(1)}% of current expenditures)</li>
                      <li>Find equivalent revenue from other sources (income tax, fees, federal transfers)</li>
                      <li>Accept higher deficit and increased borrowing (~${(hstImpact.revenueLoss * 0.04).toFixed(1)}M additional annual interest)</li>
                    </ul>
                    <p style={{ margin: 0 }}>
                      <strong>Context:</strong> ${hstImpact.revenueLoss.toFixed(1)}M is roughly equivalent to 
                      {hstImpact.revenueLoss < 50 ? ' the annual budget for Tourism PEI' : 
                       hstImpact.revenueLoss < 100 ? ' the combined budgets of Agriculture and Fisheries departments' :
                       hstImpact.revenueLoss < 150 ? ' approximately 10% of the Transportation & Infrastructure budget' :
                       ' a significant portion of Health PEI\'s operating pressures'}.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Analyst Views Tab */}
        {activeTab === 'analysts' && (
          <div style={{ animation: 'fadeIn 0.4s ease' }}>
            {/* Credit Ratings Summary */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(69, 123, 157, 0.15) 0%, rgba(69, 123, 157, 0.05) 100%)',
              borderRadius: '16px',
              padding: '24px',
              border: '1px solid rgba(69, 123, 157, 0.3)',
              marginBottom: '24px',
            }}>
              <h3 style={{ margin: '0 0 20px 0', fontSize: '20px', fontWeight: 600 }}>
                Current Credit Ratings
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
                {[
                  { 
                    agency: 'DBRS Morningstar', 
                    rating: 'A', 
                    shortTerm: 'R-1 (low)',
                    outlook: 'Stable',
                    date: '2024',
                    color: '#4CAF50'
                  },
                  { 
                    agency: "Moody's", 
                    rating: 'Aa2', 
                    shortTerm: null,
                    outlook: 'Stable',
                    date: 'July 2024',
                    color: '#457B9D'
                  },
                  { 
                    agency: 'C.D. Howe (Transparency)', 
                    rating: 'C–', 
                    shortTerm: null,
                    outlook: 'N/A',
                    date: '2024',
                    color: '#F4A261'
                  },
                ].map((item, i) => (
                  <div key={i} style={{
                    background: 'rgba(0,0,0,0.2)',
                    borderRadius: '12px',
                    padding: '24px',
                    textAlign: 'center',
                    borderTop: `4px solid ${item.color}`,
                  }}>
                    <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', marginBottom: '8px' }}>
                      {item.agency}
                    </div>
                    <div style={{ fontSize: '36px', fontWeight: 700, color: item.color }}>
                      {item.rating}
                    </div>
                    {item.shortTerm && (
                      <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', marginTop: '4px' }}>
                        Short-term: {item.shortTerm}
                      </div>
                    )}
                    <div style={{ 
                      display: 'inline-block',
                      marginTop: '12px',
                      padding: '4px 12px',
                      background: item.outlook === 'Stable' ? 'rgba(76, 175, 80, 0.2)' : 'rgba(244, 162, 97, 0.2)',
                      borderRadius: '12px',
                      fontSize: '12px',
                      color: item.outlook === 'Stable' ? '#4CAF50' : '#F4A261',
                    }}>
                      Outlook: {item.outlook}
                    </div>
                    <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', marginTop: '8px' }}>
                      As of {item.date}
                    </div>
                  </div>
                ))}
              </div>
              <div style={{
                marginTop: '16px',
                padding: '12px 16px',
                background: 'rgba(0,0,0,0.2)',
                borderRadius: '8px',
                fontSize: '13px',
                color: 'rgba(255,255,255,0.7)',
              }}>
                <strong>Note:</strong> PEI maintains solid investment-grade ratings. The "A" rating from DBRS and "Aa2" from Moody's 
                indicate strong creditworthiness. C.D. Howe's grade reflects budget transparency practices, not credit quality.
              </div>
            </div>

            {/* DBRS Morningstar Section */}
            <div style={{
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '16px',
              padding: '24px',
              border: '1px solid rgba(255,255,255,0.1)',
              marginBottom: '24px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '8px',
                  background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px',
                  fontWeight: 700,
                  color: '#fff',
                }}>
                  DB
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 600 }}>DBRS Morningstar</h3>
                  <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>
                    April 2025 Budget Commentary
                  </p>
                </div>
              </div>
              
              <div style={{
                padding: '20px',
                background: 'rgba(230, 57, 70, 0.1)',
                borderRadius: '12px',
                borderLeft: '4px solid #E63946',
                marginBottom: '16px',
              }}>
                <div style={{ fontSize: '18px', fontWeight: 600, color: '#E63946', marginBottom: '8px' }}>
                  "Prince Edward Island's 2025 Budget: Rising Deficits Reduce Flexibility"
                </div>
                <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', fontStyle: 'italic' }}>
                  — Report Title, April 2025
                </div>
              </div>

              <div style={{ fontSize: '14px', lineHeight: '1.7', color: 'rgba(255,255,255,0.85)' }}>
                <p style={{ margin: '0 0 12px 0' }}>
                  <strong>Key Points:</strong>
                </p>
                <ul style={{ margin: 0, paddingLeft: '20px' }}>
                  <li style={{ marginBottom: '8px' }}>Confirmed PEI's credit ratings at "A" (long-term) and R-1 (low) (short-term) with Stable trends</li>
                  <li style={{ marginBottom: '8px' }}>Rising deficits are the primary concern, reducing fiscal flexibility</li>
                  <li style={{ marginBottom: '8px' }}>The province's ability to respond to economic shocks is diminishing</li>
                  <li>Stable outlook maintained, but trajectory warrants monitoring</li>
                </ul>
              </div>
            </div>

            {/* TD Economics Section */}
            <div style={{
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '16px',
              padding: '24px',
              border: '1px solid rgba(255,255,255,0.1)',
              marginBottom: '24px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '8px',
                  background: 'linear-gradient(135deg, #00a650 0%, #008c44 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '16px',
                  fontWeight: 700,
                  color: '#fff',
                }}>
                  TD
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 600 }}>TD Economics</h3>
                  <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>
                    2025 Prince Edward Island Budget Analysis
                  </p>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '20px' }}>
                <div style={{
                  padding: '16px',
                  background: 'rgba(230, 57, 70, 0.1)',
                  borderRadius: '10px',
                  borderLeft: '3px solid #E63946',
                }}>
                  <div style={{ fontSize: '24px', fontWeight: 700, color: '#E63946' }}>35.9%</div>
                  <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', marginTop: '4px' }}>
                    Projected Net Debt-to-GDP by FY 2027/28
                  </div>
                  <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginTop: '4px' }}>
                    Up from ~27% in recent years
                  </div>
                </div>
                <div style={{
                  padding: '16px',
                  background: 'rgba(244, 162, 97, 0.1)',
                  borderRadius: '10px',
                  borderLeft: '3px solid #F4A261',
                }}>
                  <div style={{ fontSize: '24px', fontWeight: 700, color: '#F4A261' }}>$800M</div>
                  <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', marginTop: '4px' }}>
                    Long-term borrowing for FY 2025/26
                  </div>
                  <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginTop: '4px' }}>
                    Up from $400M prior year
                  </div>
                </div>
              </div>

              <div style={{ fontSize: '14px', lineHeight: '1.7', color: 'rgba(255,255,255,0.85)' }}>
                <div style={{
                  padding: '16px',
                  background: 'rgba(0,0,0,0.2)',
                  borderRadius: '10px',
                  marginBottom: '12px',
                }}>
                  <p style={{ margin: 0 }}>
                    "Net debt-to-GDP is forecast to climb significantly over the medium term, 
                    <strong style={{ color: '#E63946' }}> reducing flexibility to respond to downside growth shocks</strong>."
                  </p>
                </div>
                
                <div style={{
                  padding: '16px',
                  background: 'rgba(0,0,0,0.2)',
                  borderRadius: '10px',
                  marginBottom: '12px',
                }}>
                  <p style={{ margin: 0 }}>
                    "PEI's FY 2024/25 deficit is pegged at $166 million. This works out to about 1.6% of GDP, 
                    <strong style={{ color: '#F4A261' }}> putting it in line with the shortfalls observed during the Global Financial Crisis</strong>."
                  </p>
                </div>

                <div style={{
                  padding: '16px',
                  background: 'rgba(0,0,0,0.2)',
                  borderRadius: '10px',
                }}>
                  <p style={{ margin: 0 }}>
                    "If PEI's debt burden does climb to 35.9% by the end of the projection horizon, 
                    <strong style={{ color: '#F4A261' }}> that would mark the highest level since FY 2014/15</strong>."
                  </p>
                </div>
              </div>
            </div>

            {/* RBC Economics Section */}
            <div style={{
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '16px',
              padding: '24px',
              border: '1px solid rgba(255,255,255,0.1)',
              marginBottom: '24px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '8px',
                  background: 'linear-gradient(135deg, #005daa 0%, #003d71 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '14px',
                  fontWeight: 700,
                  color: '#fff',
                }}>
                  RBC
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 600 }}>RBC Economics</h3>
                  <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>
                    "Entering a Period of Deeper Deficits" — May 2025
                  </p>
                </div>
              </div>

              <div style={{ fontSize: '14px', lineHeight: '1.7', color: 'rgba(255,255,255,0.85)' }}>
                <div style={{
                  padding: '16px',
                  background: 'rgba(230, 57, 70, 0.1)',
                  borderRadius: '10px',
                  borderLeft: '3px solid #E63946',
                  marginBottom: '12px',
                }}>
                  <p style={{ margin: 0 }}>
                    "The debt burden is expected to stand at 35.9% of GDP by the end of the fiscal plan in 2027-28—
                    <strong style={{ color: '#E63946' }}>entirely reversing the easing over the past decade</strong>."
                  </p>
                </div>

                <div style={{
                  padding: '16px',
                  background: 'rgba(0,0,0,0.2)',
                  borderRadius: '10px',
                }}>
                  <p style={{ margin: 0 }}>
                    "P.E.I.'s 2025 Budget marks a departure from last year's plan in that it shows significantly deeper deficits. 
                    The province now projects a $184-million shortfall in 2025-26—
                    <strong style={{ color: '#F4A261' }}>which would be the largest deficit in the province's history in nominal terms</strong>."
                  </p>
                </div>
              </div>
            </div>

            {/* Moody's Section */}
            <div style={{
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '16px',
              padding: '24px',
              border: '1px solid rgba(255,255,255,0.1)',
              marginBottom: '24px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '8px',
                  background: 'linear-gradient(135deg, #1e3a5f 0%, #0d1f33 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  fontWeight: 700,
                  color: '#fff',
                }}>
                  Moody's
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 600 }}>Moody's Investors Service</h3>
                  <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>
                    July 2024 Rating Affirmation
                  </p>
                </div>
              </div>

              <div style={{ fontSize: '14px', lineHeight: '1.7', color: 'rgba(255,255,255,0.85)' }}>
                <div style={{
                  padding: '16px',
                  background: 'rgba(76, 175, 80, 0.1)',
                  borderRadius: '10px',
                  borderLeft: '3px solid #4CAF50',
                }}>
                  <p style={{ margin: '0 0 8px 0' }}>
                    <strong>Rating Affirmed: Aa2 (Stable Outlook)</strong>
                  </p>
                  <p style={{ margin: 0, color: 'rgba(255,255,255,0.7)' }}>
                    Moody's affirmed PEI's local currency credit rating at Aa2 with a stable outlook in July 2024, 
                    noting the province's sound fiscal performance and trend of positive operating budgets 
                    (prior to the 2025 budget cycle).
                  </p>
                </div>
              </div>
            </div>

            {/* C.D. Howe Section */}
            <div style={{
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '16px',
              padding: '24px',
              border: '1px solid rgba(255,255,255,0.1)',
              marginBottom: '24px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '8px',
                  background: 'linear-gradient(135deg, #8b0000 0%, #5c0000 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '11px',
                  fontWeight: 700,
                  color: '#fff',
                  textAlign: 'center',
                  lineHeight: '1.1',
                }}>
                  C.D. Howe
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 600 }}>C.D. Howe Institute</h3>
                  <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>
                    Fiscal Accountability Report Card 2024
                  </p>
                </div>
              </div>

              <div style={{ fontSize: '14px', lineHeight: '1.7', color: 'rgba(255,255,255,0.85)' }}>
                <div style={{
                  padding: '16px',
                  background: 'rgba(244, 162, 97, 0.1)',
                  borderRadius: '10px',
                  borderLeft: '3px solid #F4A261',
                  marginBottom: '12px',
                }}>
                  <p style={{ margin: '0 0 8px 0' }}>
                    <strong>Transparency Grade: C–</strong>
                  </p>
                  <p style={{ margin: 0, color: 'rgba(255,255,255,0.7)' }}>
                    PEI received a grade of C– in C.D. Howe's 2024 fiscal accountability report card 
                    (revised from an earlier assessment due to implementation of new public sector accounting standards).
                  </p>
                </div>

                <div style={{
                  padding: '16px',
                  background: 'rgba(0,0,0,0.2)',
                  borderRadius: '10px',
                }}>
                  <p style={{ margin: '0 0 8px 0' }}>
                    <strong>What this measures:</strong>
                  </p>
                  <p style={{ margin: 0, color: 'rgba(255,255,255,0.7)' }}>
                    C.D. Howe grades governments on the clarity, reliability, and timeliness of budgets, 
                    estimates, and public accounts—not on spending decisions or debt levels. The grade reflects 
                    how well Islanders can access information to evaluate government finances.
                  </p>
                </div>
              </div>
            </div>

            {/* Summary Box */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(244, 162, 97, 0.15) 0%, rgba(230, 57, 70, 0.1) 100%)',
              borderRadius: '16px',
              padding: '24px',
              border: '1px solid rgba(244, 162, 97, 0.3)',
            }}>
              <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: 600, color: '#F4A261' }}>
                📊 Analyst Consensus Summary
              </h3>
              <div style={{ fontSize: '14px', lineHeight: '1.8', color: 'rgba(255,255,255,0.85)' }}>
                <p style={{ margin: '0 0 12px 0' }}>
                  <strong>The Good News:</strong> PEI maintains solid investment-grade credit ratings 
                  (A from DBRS, Aa2 from Moody's), reflecting strong underlying creditworthiness and 
                  the implicit backing of federal transfer programs.
                </p>
                <p style={{ margin: '0 0 12px 0' }}>
                  <strong>The Concern:</strong> All major analysts highlight the same issue—PEI is on a 
                  trajectory that <em>reverses a decade of debt reduction</em>. The projected climb to 
                  35.9% debt-to-GDP by 2027-28 would be the highest since 2014-15.
                </p>
                <p style={{ margin: 0 }}>
                  <strong>The Risk:</strong> Rising debt levels reduce "fiscal flexibility"—the province's 
                  ability to respond to future economic shocks, whether from trade disruptions, climate events, 
                  or healthcare pressures. With borrowing requirements doubling to $800M, interest costs will 
                  consume an increasing share of the budget.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer style={{
        background: 'rgba(0,0,0,0.3)',
        padding: '24px 32px',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        marginTop: '32px',
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ margin: 0, fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>
            Data sources: PEI Department of Finance • 2025-2026 Fiscal and Economic Update (December 2025) • 
            2026-2027 Capital Estimates
          </p>
          <p style={{ margin: '8px 0 0 0', fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>
            This tracker is for informational purposes only. For official government information, visit 
            princeedwardisland.ca
          </p>
        </div>
      </footer>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
