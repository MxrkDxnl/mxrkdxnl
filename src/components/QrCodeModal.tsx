import React, { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ArrowUpRight } from 'lucide-react';

interface QrCodeModalProps {
  open: boolean;
  onClose: () => void;
  name: string;
  handle: string;
  url: string;
  qrImage: string;
}

/**
 * Small pop-up showing a scannable QR code for a messenger profile.
 * Closes on Escape, backdrop click, or the close button; focus moves into the
 * dialog on open and back to the trigger on close.
 */
export const QrCodeModal: React.FC<QrCodeModalProps> = ({ open, onClose, name, handle, url, qrImage }) => {
  const closeRef = useRef<HTMLButtonElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!open) return;
    returnFocusRef.current = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden'; // stop the page scrolling behind the pop-up

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCloseRef.current();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
      returnFocusRef.current?.focus();
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="qr-backdrop"
          className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/75 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="qr-modal-title"
            className="relative w-full max-w-[340px] rounded-[28px] bg-white px-6 pt-12 pb-6 sm:px-8 sm:pb-8 shadow-[0_30px_80px_rgba(0,0,0,0.55)]"
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={{ type: 'spring', damping: 24, stiffness: 320 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 id="qr-modal-title" className="sr-only">
              {name} QR code for {handle}
            </h2>

            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close QR code"
              className="absolute top-2.5 right-2.5 w-11 h-11 rounded-full flex items-center justify-center text-neutral-500 hover:text-black hover:bg-black/5 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-black"
            >
              <X size={20} />
            </button>

            {/* QR code with the handle printed underneath (cropped from the Telegram share card) */}
            <img
              src={qrImage}
              alt={`${name} QR code for ${handle}`}
              width={670}
              height={820}
              className="w-full h-auto"
            />

            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 w-full min-h-[48px] rounded-full bg-black hover:bg-neutral-800 text-white text-xs sm:text-sm font-semibold uppercase tracking-widest flex items-center justify-center gap-2 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              <span>Open in {name}</span>
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
