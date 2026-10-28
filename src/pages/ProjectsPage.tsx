import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Layers,
  GraduationCap,
  Shield,
  CheckCircle2,
  Image as ImageIcon,
  Sparkles,
} from 'lucide-react';
import { FadeIn } from '../components/FadeIn';
import { usePortfolio } from '../context/PortfolioContext';
import type { ProjectItem } from '../data/portfolioData';

type CategoryFilter =
  | 'All'
  | 'Cybersecurity & Threat Analysis'
  | 'Cloud & Distributed Systems'
  | 'Web & Software Architecture';

export const ProjectsPage: React.FC = () => {
  const { data: PORTFOLIO_DATA } = usePortfolio();
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('All');

  const categories: { label: CategoryFilter; count: number }[] = [
    { label: 'All', count: PORTFOLIO_DATA.projects.length },
    {
      label: 'Cybersecurity & Threat Analysis',
      count: PORTFOLIO_DATA.projects.filter(
        (p) => p.category === 'Cybersecurity & Threat Analysis'
      ).length,
    },
    {
      label: 'Cloud & Distributed Systems',
      count: PORTFOLIO_DATA.projects.filter(
        (p) => p.category === 'Cloud & Distributed Systems'
      ).length,
    },
    {
      label: 'Web & Software Architecture',
      count: PORTFOLIO_DATA.projects.filter(
        (p) => p.category === 'Web & Software Architecture'
      ).length,
    },
  ];

  const filteredProjects: ProjectItem[] =
    selectedCategory === 'All'
      ? PORTFOLIO_DATA.projects
      : PORTFOLIO_DATA.projects.filter((p) => p.category === selectedCategory);

  return (
    <div className="w-full pt-28 pb-20 sm:pb-24 px-4 sm:px-6 md:px-10 bg-[#0C0C0C]">
      <div className="max-w-5xl mx-auto flex flex-col gap-10 sm:gap-14">
        {/* Header & Filters Section */}
        <section data-section-id="sec-projects-header" className="flex flex-col gap-6">
          <FadeIn delay={0} y={30}>
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] sm:text-xs uppercase tracking-widest text-[#BBCCD7] mb-3">
              <Shield size={13} className="text-emerald-400" />
              <span>Academic Coursework & Technical Case Studies</span>
            </div>
            <h1 className="hero-heading text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight leading-none mb-4 sm:mb-6">
              Technical Projects
            </h1>
            <p className="text-sm sm:text-lg text-[#D7E2EA]/75 font-light max-w-2xl leading-relaxed">
              Applied cybersecurity investigations, packet-level network analysis, multi-AZ cloud architecture, and web systems developed through academic research at Staffordshire University and Edith Cowan University.
            </p>
          </FadeIn>

          {/* Category Filters */}
          <FadeIn delay={0.08} y={15}>
            <div className="flex flex-wrap gap-2 pt-1 border-b border-white/10 pb-4">
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat.label;
                return (
                  <button
                    key={cat.label}
                    onClick={() => setSelectedCategory(cat.label)}
                    className={`px-4 py-2 rounded-full text-xs font-medium uppercase tracking-wider transition-all flex items-center gap-2 min-h-[40px] cursor-pointer ${
                      isSelected
                        ? 'bg-white text-black shadow-lg font-semibold'
                        : 'bg-white/5 text-[#D7E2EA]/70 hover:bg-white/10 hover:text-white border border-white/10'
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                        isSelected ? 'bg-black/15 text-black' : 'bg-white/10 text-[#D7E2EA]/60'
                      }`}
                    >
                      {cat.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </FadeIn>
        </section>

        {/* Projects Cards List */}
        <section data-section-id="sec-projects-list" className="flex flex-col gap-8 sm:gap-10">
          {filteredProjects.map((project, idx) => (
            <FadeIn key={project.id} delay={idx * 0.08} y={20}>
              <div className="bg-[#141416] border-2 border-[#D7E2EA]/25 hover:border-[#D7E2EA]/50 rounded-[28px] sm:rounded-[36px] p-6 sm:p-10 shadow-2xl relative overflow-hidden transition-all duration-300 group">
                <div className="flex flex-col gap-6">
                  {/* Top Metadata Row */}
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-3 py-1 text-[11px] font-semibold uppercase tracking-wider bg-white/10 text-white rounded-full">
                        {project.category}
                      </span>
                      <span className="px-3 py-1 text-[11px] font-semibold uppercase tracking-wider bg-emerald-500/10 text-emerald-300 border border-emerald-500/25 rounded-full flex items-center gap-1.5">
                        <GraduationCap size={13} />
                        <span>{project.institution}</span>
                      </span>
                      {project.moduleCode && (
                        <span className="px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider bg-purple-500/10 text-purple-300 border border-purple-500/30 rounded-full">
                          {project.moduleCode}
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-white/40 font-mono hidden sm:inline-block">
                      {project.status}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold uppercase text-white mb-2 break-words group-hover:text-[#BBCCD7] transition-colors">
                      {project.name}
                    </h2>
                    <p className="text-xs sm:text-base text-[#BBCCD7] font-light">
                      {project.tagline}
                    </p>
                  </div>

                  {/* Short Description */}
                  <p className="text-xs sm:text-base text-[#D7E2EA]/85 font-light leading-relaxed">
                    {project.shortDescription}
                  </p>

                  {/* Highlights Grid: What I Did vs What I Gained */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    {/* What I Did Preview */}
                    <div className="p-4 sm:p-5 rounded-2xl bg-black/40 border border-white/10 flex flex-col justify-between">
                      <h4 className="text-xs uppercase tracking-widest text-[#BBCCD7] mb-2.5 font-semibold flex items-center gap-1.5">
                        <Sparkles size={14} className="text-amber-400" />
                        <span>What I Did</span>
                      </h4>
                      <ul className="space-y-1.5 text-xs text-[#D7E2EA]/80 font-light">
                        {project.whatIDid.slice(0, 2).map((item, iIdx) => (
                          <li key={iIdx} className="flex items-start gap-2">
                            <span className="text-emerald-400 shrink-0 mt-0.5">•</span>
                            <span className="line-clamp-2">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* What I Gained Preview */}
                    <div className="p-4 sm:p-5 rounded-2xl bg-black/40 border border-white/10 flex flex-col justify-between">
                      <h4 className="text-xs uppercase tracking-widest text-[#BBCCD7] mb-2.5 font-semibold flex items-center gap-1.5">
                        <CheckCircle2 size={14} className="text-purple-400" />
                        <span>What I Gained</span>
                      </h4>
                      <ul className="space-y-1.5 text-xs text-[#D7E2EA]/80 font-light">
                        {project.whatIGained.slice(0, 2).map((item, gIdx) => (
                          <li key={gIdx} className="flex items-start gap-2">
                            <span className="text-purple-400 shrink-0 mt-0.5">•</span>
                            <span className="line-clamp-2">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Thumbnail Screenshot Previews (if available) */}
                  {project.screenshots && project.screenshots.length > 0 && (
                    <div className="flex flex-col gap-2 pt-2">
                      <div className="flex items-center justify-between text-xs text-white/50">
                        <span className="flex items-center gap-1.5">
                          <ImageIcon size={14} /> Scenario Screenshots & Diagrams ({project.screenshots.length})
                        </span>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                        {project.screenshots.slice(0, 4).map((shot, sIdx) => (
                          <div
                            key={sIdx}
                            className="aspect-[16/10] bg-black/60 rounded-xl overflow-hidden border border-white/10 relative p-1 flex items-center justify-center"
                          >
                            <img
                              src={shot.image}
                              alt={shot.title}
                              className="w-full h-full object-cover rounded-lg opacity-85 group-hover:opacity-100 transition-opacity"
                              loading="lazy"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tech stack */}
                  <div>
                    <h4 className="text-xs uppercase tracking-widest text-white/50 mb-2.5 font-semibold flex items-center gap-1.5">
                      <Layers size={14} /> Tools, Protocols & Technologies
                    </h4>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {project.technologies.slice(0, 7).map((tech) => (
                        <span
                          key={tech}
                          className="text-xs px-2.5 sm:px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-[#D7E2EA]"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 7 && (
                        <span className="text-xs px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-white/50">
                          +{project.technologies.length - 7} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Bottom Action Bar */}
                  <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                    <div className="text-xs text-white/50 font-light flex items-center gap-1.5">
                      <Shield size={14} className="text-emerald-400 shrink-0" />
                      <span>Academic report analysis & verifiable coursework artifacts.</span>
                    </div>

                    <Link
                      to={`/projects/${project.slug}`}
                      className="rounded-full text-white font-medium uppercase tracking-widest px-8 py-3.5 text-xs sm:text-sm flex items-center justify-center gap-2 hover:brightness-110 active:scale-[0.98] transition-all w-full sm:w-auto text-center cursor-pointer shadow-xl"
                      style={{
                        background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
                        outline: '2px solid #FFFFFF',
                        outlineOffset: '-3px',
                      }}
                    >
                      <span>Explore Technical Case Study</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </section>

        {/* Academic Foundation Verification Notice */}
        <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-white/[0.02] border border-white/10 text-center flex flex-col items-center">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-3">
            <GraduationCap size={22} />
          </div>
          <h3 className="text-base sm:text-lg font-bold uppercase text-white mb-2">
            Academic Integrity & Practical Research
          </h3>
          <p className="text-xs sm:text-sm text-[#D7E2EA]/60 max-w-xl font-light leading-relaxed mb-4">
            Coursework deliverables and case studies demonstrate hands-on protocol packet inspection, incident forensics, threat intelligence modeling, and enterprise cloud design completed at Edith Cowan University and Staffordshire University.
          </p>
          <span className="text-[11px] text-white/40 uppercase tracking-widest">
            Portfolio of {PORTFOLIO_DATA.identity.fullName} • {PORTFOLIO_DATA.identity.onlineIdentity}
          </span>
        </div>
      </div>
    </div>
  );
};
