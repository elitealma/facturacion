import React, { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import Header from './components/Header';
import StatsGrid from './components/StatsGrid';
import InvoiceTable from './components/InvoiceTable';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [syncProgress, setSyncProgress] = useState(0);
  const [isSyncing, setIsSyncing] = useState(false);
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
      id_dropi: "982341",
      product: "Proteína Whey Elite 2kg",
      sku: "PROT-WHEY-01",
      quantity: 2,
      price: 150000,
      total: 300000,
      method: "Contra Entrega",
      status: "Synced"
    },
    {
      id: "2",
      source: "Ecommerce",
      id_dropi: "776251",
      product: "Creatina Monohidratada 500g",
      sku: "CREA-MONO-02",
      quantity: 1,
      price: 85000,
      total: 85000,
      method: "PSE",
      status: "Pending"
    },
    {
      id: "3",
      source: "Respond",
      id_dropi: "112233",
      product: "Pre-Workout Nitro X",
      sku: "PREW-NIT-03",
      quantity: 3,
      price: 120000,
      total: 360000,
      method: "Tarjeta de Crédito",
      status: "Synced"
    },
    {
      id: "4",
      source: "Droshippers",
      id_dropi: "982345",
      product: "BCAA Powder 300g",
      sku: "BCAA-300",
      quantity: 1,
      price: 65000,
      total: 65000,
      method: "Contra Entrega",
      status: "Synced"
    }
  ];

  useEffect(() => {
    fetchInvoices();
  }, []);

  const handleSync = async () => {
    setIsSyncing(true);
    setSyncProgress(0);
    
    // Simulate progress
    const interval = setInterval(() => {
      setSyncProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 400);

    await new Promise(resolve => setTimeout(resolve, 3000));
    await fetchInvoices();
    
    clearInterval(interval);
    setSyncProgress(100);
    setTimeout(() => {
      setIsSyncing(false);
      setSyncProgress(0);
    }, 500);
  };

  const fetchInvoices = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('invoices')
        .select('*')
        .order('created_at', { ascending: false });

      if (error || !data || data.length === 0) {
        console.warn('Using dummy data as Supabase is not responding or empty.');
        setInvoices(dummyData);
        calculateStats(dummyData);
      } else {
        setInvoices(data);
        calculateStats(data);
      }
    } catch (error) {
      console.error('Error fetching invoices, using dummy data:', error);
      setInvoices(dummyData);
      calculateStats(dummyData);
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
      <Header onRefresh={handleSync} loading={isSyncing} progress={syncProgress} />
      
      <main className="container py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <StatsGrid stats={stats} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-8"
        >
          <InvoiceTable 
            invoices={invoices} 
            loading={loading} 
            onRefresh={handleSync}
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
