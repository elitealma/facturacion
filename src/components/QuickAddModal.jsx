import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send } from 'lucide-react';

const QuickAddModal = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    source: 'Droshippers',
    id_dropi: '',
    product: '',
    sku: '',
    quantity: 1,
    price: '',
    method: 'Contra Entrega'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({
      ...formData,
      id: Math.random().toString(36).substr(2, 9),
      total: formData.quantity * formData.price,
      status: 'Synced',
      created_at: new Date().toISOString()
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="glass w-full max-w-lg rounded-2xl overflow-hidden relative z-10"
          >
            <div className="p-6 border-b border-white/[0.05] flex items-center justify-between">
              <h2 className="text-xl font-bold italic tracking-tight">Nueva Orden Manual</h2>
              <button onClick={onClose} className="p-2 text-zinc-400 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-zinc-500 uppercase">Fuente</label>
                  <select 
                    className="w-full bg-zinc-900 border border-white/[0.05] rounded-lg p-2 text-sm focus:border-emerald-500 transition-colors"
                    value={formData.source}
                    onChange={(e) => setFormData({...formData, source: e.target.value})}
                  >
                    <option>Droshippers</option>
                    <option>Ecommerce</option>
                    <option>Respond</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-zinc-500 uppercase">ID Dropi</label>
                  <input 
                    type="text" 
                    required
                    className="w-full bg-zinc-900 border border-white/[0.05] rounded-lg p-2 text-sm focus:border-emerald-500 transition-colors"
                    value={formData.id_dropi}
                    onChange={(e) => setFormData({...formData, id_dropi: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-500 uppercase">Producto</label>
                <input 
                  type="text" 
                  required
                  className="w-full bg-zinc-900 border border-white/[0.05] rounded-lg p-2 text-sm focus:border-emerald-500 transition-colors"
                  value={formData.product}
                  onChange={(e) => setFormData({...formData, product: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-zinc-500 uppercase">Cantidad</label>
                  <input 
                    type="number" 
                    min="1"
                    required
                    className="w-full bg-zinc-900 border border-white/[0.05] rounded-lg p-2 text-sm focus:border-emerald-500 transition-colors"
                    value={formData.quantity}
                    onChange={(e) => setFormData({...formData, quantity: parseInt(e.target.value)})}
                  />
                </div>
                <div className="space-y-1 col-span-2">
                  <label className="text-xs font-semibold text-zinc-500 uppercase">Precio Unitario (COP)</label>
                  <input 
                    type="number" 
                    required
                    className="w-full bg-zinc-900 border border-white/[0.05] rounded-lg p-2 text-sm focus:border-emerald-500 transition-colors"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value)})}
                  />
                </div>
              </div>

              <div className="pt-4">
                <button 
                  type="submit" 
                  className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-black font-bold rounded-xl transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
                >
                  <Send size={18} />
                  Crear Registro
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default QuickAddModal;
