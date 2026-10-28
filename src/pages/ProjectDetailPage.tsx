import React, { useState } from 'react';
import { useParams, Link, Navigate, useLocation } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Shield,
  Layers,
  CheckCircle2,
  FileText,
  Maximize2,
  X,
  GraduationCap,
  Sparkles,
} from 'lucide-react';
import { FadeIn } from '../components/FadeIn';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import type { ProjectItem, ProjectScreenshot } from '../data/portfolioData';

export const ProjectDetailPage: React.FC = () => {
  const { slug: paramSlug } = useParams<{ slug: string }>();
  const location = useLocation();

  // Robust slug extraction: works whether matched via :slug, static route, or trailing slashes
  const pathSlug = location.pathname.replace(/^\/projects\/?/, '').split('/')[0]?.trim();
  const slug = paramSlug || pathSlug;

  const [activeImage, setActiveImage] = useState<ProjectScreenshot | null>(null);

  const projectIndex = PORTFOLIO_DATA.projects.findIndex((p) => p.slug === slug);
  const project: ProjectItem | undefined = PORTFOLIO_DATA.projects[projectIndex];

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  const prevProject = projectIndex > 0 ? PORTFOLIO_DATA.projects[projectIndex - 1] : null;
  const nextProject =
    projectIndex < PORTFOLIO_DATA.projects.length - 1
      ? PORTFOLIO_DATA.projects[projectIndex + 1]
      : null;

  return (
    <div className="w-full pt-28 pb-20 sm:pb-24 px-4 sm:px-6 md:px-10 bg-[#0C0C0C]">
      <div className="max-w-4xl mx-auto flex flex-col gap-10 sm:gap-14">
        {/* Top Navigation */}
        <FadeIn delay={0} y={-10}>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#BBCCD7] hover:text-white transition-colors py-2 min-h-[44px]"
          >
            <ArrowLeft size={14} />
            <span>Back to Projects Overview</span>
          </Link>
        </FadeIn>

        {/* Title & Metadata Banner */}
        <div>
          <FadeIn delay={0.08} y={20}>
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mb-3">
              <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-white/10 text-white border border-white/15 rounded-full">
                {project.category}
              </span>
              <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 rounded-full flex items-center gap-1.5">
                <GraduationCap size={13} />
                <span>{project.institution}</span>
              </span>
              {project.moduleCode && (
                <span className="px-2.5 py-1 text-xs font-mono uppercase tracking-wider bg-purple-500/10 text-purple-300 border border-purple-500/30 rounded-full">
                  {project.moduleCode}
                </span>
              )}
            </div>

            <h1 className="hero-heading text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight leading-tight mb-4 break-words">
              {project.name}
            </h1>
            <p className="text-sm sm:text-lg text-[#BBCCD7] font-light leading-relaxed">
              {project.tagline}
            </p>
          </FadeIn>
        </div>

        {/* Executive Overview */}
        <FadeIn delay={0.14} y={20}>
          <div className="bg-[#141416] border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl">
            <h2 className="text-sm uppercase tracking-widest text-white/50 mb-3 font-semibold flex items-center gap-2">
              <FileText size={16} className="text-[#BBCCD7]" />
              <span>Executive Overview</span>
            </h2>
            <p className="text-sm sm:text-base text-[#D7E2EA] font-light leading-relaxed">
              {project.overview}
            </p>
          </div>
        </FadeIn>

        {/* 1. What Happened / The Scenario */}
        <FadeIn delay={0.18} y={20}>
          <section className="flex flex-col gap-3">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-amber-400 font-semibold">
              <Shield size={16} />
              <span>Context & Incident Background</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold uppercase text-white">
              What Happened
            </h2>
            <div className="p-6 sm:p-8 rounded-2xl bg-[#111113] border border-white/10 leading-relaxed text-sm sm:text-base text-[#D7E2EA]/85 font-light">
              <p>{project.whatHappened}</p>
            </div>
          </section>
        </FadeIn>

        {/* 2. What I Did / Technical Execution */}
        <FadeIn delay={0.22} y={20}>
          <section className="flex flex-col gap-4">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#BBCCD7] font-semibold">
              <Sparkles size={16} />
              <span>Technical Actions & Analysis</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold uppercase text-white">
              What I Did
            </h2>
            <div className="grid grid-cols-1 gap-3.5">
              {project.whatIDid.map((action, idx) => (
                <div
                  key={idx}
                  className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-[#141416] border border-white/10 flex items-start gap-3.5 hover:border-white/20 transition-colors"
                >
                  <div className="w-6 h-6 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 size={15} />
                  </div>
                  <p className="text-xs sm:text-sm text-[#D7E2EA]/90 font-light leading-relaxed">
                    {action}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </FadeIn>

        {/* 3. What I Gained / Core Competencies */}
        <FadeIn delay={0.26} y={20}>
          <section className="flex flex-col gap-4">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-purple-400 font-semibold">
              <GraduationCap size={16} />
              <span>Core Competencies & Defensive Takeaways</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold uppercase text-white">
              What I Gained
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.whatIGained.map((takeaway, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-gradient-to-br from-white/[0.04] to-transparent border border-white/10 flex flex-col justify-between"
                >
                  <span className="text-[11px] font-mono text-purple-300 uppercase tracking-widest mb-2">
                    Takeaway 0{idx + 1}
                  </span>
                  <p className="text-xs sm:text-sm text-[#D7E2EA]/90 font-light leading-relaxed">
                    {takeaway}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </FadeIn>

        {/* 4. Visual Evidence & Scenario Screenshots */}
        {project.screenshots && project.screenshots.length > 0 && (
          <FadeIn delay={0.3} y={20}>
            <section className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#BBCCD7] font-semibold mb-1">
                    <Layers size={16} />
                    <span>Scenario Artifacts & Analysis</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold uppercase text-white">
                    Visual Evidence & Diagrams
                  </h2>
                </div>
                <span className="text-xs text-white/40 hidden sm:inline-block">
                  Click to enlarge
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {project.screenshots.map((shot, sIdx) => (
                  <div
                    key={sIdx}
                    onClick={() => setActiveImage(shot)}
                    className="group cursor-pointer bg-[#141416] border border-white/10 hover:border-white/30 rounded-2xl overflow-hidden transition-all flex flex-col shadow-lg"
                  >
                    <div className="relative aspect-[4/3] bg-black/60 overflow-hidden flex items-center justify-center p-2">
                      <img
                        src={shot.image}
                        alt={shot.title}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="px-3.5 py-1.5 rounded-full bg-black/80 text-white text-xs flex items-center gap-1.5 shadow-xl">
                          <Maximize2 size={13} />
                          <span>View Full Image</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 flex flex-col gap-1 border-t border-white/10 bg-[#121214]">
                      <h4 className="text-xs sm:text-sm font-semibold text-white group-hover:text-[#BBCCD7] transition-colors">
                        {shot.title}
                      </h4>
                      <p className="text-[11px] sm:text-xs text-[#D7E2EA]/60 font-light leading-snug">
                        {shot.caption}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </FadeIn>
        )}

        {/* 5. Key Findings & Compliance */}
        {(project.keyFindings || project.complianceOrStandards) && (
          <FadeIn delay={0.34} y={20}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.keyFindings && (
                <div className="p-6 rounded-2xl bg-[#141416] border border-white/10">
                  <h3 className="text-xs uppercase tracking-widest text-amber-400 font-semibold mb-3">
                    Key Findings
                  </h3>
                  <ul className="space-y-2">
                    {project.keyFindings.map((finding, fIdx) => (
                      <li
                        key={fIdx}
                        className="text-xs sm:text-sm text-[#D7E2EA]/80 font-light flex items-start gap-2"
                      >
                        <span className="text-amber-400 font-bold shrink-0">•</span>
                        <span>{finding}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {project.complianceOrStandards && (
                <div className="p-6 rounded-2xl bg-[#141416] border border-white/10">
                  <h3 className="text-xs uppercase tracking-widest text-[#BBCCD7] font-semibold mb-3">
                    Applicable Standards & Frameworks
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.complianceOrStandards.map((std, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-xs px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white font-mono"
                      >
                        {std}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </FadeIn>
        )}

        {/* 6. Technologies & Tools */}
        <FadeIn delay={0.38} y={20}>
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
            <h3 className="text-xs uppercase tracking-widest text-white/50 mb-3 font-semibold flex items-center gap-1.5">
              <Layers size={14} /> Tools, Protocols & Technologies Utilized
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="text-xs px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[#D7E2EA]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Bottom Paging between Projects */}
        <FadeIn delay={0.42} y={20}>
          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            {prevProject ? (
              <Link
                to={`/projects/${prevProject.slug}`}
                className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:border-white/30 transition-all text-left"
              >
                <ArrowLeft size={16} className="text-[#BBCCD7] shrink-0" />
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-white/40 block">
                    Previous Project
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-white">
                    {prevProject.name}
                  </span>
                </div>
              </Link>
            ) : (
              <div />
            )}

            {nextProject ? (
              <Link
                to={`/projects/${nextProject.slug}`}
                className="flex items-center justify-end gap-3 p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:border-white/30 transition-all text-right"
              >
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-white/40 block">
                    Next Project
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-white">
                    {nextProject.name}
                  </span>
                </div>
                <ArrowRight size={16} className="text-[#BBCCD7] shrink-0" />
              </Link>
            ) : (
              <div />
            )}
          </div>
        </FadeIn>
      </div>

      {/* Lightbox Modal for Full Screenshot Zoom */}
      {activeImage && (
        <div
          onClick={() => setActiveImage(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full max-h-[90vh] bg-[#141416] border border-white/20 rounded-2xl overflow-hidden flex flex-col"
          >
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-[#0C0C0C]">
              <div>
                <h3 className="text-sm font-bold text-white">{activeImage.title}</h3>
                <p className="text-xs text-white/50">{activeImage.caption}</p>
              </div>
              <button
                onClick={() => setActiveImage(null)}
                aria-label="Close image modal"
                className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full hover:bg-white/10 text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-2 flex-1 overflow-auto flex items-center justify-center bg-black/50">
              <img
                src={activeImage.image}
                alt={activeImage.title}
                className="max-w-full max-h-[75vh] object-contain rounded-lg"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
