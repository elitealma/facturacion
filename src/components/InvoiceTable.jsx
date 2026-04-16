import React, { useState } from 'react';
import { Search, ChevronLeft, ChevronRight, MoreVertical } from 'lucide-react';

const InvoiceTable = ({ invoices, loading, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSource, setFilterSource] = useState('All');

  const filteredInvoices = invoices.filter(inv => {
    const matchesSearch = inv.product?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          inv.id_dropi?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          inv.sku?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSource = filterSource === 'All' || inv.source === filterSource;
    return matchesSearch && matchesSource;
  });

  const getSourceIcon = (source) => {
    const colors = {
      'Droshippers': 'bg-[#4ade80]',
      'Ecommerce': 'bg-[#fbbf24]',
      'Respond': 'bg-[#f87171]'
    };
    return colors[source] || 'bg-zinc-500';
  };

  const getMethodBadgeClass = (method) => {
    return "px-3 py-1 text-[10px] font-bold uppercase rounded-full border border-white/[0.05] bg-[#ffffff]/5 text-zinc-300";
  };

  return (
    <div className="bg-[#1C1C1E] border border-white/[0.05] rounded-2xl overflow-hidden flex flex-col h-[800px]">
      
      {/* Header Formato Imagen 2 */}
      <div className="p-8 pb-4">
        <h2 className="text-3xl font-bold text-white mb-2">Panel de Sincronización</h2>
        <p className="text-sm text-zinc-500 font-medium">Vista de Proyección • Datos en Tiempo Real</p>
      </div>

      {/* Row de Filtros de Tabla */}
      <div className="px-8 py-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-6 bg-[#1a1a1c] border border-white/[0.05] p-2 rounded-lg">
           <div className="flex items-center gap-2 px-2">
             <span className="text-[10px] font-bold text-[#4ade80] uppercase tracking-wider">Fuente</span>
             <select 
               className="bg-transparent border-none text-sm text-white focus:outline-none cursor-pointer"
               value={filterSource}
               onChange={(e) => setFilterSource(e.target.value)}
             >
               <option value="All">Todos los Canales</option>
               <option value="Droshippers">Droshippers</option>
               <option value="Ecommerce">Ecommerce</option>
               <option value="Respond">Respond</option>
             </select>
           </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${getSourceIcon('Droshippers')}`}></div>
            <span className="text-xs text-zinc-400 font-medium">Droshippers</span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${getSourceIcon('Ecommerce')}`}></div>
            <span className="text-xs text-zinc-400 font-medium">Ecommerce</span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${getSourceIcon('Respond')}`}></div>
            <span className="text-xs text-zinc-400 font-medium">Respond</span>
          </div>
        </div>

        <div className="flex-1 max-w-sm relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input 
            type="text" 
            placeholder="Buscar por ID, SKU o Producto..."
            className="w-full bg-[#1a1a1c] border border-white/[0.05] rounded-lg py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-[#4ade80] transition-colors text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Tabla Principal */}
      <div className="flex-1 overflow-x-auto px-8">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/[0.05] text-[10px] font-bold uppercase tracking-widest text-zinc-500">
              <th className="py-4 font-semibold">Fuente</th>
              <th className="py-4 font-semibold">ID Dropi</th>
              <th className="py-4 font-semibold">Producto</th>
              <th className="py-4 font-semibold">SKU</th>
              <th className="py-4 font-semibold text-center">Cantidad</th>
              <th className="py-4 font-semibold text-right">Precio Individual</th>
              <th className="py-4 font-semibold text-right">Total De La Orden</th>
              <th className="py-4 font-semibold text-center">Método Pago</th>
              <th className="py-4 font-semibold w-10"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.02]">
            {loading ? (
              [...Array(5)].map((_, i) => (
                <tr key={i} className="animate-pulse">
                  <td colSpan="9" className="py-6">
                    <div className="h-8 bg-white/[0.02] rounded-lg w-full"></div>
                  </td>
                </tr>
              ))
            ) : filteredInvoices.length > 0 ? (
              filteredInvoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="py-6">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${getSourceIcon(inv.source)}`}></div>
                      <span className="text-sm font-medium text-zinc-300">{inv.source}</span>
                    </div>
                  </td>
                  <td className="py-6">
                    <span className="text-sm font-mono text-zinc-400 tracking-wider">#{inv.id_dropi}</span>
                  </td>
                  <td className="py-6">
                    <p className="text-sm font-bold text-white max-w-[180px] leading-snug">{inv.product}</p>
                  </td>
                  <td className="py-6">
                     <p className="text-xs text-zinc-500 uppercase tracking-widest bg-[#151515] p-1 rounded inline-block">{inv.sku || 'N/A'}</p>
                  </td>
                  <td className="py-6 text-center">
                    <span className="text-sm font-bold text-white">{String(inv.quantity).padStart(2, '0')}</span>
                  </td>
                  <td className="py-6 text-right">
                    <p className="text-sm font-medium text-zinc-300">${Number(inv.price).toLocaleString('en-US', {minimumFractionDigits: 2})}</p>
                  </td>
                  <td className="py-6 text-right">
                    <p className="text-sm font-bold text-[#4ade80]">${Number(inv.total).toLocaleString('en-US', {minimumFractionDigits: 2})}</p>
                  </td>
                  <td className="py-6 text-center">
                    <span className={getMethodBadgeClass(inv.method)}>{inv.method}</span>
                  </td>
                  <td className="py-6 text-right pr-2">
                     <button 
                        onClick={() => {
                          if (window.confirm('¿Estás seguro de eliminar este registro?')) {
                            onDelete(inv.id);
                          }
                        }}
                        className="p-1 opacity-0 group-hover:opacity-100 hover:bg-red-500/10 rounded-md text-zinc-600 hover:text-red-500 transition-all"
                        title="Eliminar registro"
                      >
                        <MoreVertical size={16} />
                      </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="py-20 text-center text-zinc-500">
                  No se encontraron registros.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer Paginacion */}
      <div className="px-8 py-6 flex items-center justify-between border-t border-white/[0.05]">
        <p className="text-xs text-zinc-500 font-medium">Mostrando {filteredInvoices.length} de {invoices.length} registros encontrados</p>
        <div className="flex gap-1">
          <button className="px-3 py-1.5 bg-[#151515] text-zinc-500 rounded"><ChevronLeft size={16}/></button>
          <button className="px-3 py-1.5 bg-[#4ade80] text-black font-bold rounded">1</button>
          <button className="px-3 py-1.5 bg-[#151515] text-zinc-400 hover:text-white rounded">2</button>
          <button className="px-3 py-1.5 bg-[#151515] text-zinc-400 hover:text-white rounded">3</button>
          <button className="px-3 py-1.5 bg-[#151515] text-zinc-400 hover:text-white rounded"><ChevronRight size={16}/></button>
        </div>
      </div>
    </div>
  );
};

export default InvoiceTable;
