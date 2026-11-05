import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Terminal, Cpu, Network, FileText, CheckCircle2 } from 'lucide-react';
import { FadeIn } from '../components/FadeIn';
import { Magnet } from '../components/Magnet';
import { MarqueeSection } from '../components/MarqueeSection';
import { AboutSection } from '../components/AboutSection';
import { ServicesSection } from '../components/ServicesSection';
import { ProjectsSection } from '../components/ProjectsSection';
import { usePortfolio } from '../context/PortfolioContext';
import { HeroAvatar } from '../components/HeroAvatar';

export const HomePage: React.FC = () => {
  const { data: PORTFOLIO_DATA } = usePortfolio();
  const videoRef = useRef<HTMLVideoElement>(null);

  // The Sri Lanka video is ~29 MB: don't download it until it's about to scroll into
  // view, and pause it whenever it's off screen (saves data on phones).
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (video.preload !== 'auto') video.preload = 'auto';
          video.play().catch(() => {
            // Autoplay blocked: the vignette + heading still show over the first frame
          });
        } else {
          video.pause();
        }
      },
      { rootMargin: '300px 0px' }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);
  return (
    <div className="w-full flex flex-col">
      {/* 1. HERO SECTION */}
      <section data-section-id="sec-hero" className="relative w-full min-h-screen flex flex-col justify-between overflow-x-clip bg-[#0C0C0C] pt-24 pb-12 sm:pb-20 px-4 sm:px-6 md:px-10">
        {/* Top Tagline */}
        <div className="w-full flex justify-between items-center z-20">
          <FadeIn delay={0} y={-10} amount={0} margin="0px">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] sm:text-xs uppercase tracking-widest text-[#BBCCD7]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <span>Cyber-Security Student & Aspiring SOC Analyst</span>
            </div>
          </FadeIn>
          <FadeIn delay={0.1} y={-10} amount={0} margin="0px">
            <span className="hidden sm:inline-block text-xs uppercase tracking-widest text-[#D7E2EA]/60 font-medium">
              Negombo, Sri Lanka
            </span>
          </FadeIn>
        </div>

        {/* Hero Heading: HI, I'M MARK */}
        <div className="w-full overflow-hidden flex items-center justify-center z-10 mt-10 mb-2 sm:mt-14 sm:mb-4 xl:my-auto xl:py-8">
          <FadeIn delay={0.15} y={40} amount={0} margin="0px" className="w-full text-center">
            <h1 className="hero-heading font-black uppercase tracking-tight leading-none w-full text-center text-[11vw] xl:text-[16.5vw] select-none break-normal">
              {PORTFOLIO_DATA.identity.heroGreeting}
            </h1>
          </FadeIn>
        </div>

        {/* Mark portrait with Magnet: stacked under the heading on phones and tablets,
            overlapping the giant heading from the bottom on wide screens (xl+). On wide screens the
            width is capped by screen height so the avatar never swallows a short laptop screen. */}
        <div className="relative mx-auto w-[240px] sm:w-[320px] md:w-[380px] lg:w-[400px] z-20 xl:absolute xl:mx-0 xl:left-1/2 xl:-translate-x-1/2 xl:w-[min(680px,56vh)] xl:bottom-1 pointer-events-auto">
          <FadeIn delay={0.6} y={30} amount={0} margin="0px" className="w-full flex justify-center">
            <Magnet
              padding={150}
              strength={3}
              followGlobal
              activeTransition="transform 0.3s ease-out"
              inactiveTransition="transform 0.6s ease-in-out"
              className="w-full flex justify-center"
            >
              <div className="relative w-full flex justify-center">
                {/* Subtle backlight glow */}
                <div className="absolute inset-0 -z-10 rounded-full bg-gradient-to-tr from-[#7621B0]/30 via-[#B600A8]/20 to-transparent blur-3xl transform scale-90" />
                <HeroAvatar alt="3D avatar of Mark Daniel" />
              </div>
            </Magnet>
          </FadeIn>
        </div>

        {/* Bottom Hero Bar */}
        <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 z-20 pt-6">
          <FadeIn delay={0.35} y={20} amount={0} margin="0px">
            <p
              style={{ fontSize: 'clamp(0.85rem, 1.4vw, 1.25rem)' }}
              className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug max-w-[280px] sm:max-w-[320px] md:max-w-[380px]"
            >
              Hands-on hardware engineering & office IT support foundation, advancing towards security operations.
            </p>
          </FadeIn>

          <FadeIn delay={0.5} y={20} amount={0} margin="0px" className="w-full sm:w-auto">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
              <Link
                to="/projects"
                className="rounded-full text-white font-medium uppercase tracking-widest px-7 py-3 text-xs sm:text-sm cursor-pointer select-none transition-all duration-200 flex items-center justify-center gap-2 text-center"
                style={{
                  background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
                  boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset',
                  outline: '2px solid #FFFFFF',
                  outlineOffset: '-3px',
                }}
              >
                <span>View Projects</span>
                <ArrowRight size={14} />
              </Link>
              <Link
                to="/contact"
                className="rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest px-7 py-3 text-xs sm:text-sm hover:bg-[#D7E2EA]/10 transition-colors text-center flex items-center justify-center"
              >
                Contact Me
              </Link>
            </div>
          </FadeIn>
        </div>

        {/* Subtle Scroll Down Prompt / Pacing Spacer */}
        <div className="w-full flex flex-col items-center justify-center pt-8 pb-2 text-[#D7E2EA]/40 text-[10px] uppercase tracking-[0.3em] font-medium pointer-events-none select-none">
          <div className="w-[1px] h-10 bg-gradient-to-b from-white/30 via-white/50 to-transparent animate-pulse" />
        </div>
      </section>

      {/* SCROLL-DRIVEN SCREENSHOT MARQUEE */}
      <MarqueeSection />

      {/* ABOUT ME: CHARACTER-BY-CHARACTER SCROLL REVEAL */}
      <AboutSection />

      {/* VIDEO SECTION - FULL-BLEED, EDGE TO EDGE
          The file is 16:9 but the actual picture is ~2.34:1 with black bars baked in
          (rows 0-86 and 634-720 of 720). The section uses the picture's own 2.344:1 shape and the
          video is sized so those bars sit just outside the frame: on desktop the whole
          picture shows with no crop and no stretch. On narrow phones the 240px minimum
          height trims the sides a little instead of shrinking to a thin strip. */}
      <section data-section-id="sec-video" className="relative z-10 w-full bg-[#0C0C0C]">
        <div
          className="relative w-full overflow-hidden"
          style={{ aspectRatio: '2.344 / 1', minHeight: '240px' }}
        >
          <FadeIn delay={0} y={0} duration={1.2} amount={0.15} margin="0px" className="absolute inset-0">
            <video
              ref={videoRef}
              loop
              muted
              playsInline
              preload="none"
              src="/sri-lanka-cinematic.mp4"
              aria-hidden="true"
              className="absolute left-0 w-full object-cover pointer-events-none select-none"
              style={{ top: '-15.93%', height: '131.87%' }}
            />
          </FadeIn>

          {/* Light vignette for text readability; soft top/bottom blend into the page */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.15)_0%,rgba(0,0,0,0.45)_100%)] pointer-events-none z-10" />
          <div className="absolute inset-x-0 top-0 h-[8%] bg-gradient-to-b from-[#0C0C0C] to-transparent pointer-events-none z-10" />
          <div className="absolute inset-x-0 bottom-0 h-[8%] bg-gradient-to-t from-[#0C0C0C] to-transparent pointer-events-none z-10" />

          {/* Text overlay ON the video */}
          <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none p-4 sm:p-8 text-center">
            <FadeIn delay={0.35} y={-20} scale={0.88} duration={0.8} amount={0.25}>
              <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-black/65 backdrop-blur-md border border-white/25 text-[10px] sm:text-xs uppercase tracking-widest text-[#BBCCD7] mb-2 sm:mb-5 shadow-2xl">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-semibold">Location & Origins</span>
              </div>
            </FadeIn>
            <FadeIn delay={0.5} y={35} scale={0.94} duration={0.9} amount={0.25}>
              <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black uppercase tracking-tight text-white drop-shadow-[0_4px_35px_rgba(0,0,0,0.98)] select-none">
                Based in Sri Lanka.
              </h2>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 2. INTRODUCTION & BACKGROUND SUMMARY - ARRIVES AFTER 2-3 SCROLLS, EMERGES WITH DEPTH & BLUR-CLEAR */}
      <section data-section-id="sec-intro" className="px-4 sm:px-6 md:px-10 py-20 sm:py-44 md:py-56 bg-[#111113] border-t border-b border-white/5">
        <div className="max-w-5xl mx-auto">
          <FadeIn delay={0} y={60} scale={0.95} blur={10} duration={0.9} amount={0.25} margin="-60px 0px">
            <span className="text-xs uppercase tracking-widest text-[#BBCCD7] font-semibold block mb-3">
              Introduction & Focus
            </span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white mb-6 sm:mb-8">
              Practical Hardware Foundation, Applied Cybersecurity Defense
            </h2>
          </FadeIn>

          <FadeIn delay={0.15} y={60} scale={0.94} blur={10} duration={1.0} amount={0.2} margin="-50px 0px">
            <div className="bg-[#0C0C0C] border border-white/10 rounded-[24px] sm:rounded-[32px] p-5 sm:p-10 mb-8 sm:mb-12 shadow-xl">
              <p className="text-base sm:text-xl md:text-2xl text-[#D7E2EA] font-light leading-relaxed">
                “{PORTFOLIO_DATA.identity.introduction}”
              </p>
              <div className="mt-6 pt-6 border-t border-white/10 flex flex-col sm:flex-row flex-wrap items-start sm:items-center justify-between gap-3 sm:gap-4 text-xs sm:text-sm text-[#D7E2EA]/70">
                <span>
                  <strong>Full Name:</strong> {PORTFOLIO_DATA.identity.fullName}
                </span>
                <span>
                  <strong>Academic Track:</strong> Staffordshire University via APIIT Sri Lanka
                </span>
                <span>
                  <strong>Location:</strong> {PORTFOLIO_DATA.identity.location}
                </span>
              </div>
            </div>
          </FadeIn>

          {/* Quick Stats / Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <FadeIn delay={0.1} y={45} scale={0.93} blur={8} duration={0.85} amount={0.2} margin="-40px 0px">
              <div className="bg-[#0C0C0C] border border-white/10 rounded-2xl p-5 sm:p-6 h-full flex flex-col justify-between">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-4">
                  <Cpu size={20} />
                </div>
                <div>
                  <h3 className="text-base font-bold uppercase text-white mb-1">
                    Hands-On IT & Hardware
                  </h3>
                  <p className="text-xs sm:text-sm text-[#D7E2EA]/70 font-light leading-relaxed">
                    Prior field support across enterprise hardware infrastructure (Jubilant FoodWorks) and office endpoint support (Prime Tech).
                  </p>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.22} y={45} scale={0.93} blur={8} duration={0.85} amount={0.2} margin="-40px 0px">
              <div className="bg-[#0C0C0C] border border-white/10 rounded-2xl p-5 sm:p-6 h-full flex flex-col justify-between">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-4">
                  <Shield size={20} />
                </div>
                <div>
                  <h3 className="text-base font-bold uppercase text-white mb-1">
                    SecOps Skills in Progress
                  </h3>
                  <p className="text-xs sm:text-sm text-[#D7E2EA]/70 font-light leading-relaxed">
                    Dedicated learning in security monitoring, log analysis, incident response basics, and vulnerability management.
                  </p>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.34} y={45} scale={0.93} blur={8} duration={0.85} amount={0.2} margin="-40px 0px">
              <div className="bg-[#0C0C0C] border border-white/10 rounded-2xl p-5 sm:p-6 h-full flex flex-col justify-between">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4">
                  <Network size={20} />
                </div>
                <div>
                  <h3 className="text-base font-bold uppercase text-white mb-1">
                    Career Objective
                  </h3>
                  <p className="text-xs sm:text-sm text-[#D7E2EA]/70 font-light leading-relaxed">
                    Actively seeking entry-level Cybersecurity Analyst, Junior SOC Analyst, or SOC Intern opportunities.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 3. CURRENT LEARNING FOCUS - ARRIVES AFTER 2-3 SCROLLS, EMERGES WITH STAGGERED REVEAL */}
      <section data-section-id="sec-learning" className="px-4 sm:px-6 md:px-10 py-20 sm:py-44 md:py-56 bg-[#0C0C0C]">
        <div className="max-w-5xl mx-auto">
          <FadeIn delay={0} y={55} scale={0.95} blur={10} duration={0.9} amount={0.25} margin="-60px 0px">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8 sm:mb-12">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#BBCCD7] font-semibold block mb-2">
                  Active Knowledge Building
                </span>
                <h2 className="text-2xl sm:text-4xl font-black uppercase text-white tracking-tight">
                  Current Learning Focus
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-[#D7E2EA]/60 max-w-sm font-light">
                Structured areas actively being studied and reinforced through course modules and home labs.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
            {PORTFOLIO_DATA.currentLearning.map((item, idx) => (
              <FadeIn
                key={item}
                delay={idx * 0.07}
                y={35}
                scale={0.92}
                blur={6}
                duration={0.75}
                amount={0.15}
                margin="-30px 0px"
              >
                <div className="bg-white/[0.03] border border-white/10 hover:border-white/30 rounded-2xl p-4 sm:p-5 transition-all duration-300 flex items-center gap-3 group">
                  <div className="w-8 h-8 rounded-lg bg-white/5 text-[#BBCCD7] flex items-center justify-center shrink-0 group-hover:bg-white/10 transition-colors">
                    <CheckCircle2 size={16} />
                  </div>
                  <span className="text-sm font-medium text-[#D7E2EA] group-hover:text-white transition-colors">
                    {item}
                  </span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* HOW I WORK: WHITE NUMBERED LIST */}
      <ServicesSection />

      {/* STICKY STACKING PROJECT CARDS */}
      <ProjectsSection />

      {/* 4. FEATURED PROJECT TEASER - ARRIVES AFTER 2-3 SCROLLS, EMERGES WITH HEROIC SCALE & SHADOW */}
      <section data-section-id="sec-featured-project" className="px-4 sm:px-6 md:px-10 py-20 sm:py-44 md:py-56 bg-[#141416] border-t border-b border-white/10">
        <div className="max-w-5xl mx-auto">
          <FadeIn delay={0} y={55} scale={0.95} blur={10} duration={0.9} amount={0.25} margin="-60px 0px">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 sm:mb-10">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#BBCCD7] font-semibold block mb-2">
                  Featured Case Study
                </span>
                <h2 className="text-2xl sm:text-4xl font-black uppercase text-white tracking-tight">
                  Altrium Performance & Development Tracker
                </h2>
              </div>
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 py-3 min-h-[44px] text-xs uppercase tracking-widest text-[#BBCCD7] hover:text-white transition-colors"
              >
                <span>View All {PORTFOLIO_DATA.projects.length} Projects</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </FadeIn>

          <FadeIn delay={0.15} y={70} scale={0.93} blur={12} duration={1.05} amount={0.2} margin="-50px 0px">
            <div className="bg-[#0C0C0C] border-2 border-[#D7E2EA]/30 rounded-[28px] sm:rounded-[36px] p-5 sm:p-10 shadow-2xl relative overflow-hidden">
              <div className="flex flex-col gap-6">
                <p className="text-sm sm:text-lg text-[#D7E2EA] font-light leading-relaxed">
                  A role-based web application that centralises employee performance reviews, confidential peer feedback, Personal Development Plans (PDP), and Performance Improvement Plans (PIP) across multi-tier user permissions.
                </p>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-[#D7E2EA]/80 font-light leading-relaxed">
                  <strong>Context:</strong> Developed for an Altrium Private Limited use case. Presented as a functional demo without verified production claims.
                </div>

                <div>
                  <h4 className="text-xs uppercase tracking-widest text-white/50 mb-3 font-semibold">
                    Core Technologies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {['React', 'Vite', 'Tailwind CSS', 'Node.js', 'Express.js', 'MySQL', 'JWT', 'bcryptjs'].map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-[#D7E2EA]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-t border-white/10">
                  <div className="text-xs text-[#D7E2EA]/60 font-light">
                    Includes role-based access validation, QA test case suite, and workflow documentation.
                  </div>
                  <div className="flex flex-col sm:flex-row items-center gap-3">
                    <Link
                      to="/projects"
                      className="rounded-full border border-[#D7E2EA]/40 text-[#D7E2EA] font-medium uppercase tracking-widest px-6 py-3 text-xs sm:text-sm hover:bg-white/10 transition-colors w-full sm:w-auto text-center"
                    >
                      All Projects
                    </Link>
                    <Link
                      to="/projects/altrium-performance-tracker"
                      className="rounded-full text-white font-medium uppercase tracking-widest px-6 py-3 text-xs sm:text-sm flex items-center justify-center gap-2 hover:brightness-110 transition-all w-full sm:w-auto text-center"
                      style={{
                        background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
                        outline: '2px solid #FFFFFF',
                        outlineOffset: '-3px',
                      }}
                    >
                      <span>Read Case Study</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 5. LABS & LEARNING PREVIEW - ARRIVES AFTER 2-3 SCROLLS, EMERGES WITH STAGGERED ELEVATION */}
      <section data-section-id="sec-labs-preview" className="px-4 sm:px-6 md:px-10 py-20 sm:py-44 md:py-56 bg-[#0C0C0C]">
        <div className="max-w-5xl mx-auto">
          <FadeIn delay={0} y={55} scale={0.95} blur={10} duration={0.9} amount={0.25} margin="-60px 0px">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8 sm:mb-10">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#BBCCD7] font-semibold block mb-2">
                  Hands-on Practice
                </span>
                <h2 className="text-2xl sm:text-4xl font-black uppercase text-white tracking-tight">
                  Cybersecurity Labs & Write-ups
                </h2>
              </div>
              <Link
                to="/labs"
                className="text-xs uppercase tracking-widest text-[#BBCCD7] hover:text-white flex items-center gap-1.5 transition-colors py-1"
              >
                <span>View all lab outlines</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {PORTFOLIO_DATA.labs.knownActivities.map((lab, index) => (
              <FadeIn
                key={lab.id}
                delay={index * 0.16}
                y={50}
                scale={0.93}
                blur={8}
                duration={0.9}
                amount={0.2}
                margin="-40px 0px"
              >
                <div className="bg-[#141416] border border-white/10 rounded-2xl p-5 sm:p-6 h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-xs font-semibold uppercase tracking-wider text-purple-400 bg-purple-500/10 px-2.5 py-1 rounded-md border border-purple-500/20">
                        {lab.status}
                      </span>
                      <span className="text-xs text-white/40 flex items-center gap-1">
                        <Terminal size={12} /> {lab.platform}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold uppercase text-white mb-2">
                      {lab.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#D7E2EA]/70 font-light leading-relaxed mb-4">
                      {lab.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/5">
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {lab.tools.map((tool) => (
                        <span key={tool} className="text-[11px] px-2 py-0.5 rounded bg-white/5 text-[#D7E2EA]/70">
                          {tool}
                        </span>
                      ))}
                    </div>
                    <p className="text-[11px] text-[#D7E2EA]/50 italic">
                      {lab.notes}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <div className="mt-12 sm:mt-16 text-center">
            <FadeIn delay={0.25} y={30} scale={0.95} duration={0.8} amount={0.2} margin="-30px 0px">
              <Link
                to="/labs"
                className="inline-flex items-center justify-center gap-2 text-xs uppercase tracking-widest px-8 py-3.5 rounded-full border border-white/20 hover:border-white text-white hover:bg-white/5 transition-all w-full sm:w-auto"
              >
                <FileText size={14} />
                <span>Explore Lab Write-up Framework</span>
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  );
};
