import React from 'react';
import { Calendar } from 'lucide-react';

const Filters = () => {
  return (
    <div className="flex flex-wrap items-end gap-6 pb-6 mb-6 border-b border-white/[0.05]">
      
      {/* Rango de Fecha */}
      <div className="space-y-2">
        <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Rango de Fecha</label>
        <div className="flex items-center gap-2 bg-[#1C1C1E] border border-white/[0.05] rounded-md px-3 py-2 w-48">
          <input 
            type="text" 
            placeholder="mm/dd/yyyy" 
            className="bg-transparent border-none text-sm text-zinc-300 w-full focus:outline-none"
          />
          <Calendar size={14} className="text-zinc-500" />
        </div>
      </div>

      {/* Ciudad */}
      <div className="space-y-2">
        <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Ciudad</label>
        <select className="bg-[#1C1C1E] border border-white/[0.05] text-zinc-300 rounded-md px-3 py-2 text-sm w-48 appearance-none focus:outline-none">
          <option>Todas las ciudades</option>
          <option>Bogotá</option>
          <option>Medellín</option>
          <option>Cali</option>
        </select>
      </div>

      {/* Área Operativa */}
      <div className="space-y-2">
        <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Área Operativa</label>
        <div className="flex bg-[#1C1C1E] p-1 rounded-md border border-white/[0.05]">
          <button className="px-4 py-1.5 text-xs font-bold rounded bg-[#4ade80] text-black">
            DROPI
          </button>
          <button className="px-4 py-1.5 text-xs font-bold rounded text-zinc-400 hover:text-white transition-colors">
            RESPOND
          </button>
        </div>
      </div>

      {/* Tipo Dropi */}
      <div className="space-y-2">
        <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Tipo Dropi</label>
        <div className="flex items-center gap-4 h-[34px]">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="accent-[#4ade80] w-4 h-4 cursor-pointer" defaultChecked />
            <span className="text-sm text-zinc-300">Ecommerce</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="accent-[#4ade80] w-4 h-4 cursor-pointer" defaultChecked />
            <span className="text-sm text-zinc-300">Droshippers</span>
          </label>
        </div>
      </div>

    </div>
  );
};

export default Filters;
