import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Sparkles } from 'lucide-react';
import { ContactButton } from './ContactButton';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Penetration Testing & Security Audit',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = formData.name.trim().slice(0, 80);
    const cleanEmail = formData.email.trim().slice(0, 100);
    const cleanMessage = formData.message.trim().slice(0, 1500);

    const subject = encodeURIComponent(`[Security Inquiry - ${formData.service}] from ${cleanName}`);
    const body = encodeURIComponent(
      `Name: ${cleanName}\nEmail: ${cleanEmail}\nService: ${formData.service}\n\nInquiry Details:\n${cleanMessage}`
    );

    window.location.href = `mailto:markdaniel693@gmail.com?subject=${subject}&body=${body}`;

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 select-none overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto bg-[#121212] border-2 border-[#D7E2EA]/30 rounded-[28px] sm:rounded-[40px] p-5 sm:p-8 md:p-10 shadow-2xl z-10"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="absolute top-4 right-4 sm:top-6 sm:right-6 text-[#D7E2EA]/70 hover:text-white p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full hover:bg-white/10 active:bg-white/20 transition-colors"
            >
              <X size={22} />
            </button>

            {submitted ? (
              <div className="py-10 sm:py-12 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-6">
                  <CheckCircle2 size={36} />
                </div>
                <h3 className="text-2xl sm:text-3xl font-black uppercase text-white mb-2">
                  Message Sent!
                </h3>
                <p className="text-[#D7E2EA]/70 max-w-md text-sm sm:text-base">
                  Thank you for reaching out. Mark Daniel will review your inquiry and reply within 24 hours.
                </p>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-2 mb-2 text-[#BBCCD7]">
                  <Sparkles size={18} />
                  <span className="uppercase text-xs tracking-widest font-medium">Let&apos;s Collaborate</span>
                </div>
                <h3 className="hero-heading text-2xl sm:text-4xl font-black uppercase tracking-tight mb-2">
                  Get in Touch
                </h3>
                <p className="text-[#D7E2EA]/70 text-xs sm:text-sm font-light mb-6">
                  Have a security inquiry, infrastructure project, or collaboration in mind? Drop your details below.
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#D7E2EA]/80 mb-1.5 font-medium">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={80}
                      autoComplete="name"
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#1b1c20] border border-white/10 rounded-xl px-4 py-3 text-sm sm:text-base text-white placeholder-white/30 focus:outline-none focus:border-[#BBCCD7] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#D7E2EA]/80 mb-1.5 font-medium">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      maxLength={100}
                      autoComplete="email"
                      placeholder="jane@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#1b1c20] border border-white/10 rounded-xl px-4 py-3 text-sm sm:text-base text-white placeholder-white/30 focus:outline-none focus:border-[#BBCCD7] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#D7E2EA]/80 mb-1.5 font-medium">
                      Service / Inquiry Type
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full bg-[#1b1c20] border border-white/10 rounded-xl px-4 py-3 text-sm sm:text-base text-white focus:outline-none focus:border-[#BBCCD7] transition-colors cursor-pointer"
                    >
                      <option value="Penetration Testing & Security Audit">Penetration Testing & Security Audit</option>
                      <option value="Vulnerability Assessment">Vulnerability Assessment</option>
                      <option value="Cloud & Infrastructure Hardening">Cloud & Infrastructure Hardening</option>
                      <option value="Incident Response & Threat Analysis">Incident Response & Threat Analysis</option>
                      <option value="General Inquiry / Collaboration">General Inquiry / Collaboration</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#D7E2EA]/80 mb-1.5 font-medium">
                      Project Details
                    </label>
                    <textarea
                      rows={3}
                      required
                      maxLength={1500}
                      placeholder="Tell me about your project, timeline, and requirements..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-[#1b1c20] border border-white/10 rounded-xl px-4 py-3 text-sm sm:text-base text-white placeholder-white/30 focus:outline-none focus:border-[#BBCCD7] transition-colors resize-none"
                    />
                  </div>

                  <div className="pt-2 flex justify-end">
                    <ContactButton label="Send Message" className="w-full sm:w-auto" />
                  </div>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
