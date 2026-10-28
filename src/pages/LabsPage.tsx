import React from 'react';
import { FileText, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { FadeIn } from '../components/FadeIn';
import { usePortfolio } from '../context/PortfolioContext';

export const LabsPage: React.FC = () => {
  const { data: PORTFOLIO_DATA } = usePortfolio();
  const labs = PORTFOLIO_DATA.labs;

  return (
    <div className="w-full pt-28 pb-20 sm:pb-24 px-4 sm:px-6 md:px-10 bg-[#0C0C0C]">
      <div className="max-w-5xl mx-auto flex flex-col gap-10 sm:gap-14">
        {/* Header & Policy */}
        <section data-section-id="sec-labs-header" className="flex flex-col gap-6">
          <FadeIn delay={0} y={30}>
            <span className="text-xs uppercase tracking-widest text-[#BBCCD7] font-semibold block mb-3">
              Hands-On Exercises & Defensive Notes
            </span>
            <h1 className="hero-heading text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight leading-none mb-4 sm:mb-6">
              Cybersecurity Labs
            </h1>
            <p className="text-sm sm:text-lg text-[#D7E2EA]/75 font-light max-w-2xl leading-relaxed">
              {labs.intro}
            </p>
          </FadeIn>

          {/* Documentation Policy Notice */}
          <FadeIn delay={0.1} y={20}>
            <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-blue-500/30 flex items-start gap-3">
              <AlertCircle size={20} className="text-blue-400 shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm text-[#D7E2EA]/85 font-light leading-relaxed">
                <strong>Publication Integrity Policy:</strong> Only verified, completed write-ups with defensible security insights are published here. Current exercises are maintained as structured drafts pending final confirmation of specific flags, logs, and defensive summaries.
              </div>
            </div>
          </FadeIn>
        </section>

        {/* Lab Entries Listing */}
        <section data-section-id="sec-labs-list" className="flex flex-col gap-6 sm:gap-8">
          {labs.knownActivities.map((entry, idx) => (
            <FadeIn key={entry.id} delay={idx * 0.15} y={20}>
              <div className="bg-[#141416] border border-white/10 rounded-2xl sm:rounded-3xl p-5 sm:p-8 flex flex-col gap-4 sm:gap-5">
                <div className="flex flex-wrap items-center justify-between gap-2.5 sm:gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20 flex items-center gap-1.5">
                      <Clock size={12} /> Status: {entry.status}
                    </span>
                    <span className="text-xs text-white/50 font-mono">
                      {entry.platform}
                    </span>
                  </div>
                </div>

                <div>
                  <h2 className="text-xl sm:text-2xl font-bold uppercase text-white mb-2 break-words">
                    {entry.title}
                  </h2>
                  <p className="text-xs sm:text-base text-[#D7E2EA]/80 font-light leading-relaxed">
                    {entry.description}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs uppercase tracking-widest text-white/50 mb-2.5 font-semibold">
                    Tools & Utilities
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {entry.tools.map((tool) => (
                      <span
                        key={tool}
                        className="text-xs px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[#D7E2EA]"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-[#D7E2EA]/70 italic">
                  <strong>Status Note:</strong> {entry.notes}
                </div>
              </div>
            </FadeIn>
          ))}
        </section>

        {/* Future Write-up Schema Template */}
        <section data-section-id="sec-labs-framework" className="bg-[#141416] border border-white/10 rounded-3xl p-6 sm:p-8">
          <div className="flex items-center gap-2.5 mb-4">
            <FileText size={18} className="text-[#BBCCD7]" />
            <h2 className="text-lg sm:text-xl font-bold uppercase text-white">
              Write-up Specification Framework
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#D7E2EA]/70 font-light mb-6 leading-relaxed">
            Every published lab report adheres strictly to a standardized template designed for technical auditability and defensive relevance:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {labs.entryTemplateFields.map((field, fIdx) => (
              <div key={fIdx} className="flex items-center gap-2 p-3 rounded-xl bg-white/[0.03] border border-white/5 text-xs text-[#D7E2EA]">
                <CheckCircle2 size={14} className="text-[#BBCCD7] shrink-0" />
                <span className="font-mono">{field}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
