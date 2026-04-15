import React, { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import Header from './components/Header';
import StatsGrid from './components/StatsGrid';
import InvoiceTable from './components/InvoiceTable';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalAmount: 0,
    totalCount: 0,
    syncedCount: 0,
    pendingCount: 0
  });

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('invoices')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      setInvoices(data || []);
      calculateStats(data || []);
    } catch (error) {
      console.error('Error fetching invoices:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (data) => {
    const total = data.reduce((acc, curr) => acc + Number(curr.total), 0);
    const synced = data.filter(item => item.status === 'Synced').length;
    const pending = data.filter(item => item.status === 'Pending').length;

    setStats({
      totalAmount: total,
      totalCount: data.length,
      syncedCount: synced,
      pendingCount: pending
    });
  };

  return (
    <div className="min-h-screen">
      <Header onRefresh={fetchInvoices} loading={loading} />
      
      <main className="container py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <StatsGrid stats={stats} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8"
        >
          <InvoiceTable 
            invoices={invoices} 
            loading={loading} 
            onRefresh={fetchInvoices}
          />
        </motion.div>
      </main>

      <footer className="py-12 mt-20 border-t border-white/[0.05] text-center text-zinc-500 text-sm">
        <p>&copy; 2026 Elite Facturación - Powered by Pegasus 360 Agency</p>
      </footer>
    </div>
  );
}

export default App;
