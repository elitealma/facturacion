import React from 'react';

const Header = () => {
  return (
    <header className="pt-8 pb-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-[#4ade80] uppercase">
          ELITE FACTURACIÓN
        </h1>
        
        <nav className="flex items-center gap-8 mt-4 md:mt-0">
          <a href="#" className="text-sm font-semibold text-[#4ade80] border-b-2 border-[#4ade80] py-1">
            Dashboard
          </a>
          <a href="#" className="text-sm font-semibold text-zinc-400 hover:text-white transition-colors py-1">
            Reportes
          </a>
          <a href="#" className="text-sm font-semibold text-zinc-400 hover:text-white transition-colors py-1">
            Configuración
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
