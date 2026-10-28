import React from 'react';
import { GraduationCap, Briefcase, Wrench, Shield, CheckCircle, Download, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { FadeIn } from '../components/FadeIn';
import { usePortfolio } from '../context/PortfolioContext';
import markPortrait from '../assets/mark-real-portrait.jpg';

export const AboutPage: React.FC = () => {
  const { data: PORTFOLIO_DATA } = usePortfolio();
  return (
    <div className="w-full pt-28 pb-20 sm:pb-24 px-4 sm:px-6 md:px-10 bg-[#0C0C0C]">
      <div className="max-w-5xl mx-auto flex flex-col gap-14 sm:gap-20">
        {/* Header / Intro */}
        <section data-section-id="sec-about-profile">
          <FadeIn delay={0} y={30}>
            <span className="text-xs uppercase tracking-widest text-[#BBCCD7] font-semibold block mb-3">
              About Mark Daniel
            </span>
            <h1 className="hero-heading text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight leading-none mb-6 sm:mb-8">
              Background & Qualifications
            </h1>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Hi, I'm Mark & Intro */}
            <div className="lg:col-span-7">
              <FadeIn delay={0.15} y={30}>
                <div className="bg-[#141416] border border-white/10 rounded-[28px] sm:rounded-[32px] p-5 sm:p-8 md:p-10 shadow-xl h-full flex flex-col justify-between">
                  <div>
                    <div className="mb-4">
                      <span className="text-xs uppercase tracking-widest text-[#BBCCD7] font-semibold block mb-2">
                        Profile Overview
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight mb-4">
                        Hi, I'm Mark
                      </h2>
                    </div>
                    <p className="text-sm sm:text-lg text-[#D7E2EA] font-light leading-relaxed mb-6">
                      “{PORTFOLIO_DATA.identity.introduction}”
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-6 border-t border-white/10 text-xs sm:text-sm text-[#D7E2EA]/75">
                    <div>
                      <span className="text-white/40 uppercase tracking-wider block text-[11px]">Preferred Name</span>
                      <span className="font-medium text-white">{PORTFOLIO_DATA.identity.preferredName}</span>
                    </div>
                    <div>
                      <span className="text-white/40 uppercase tracking-wider block text-[11px]">Full Legal Name</span>
                      <span className="font-medium text-white">{PORTFOLIO_DATA.identity.fullName}</span>
                    </div>
                    <div>
                      <span className="text-white/40 uppercase tracking-wider block text-[11px]">Current Location</span>
                      <span className="font-medium text-white">{PORTFOLIO_DATA.identity.location}</span>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* Right Column: Real Photo Cropped from Knee Upwards with Pop-Up Animation */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[320px] sm:max-w-[370px]">
                {/* Ambient glow behind card */}
                <div className="absolute -inset-2 bg-gradient-to-tr from-blue-600/20 via-indigo-500/15 to-transparent blur-2xl rounded-[36px] pointer-events-none -z-10" />

                <motion.div
                  initial={{ opacity: 0, scale: 0.82, y: 50 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{
                    type: 'spring',
                    damping: 17,
                    stiffness: 90,
                    mass: 0.85,
                    delay: 0.2,
                  }}
                  whileHover={{ y: -6, transition: { duration: 0.3 } }}
                  className="group relative rounded-[28px] sm:rounded-[32px] overflow-hidden bg-[#141416] border border-white/10 p-2.5 sm:p-3 shadow-2xl transition-all hover:border-white/20"
                >
                  {/* Photo Container */}
                  <div className="relative rounded-[22px] sm:rounded-[24px] overflow-hidden aspect-[3/4] bg-neutral-900">
                    <img
                      src={markPortrait}
                      alt="Mark Daniel"
                      className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Gradient Overlay for subtle depth & readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

                    {/* Floating Status Badge at Top */}
                    <div className="absolute top-3 left-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 border border-white/15 text-[11px] text-[#BBCCD7] font-medium backdrop-blur-md shadow-lg">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Negombo, LK</span>
                    </div>

                    {/* Bottom Metadata inside Photo Frame */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="text-[10px] uppercase tracking-widest text-[#BBCCD7] font-semibold block mb-0.5">
                        Cyber-Security Specialist
                      </span>
                      <h3 className="text-xl font-bold text-white tracking-tight leading-snug">
                        Mark Daniel
                      </h3>
                      <p className="text-xs text-[#D7E2EA]/75 font-light mt-0.5">
                        BSc (Hons) Student • Hardware & Network Support
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Education Timeline with Campus Logos */}
        <section data-section-id="sec-about-education">
          <FadeIn delay={0} y={30}>
            <div className="flex items-center gap-3 mb-6 sm:mb-8">
              <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
                <GraduationCap size={20} />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight">
                  Education & Accreditations
                </h2>
                <p className="text-xs text-[#D7E2EA]/60 font-light mt-0.5">
                  Academic qualifications verified with official university credentials.
                </p>
              </div>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {PORTFOLIO_DATA.education.map((edu, idx) => (
              <FadeIn key={idx} delay={idx * 0.1} y={20}>
                <div className="bg-[#141416] border border-white/10 rounded-2xl p-5 sm:p-6 h-full flex flex-col justify-between hover:border-white/20 transition-all group">
                  <div>
                    <div className="flex items-start justify-between gap-3 sm:gap-4 mb-3">
                      <div className="flex-1 min-w-0">
                        <span className="text-xs font-semibold uppercase tracking-wider text-[#BBCCD7] block mb-1">
                          {edu.period}
                        </span>
                        <h3 className="text-base sm:text-lg font-bold text-white mb-1.5 leading-snug group-hover:text-white transition-colors break-words">
                          {edu.degree}
                        </h3>
                        <p className="text-xs sm:text-sm text-[#D7E2EA]/75 font-light">
                          {edu.institution}
                        </p>
                      </div>

                      {/* Small compatible nice size campus logo badge */}
                      {edu.logo && (
                        <div className="shrink-0 bg-white/95 rounded-xl p-2 shadow-md border border-white/20 flex items-center justify-center w-14 h-14 sm:w-20 sm:h-20 transition-transform group-hover:scale-105">
                          <img
                            src={edu.logo}
                            alt={edu.logoAlt || 'Campus logo'}
                            className="w-full h-full object-contain"
                            loading="lazy"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {edu.statusNote && (
                    <div className="mt-3 sm:mt-4 pt-3 border-t border-white/5">
                      <span className="inline-block text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
                        {edu.statusNote}
                      </span>
                    </div>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* Work Experience (Most recent first) */}
        <section data-section-id="sec-about-experience">
          <FadeIn delay={0} y={30}>
            <div className="flex items-center gap-3 mb-6 sm:mb-8">
              <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0">
                <Briefcase size={20} />
              </div>
              <h2 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight">
                Work Experience
              </h2>
            </div>
          </FadeIn>

          <div className="flex flex-col gap-4 sm:gap-6">
            {PORTFOLIO_DATA.workExperience.map((exp, idx) => (
              <FadeIn key={idx} delay={idx * 0.15} y={20}>
                <div className="bg-[#141416] border border-white/10 rounded-2xl sm:rounded-3xl p-5 sm:p-8">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4 pb-4 border-b border-white/10">
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-white">{exp.role}</h3>
                      <p className="text-sm text-[#BBCCD7] font-medium">{exp.company}</p>
                    </div>
                    <div className="text-left sm:text-right">
                      <span className="text-xs uppercase tracking-wider text-white/50 block font-light">
                        {exp.period}
                      </span>
                      <span className="text-xs text-[#D7E2EA]/70 bg-white/5 px-2.5 py-0.5 rounded-full mt-1 inline-block">
                        {exp.type}
                      </span>
                    </div>
                  </div>

                  <ul className="flex flex-col gap-2.5">
                    {exp.highlights.map((highlight, hIdx) => (
                      <li key={hIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#D7E2EA]/80 font-light leading-relaxed">
                        <CheckCircle size={15} className="text-[#BBCCD7] shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* Skills: Practical Foundation vs Developing Skills */}
        <section data-section-id="sec-about-skills">
          <FadeIn delay={0} y={30}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                <Wrench size={20} />
              </div>
              <h2 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight">
                Technical Skills & Competencies
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#D7E2EA]/60 max-w-2xl font-light mb-6 sm:mb-8">
              Skills are strictly categorized by hands-on operational experience versus active technical study without artificial percentage scores.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* Practical Foundation */}
            <FadeIn delay={0.1} y={20}>
              <div className="bg-[#141416] border border-white/10 rounded-2xl sm:rounded-3xl p-5 sm:p-8 h-full flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                    <h3 className="text-base sm:text-lg font-bold uppercase text-white">Practical Foundation</h3>
                    <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
                      Demonstrated Experience
                    </span>
                  </div>
                  <p className="text-xs text-[#D7E2EA]/60 font-light mb-5 sm:mb-6">
                    Proven in physical hardware repair, IT support deployments, user troubleshooting, and QA testing environments.
                  </p>
                  <ul className="flex flex-col gap-2.5 sm:gap-3">
                    {PORTFOLIO_DATA.skills.practicalFoundation.map((skill, sIdx) => (
                      <li key={sIdx} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/5 gap-2">
                        <span className="text-xs sm:text-sm font-medium text-[#D7E2EA]">{skill.name}</span>
                        <span className="text-[10px] sm:text-[11px] text-white/40 uppercase tracking-wider shrink-0">{skill.category}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </FadeIn>

            {/* Developing Skills */}
            <FadeIn delay={0.2} y={20}>
              <div className="bg-[#141416] border border-white/10 rounded-2xl sm:rounded-3xl p-5 sm:p-8 h-full flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                    <h3 className="text-base sm:text-lg font-bold uppercase text-white">Developing Skills</h3>
                    <span className="text-xs font-semibold uppercase tracking-wider text-purple-400 bg-purple-500/10 px-2.5 py-1 rounded-md border border-purple-500/20">
                      In Active Training
                    </span>
                  </div>
                  <p className="text-xs text-[#D7E2EA]/60 font-light mb-5 sm:mb-6">
                    Curriculum focus, defensive security labs, command-line tooling, and security analysis fundamentals.
                  </p>
                  <ul className="flex flex-col gap-2.5 sm:gap-3">
                    {PORTFOLIO_DATA.skills.developingSkills.map((skill, sIdx) => (
                      <li key={sIdx} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/5 gap-2">
                        <span className="text-xs sm:text-sm font-medium text-[#D7E2EA]">{skill.name}</span>
                        <span className="text-[10px] sm:text-[11px] text-purple-300/60 uppercase tracking-wider shrink-0">{skill.category}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* How I Work */}
        <section data-section-id="sec-about-philosophy">
          <FadeIn delay={0} y={30}>
            <div className="flex items-center gap-3 mb-6 sm:mb-8">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
                <Shield size={20} />
              </div>
              <h2 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight">
                How I Work
              </h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {PORTFOLIO_DATA.howIWork.map((item, idx) => (
              <FadeIn key={idx} delay={idx * 0.1} y={20}>
                <div className="bg-[#141416] border border-white/10 rounded-2xl p-5 sm:p-6 h-full flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-black text-[#BBCCD7] block mb-2">0{idx + 1}</span>
                    <h3 className="text-base font-bold uppercase text-white mb-2">{item.title}</h3>
                    <p className="text-xs sm:text-sm text-[#D7E2EA]/70 font-light leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* Download CV Section - ACTIVATED WITH OFFICIAL PDF */}
        <section data-section-id="sec-about-cv" className="bg-white/5 border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-emerald-400 font-semibold mb-1">
              <CheckCircle2 size={15} />
              <span>Verified Resume Available</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold uppercase text-white mb-1.5">
              Curriculum Vitae
            </h3>
            <p className="text-xs sm:text-sm text-[#D7E2EA]/70 font-light max-w-lg leading-relaxed">
              Official CV detailing complete academic transcripts, technical competencies, verified work experience, and contact details.
            </p>
          </div>

          <div className="flex flex-col sm:items-end gap-2 w-full sm:w-auto">
            <a
              href={PORTFOLIO_DATA.contact.cv.url}
              download={PORTFOLIO_DATA.contact.cv.filename}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full text-white font-medium uppercase tracking-widest px-8 py-3.5 text-xs sm:text-sm flex items-center justify-center gap-2.5 transition-all duration-200 hover:scale-105 shadow-xl w-full sm:w-auto text-center"
              style={{
                background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
                outline: '2px solid #FFFFFF',
                outlineOffset: '-3px',
              }}
            >
              <Download size={16} />
              <span>Download CV (PDF)</span>
            </a>
            <span className="text-[11px] text-[#D7E2EA]/60 text-center sm:text-right w-full sm:w-auto">
              PDF Document • Instant Download
            </span>
          </div>
        </section>
      </div>
    </div>
  );
};
