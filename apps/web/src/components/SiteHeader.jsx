import React from 'react';
import { Download, Menu } from 'lucide-react';

function SiteHeader() {
    return (
        <header className="flex items-center justify-between px-4 py-3 bg-white">
            <button
                type="button"
                disabled
                aria-label="Descargar"
                className="h-11 w-11 rounded-full bg-[#25D366] flex items-center justify-center opacity-90 cursor-not-allowed"
            >
                <Download className="h-5 w-5 text-white" strokeWidth={2.5} />
            </button>
            <div className="flex items-center gap-2">
                <img
                    src="https://horizons-cdn.hostinger.com/f19503f1-817a-4f76-94b4-8446ad3c97a8/157c715c0169799a4c7e6249f0e4d546.png"
                    alt="WhatsApp"
                    className="h-14 w-14 object-contain"
                />
                <span className="text-2xl font-bold tracking-tight text-[#25D366]">WhatsApp</span>
            </div>
            <button type="button" aria-label="Menú" className="h-11 w-11 flex items-center justify-center">
                <Menu className="h-7 w-7 text-neutral-800" strokeWidth={2.5} />
            </button>
        </header>
    );
}

export default SiteHeader;
