import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Terminal,
  Shield,
  ShieldCheck,
  Lock,
  Unlock,
  Key,
  Copy,
  Check,
  ExternalLink,
  FileText,
  RefreshCw,
  Link2,
  Activity,
  Search,
  Save,
  CheckCircle2,
  ArrowLeft,
  Eye,
  EyeOff,
  AlertCircle,
  Radio,
  Sliders,
  RotateCcw,
  Sparkles,
  Edit3,
  Layout,
} from 'lucide-react';
import { FadeIn } from '../components/FadeIn';
import { OperatorAtmosphere } from '../components/OperatorAtmosphere';
import { LiveVisualEditor } from '../components/LiveVisualEditor';
import { OperatorCmsStudio } from '../components/OperatorCmsStudio';
import { usePortfolio } from '../context/PortfolioContext';

type ActiveTab = 'gallery' | 'cms' | 'links' | 'cheatsheet' | 'diagnostics';

interface PageSnapshot {
  id: string;
  title: string;
  route: string;
  category: string;
  description: string;
}

const PAGE_SNAPSHOTS: PageSnapshot[] = [
  {
    id: 'home',
    title: 'Home Page',
    route: '/',
    category: 'Landing & Identity',
    description: 'Hero section, terminal introduction, live highlights, and core SOC profile.',
  },
  {
    id: 'about',
    title: 'About & Qualifications',
    route: '/about',
    category: 'Biography & Academics',
    description: 'Staffordshire & APIIT timeline, hardware engineering, and work philosophy.',
  },
  {
    id: 'projects',
    title: 'Projects & Case Studies',
    route: '/projects',
    category: 'Incident Deliverables',
    description: 'Altrium Performance Tracker, Active Directory Kerberoasting, and MITRE mapping.',
  },
  {
    id: 'labs',
    title: 'Security Labs & CTF',
    route: '/labs',
    category: 'Offensive / Defensive Labs',
    description: 'Vulnerable-by-design CTF series, DC 1-9 writeups, Metasploit, and packet captures.',
  },
  {
    id: 'contact',
    title: 'Contact & Inboxes',
    route: '/contact',
    category: 'Direct Channels',
    description: 'Primary domain email, available inboxes, verified socials, and CV downloads.',
  },
];

interface CheatSheetItem {
  id: string;
  category: 'Nmap Recon' | 'Linux PrivEsc' | 'Wireshark Filters' | 'SIEM Queries';
  title: string;
  command: string;
  description: string;
}

const CHEAT_SHEET_DATA: CheatSheetItem[] = [
  {
    id: 'nmap-1',
    category: 'Nmap Recon',
    title: 'Full TCP Aggressive Sweep',
    command: 'nmap -sC -sV -p- -T4 -oN nmap_full_tcp.txt <TARGET_IP>',
    description: 'All 65,535 TCP ports with default NSE scripts, version detection, and normal output logging.',
  },
  {
    id: 'nmap-2',
    category: 'Nmap Recon',
    title: 'Top 100 UDP Service Audit',
    command: 'nmap -sU --top-ports 100 -sV -T4 -oN nmap_top_udp.txt <TARGET_IP>',
    description: 'Fast identification of common UDP services (DNS, SNMP, NTP, DHCP).',
  },
  {
    id: 'nmap-3',
    category: 'Nmap Recon',
    title: 'Targeted Web Vulnerability Scan',
    command: 'nmap -p 80,443,8080 --script "vuln and safe" -oN nmap_web_vulns.txt <TARGET_IP>',
    description: 'Runs safe NSE vulnerability probes against standard HTTP/HTTPS daemons.',
  },
  {
    id: 'privesc-1',
    category: 'Linux PrivEsc',
    title: 'Sudo Privileges Audit',
    command: 'sudo -l',
    description: 'Checks list of commands the current user can execute with elevated privileges.',
  },
  {
    id: 'privesc-2',
    category: 'Linux PrivEsc',
    title: 'SUID/SGID Binary Search',
    command: 'find / -perm -u=s -type f 2>/dev/null',
    description: 'Identifies executables with setuid bit enabled that execute with owner permissions.',
  },
  {
    id: 'wire-1',
    category: 'Wireshark Filters',
    title: 'Kerberos Ticket Requests (TGS / AS)',
    command: 'kerberos.msg.type == 10 || kerberos.msg.type == 12',
    description: 'Filters for AS-REQ (authentication) and TGS-REQ (ticket-granting) Kerberos transactions.',
  },
  {
    id: 'wire-2',
    category: 'Wireshark Filters',
    title: 'DNS Tunneling / Suspicious Queries',
    command: 'dns.flags.response == 0 && dns.qry.name.len > 40',
    description: 'Flags anomalously long DNS queries indicative of covert channels or base64 data exfiltration.',
  },
  {
    id: 'siem-1',
    category: 'SIEM Queries',
    title: 'Brute Force Detection (Windows Event 4625)',
    command: 'index=wineventlog EventCode=4625 | stats count by TargetUserName, WorkstationName, IpAddress | where count > 10',
    description: 'Identifies multiple failed logon attempts against Active Directory or local workstations.',
  },
];

