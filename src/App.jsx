import React, { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import Header from './components/Header';
import Filters from './components/Filters';
import StatsGrid from './components/StatsGrid';
import InvoiceTable from './components/InvoiceTable';
import QuickAddModal from './components/QuickAddModal';

function App() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stats, setStats] = useState({
    totalAmount: 0,
    totalCount: 0,
    syncedCount: 0,
    pendingCount: 0
  });

  const dummyData = [
    {
      id: "1",
      source: "Droshippers",
      id_dropi: "99821-X",
      product: "Smartwatch Ultra Gen 2",
      sku: "SW-ULT-G2-BLK",
      quantity: 2,
      price: 185,
      total: 370,
      method: "TRANSFERENCIA",
      status: "Synced"
    },
    {
      id: "2",
      source: "Ecommerce",
      id_dropi: "88210-B",
      product: "Auriculares Noise Cancelling",
      sku: "AUD-NC-2024",
      quantity: 1,
      price: 210,
      total: 210,
      method: "TARJETA CRÉDITO",
      status: "Synced"
    },
    {
      id: "3",
      source: "Respond",
      id_dropi: "44512-Y",
      product: "Base Carga Inalámbrica",
      sku: "CHG-WRL-BASE",
      quantity: 5,
      price: 45,
      total: 225,
      method: "CONTRA ENTREGA",
      status: "Pending"
    }
  ];

  useEffect(() => {
    fetchInvoices();

    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'invoices',
        },
        (payload) => {
          console.log('Cambio detectado en tiempo real:', payload);
          fetchInvoices();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchInvoices = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('invoices')
        .select('*')
        .order('created_at', { ascending: false });

      if (error || !data || data.length === 0) {
        setInvoices(dummyData);
        calculateStats(dummyData);
      } else {
        setInvoices(data);
        calculateStats(data);
      }
    } catch (error) {
      setInvoices(dummyData);
      calculateStats(dummyData);
    } finally {
      setLoading(false);
    }
  };

  const handleManualAdd = async (newInvoice) => {
    try {
      const { id, ...invoiceToInsert } = newInvoice;
      const { error } = await supabase
        .from('invoices')
        .insert([invoiceToInsert]);

      if (error) throw error;
    } catch (error) {
      const updatedInvoices = [{...newInvoice, id: Math.random().toString()}, ...invoices];
      setInvoices(updatedInvoices);
      calculateStats(updatedInvoices);
    }
  };

  const handleDelete = async (id) => {
    try {
      const { error } = await supabase
        .from('invoices')
        .delete()
        .eq('id', id);

      if (error) throw error;
    } catch (error) {
      const updatedInvoices = invoices.filter(inv => inv.id !== id);
      setInvoices(updatedInvoices);
      calculateStats(updatedInvoices);
    }
  };

  const calculateStats = (data) => {
    const total = data.reduce((acc, curr) => acc + Number(curr.total), 0);
    const synced = data.filter(item => item.status === 'Synced' || item.source !== 'Respond').length; // Mock logic 
    const pending = data.length - synced;

    setStats({
      totalAmount: total,
      totalCount: data.length,
      syncedCount: synced,
      pendingCount: pending
    });
  };

  return (
    <div className="min-h-screen bg-[#111111] pb-20">
      <div className="container max-w-[1500px] mx-auto px-6">
        <Header />
        <Filters />
        
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8">
          <div>
             <StatsGrid stats={stats} />
          </div>

          <div>
             <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white tracking-tight">Historial General de Facturas</h2>
                <div className="flex items-center gap-4">
                  <span className="text-xs text-zinc-500 font-bold tracking-widest uppercase">Mostrando {invoices.length} de 3.402 entradas</span>
                  <button 
                    onClick={() => setIsModalOpen(true)}
                    className="px-4 py-2 bg-[#4ade80]/10 text-[#4ade80] hover:bg-[#4ade80]/20 font-bold text-xs uppercase tracking-widest rounded transition-colors"
                  >
                    + Agregar
                  </button>
                </div>
             </div>

             <InvoiceTable 
               invoices={invoices} 
               loading={loading} 
               onDelete={handleDelete}
             />
          </div>
        </div>
      </div>

      <QuickAddModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAdd={handleManualAdd}
      />

      <div className="container max-w-[1500px] mx-auto px-6 mt-10 flex justify-between items-center border-t border-white/[0.05] pt-6">
        <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest py-4">Elite Facturación V4.0.2 // Optimizado para alta resolución</p>
        <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest py-4 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#4ade80]"></span> Sistema Online  2024 © Propiedad Intelectual Reservada
        </p>
      </div>
    </div>
  );
}

export default App;
