import React, { useState } from 'react';
import { Search, Filter, Download, MoreVertical, ExternalLink } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const InvoiceTable = ({ invoices, loading, onRefresh, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSource, setFilterSource] = useState('All');

  const filteredInvoices = invoices.filter(inv => {
    const matchesSearch = inv.product?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          inv.id_dropi?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSource = filterSource === 'All' || inv.source === filterSource;
    return matchesSearch && matchesSource;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Synced': return <span className="badge badge-success">Sincronizado</span>;
      case 'Pending': return <span className="badge badge-pending">Pendiente</span>;
      case 'Error': return <span className="badge badge-error">Error</span>;
      default: return <span className="badge">{status}</span>;
    }
  };

  const getSourceIcon = (source) => {
    const colors = {
      'Droshippers': 'text-emerald-500',
      'Ecommerce': 'text-blue-500',
      'Respond': 'text-purple-500'
    };
    return colors[source] || 'text-zinc-500';
  };

  return (
    <div className="glass rounded-2xl overflow-hidden">
      <div className="p-6 border-b border-white/[0.05] flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold">Panel de Sincronización</h2>
          <p className="text-sm text-zinc-500">Monitoreo de facturas en tiempo real</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input 
              type="text" 
              placeholder="Buscar por producto o ID..."
              className="bg-zinc-900 border border-white/[0.05] rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-emerald-500 transition-colors w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select 
            className="bg-zinc-900 border border-white/[0.05] rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-emerald-500 transition-colors"
            value={filterSource}
            onChange={(e) => setFilterSource(e.target.value)}
          >
            <option value="All">Todas las fuentes</option>
            <option value="Droshippers">Droshippers</option>
            <option value="Ecommerce">Ecommerce</option>
            <option value="Respond">Respond</option>
          </select>

          <button className="p-2 bg-zinc-900 border border-white/[0.05] rounded-lg text-zinc-400 hover:text-white transition-colors">
            <Download size={18} />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/[0.02] text-xs uppercase tracking-wider text-zinc-500">
              <th className="px-6 py-4 font-semibold">Fuente</th>
              <th className="px-6 py-4 font-semibold">ID Orden</th>
              <th className="px-6 py-4 font-semibold">Producto</th>
              <th className="px-6 py-4 font-semibold">Cantidad</th>
              <th className="px-6 py-4 font-semibold">Precio / Total</th>
              <th className="px-6 py-4 font-semibold">Método</th>
              <th className="px-6 py-4 font-semibold">Status</th>
              <th className="px-6 py-4 font-semibold">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.05]">
            {loading ? (
              [...Array(5)].map((_, i) => (
                <tr key={i} className="animate-pulse">
                  <td colSpan="8" className="px-6 py-4">
                    <div className="h-10 bg-white/[0.02] rounded-lg"></div>
                  </td>
                </tr>
              ))
            ) : filteredInvoices.length > 0 ? (
              filteredInvoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${getSourceIcon(inv.source).replace('text-', 'bg-')}`}></div>
                      <span className="text-sm font-medium">{inv.source}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-mono text-zinc-400">#{inv.id_dropi}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="max-w-[200px] truncate">
                      <p className="text-sm font-medium">{inv.product}</p>
                      <p className="text-[10px] text-zinc-500 uppercase">SKU: {inv.sku}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm">{inv.quantity}</span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm">${Number(inv.price).toLocaleString()}</p>
                    <p className="text-xs text-zinc-500">${Number(inv.total).toLocaleString()} total</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs px-2 py-1 bg-zinc-800 rounded text-zinc-400">{inv.method}</span>
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(inv.status)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 hover:bg-zinc-800 rounded-md text-zinc-400 hover:text-white">
                        <ExternalLink size={16} />
                      </button>
                      <button 
                        onClick={() => {
                          if (window.confirm('¿Estás seguro de eliminar este registro?')) {
                            onDelete(inv.id);
                          }
                        }}
                        className="p-1.5 hover:bg-red-500/10 rounded-md text-zinc-400 hover:text-red-500 transition-colors"
                        title="Eliminar registro"
                      >
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="px-6 py-12 text-center text-zinc-500 italic">
                  No se encontraron registros.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="p-4 border-t border-white/[0.05] bg-white/[0.01] flex items-center justify-between">
        <p className="text-xs text-zinc-500">Mostrando {filteredInvoices.length} de {invoices.length} registros</p>
        <div className="flex gap-2">
          <button className="px-3 py-1 text-xs bg-zinc-900 border border-white/[0.05] rounded text-zinc-500 hover:text-white disabled:opacity-50" disabled>Anterior</button>
          <button className="px-3 py-1 text-xs bg-zinc-900 border border-white/[0.05] rounded text-emerald-500 hover:bg-emerald-500/10 transition-colors">Siguiente</button>
        </div>
      </div>
    </div>
  );
};

export default InvoiceTable;
