import React from 'react';
import { RefreshCw, LayoutDashboard, Settings, User } from 'lucide-react';
import { motion } from 'framer-motion';

const Header = ({ onRefresh, loading, progress }) => {
  return (
    <header className="glass-header h-20 relative">
      {loading && (
        <motion.div 
          className="absolute bottom-0 left-0 h-[2px] bg-emerald-500 z-50 shadow-[0_0_10px_#10b981]"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ ease: "linear" }}
        />
      )}
      <div className="container h-full flex items-center justify-between">
        <div className="flex items-center gap-8">
          <motion.div 
            className="flex items-center gap-2"
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <LayoutDashboard size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
                Elite Facturación
              </h1>
              <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-semibold">
                Intelligence Dashboard
              </p>
            </div>
          </motion.div>

          <nav className="hidden md:flex items-center gap-6">
            <a href="#" className="text-sm font-medium text-emerald-500 border-b-2 border-emerald-500 py-1">Monitoring</a>
            <a href="#" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">History</a>
            <a href="#" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Sync Tools</a>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={onRefresh}
            disabled={loading}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              loading 
                ? 'bg-zinc-800 text-zinc-500' 
                : 'bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 active:bg-emerald-500/30'
            }`}
          >
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
            {loading ? `Sincronizando ${Math.round(progress)}%` : 'Sincronizar'}
          </motion.button>
          
          <div className="h-8 w-[1px] bg-white/[0.05]"></div>
          
          <button className="p-2 text-zinc-400 hover:text-white transition-colors">
            <Settings size={20} />
          </button>
          <button className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center border border-white/[0.05] overflow-hidden">
            <User size={20} className="text-zinc-400" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
