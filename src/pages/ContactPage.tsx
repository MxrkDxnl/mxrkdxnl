import React from 'react';
import { Mail, ArrowUpRight, Download, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { FadeIn } from '../components/FadeIn';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { SocialLogo, InboxLogo } from '../components/ServiceLogos';

export const ContactPage: React.FC = () => {
  const contact = PORTFOLIO_DATA.contact;

  return (
    <div className="w-full pt-28 pb-20 sm:pb-24 px-4 sm:px-6 md:px-10 bg-[#0C0C0C]">
      <div className="max-w-4xl mx-auto flex flex-col gap-10 sm:gap-14">
        {/* Header */}
        <div>
          <FadeIn delay={0} y={30}>
            <span className="text-xs uppercase tracking-widest text-[#BBCCD7] font-semibold block mb-3">
              Direct Inquiries & Opportunities
            </span>
            <h1 className="hero-heading text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight leading-none mb-4 sm:mb-6">
              Contact Mark Daniel
            </h1>
            <p className="text-sm sm:text-lg text-[#D7E2EA]/75 font-light max-w-2xl leading-relaxed">
              Open to entry-level Cybersecurity Analyst, Junior SOC Analyst, and SOC Intern roles. All direct inboxes, verified channels, and downloadable credentials are listed below.
            </p>
          </FadeIn>
        </div>

        {/* Primary Contact Card: Direct Email */}
        <FadeIn delay={0.1} y={20}>
          <div className="bg-[#141416] border-2 border-[#D7E2EA]/30 rounded-[28px] sm:rounded-[36px] p-6 sm:p-12 shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-start sm:items-center gap-3.5 sm:gap-5 min-w-0">
              <InboxLogo label="Primary Domain" address={contact.primaryEmail} />
              <div className="min-w-0">
                <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-emerald-400 font-semibold mb-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
                  <span>Primary Email Channel</span>
                </div>
                <h2 className="text-xl sm:text-3xl md:text-4xl font-bold text-white mb-2 break-all">
                  {contact.primaryEmail}
                </h2>
                <p className="text-xs sm:text-sm text-[#D7E2EA]/70 font-light">
                  Direct mailbox monitored for career opportunities, SOC internships, and academic inquiries.
                </p>
              </div>
            </div>

            <a
              href={`mailto:${contact.primaryEmail}`}
              className="rounded-full text-white font-medium uppercase tracking-widest px-8 py-3.5 text-xs sm:text-sm flex items-center justify-center gap-2 hover:brightness-110 transition-all w-full sm:w-auto text-center shrink-0 shadow-lg"
              style={{
                background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
                outline: '2px solid #FFFFFF',
                outlineOffset: '-3px',
              }}
            >
              <Mail size={16} />
              <span>Send Email</span>
            </a>
          </div>
        </FadeIn>

        {/* Available Inboxes Grid */}
        <section>
          <FadeIn delay={0.15} y={20}>
            <h3 className="text-sm uppercase tracking-widest text-[#BBCCD7] font-semibold mb-4">
              All Available Email Inboxes
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contact.inboxes.map((inbox, i) => (
                <div
                  key={i}
                  className="bg-[#141416] border border-white/10 rounded-2xl p-5 flex items-center justify-between gap-3.5 hover:border-white/25 transition-all group hover:-translate-y-0.5 shadow-md"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <InboxLogo label={inbox.label} address={inbox.address} />
                    <div className="flex flex-col min-w-0">
                      <span className="text-[11px] uppercase tracking-wider text-white/50 font-medium">
                        {inbox.label}
                      </span>
                      <a
                        href={`mailto:${inbox.address}`}
                        className="text-sm font-medium text-white hover:text-[#BBCCD7] transition-colors truncate block"
                        title={inbox.address}
                      >
                        {inbox.address}
                      </a>
                    </div>
                  </div>
                  <span className="text-[11px] px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[#D7E2EA]/75 shrink-0 font-medium">
                    {inbox.type}
                  </span>
                </div>
              ))}
            </div>
          </FadeIn>
        </section>

        {/* Verified Social & Professional Channels */}
        <section>
          <FadeIn delay={0.2} y={20}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm uppercase tracking-widest text-[#BBCCD7] font-semibold">
                Verified Online Channels & Socials
              </h3>
              <span className="text-xs text-emerald-400 flex items-center gap-1 font-medium">
                <CheckCircle2 size={13} />
                <span>All Links Verified</span>
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {contact.socials.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#141416] border border-white/10 hover:border-white/30 rounded-2xl p-5 flex flex-col justify-between transition-all group hover:-translate-y-0.5 shadow-md"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <SocialLogo name={social.name} />
                      <span className="text-[11px] text-white/50 uppercase tracking-wider truncate font-medium">
                        {social.category}
                      </span>
                    </div>
                    <ArrowUpRight
                      size={15}
                      className="text-white/40 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0"
                    />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white group-hover:text-[#BBCCD7] transition-colors">
                      {social.name}
                    </h4>
                    <span className="text-xs text-[#D7E2EA]/70 font-mono truncate block mt-0.5">
                      {social.handle}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </FadeIn>
        </section>

        {/* Verified CV Download Card */}
        <FadeIn delay={0.35} y={20}>
          <div className="bg-white/5 border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-emerald-400 font-semibold mb-1">
                <ShieldCheck size={16} />
                <span>Verified Documentation</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold uppercase text-white mb-1.5">
                Download Official CV
              </h3>
              <p className="text-xs sm:text-sm text-[#D7E2EA]/70 font-light max-w-lg leading-relaxed">
                Complete resume detailing academic milestones at Staffordshire University & APIIT, hardware engineering experience, and technical core skills.
              </p>
            </div>

            <a
              href={contact.cv.url}
              download={contact.cv.filename}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full text-white font-medium uppercase tracking-widest px-8 py-3.5 text-xs sm:text-sm flex items-center justify-center gap-2.5 transition-all duration-200 hover:scale-105 shadow-xl shrink-0 w-full sm:w-auto text-center"
              style={{
                background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
                outline: '2px solid #FFFFFF',
                outlineOffset: '-3px',
              }}
            >
              <Download size={16} />
              <span>Download CV (PDF)</span>
            </a>
          </div>
        </FadeIn>
      </div>
    </div>
  );
};
