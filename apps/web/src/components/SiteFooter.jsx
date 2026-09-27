import React from 'react';
import { Download, Instagram, Facebook, Youtube, Twitter, ChevronDown } from 'lucide-react';

const LOGO = 'https://horizons-cdn.hostinger.com/f19503f1-817a-4f76-94b4-8446ad3c97a8/6633ac7017eaad1caf6d109f507b523c.jpg';

const columns = [
    { title: 'Lo que hacemos', links: ['Funciones', 'Blog', 'Seguridad', 'Para empresas'] },
    { title: 'Quiénes somos', links: ['Acerca de nosotros', 'Empleos', 'Centro de marca', 'Privacidad'] },
    { title: 'Usa Más40', links: ['Android', 'iPhone', 'Mac/PC', 'Más40 Web'] },
    { title: '¿Necesitas ayuda?', links: ['Contáctanos', 'Centro de ayuda', 'Aplicaciones', 'Avisos de seguridad'] },
];

function SiteFooter() {
    return (
        <footer className="bg-[#0f1c22] text-white">
            <div className="px-6 py-8 flex justify-center border-b border-white/10">
                <button
                    type="button"
                    disabled
                    className="w-full max-w-sm rounded-full bg-[#25D366] text-[#0b141a] text-xl font-medium py-4 flex items-center justify-center gap-3 opacity-90 cursor-not-allowed"
                >
                    Descargar
                    <Download className="h-6 w-6" />
                </button>
            </div>

            <div className="py-7 flex items-center justify-center gap-5 border-b border-white/10">
                {[Twitter, Youtube, Instagram, Facebook].map((Icon, i) => (
                    <span key={i} className="h-14 w-14 rounded-full border border-white/40 flex items-center justify-center">
                        <Icon className="h-6 w-6" />
                    </span>
                ))}
            </div>

            <div className="px-6 pt-10 pb-8">
                <div className="flex items-center gap-3 mb-9">
                    <img src={LOGO} alt="Más40" className="h-10 w-10 object-contain bg-white rounded-full p-0.5" />
                    <span className="text-3xl font-bold tracking-tight">Más40</span>
                </div>
                <div className="grid grid-cols-2 gap-x-8 gap-y-9 max-w-3xl">
                    {columns.map((col) => (
                        <div key={col.title}>
                            <p className="text-white/50 text-base mb-4">{col.title}</p>
                            <ul className="space-y-3">
                                {col.links.map((l) => (
                                    <li key={l}>
                                        <a href="/" className="text-xl text-white hover:underline">{l}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            <div className="px-6 py-7 border-t border-white/10 space-y-1 text-white/90">
                <p><a href="/" className="hover:underline">Mapa del sitio</a></p>
                <p><a href="/" className="hover:underline">Condiciones y Política de privacidad</a></p>
                <p>{new Date().getFullYear()} © Más40</p>
                <div className="pt-4">
                    <div className="relative max-w-sm">
                        <select
                            aria-label="Idioma"
                            defaultValue="es"
                            className="w-full appearance-none rounded-full border border-white/70 bg-transparent px-6 py-4 text-lg font-bold text-white outline-none"
                        >
                            <option value="es" className="text-black">Español</option>
                            <option value="en" className="text-black">English</option>
                            <option value="pt" className="text-black">Português</option>
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 h-6 w-6" />
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default SiteFooter;
