import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Users, ShieldCheck, CheckCircle2, AlertTriangle, Layers, Code, FileText, Image as ImageIcon } from 'lucide-react';
import { FadeIn } from '../components/FadeIn';
import { usePortfolio } from '../context/PortfolioContext';

export const AltriumCaseStudyPage: React.FC = () => {
  const { data: PORTFOLIO_DATA } = usePortfolio();
  const caseStudy = PORTFOLIO_DATA.altriumCaseStudy;

  return (
    <div className="w-full pt-28 pb-20 sm:pb-24 px-4 sm:px-6 md:px-10 bg-[#0C0C0C]">
      <div className="max-w-4xl mx-auto flex flex-col gap-10 sm:gap-14">
        {/* Back Link */}
        <FadeIn delay={0} y={-10}>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#BBCCD7] hover:text-white transition-colors py-2 min-h-[44px]"
          >
            <ArrowLeft size={14} />
            <span>Back to Projects</span>
          </Link>
        </FadeIn>

        {/* Title & Metadata */}
        <div>
          <FadeIn delay={0.1} y={20}>
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mb-3">
              <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-amber-500/10 text-amber-300 border border-amber-500/30 rounded-full">
                {caseStudy.status}
              </span>
              <span className="text-xs text-white/50 font-mono">
                Academic / Client Scenario
              </span>
            </div>
            <h1 className="hero-heading text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight leading-tight mb-4 break-words">
              {caseStudy.title}
            </h1>
            <p className="text-sm sm:text-xl text-[#BBCCD7] font-light leading-relaxed">
              {caseStudy.subtitle}
            </p>
          </FadeIn>
        </div>

        {/* Disclaimer Notice */}
        <FadeIn delay={0.15} y={20}>
          <div className="p-5 rounded-2xl bg-white/[0.03] border border-amber-500/30 flex items-start gap-3">
            <AlertTriangle size={20} className="text-amber-400 shrink-0 mt-0.5" />
            <p className="text-xs sm:text-sm text-[#D7E2EA]/80 font-light leading-relaxed">
              {caseStudy.statusDisclaimer}
            </p>
          </div>
        </FadeIn>

        {/* 1. Overview */}
        <section className="flex flex-col gap-4">
          <h2 className="text-xl sm:text-2xl font-bold uppercase text-white flex items-center gap-2">
            <FileText size={20} className="text-[#BBCCD7]" /> Overview
          </h2>
          <p className="text-sm sm:text-base text-[#D7E2EA]/85 font-light leading-relaxed">
            {caseStudy.overview}
          </p>
        </section>

        {/* 2. Problem Addressed */}
        <section className="flex flex-col gap-4">
          <h2 className="text-xl sm:text-2xl font-bold uppercase text-white">Problem Addressed</h2>
          <div className="p-6 rounded-2xl bg-[#141416] border border-white/10">
            <p className="text-sm sm:text-base text-[#D7E2EA]/85 font-light leading-relaxed">
              {caseStudy.problemAddressed}
            </p>
          </div>
        </section>

        {/* 3. Intended Users & Roles */}
        <section className="flex flex-col gap-4">
          <h2 className="text-xl sm:text-2xl font-bold uppercase text-white flex items-center gap-2">
            <Users size={20} className="text-[#BBCCD7]" /> Intended Users
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {caseStudy.userRoles.map((roleItem, rIdx) => (
              <div key={rIdx} className="p-5 rounded-2xl bg-[#141416] border border-white/10">
                <h3 className="text-base font-bold text-white uppercase mb-1.5">{roleItem.role}</h3>
                <p className="text-xs sm:text-sm text-[#D7E2EA]/75 font-light leading-relaxed">
                  {roleItem.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Features */}
        <section className="flex flex-col gap-4">
          <h2 className="text-xl sm:text-2xl font-bold uppercase text-white">Application Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {caseStudy.features.map((feat, fIdx) => (
              <div key={fIdx} className="flex items-start gap-2.5 p-3.5 rounded-xl bg-white/[0.03] border border-white/5">
                <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-[#D7E2EA]/90 font-light">{feat}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Access-Control Approach */}
        <section className="flex flex-col gap-4">
          <h2 className="text-xl sm:text-2xl font-bold uppercase text-white flex items-center gap-2">
            <ShieldCheck size={20} className="text-emerald-400" /> Access-Control Approach
          </h2>
          <div className="p-6 rounded-2xl bg-[#141416] border border-white/10 flex flex-col gap-4">
            <p className="text-sm text-white font-medium">
              {caseStudy.accessControlApproach.summary}
            </p>
            <ul className="flex flex-col gap-2">
              {caseStudy.accessControlApproach.details.map((detail, dIdx) => (
                <li key={dIdx} className="flex items-start gap-2 text-xs sm:text-sm text-[#D7E2EA]/80 font-light leading-relaxed">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs text-[#D7E2EA]/60 italic">
              {caseStudy.accessControlApproach.disclaimer}
            </div>
          </div>
        </section>

        {/* 6. Technology Stack & Deployment */}
        <section className="flex flex-col gap-4">
          <h2 className="text-xl sm:text-2xl font-bold uppercase text-white flex items-center gap-2">
            <Layers size={20} className="text-[#BBCCD7]" /> Technology Stack & Deployment
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {caseStudy.techStack.map((stack, sIdx) => (
              <div key={sIdx} className="p-4 rounded-xl bg-[#141416] border border-white/10">
                <span className="text-xs font-semibold uppercase tracking-wider text-white/50 block mb-1">
                  {stack.category}
                </span>
                <span className="text-sm font-medium text-white">{stack.tech}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 7. Contribution Clarification (Marked for Mark's confirmation) */}
        <section className="flex flex-col gap-4">
          <h2 className="text-xl sm:text-2xl font-bold uppercase text-white flex items-center gap-2">
            <Code size={20} className="text-purple-400" /> Contribution Clarification
          </h2>
          <div className="p-6 rounded-2xl bg-purple-950/20 border border-purple-500/30 flex flex-col gap-4">
            <div className="flex items-start gap-2.5">
              <AlertTriangle size={18} className="text-purple-300 shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm text-purple-200 font-light leading-relaxed">
                {caseStudy.contribution.clarificationNote}
              </p>
            </div>

            <h4 className="text-xs uppercase tracking-widest text-white/70 font-bold mt-2">
              Confirmed Responsibilities & QA Deliverables
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {caseStudy.contribution.confirmedResponsibilities.map((resp, rIdx) => (
                <li key={rIdx} className="flex items-start gap-2 text-xs text-[#D7E2EA]/85 font-light">
                  <CheckCircle2 size={13} className="text-purple-400 shrink-0 mt-0.5" />
                  <span>{resp}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 8. Lessons Learned */}
        <section className="flex flex-col gap-4">
          <h2 className="text-xl sm:text-2xl font-bold uppercase text-white">Lessons Learned</h2>
          <div className="flex flex-col gap-3">
            {caseStudy.lessonsLearned.map((lesson, lIdx) => (
              <div key={lIdx} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-xs sm:text-sm text-[#D7E2EA]/80 font-light leading-relaxed">
                {lesson}
              </div>
            ))}
          </div>
        </section>

        {/* 9. Screenshots Placeholder */}
        <section className="flex flex-col gap-4">
          <h2 className="text-xl sm:text-2xl font-bold uppercase text-white flex items-center gap-2">
            <ImageIcon size={20} className="text-[#BBCCD7]" /> Project Screenshots
          </h2>
          <div className="h-48 rounded-2xl border-2 border-dashed border-white/20 bg-white/[0.02] flex flex-col items-center justify-center text-center p-6">
            <ImageIcon size={32} className="text-white/30 mb-2" />
            <p className="text-xs sm:text-sm text-white/60 font-medium">
              {caseStudy.assetsNotice.screenshots}
            </p>
            <span className="text-[11px] text-white/40 mt-1">
              No simulated or fake screenshots are displayed.
            </span>
          </div>
        </section>

        {/* 10. Links & Demo */}
        <section className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold uppercase text-white">Repository & Live Deployment</h3>
            <p className="text-xs text-[#D7E2EA]/60 font-light mt-1">
              {caseStudy.assetsNotice.repoUrl}
            </p>
          </div>
          <span className="text-xs uppercase tracking-wider text-white/40 border border-white/10 rounded-full px-4 py-2">
            Awaiting Link Confirmation
          </span>
        </section>
      </div>
    </div>
  );
};
