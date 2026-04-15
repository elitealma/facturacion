import React from 'react';
import { DollarSign, Package, CheckCircle2, Clock } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, color, trend }) => (
  <div className="glass p-6 rounded-2xl flex items-start justify-between group hover:border-white/20 transition-all">
    <div>
      <p className="text-sm font-medium text-zinc-400 mb-1">{title}</p>
      <h3 className="text-2xl font-bold">{value}</h3>
      {trend && (
        <p className={`text-xs mt-2 ${trend > 0 ? 'text-emerald-500' : 'text-zinc-500'}`}>
          {trend > 0 ? '+' : ''}{trend}% desde ayer
        </p>
      )}
    </div>
    <div className={`p-3 rounded-xl ${color} bg-opacity-10 text-opacity-100`}>
      <Icon size={24} style={{ color: color.replace('bg-', '') }} />
    </div>
  </div>
);

const StatsGrid = ({ stats }) => {
  const formatCurrency = (val) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard 
        title="Ventas Totales" 
        value={formatCurrency(stats.totalAmount)} 
        icon={DollarSign}
        color="bg-emerald-500"
        trend={12.5}
      />
      <StatCard 
        title="Ordenes Totales" 
        value={stats.totalCount} 
        icon={Package}
        color="bg-blue-500"
      />
      <StatCard 
        title="Sincronizadas" 
        value={stats.syncedCount} 
        icon={CheckCircle2}
        color="bg-emerald-400"
      />
      <StatCard 
        title="Pendientes" 
        value={stats.pendingCount} 
        icon={Clock}
        color="bg-amber-500"
      />
    </div>
  );
};

export default StatsGrid;