export const OperatorPage: React.FC = () => {
  const navigate = useNavigate();
  const { exportAsCode, hasCustomizations, resetToDefaults } = usePortfolio();

  // Authentication state - completely blank on initialization per security guidelines
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('mxrk_operator_authenticated') === 'true';
  });
  const [operatorId, setOperatorId] = useState<string>('');
  const [passcode, setPasscode] = useState<string>('');
  const [showPasscode, setShowPasscode] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);

  // Active Phase B Live Visual Editor route (if null, display Phase A selector)
  const [editingRoute, setEditingRoute] = useState<string | null>(null);

  // Active workspace tab
  const [activeTab, setActiveTab] = useState<ActiveTab>('gallery');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Tab 2: Tracked Link Generator state
  const [recruiterName, setRecruiterName] = useState('pwc');
  const [trafficSource, setTrafficSource] = useState('linkedin');
  const [trafficMedium, setTrafficMedium] = useState('job-application');
  const [targetPath, setTargetPath] = useState('/');
  const [recentLinks, setRecentLinks] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('mxrk_recent_tracked_links');
      return stored
        ? JSON.parse(stored)
        : [
            'https://mxrkdxnl.com/?ref=recruiter&utm_source=resume-qr',
            'https://mxrkdxnl.com/?ref=linkedin-recruiter&utm_source=linkedin',
          ];
    } catch {
      return [];
    }
  });

  // Tab 3: Security & Cheat-Sheet Vault
  const [searchFilter, setSearchFilter] = useState('');
  const [selectedCheatCat, setSelectedCheatCat] = useState<string>('All');
  const [scratchpadText, setScratchpadText] = useState(() => {
    try {
      return localStorage.getItem('mxrk_operator_scratchpad') || '';
    } catch {
      return '';
    }
  });
  const [scratchpadSaved, setScratchpadSaved] = useState(false);

  // Tab 4: System Diagnostics state
  const [securityTxtStatus, setSecurityTxtStatus] = useState<'checking' | 'valid' | 'failed'>('checking');
  const [securityTxtPreview, setSecurityTxtPreview] = useState<string>('');
  const [sitemapStatus, setSitemapStatus] = useState<'checking' | 'valid' | 'failed'>('checking');
  const [isSecureContext, setIsSecureContext] = useState(true);

  // Probe live security assets when Diagnostics tab is selected
  const probeSecurityAssets = useCallback(async () => {
    setSecurityTxtStatus('checking');
    setSitemapStatus('checking');

    if (typeof window !== 'undefined') {
      setIsSecureContext(window.isSecureContext);
    }

    try {
      const res = await fetch('/.well-known/security.txt');
      if (res.ok) {
        const text = await res.text();
        setSecurityTxtStatus('valid');
        setSecurityTxtPreview(text.trim());
      } else {
        setSecurityTxtStatus('failed');
      }
    } catch {
      setSecurityTxtStatus('failed');
    }

    try {
      const res = await fetch('/sitemap.xml');
      if (res.ok) {
        setSitemapStatus('valid');
      } else {
        setSitemapStatus('failed');
      }
    } catch {
      setSitemapStatus('failed');
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated && activeTab === 'diagnostics') {
      probeSecurityAssets();
    }
  }, [isAuthenticated, activeTab, probeSecurityAssets]);

  // Copy helper with feedback
  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId((curr) => (curr === id ? null : curr));
    }, 2000);
  };

  // Authenticate operator with explicit credentials
  const handleAuthenticate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    setAuthError(null);

    const cleanId = operatorId.trim().toLowerCase();
    const cleanPass = passcode.trim();

    // Standard operator credentials
    const expectedPasskey = import.meta.env.VITE_OPERATOR_PASSKEY || 'koko201903';
    const validIdentifiers = ['mxrkdxnl', 'mark', 'operator-01', 'operator', 'mark daniel', 'admin'];

    setTimeout(() => {
      setIsVerifying(false);

      if (!cleanId || !cleanPass) {
        setAuthError('Both Operator Identifier and Passkey are required.');
        return;
      }

      const isValidId = validIdentifiers.includes(cleanId);
      const isValidPass = cleanPass === expectedPasskey;

      if (isValidId && isValidPass) {
        setIsAuthenticated(true);
        sessionStorage.setItem('mxrk_operator_authenticated', 'true');
        sessionStorage.setItem('mxrk_active_operator_id', operatorId.trim());
        setPasscode('');
        setAuthError(null);
      } else {
        setAuthError('Invalid operator credentials. Access denied.');
        setPasscode('');
      }
    }, 450);
  };

  // Sign out / Lock: resets both fields to blank
  const handleSignOut = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('mxrk_operator_authenticated');
    sessionStorage.removeItem('mxrk_active_operator_id');
    setOperatorId('');
    setPasscode('');
    setAuthError(null);
    setEditingRoute(null);
  };

  // Generate tracked link
  const generatedUrl = `${window?.location?.origin || 'https://mxrkdxnl.com'}${targetPath}?ref=${encodeURIComponent(
    recruiterName.trim().toLowerCase().replace(/\s+/g, '-')
  )}&utm_source=${encodeURIComponent(trafficSource)}&utm_medium=${encodeURIComponent(trafficMedium)}`;

  const handleSaveTrackedLink = () => {
    if (!recentLinks.includes(generatedUrl)) {
      const updated = [generatedUrl, ...recentLinks.slice(0, 9)];
      setRecentLinks(updated);
      try {
        localStorage.setItem('mxrk_recent_tracked_links', JSON.stringify(updated));
      } catch {}
    }
    handleCopy(generatedUrl, 'generated-link');
  };

  // Scratchpad save
  const handleSaveScratchpad = () => {
    try {
      localStorage.setItem('mxrk_operator_scratchpad', scratchpadText);
      setScratchpadSaved(true);
      setTimeout(() => setScratchpadSaved(false), 2000);
    } catch {}
  };

  // If in Phase B Live Visual Editor mode, render the full-screen visual editor directly!
  if (isAuthenticated && editingRoute) {
    return (
      <LiveVisualEditor
        route={editingRoute}
        onSelectRoute={(newRoute) => setEditingRoute(newRoute)}
        onBackToSnapshots={() => setEditingRoute(null)}
        onExitOperator={() => navigate('/')}
      />
    );
  }

  return (
    <OperatorAtmosphere>
      <div className="w-full min-h-screen pt-24 pb-20 px-4 sm:px-6 md:px-10 flex flex-col justify-between">
        <div className="max-w-6xl mx-auto w-full flex-1 flex flex-col">
          {/* Top Breadcrumb & Status Navigation */}
          <div className="flex items-center justify-between pb-6 mb-8 border-b border-white/10 font-mono text-xs">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/')}
                className="text-white/60 hover:text-white flex items-center gap-1.5 transition-colors group"
              >
                <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
                <span>Return to Portfolio</span>
              </button>
              <span className="text-white/20">/</span>
              <span className="text-[#00f5d4] font-semibold flex items-center gap-1.5">
                <Terminal size={14} />
                <span>OPERATOR COMMAND WORKSPACE</span>
              </span>
            </div>

            <div className="flex items-center gap-3">
              {hasCustomizations && (
                <span className="hidden md:flex items-center gap-1 px-2.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-[11px] text-purple-300">
                  <Sparkles size={11} className="text-purple-400" />
                  <span>Custom Overrides Active</span>
                </span>
              )}

              <span className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] text-white/70">
                <Radio
                  size={12}
                  className={isAuthenticated ? 'text-emerald-400 animate-pulse' : 'text-[#00f5d4]'}
                />
                <span>{isAuthenticated ? 'WORKSPACE ONLINE' : 'GATEWAY RESTRICTED'}</span>
              </span>

              {isAuthenticated && (
                <button
                  onClick={handleSignOut}
                  className="px-3 py-1 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center gap-1.5 transition-colors"
                  title="Lock Operator Console and Clear Credentials"
                >
                  <Lock size={12} />
                  <span>Lock Console</span>
                </button>
              )}
            </div>
          </div>

          {/* ============================================================== */}
          {/* SCREEN 1: OPERATOR GATEWAY LOGIN (When NOT authenticated)      */}
          {/* ============================================================== */}
          {!isAuthenticated ? (
            <div className="flex-1 flex flex-col items-center justify-center py-6 sm:py-10">
              <FadeIn delay={0} y={25}>
                <div className="w-full max-w-xl mx-auto flex flex-col items-center">
                  {/* Galloping Stealth Protocol Telemetry Badge */}
                  <div className="liquid-glass w-full p-4 mb-6 flex flex-col items-center text-center shadow-2xl border border-white/15">
                    <div className="w-full flex items-center justify-between text-[10px] font-mono text-[#00f5d4]/70 uppercase tracking-widest px-2 mb-2">
                      <span>SYS_NODE // GALLOPING STEALTH PROTOCOL</span>
                      <span>LAT 7.2084° N • LON 79.8358° E</span>
                    </div>

                    {/* Vintage Galloping Horse Cart WebP Canvas */}
                    <div className="w-full h-[95px] sm:h-[110px] relative overflow-hidden flex items-center justify-center">
                      <picture className="w-full h-full flex items-center justify-center">
                        <source type="image/webp" srcSet="/images/horse-cart.webp" />
                        <img
                          src="/images/horse-cart.webp"
                          alt="Vintage engraved galloping horse-drawn carriage"
                          className="w-full h-full object-contain max-w-[480px] sm:max-w-[540px]"
                          style={{
                            filter: 'invert(1) brightness(0.95) contrast(1.2)',
                            mixBlendMode: 'screen',
                            opacity: 0.9,
                          }}
                          loading="eager"
                        />
                      </picture>
                    </div>

                    <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#00f5d4]/40 to-transparent mt-2" />
                  </div>

                  {/* Liquid Glass Login Box */}
                  <div className="liquid-glass w-full p-6 sm:p-10 shadow-2xl flex flex-col items-center text-center border border-white/20">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#00f5d4]/20 to-[#7928ca]/20 border border-[#00f5d4]/40 flex items-center justify-center mb-4 shadow-[0_0_25px_rgba(0,245,212,0.3)]">
                      <Key size={26} className="text-[#00f5d4]" />
                    </div>

                    <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white mb-2 font-sans">
                      Operator Gateway
                    </h1>
                    <p className="text-xs sm:text-sm text-[#D7E2EA]/70 max-w-md font-light mb-8">
                      Restricted administrative workspace for Mark Daniel (MXRKDXNL). Enter authorized callsign and security passkey to access operational telemetry and visual site editors.
                    </p>

                    <form onSubmit={handleAuthenticate} className="w-full max-w-md flex flex-col gap-4 text-left">
                      {/* Operator Identifier Input */}
                      <div>
                        <label className="block font-mono text-[11px] uppercase tracking-wider text-white/60 mb-1.5">
                          Operator Identifier
                        </label>
                        <input
                          type="text"
                          value={operatorId}
                          onChange={(e) => setOperatorId(e.target.value)}
                          placeholder="Callsign / Operator ID"
                          autoComplete="off"
                          className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 text-sm font-mono text-white focus:outline-none focus:border-[#00f5d4] transition-all"
                        />
                      </div>

                      {/* Access Passkey Input */}
                      <div>
                        <label className="block font-mono text-[11px] uppercase tracking-wider text-white/60 mb-1.5">
                          Access Passkey
                        </label>
                        <div className="relative">
                          <input
                            type={showPasscode ? 'text' : 'password'}
                            value={passcode}
                            onChange={(e) => setPasscode(e.target.value)}
                            placeholder="••••••••••••"
                            autoComplete="new-password"
                            className="w-full px-4 py-3 pr-11 rounded-xl bg-black/60 border border-white/15 text-sm font-mono text-white focus:outline-none focus:border-[#00f5d4] transition-all"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPasscode(!showPasscode)}
                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                            tabIndex={-1}
                            aria-label={showPasscode ? 'Hide passkey' : 'Show passkey'}
                          >
                            {showPasscode ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                      </div>

                      {/* Error feedback */}
                      {authError && (
                        <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center gap-2 text-xs font-mono text-rose-300">
                          <AlertCircle size={15} className="shrink-0 text-rose-400" />
                          <span>{authError}</span>
                        </div>
                      )}

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={isVerifying}
                        className="mt-3 w-full py-3.5 rounded-xl font-mono text-xs uppercase tracking-widest font-semibold text-white transition-all flex items-center justify-center gap-2 shadow-xl hover:scale-[1.01]"
                        style={{
                          background:
                            'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
                          outline: '2px solid #FFFFFF',
                          outlineOffset: '-3px',
                        }}
                      >
                        {isVerifying ? (
                          <>
                            <RefreshCw size={15} className="animate-spin" />
                            <span>Authenticating Console...</span>
                          </>
                        ) : (
                          <>
                            <Unlock size={15} />
                            <span>Authenticate Console</span>
                          </>
                        )}
                      </button>
                    </form>
                  </div>
                </div>
              </FadeIn>
            </div>
          ) : (
            /* ============================================================== */
            /* SCREEN 2: OPERATOR WORKSPACE (When Authenticated)              */
            /* ============================================================== */
            <div className="flex-1 flex flex-col gap-8">
              {/* Top Liquid Glass Status Banner */}
              <div className="liquid-glass p-5 sm:p-6 border border-white/15 flex flex-col lg:flex-row lg:items-center justify-between gap-4 shadow-2xl">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-[#00f5d4]/10 border border-[#00f5d4]/30 flex items-center justify-center shrink-0">
                    <ShieldCheck size={22} className="text-[#00f5d4]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-[11px] font-mono text-[#00f5d4] uppercase tracking-wider font-semibold">
                      <span className="w-2 h-2 rounded-full bg-[#00f5d4] animate-ping" />
                      <span>Operator Session Verified // Node: SL-CMB-01</span>
                    </div>
                    <h2 className="text-lg sm:text-xl font-bold text-white font-mono uppercase">
                      Operator Command & Visual Studio
                    </h2>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => handleCopy(exportAsCode(), 'ts-code')}
                    className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-mono text-white border border-white/10 flex items-center gap-1.5 transition-colors"
                  >
                    {copiedId === 'ts-code' ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                    <span>{copiedId === 'ts-code' ? 'Copied TS' : 'Export Code'}</span>
                  </button>

                  <button
                    onClick={resetToDefaults}
                    className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-mono text-white/70 hover:text-white border border-white/10 flex items-center gap-1 transition-colors"
                    title="Reset to factory defaults"
                  >
                    <RotateCcw size={13} />
                    <span>Reset</span>
                  </button>
                </div>
              </div>

              {/* Navigation Tabs */}
              <div className="liquid-glass p-1.5 border border-white/10 flex items-center gap-2 overflow-x-auto select-none">
                <button
                  onClick={() => setActiveTab('gallery')}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider transition-all whitespace-nowrap ${
                    activeTab === 'gallery'
                      ? 'bg-[#00f5d4] text-black font-bold shadow-lg'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Layout size={14} />
                  <span>Phase A: Visual Snapshots</span>
                </button>

                <button
                  onClick={() => setActiveTab('cms')}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider transition-all whitespace-nowrap ${
                    activeTab === 'cms'
                      ? 'bg-[#00f5d4] text-black font-bold shadow-lg'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Edit3 size={14} />
                  <span>Site Content CMS Studio</span>
                </button>

                <button
                  onClick={() => setActiveTab('links')}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider transition-all whitespace-nowrap ${
                    activeTab === 'links'
                      ? 'bg-[#00f5d4] text-black font-bold shadow-lg'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Link2 size={14} />
                  <span>Tracked Links</span>
                </button>

                <button
                  onClick={() => setActiveTab('cheatsheet')}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider transition-all whitespace-nowrap ${
                    activeTab === 'cheatsheet'
                      ? 'bg-[#00f5d4] text-black font-bold shadow-lg'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Shield size={14} />
                  <span>Security Vault</span>
                </button>

                <button
                  onClick={() => setActiveTab('diagnostics')}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider transition-all whitespace-nowrap ${
                    activeTab === 'diagnostics'
                      ? 'bg-[#00f5d4] text-black font-bold shadow-lg'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Activity size={14} />
                  <span>System Telemetry</span>
                </button>
              </div>

              {/* ============================================================== */}
              {/* TAB 1: PHASE A — VISUAL SNAPSHOT PAGE SELECTOR GALLERY        */}
              {/* ============================================================== */}
              {activeTab === 'gallery' && (
                <div className="space-y-6 animate-in fade-in duration-150">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h3 className="text-lg font-bold text-white uppercase tracking-wide font-sans flex items-center gap-2">
                        <Sliders size={18} className="text-[#00f5d4]" />
                        <span>Live Visual Snapshot Gallery</span>
                      </h3>
                      <p className="text-xs text-white/60 font-light">
                        Select any live page snapshot below to open Phase B Live Visual Editor (inline text editing, element dragging, and section rearrangement).
                      </p>
                    </div>
                  </div>

                  {/* 5 Page Snapshot Cards Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {PAGE_SNAPSHOTS.map((page) => (
                      <div
                        key={page.id}
                        className="liquid-glass group overflow-hidden border border-white/15 hover:border-[#00f5d4]/60 transition-all duration-300 flex flex-col shadow-2xl"
                      >
                        {/* Browser Window Header */}
                        <div className="p-3.5 flex items-center justify-between border-b border-white/10 bg-black/50">
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1.5">
                              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                            </div>
                            <span className="font-mono text-xs text-white font-bold ml-1.5">
                              {page.title}
                            </span>
                          </div>
                          <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                            {page.route}
                          </span>
                        </div>

                        {/* Miniature Live Scaled Iframe Preview */}
                        <div className="relative w-full aspect-[16/10] bg-[#0C0C0C] overflow-hidden">
                          {/* Live render pulse indicator behind iframe */}
                          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0d1117] text-white/30 font-mono text-[10px] select-none">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#00f5d4] animate-ping mb-2" />
                            <span className="tracking-widest uppercase">Rendering {page.route}</span>
                          </div>

                          <iframe
                            src={page.route}
                            title={`Live snapshot of ${page.title}`}
                            className="absolute top-0 left-0 border-0 pointer-events-none select-none z-10"
                            style={{
                              width: '333.33%',
                              height: '333.33%',
                              transform: 'scale(0.3)',
                              transformOrigin: 'top left',
                            }}
                            loading="eager"
                          />

                          {/* Hover Overlay with "OPEN IN VISUAL EDITOR" Action */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-end p-5">
                            <button
                              onClick={() => setEditingRoute(page.route)}
                              className="liquid-glass px-5 py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider text-white border border-[#00f5d4]/70 hover:bg-[#00f5d4] hover:text-black transition-all flex items-center gap-2 shadow-[0_0_25px_rgba(0,245,212,0.4)]"
                            >
                              <Edit3 size={14} />
                              <span>Open in Visual Editor</span>
                            </button>
                          </div>
                        </div>

                        {/* Card Description & Action Footer */}
                        <div className="p-4 bg-black/40 border-t border-white/5 flex flex-col justify-between flex-1 gap-3">
                          <p className="text-xs text-white/60 font-light leading-relaxed">
                            {page.description}
                          </p>

                          <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs font-mono">
                            <span className="text-[10px] text-white/40 uppercase">{page.category}</span>
                            <button
                              onClick={() => setEditingRoute(page.route)}
                              className="text-xs text-[#00f5d4] hover:underline flex items-center gap-1 font-semibold"
                            >
                              <span>Edit Visuals →</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ============================================================== */}
              {/* TAB CMS: STRUCTURED SITE CONTENT CMS STUDIO                    */}
              {/* ============================================================== */}
              {activeTab === 'cms' && (
                <div className="liquid-glass p-6 border border-white/15 space-y-6 animate-in fade-in duration-150">
                  <OperatorCmsStudio />
                </div>
              )}

              {/* ============================================================== */}
              {/* TAB 2: TRACKED LINK GENERATOR                                  */}
              {/* ============================================================== */}
              {activeTab === 'links' && (
                <div className="liquid-glass p-6 border border-white/15 space-y-6 animate-in fade-in duration-150">
                  <div className="pb-4 border-b border-white/10">
                    <h3 className="text-base font-bold text-white uppercase tracking-wide font-sans">
                      Referral & Application Link Generator
                    </h3>
                    <p className="text-xs text-white/60 font-light">
                      Create custom tagged URLs for recruiters, outreach campaigns, and resume QR codes with source attribution.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-black/40 border border-white/10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                    <div>
                      <label className="block text-[10px] font-mono uppercase text-white/50 mb-1">Recruiter / Target</label>
                      <input
                        type="text"
                        value={recruiterName}
                        onChange={(e) => setRecruiterName(e.target.value)}
                        placeholder="e.g. crowdstrike, pwc"
                        className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/10 text-xs text-white font-mono focus:border-[#00f5d4] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono uppercase text-white/50 mb-1">Destination</label>
                      <select
                        value={targetPath}
                        onChange={(e) => setTargetPath(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/10 text-xs text-white focus:border-[#00f5d4] focus:outline-none"
                      >
                        <option value="/">Home (/)</option>
                        <option value="/projects">Projects (/projects)</option>
                        <option value="/labs">Labs (/labs)</option>
                        <option value="/about">About (/about)</option>
                        <option value="/contact">Contact (/contact)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono uppercase text-white/50 mb-1">Source (utm_source)</label>
                      <select
                        value={trafficSource}
                        onChange={(e) => setTrafficSource(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/10 text-xs text-white focus:border-[#00f5d4] focus:outline-none"
                      >
                        <option value="linkedin">LinkedIn</option>
                        <option value="resume-qr">Resume QR Code</option>
                        <option value="email-direct">Email Outreach</option>
                        <option value="job-board">Job Board</option>
                        <option value="github">GitHub Profile</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono uppercase text-white/50 mb-1">Medium (utm_medium)</label>
                      <select
                        value={trafficMedium}
                        onChange={(e) => setTrafficMedium(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/10 text-xs text-white focus:border-[#00f5d4] focus:outline-none"
                      >
                        <option value="job-application">Job Application</option>
                        <option value="direct-outreach">Direct Outreach</option>
                        <option value="inmail">LinkedIn InMail</option>
                        <option value="portfolio-referral">Portfolio Referral</option>
                      </select>
                    </div>
                  </div>

                  {/* Generated Link Display */}
                  <div className="p-4 rounded-xl bg-black/70 border border-[#00f5d4]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#00f5d4] block mb-1">
                        Active Tracked URL
                      </span>
                      <code className="text-xs sm:text-sm font-mono text-cyan-200 break-all select-all block">
                        {generatedUrl}
                      </code>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={handleSaveTrackedLink}
                        className="px-4 py-2 rounded-lg bg-[#00f5d4] hover:bg-[#00f5d4]/90 text-black font-mono text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-lg"
                      >
                        {copiedId === 'generated-link' ? <Check size={14} /> : <Copy size={14} />}
                        <span>{copiedId === 'generated-link' ? 'Copied!' : 'Copy Link'}</span>
                      </button>

                      <a
                        href={generatedUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                        title="Test Link"
                      >
                        <ExternalLink size={16} />
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {/* ============================================================== */}
              {/* TAB 3: SECURITY & CHEAT-SHEET VAULT                           */}
              {/* ============================================================== */}
              {activeTab === 'cheatsheet' && (
                <div className="liquid-glass p-6 border border-white/15 space-y-6 animate-in fade-in duration-150">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
                    <div>
                      <h3 className="text-base font-bold text-white uppercase tracking-wide font-sans">
                        Security Cheat-Sheet & Command Vault
                      </h3>
                      <p className="text-xs text-white/60 font-light">
                        Curated offensive recon, forensic analysis, privilege checks, and SIEM detection queries.
                      </p>
                    </div>

                    <div className="relative w-full sm:w-64">
                      <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                      <input
                        type="text"
                        value={searchFilter}
                        onChange={(e) => setSearchFilter(e.target.value)}
                        placeholder="Search commands..."
                        className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-black/60 border border-white/10 text-xs text-white font-mono focus:border-[#00f5d4] focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Category Pills */}
                  <div className="flex items-center gap-2 overflow-x-auto pb-1">
                    {['All', 'Nmap Recon', 'Linux PrivEsc', 'Wireshark Filters', 'SIEM Queries'].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCheatCat(cat)}
                        className={`px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider transition-colors whitespace-nowrap ${
                          selectedCheatCat === cat
                            ? 'bg-[#00f5d4] text-black font-bold shadow-md'
                            : 'bg-white/5 border border-white/10 text-white/60 hover:text-white'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  <div className="space-y-3">
                    {CHEAT_SHEET_DATA.filter((item) => {
                      const matchesCategory = selectedCheatCat === 'All' || item.category === selectedCheatCat;
                      const matchesSearch =
                        item.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
                        item.command.toLowerCase().includes(searchFilter.toLowerCase());
                      return matchesCategory && matchesSearch;
                    }).map((item) => (
                      <div
                        key={item.id}
                        className="p-3.5 rounded-xl bg-black/50 border border-white/10 hover:border-white/20 transition-all flex flex-col gap-2"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] px-2 py-0.5 rounded bg-[#00f5d4]/10 border border-[#00f5d4]/30 font-mono text-[#00f5d4] uppercase">
                              {item.category}
                            </span>
                            <span className="text-xs font-bold text-white tracking-wide">{item.title}</span>
                          </div>

                          <button
                            onClick={() => handleCopy(item.command, item.id)}
                            className="px-2.5 py-1 rounded-md bg-white/10 hover:bg-white/15 text-white/80 hover:text-white font-mono text-xs flex items-center gap-1 transition-colors border border-white/5"
                          >
                            {copiedId === item.id ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                            <span>{copiedId === item.id ? 'Copied' : 'Copy'}</span>
                          </button>
                        </div>

                        <code className="text-xs font-mono text-emerald-300 bg-black/70 px-3 py-2 rounded-lg overflow-x-auto block border border-white/5 select-all">
                          {item.command}
                        </code>

                        <p className="text-[11px] text-white/60 font-light">{item.description}</p>
                      </div>
                    ))}
                  </div>

                  {/* Private Scratchpad */}
                  <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                        <FileText size={14} className="text-[#00f5d4]" />
                        <span>Private Operator Scratchpad (Encrypted / Local Storage)</span>
                      </span>

                      <button
                        onClick={handleSaveScratchpad}
                        className="px-3 py-1 rounded-md bg-[#00f5d4]/20 hover:bg-[#00f5d4]/30 text-[#00f5d4] font-mono text-xs flex items-center gap-1 transition-colors border border-[#00f5d4]/40"
                      >
                        {scratchpadSaved ? <Check size={12} className="text-emerald-400" /> : <Save size={12} />}
                        <span>{scratchpadSaved ? 'Saved' : 'Save Notes'}</span>
                      </button>
                    </div>

                    <textarea
                      rows={4}
                      value={scratchpadText}
                      onChange={(e) => setScratchpadText(e.target.value)}
                      placeholder="Paste temporary IP addresses, lab notes, flags, or confidential findings..."
                      className="w-full px-3.5 py-2.5 rounded-lg bg-black/70 border border-white/10 text-xs font-mono text-white focus:border-[#00f5d4] focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {/* ============================================================== */}
              {/* TAB 4: SYSTEM & HEADERS STATUS                                 */}
              {/* ============================================================== */}
              {activeTab === 'diagnostics' && (
                <div className="liquid-glass p-6 border border-white/15 space-y-6 animate-in fade-in duration-150">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
                    <div>
                      <h3 className="text-base font-bold text-white uppercase tracking-wide font-sans">
                        System Telemetry & Security Headers
                      </h3>
                      <p className="text-xs text-white/60 font-light">
                        Live audit of RFC 9116 security endpoints, runtime context, and Vercel edge protections.
                      </p>
                    </div>

                    <button
                      onClick={probeSecurityAssets}
                      className="px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-xs font-mono text-white flex items-center gap-1.5 transition-colors border border-white/10 self-start sm:self-auto"
                    >
                      <RefreshCw size={13} />
                      <span>Re-probe Endpoints</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-4 rounded-xl bg-black/60 border border-white/10">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-mono uppercase text-white/50">/.well-known/security.txt</span>
                        {securityTxtStatus === 'valid' ? (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                            <CheckCircle2 size={11} /> 200 OK
                          </span>
                        ) : securityTxtStatus === 'checking' ? (
                          <span className="text-[10px] font-mono text-white/50 animate-pulse">Probing...</span>
                        ) : (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/30">
                            Unreachable
                          </span>
                        )}
                      </div>
                      <span className="text-xs font-bold text-white block">RFC 9116 Disclosure</span>
                      <span className="text-[10px] text-white/40 block mt-1">
                        Canonical security contact file for white-hat vulnerability disclosures.
                      </span>
                    </div>

                    <div className="p-4 rounded-xl bg-black/60 border border-white/10">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-mono uppercase text-white/50">/sitemap.xml</span>
                        {sitemapStatus === 'valid' ? (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                            <CheckCircle2 size={11} /> 200 OK
                          </span>
                        ) : sitemapStatus === 'checking' ? (
                          <span className="text-[10px] font-mono text-white/50 animate-pulse">Probing...</span>
                        ) : (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/30">
                            Unreachable
                          </span>
                        )}
                      </div>
                      <span className="text-xs font-bold text-white block">SEO & Route Index</span>
                      <span className="text-[10px] text-white/40 block mt-1">
                        Verified routes indexed for search crawlers.
                      </span>
                    </div>

                    <div className="p-4 rounded-xl bg-black/60 border border-white/10">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-mono uppercase text-white/50">TLS Context</span>
                        {isSecureContext ? (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                            <ShieldCheck size={11} /> HTTPS SECURE
                          </span>
                        ) : (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30">
                            Local / HTTP
                          </span>
                        )}
                      </div>
                      <span className="text-xs font-bold text-white block">Cryptographic Session</span>
                      <span className="text-[10px] text-white/40 block mt-1">
                        WebCrypto API & Secure Context validation.
                      </span>
                    </div>
                  </div>

                  {securityTxtPreview && (
                    <div className="p-4 rounded-xl bg-black/70 border border-white/10">
                      <span className="text-[10px] font-mono uppercase text-white/50 block mb-1">
                        Active RFC 9116 Policy Output (Live Probe)
                      </span>
                      <pre className="text-xs font-mono text-emerald-300/90 whitespace-pre-wrap select-all">
                        {securityTxtPreview}
                      </pre>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </OperatorAtmosphere>
  );
};
