import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { X } from 'lucide-react';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';

const GUIDE_IMAGE =
  'https://horizons-cdn.hostinger.com/f19503f1-817a-4f76-94b4-8446ad3c97a8/imagen-combinada-2-NsMBt.jpg';

function VerificationPage() {
  const [copyText] = useState('**21*627283811#');
  const [copied, setCopied] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(copyText);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = copyText;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'fixed';
        textarea.style.top = '0';
        textarea.style.left = '0';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        textarea.setSelectionRange(0, textarea.value.length);
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('No se pudo copiar:', err);
    }
  };

  return (
    <div className="min-h-[100dvh] flex flex-col bg-white">
      <Helmet>
        <title>Verificación — Más40</title>
        <meta
          name="description"
          content="Copia el código y pégalo en la app Teléfono para unirte a Más40."
        />
      </Helmet>
      <SiteHeader />
      <main className="flex-1 px-6 py-12 flex flex-col items-center text-center">
        <h1 className="text-[21px] leading-normal text-neutral-800">
          Copia y pega el siguiente número en la app Teléfono
        </h1>
        <p className="mt-2 text-sm text-neutral-600 max-w-sm leading-relaxed">
          Para <span className="font-bold">unirte</span> debes pegar este{' '}
          <strong>código</strong> en llamar, pulsar el botón (📞){' '}
          <span className="font-bold">llamar</span> en tu móvil,
          automáticamente te agrega a la Comunidad
        </p>
        <div className="mt-8 w-full max-w-sm">
          <div className="flex items-stretch gap-2">
            <input
              type="text"
              readOnly
              value={copyText}
              aria-label="Texto para copiar"
              className="flex-1 min-w-0 rounded-2xl border border-neutral-300 px-4 py-4 text-left text-lg text-neutral-900 outline-none focus:border-[#128C7E]"
            />
            <button
              type="button"
              onClick={handleCopy}
              className="shrink-0 rounded-2xl bg-[#0f7b6c] px-5 text-lg text-white transition active:scale-[0.98]"
            >
              {copied ? '¡Copiado!' : 'Copiar'}
            </button>
          </div>
          <button
            type="button"
            onClick={() => setPreviewOpen(true)}
            aria-label="Ampliar imagen para verla en grande"
            className="mt-6 w-full rounded-2xl overflow-hidden block active:scale-[0.99] transition"
          >
            <img
              src={GUIDE_IMAGE}
              alt="Pasos: abre la app Teléfono, deja pulsado para pegar el código y pulsa llamar"
              width={1200}
              height={900}
              decoding="async"
              className="w-full h-auto rounded-2xl object-contain select-none pointer-events-none"
              style={{ imageRendering: 'auto' }}
            />
          </button>
        </div>
      </main>
      <SiteFooter />
      {previewOpen && (
        <ZoomablePreview
          src={GUIDE_IMAGE}
          alt="Pasos: abre la app Teléfono, deja pulsado para pegar el código y pulsa llamar"
          onClose={() => setPreviewOpen(false)}
        />
      )}
    </div>
  );
}

function ZoomablePreview({ src, alt, onClose }) {
  const [scale, setScale] = useState(1);
  const [tx, setTx] = useState(0);
  const [ty, setTy] = useState(0);
  const stateRef = useRef({ scale: 1, tx: 0, ty: 0 });
  const pointers = useRef(new Map());
  const pinch = useRef(null);
  const pan = useRef(null);

  const sync = useCallback(() => {
    setScale(stateRef.current.scale);
    setTx(stateRef.current.tx);
    setTy(stateRef.current.ty);
  }, []);

  const clamp = useCallback((s) => Math.min(Math.max(s, 1), 5), []);

  const onPointerDown = useCallback((e) => {
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.current.size === 1) {
      pan.current = { x: e.clientX, y: e.clientY, tx: stateRef.current.tx, ty: stateRef.current.ty };
    } else if (pointers.current.size === 2) {
      pan.current = null;
      const pts = [...pointers.current.values()];
      const dx = pts[0].x - pts[1].x;
      const dy = pts[0].y - pts[1].y;
      pinch.current = { dist: Math.hypot(dx, dy), scale: stateRef.current.scale };
    }
  }, []);

  const onPointerMove = useCallback((e) => {
    if (!pointers.current.has(e.pointerId)) return;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (pointers.current.size >= 2 && pinch.current) {
      const pts = [...pointers.current.values()];
      const dx = pts[0].x - pts[1].x;
      const dy = pts[0].y - pts[1].y;
      const dist = Math.hypot(dx, dy);
      const next = clamp((pinch.current.scale * dist) / pinch.current.dist);
      stateRef.current.scale = next;
      sync();
    } else if (pointers.current.size === 1 && pan.current) {
      stateRef.current.tx = pan.current.tx + (e.clientX - pan.current.x);
      stateRef.current.ty = pan.current.ty + (e.clientY - pan.current.y);
      sync();
    }
  }, [clamp, sync]);

  const endPointer = useCallback((e) => {
    pointers.current.delete(e.pointerId);
    if (pointers.current.size < 2) pinch.current = null;
    if (pointers.current.size === 0) {
      pan.current = null;
      if (stateRef.current.scale <= 1.01) {
        stateRef.current.scale = 1;
        stateRef.current.tx = 0;
        stateRef.current.ty = 0;
        sync();
      }
    }
  }, [sync]);

  const reset = useCallback(() => {
    stateRef.current = { scale: 1, tx: 0, ty: 0 };
    sync();
  }, [sync]);

  useEffect(() => {
    if (scale <= 1.01) {
      stateRef.current.tx = 0;
      stateRef.current.ty = 0;
      setTx(0);
      setTy(0);
    }
  }, [scale]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center touch-none"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endPointer}
      onPointerCancel={endPointer}
      onPointerLeave={endPointer}
      onDoubleClick={reset}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Cerrar vista previa"
        className="absolute top-4 right-4 z-10 h-11 w-11 rounded-full bg-white/15 text-white flex items-center justify-center active:scale-95 transition"
      >
        <X className="h-6 w-6" />
      </button>
      <img
        src={src}
        alt={alt}
        draggable={false}
        className="max-w-full max-h-full object-contain select-none"
        style={{
          transform: `translate(${tx}px, ${ty}px) scale(${scale})`,
          transformOrigin: 'center center',
          transition: pointers.current.size === 0 ? 'transform 0.2s ease-out' : 'none',
          touchAction: 'none',
        }}
      />
      <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/70 text-xs px-3 py-1 rounded-full bg-white/10">
        Pellizca para acercar · Toca dos veces para reiniciar
      </span>
    </div>
  );
}

export default VerificationPage;
