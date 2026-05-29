import React from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import StatsCard from '../components/StatsCard';
import { 
  FiDollarSign, FiShoppingBag, FiUsers, FiActivity, 
  FiArrowUpRight, FiCheckCircle, FiClock, FiAlertCircle 
} from 'react-icons/fi';

export default function AdminDashboard() {
  const { analytics, recentActivities, vendors, users } = useSelector(state => state.admin);

  // Render a responsive, clean, premium linear SVG Sales Chart
  const renderSalesChart = () => {
    const data = analytics.monthlySales;
    const width = 500;
    const height = 180;
    const padding = 20;

    const maxVal = Math.max(...data.map(d => d.sales)) || 100000;
    const minVal = 0;

    const points = data.map((d, i) => {
      const x = padding + (i / (data.length - 1)) * (width - padding * 2);
      const y = height - padding - ((d.sales - minVal) / (maxVal - minVal)) * (height - padding * 2);
      return `${x},${y}`;
    }).join(' ');

    return (
      <div className="w-full bg-white border border-slate-100 p-4 sm:p-5 rounded-3xl shadow-premium relative">
        <div className="flex items-center justify-between mb-4 sm:mb-6 gap-2">
          <div>
            <h3 className="text-xs sm:text-sm font-black text-slate-800 uppercase tracking-wider">Revenue Growth Tendency</h3>
            <p className="text-[9px] sm:text-[10px] text-slate-400 font-bold uppercase mt-0.5">Monthly platform performance log</p>
          </div>
          <span className="text-[9px] sm:text-[10px] bg-teal-light text-teal font-black uppercase px-2 py-0.5 rounded-full shrink-0">+35% YTD</span>
        </div>
        <div className="relative w-full overflow-hidden">
          <svg viewBox={`0 0 ${width} ${height}`} className="w-full overflow-visible">
            {/* Horizontal Gridlines */}
            {[0, 0.25, 0.5, 0.75, 1].map((ratio, idx) => {
              const y = padding + ratio * (height - padding * 2);
              return (
                <line 
                  key={idx} 
                  x1={padding} 
                  y1={y} 
                  x2={width - padding} 
                  y2={y} 
                  stroke="#F1F5F9" 
                  strokeWidth="1" 
                  strokeDasharray="4"
                />
              );
            })}
            
            {/* The Gradient area below line */}
            <defs>
              <linearGradient id="chart-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-teal)" stopOpacity="0.2"/>
                <stop offset="100%" stopColor="var(--color-teal)" stopOpacity="0.0"/>
              </linearGradient>
            </defs>
            <path
              d={`M ${padding},${height - padding} L ${points} L ${width - padding},${height - padding} Z`}
              fill="url(#chart-grad)"
            />

            {/* Main spline polyline */}
            <polyline
              fill="none"
              stroke="var(--color-teal)"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={points}
            />

            {/* Dynamic Interactive dots */}
            {data.map((d, i) => {
              const x = padding + (i / (data.length - 1)) * (width - padding * 2);
              const y = height - padding - ((d.sales - minVal) / (maxVal - minVal)) * (height - padding * 2);
              return (
                <g key={i} className="cursor-pointer group">
                  <circle
                    cx={x}
                    cy={y}
                    r="5"
                    fill="var(--color-teal)"
                    stroke="#FFFFFF"
                    strokeWidth="2"
                  />
                  <circle
                    cx={x}
                    cy={y}
                    r="10"
                    fill="var(--color-teal)"
                    opacity="0.15"
                    className="group-hover:scale-125 transition-transform"
                  />
                </g>
              );
            })}
          </svg>
        </div>
        
        {/* X Axis month titles */}
        <div className="flex justify-between px-4 mt-3 text-[9px] font-black text-slate-400 uppercase tracking-widest">
          {data.map((d, i) => <span key={i}>{d.name}</span>)}
        </div>
      </div>
    );
  };

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col gap-4 sm:gap-6 overflow-y-auto custom-scrollbar pr-1 pb-4 animate-fade-in">
      
      {/* Page Header */}
      <div className="flex flex-row items-center justify-between gap-2 border-b border-slate-100 pb-2 shrink-0">
        <div>
          <h1 className="text-base sm:text-xl font-extrabold text-slate-800 leading-none">Super Admin Analytics</h1>
          <p className="text-[10px] sm:text-xs text-slate-400 font-bold uppercase mt-1 tracking-wider leading-tight hidden sm:block">
            Consolidated overview of sellers, billing statements, and consult scheduling.
          </p>
          <p className="text-[10px] text-slate-400 font-bold uppercase mt-1 tracking-wider leading-tight sm:hidden">
            Overview of platform performance.
          </p>
        </div>
        <div className="text-[9px] sm:text-[10px] font-black uppercase text-slate-400 flex items-center gap-1.5 bg-white border border-slate-100 px-2 sm:px-3 py-1 sm:py-1.5 rounded-2xl shadow-sm select-none shrink-0">
          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-teal animate-ping" />
          <span className="hidden sm:inline">Realtime Feed Active</span>
          <span className="sm:hidden">Active</span>
        </div>
      </div>

      {/* Primary KPI Deck */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 shrink-0">
        <StatsCard 
          title="Total Gross Revenue" 
          value={`₹${analytics.totalRevenue.toLocaleString()}`} 
          change="+18.4%" 
          isPositive={true} 
          icon={FiDollarSign} 
          color="teal" 
          sparklineData={[10, 15, 20, 18, 30, 45, 40]}
        />
        <StatsCard 
          title="Platform Commission" 
          value={`₹${analytics.platformCommission.toLocaleString()}`} 
          change="+15.2%" 
          isPositive={true} 
          icon={FiDollarSign} 
          color="forest" 
          sparklineData={[5, 12, 18, 14, 25, 38, 35]}
        />
        <StatsCard 
          title="Fulfillment Orders" 
          value={`${analytics.totalOrdersCount}`} 
          change="+24.1%" 
          isPositive={true} 
          icon={FiShoppingBag} 
          color="coral" 
          sparklineData={[8, 14, 25, 20, 32, 48, 44]}
        />
        <StatsCard 
          title="Merchant Partners" 
          value={`${vendors.length}`} 
          change="+8.3%" 
          isPositive={true} 
          icon={FiUsers} 
          color="gold" 
          sparklineData={[12, 14, 15, 15, 18, 22, 20]}
        />
      </section>

      {/* Charts & System timeline deck */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Left 2 cols for Spline chart */}
        <div className="lg:col-span-2 flex flex-col gap-5">
          {renderSalesChart()}
          
          {/* Quick Stats overview cards */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-tr from-teal to-forest text-white p-4 sm:p-5 rounded-3xl shadow-premium relative overflow-hidden">
              <span className="text-[9px] font-black uppercase tracking-wider text-white/70">Verified Customer Core</span>
              <h4 className="text-2xl sm:text-3xl font-black mt-2">{users.length} Active</h4>
              <p className="text-[10px] font-bold text-white/80 mt-1 uppercase">With zero active disputes</p>
              <div className="absolute right-3 bottom-3 sm:right-4 sm:bottom-4 w-10 h-10 sm:w-12 sm:h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                <FiUsers className="text-lg sm:text-xl text-white" />
              </div>
            </div>
            <div className="bg-white border border-slate-100 p-4 sm:p-5 rounded-3xl shadow-premium relative overflow-hidden">
              <span className="text-[9px] font-black uppercase tracking-wider text-slate-400">Approval Queue</span>
              <h4 className="text-2xl sm:text-3xl font-black mt-2 text-slate-800">{vendors.filter(v => v.status === 'pending').length} Pending</h4>
              <p className="text-[10px] font-bold text-coral mt-1 uppercase">Awaiting KYC Documents</p>
              <div className="absolute right-3 bottom-3 sm:right-4 sm:bottom-4 w-10 h-10 sm:w-12 sm:h-12 bg-coral-light rounded-2xl flex items-center justify-center">
                <FiAlertCircle className="text-lg sm:text-coral" />
              </div>
            </div>
          </div>
        </div>

        {/* Right side: Live Logs Timeline */}
        <div className="bg-white border border-slate-100 p-4 sm:p-5 rounded-3xl shadow-premium flex flex-col h-full justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 sm:mb-5 border-b border-slate-50 pb-3">
              <div>
                <h3 className="text-xs sm:text-sm font-black text-slate-800 uppercase tracking-wider">Live System Audits</h3>
                <p className="text-[9px] text-slate-400 font-bold uppercase mt-0.5">Chronological platform activities</p>
              </div>
              <FiActivity className="text-teal animate-spin-slow" />
            </div>

            <div className="flex flex-col gap-4.5 max-h-[310px] overflow-y-auto pr-1 no-scrollbar">
              {recentActivities.map((act) => {
                let badgeColor = 'bg-teal-light text-teal';
                if (act.type === 'vendor') badgeColor = 'bg-gold-light text-gold-dark';
                if (act.type === 'order') badgeColor = 'bg-forest/10 text-forest';
                if (act.type === 'payout') badgeColor = 'bg-coral-light text-coral';

                return (
                  <div key={act.id} className="flex items-start gap-3 border-l-2 border-slate-100 pl-4 relative ml-1">
                    <span className="absolute -left-[6px] top-1.5 w-2.5 h-2.5 rounded-full bg-slate-300 border-2 border-white" />
                    <div>
                      <p className="text-xs font-semibold text-slate-700 leading-normal">{act.text}</p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className={`text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${badgeColor}`}>
                          {act.type}
                        </span>
                        <span className="text-[9px] text-slate-400 font-semibold">{act.time}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="border-t border-slate-50 pt-4 mt-5 flex items-center justify-center">
            <span className="text-[9px] text-slate-400 font-black uppercase tracking-widest">
              Last updated: Just now
            </span>
          </div>

        </div>

      </section>

    </div>
  );
}
