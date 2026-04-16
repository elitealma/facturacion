import React from 'react';
import { CheckCircle2, FileText, AlertCircle } from 'lucide-react';

const StatsGrid = ({ stats }) => {
  return (
    <div className="flex flex-col gap-4">
      {/* Exitosas */}
      <div className="bg-[#1C1C1E] p-5 rounded-2xl border border-white/[0.05]">
        <div className="flex justify-between items-start mb-4">
          <div className="bg-[#4ade80]/10 p-2 rounded-full">
            <CheckCircle2 size={20} className="text-[#4ade80]" />
          </div>
          <span className="text-[#4ade80] text-[10px] font-bold uppercase tracking-widest mt-1">
            Ratio 98%
          </span>
        </div>
        <p className="text-sm font-medium text-zinc-400 mb-1">Exitosas</p>
        <h3 className="text-3xl font-bold text-[#4ade80]">{stats.syncedCount.toLocaleString()}</h3>
      </div>

      {/* Existentes */}
      <div className="bg-[#1C1C1E] p-5 rounded-2xl border border-white/[0.05]">
        <div className="flex justify-between items-start mb-4">
          <div className="bg-[#fbbf24]/10 p-2 rounded-full">
            <FileText size={20} className="text-[#fbbf24]" />
          </div>
          <span className="text-[#fbbf24] text-[10px] font-bold uppercase tracking-widest mt-1">
            Actualizado
          </span>
        </div>
        <p className="text-sm font-medium text-zinc-400 mb-1">Facturas Existentes</p>
        <h3 className="text-3xl font-bold text-white">{stats.totalCount.toLocaleString()}</h3>
      </div>

      {/* Errores */}
      <div className="bg-[#1C1C1E] p-5 rounded-2xl border border-white/[0.05]">
        <div className="flex justify-between items-start mb-4">
          <div className="bg-[#ef4444]/10 p-2 rounded-full">
            <AlertCircle size={20} className="text-[#f87171]" />
          </div>
          <span className="text-[#f87171] text-[10px] font-bold uppercase tracking-widest mt-1">
            Crítico
          </span>
        </div>
        <p className="text-sm font-medium text-zinc-400 mb-1">Errores de Factura</p>
        <h3 className="text-3xl font-bold text-[#f87171]">{stats.pendingCount.toLocaleString()}</h3>
      </div>
    </div>
  );
};

export default StatsGrid;
