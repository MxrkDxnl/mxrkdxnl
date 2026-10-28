import React, { useState } from 'react';
import {
  Save,
  CheckCircle2,
  Trash2,
  Plus,
  Type,
  Mail,
  GraduationCap,
  Briefcase,
  FolderGit2,
  Sliders,
  RotateCcw,
  Sparkles,
  Layers,
  ChevronUp,
  ChevronDown,
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

type CmsSection = 'identity' | 'contact' | 'academics' | 'projects' | 'sections' | 'overrides';

const PAGE_DEFAULT_SECTIONS: Record<string, { id: string; name: string }[]> = {
  '/': [
    { id: 'sec-hero', name: "1. Hero Section (HI, I'M MARK & 3D Portrait)" },
    { id: 'sec-video', name: '2. Cinematic Video (Based in Sri Lanka)' },
    { id: 'sec-intro', name: '3. Introduction & Focus Profile' },
    { id: 'sec-learning', name: '4. Current Learning Focus & Skills' },
    { id: 'sec-featured-project', name: '5. Featured Project Teaser (Altrium Tracker)' },
    { id: 'sec-labs-preview', name: '6. Cybersecurity Labs & Writeups' },
  ],
  '/about': [
    { id: 'sec-about-profile', name: "1. Profile Overview & Portrait Photo" },
    { id: 'sec-about-education', name: '2. Education Timeline & Campus Logos' },
    { id: 'sec-about-experience', name: '3. Work Experience History' },
    { id: 'sec-about-skills', name: '4. Technical Skills & Competencies' },
    { id: 'sec-about-philosophy', name: '5. How I Work Philosophy' },
    { id: 'sec-about-cv', name: '6. Verified Curriculum Vitae Download' },
  ],
  '/projects': [
    { id: 'sec-projects-header', name: '1. Header & Category Filters' },
    { id: 'sec-projects-list', name: '2. Project Case Studies Grid' },
  ],
  '/labs': [
    { id: 'sec-labs-header', name: '1. Header & Policy Notice' },
    { id: 'sec-labs-list', name: '2. Laboratory Exercises Listing' },
    { id: 'sec-labs-framework', name: '3. Write-up Specification Framework' },
  ],
  '/contact': [
    { id: 'sec-contact-header', name: '1. Header & Primary Email Channel' },
    { id: 'sec-contact-inboxes', name: '2. Available Email Inboxes Grid' },
    { id: 'sec-contact-socials', name: '3. Verified Social Channels' },
    { id: 'sec-contact-cv', name: '4. Official CV Download Card' },
  ],
};

export const OperatorCmsStudio: React.FC = () => {
  const {
    data,
    updateData,
    updateIdentity,
    updateContact,
    updateEducation,
    updateWorkExperience,
    updateCurrentLearning,
    textOverrides,
    updateTextOverride,
    removeTextOverride,
    layouts,
    updatePageLayout,
    resetPageLayout,
  } = usePortfolio();

  const [activeSection, setActiveSection] = useState<CmsSection>('identity');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [selectedRouteForSections, setSelectedRouteForSections] = useState('/');

  // Identity state
  const [identityState, setIdentityState] = useState({
    heroGreeting: data.identity.heroGreeting,
    preferredName: data.identity.preferredName,
    fullName: data.identity.fullName,
    onlineIdentity: data.identity.onlineIdentity,
    domain: data.identity.domain,
    location: data.identity.location,
    currentStatus: data.identity.currentStatus,
    university: data.identity.university,
    introduction: data.identity.introduction,
  });

  const [careerInterests, setCareerInterests] = useState<string[]>(
    data.identity.careerInterests || []
  );
  const [currentLearning, setCurrentLearning] = useState<string[]>(
    data.currentLearning || []
  );

  // Contact state
  const [contactState, setContactState] = useState({
    primaryEmail: data.contact.primaryEmail,
    phone: data.contact.phone,
    location: data.contact.location,
    cvUrl: data.contact.cv.url,
    cvFilename: data.contact.cv.filename,
  });

  // Education state
  const [educationList, setEducationList] = useState(data.education);

  // Work experience state
  const [workList, setWorkList] = useState(data.workExperience);

  // Projects state
  const [projectsList, setProjectsList] = useState(data.projects);
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);

  // Manual Text Override Quick Tool state
  const [findText, setFindText] = useState('');
  const [replaceWithText, setReplaceWithText] = useState('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Save Identity
  const handleSaveIdentity = (e: React.FormEvent) => {
    e.preventDefault();
    updateIdentity({
      ...identityState,
      careerInterests,
    });
    updateCurrentLearning(currentLearning);
    showToast('Identity & Hero settings saved and live!');
  };

  // Save Contact
  const handleSaveContact = (e: React.FormEvent) => {
    e.preventDefault();
    updateContact({
      ...data.contact,
      primaryEmail: contactState.primaryEmail,
      phone: contactState.phone,
      location: contactState.location,
      cv: {
        ...data.contact.cv,
        url: contactState.cvUrl,
        filename: contactState.cvFilename,
      },
    });
    showToast('Contact channels and CV updated and live!');
  };

  // Save Education & Work
  const handleSaveAcademics = () => {
    updateEducation(educationList);
    updateWorkExperience(workList);
    showToast('Education & Work history updated and live!');
  };

  // Save Projects
  const handleSaveProjects = () => {
    updateData({
      ...data,
      projects: projectsList,
    });
    showToast('Projects and Case Studies updated and live!');
  };

  // Apply Manual Text Override
  const handleAddManualOverride = (e: React.FormEvent) => {
    e.preventDefault();
    if (!findText.trim() || !replaceWithText.trim()) {
      showToast('Both Find and Replace fields are required.');
      return;
    }
    updateTextOverride('', findText.trim(), replaceWithText.trim());
    showToast(`Override saved: "${findText.trim()}" → "${replaceWithText.trim()}"`);
    setFindText('');
    setReplaceWithText('');
  };

  // Get current ordered sections for route
  const getCurrentOrderedSections = (route: string) => {
    const defaults = PAGE_DEFAULT_SECTIONS[route] || [];
    const savedOrder = layouts[route]?.sectionOrder;
    if (!savedOrder || savedOrder.length === 0) return defaults;

    const copy = [...defaults];
    copy.sort((a, b) => {
      const idxA = savedOrder.indexOf(a.id);
      const idxB = savedOrder.indexOf(b.id);
      if (idxA === -1 && idxB === -1) return 0;
      if (idxA === -1) return 1;
      if (idxB === -1) return -1;
      return idxA - idxB;
    });
    return copy;
  };

  // Handle reordering sections from CMS
  const handleCmsMoveSection = (route: string, index: number, direction: 'up' | 'down') => {
    const currentList = getCurrentOrderedSections(route);
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === currentList.length - 1)
    ) {
      return;
    }

    const updated = [...currentList];
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    const temp = updated[index];
    updated[index] = updated[targetIdx];
    updated[targetIdx] = temp;

    const newOrderIds = updated.map((s) => s.id);

    // Update in context & localStorage
    updatePageLayout(route, {
      sectionOrder: newOrderIds,
    });

    // If currently on that page or viewing preview, update DOM style.order
    newOrderIds.forEach((id, orderIdx) => {
      const el = document.querySelector<HTMLElement>(
        `section[data-section-id="${id}"], section#${id}`
      );
      if (el) {
        const parent = el.parentElement;
        if (parent && parent.style.display !== 'flex') {
          parent.style.display = 'flex';
          parent.style.flexDirection = 'column';
        }
        el.style.order = String(orderIdx);
      }
    });

    showToast(`Moved "${temp.name}" ${direction}`);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* Toast Banner */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 px-4 py-2 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-mono text-xs shadow-2xl flex items-center gap-2 animate-in slide-in-from-top-2">
          <CheckCircle2 size={14} className="text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
        <div>
          <h3 className="text-lg font-bold text-white uppercase tracking-wide font-sans flex items-center gap-2">
            <Sliders size={18} className="text-[#00f5d4]" />
            <span>Site Content CMS Studio</span>
          </h3>
          <p className="text-xs text-white/60 font-light">
            Edit structured portfolio fields directly. Changes save immediately to local storage and sync across all pages.
          </p>
        </div>

        <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 flex items-center gap-1.5 self-start sm:self-auto">
          <Sparkles size={12} className="text-purple-400" />
          <span>Full Real-Time Synchronization</span>
        </span>
      </div>

      {/* CMS Sub-Navigation Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 select-none">
        <button
          onClick={() => setActiveSection('identity')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all whitespace-nowrap ${
            activeSection === 'identity'
              ? 'bg-[#00f5d4] text-black font-bold shadow-md'
              : 'bg-white/5 border border-white/10 text-white/60 hover:text-white'
          }`}
        >
          <Type size={13} />
          <span>Hero & Identity</span>
        </button>

        <button
          onClick={() => setActiveSection('contact')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all whitespace-nowrap ${
            activeSection === 'contact'
              ? 'bg-[#00f5d4] text-black font-bold shadow-md'
              : 'bg-white/5 border border-white/10 text-white/60 hover:text-white'
          }`}
        >
          <Mail size={13} />
          <span>Contact & Socials</span>
        </button>

        <button
          onClick={() => setActiveSection('academics')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all whitespace-nowrap ${
            activeSection === 'academics'
              ? 'bg-[#00f5d4] text-black font-bold shadow-md'
              : 'bg-white/5 border border-white/10 text-white/60 hover:text-white'
          }`}
        >
          <GraduationCap size={13} />
          <span>Education & Work</span>
        </button>

        <button
          onClick={() => setActiveSection('projects')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all whitespace-nowrap ${
            activeSection === 'projects'
              ? 'bg-[#00f5d4] text-black font-bold shadow-md'
              : 'bg-white/5 border border-white/10 text-white/60 hover:text-white'
          }`}
        >
          <FolderGit2 size={13} />
          <span>Projects ({projectsList.length})</span>
        </button>

        <button
          onClick={() => setActiveSection('sections')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all whitespace-nowrap ${
            activeSection === 'sections'
              ? 'bg-[#00f5d4] text-black font-bold shadow-md'
              : 'bg-white/5 border border-white/10 text-white/60 hover:text-white'
          }`}
        >
          <Layers size={13} />
          <span>Section Orders</span>
        </button>

        <button
          onClick={() => setActiveSection('overrides')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all whitespace-nowrap ${
            activeSection === 'overrides'
              ? 'bg-[#00f5d4] text-black font-bold shadow-md'
              : 'bg-white/5 border border-white/10 text-white/60 hover:text-white'
          }`}
        >
          <RotateCcw size={13} />
          <span>Text Overrides ({Object.keys(textOverrides).length})</span>
        </button>
      </div>

      {/* ================================================================ */}
      {/* SECTION 1: HERO & IDENTITY                                       */}
      {/* ================================================================ */}
      {activeSection === 'identity' && (
        <form onSubmit={handleSaveIdentity} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-[11px] font-mono uppercase text-white/60 mb-1.5">
                Hero Heading Greeting
              </label>
              <input
                type="text"
                value={identityState.heroGreeting}
                onChange={(e) => setIdentityState({ ...identityState, heroGreeting: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-sm text-white font-mono focus:outline-none focus:border-[#00f5d4]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase text-white/60 mb-1.5">
                Full Legal Name
              </label>
              <input
                type="text"
                value={identityState.fullName}
                onChange={(e) => setIdentityState({ ...identityState, fullName: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-sm text-white font-mono focus:outline-none focus:border-[#00f5d4]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase text-white/60 mb-1.5">
                Preferred Display Name
              </label>
              <input
                type="text"
                value={identityState.preferredName}
                onChange={(e) => setIdentityState({ ...identityState, preferredName: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-sm text-white font-mono focus:outline-none focus:border-[#00f5d4]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase text-white/60 mb-1.5">
                Online Identity / Handle
              </label>
              <input
                type="text"
                value={identityState.onlineIdentity}
                onChange={(e) => setIdentityState({ ...identityState, onlineIdentity: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-sm text-white font-mono focus:outline-none focus:border-[#00f5d4]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase text-white/60 mb-1.5">
                Location
              </label>
              <input
                type="text"
                value={identityState.location}
                onChange={(e) => setIdentityState({ ...identityState, location: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-sm text-white font-mono focus:outline-none focus:border-[#00f5d4]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase text-white/60 mb-1.5">
                Domain
              </label>
              <input
                type="text"
                value={identityState.domain}
                onChange={(e) => setIdentityState({ ...identityState, domain: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-sm text-white font-mono focus:outline-none focus:border-[#00f5d4]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-mono uppercase text-white/60 mb-1.5">
              Current Academic & Professional Status
            </label>
            <input
              type="text"
              value={identityState.currentStatus}
              onChange={(e) => setIdentityState({ ...identityState, currentStatus: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-sm text-white font-mono focus:outline-none focus:border-[#00f5d4]"
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono uppercase text-white/60 mb-1.5">
              University & Institution Context
            </label>
            <input
              type="text"
              value={identityState.university}
              onChange={(e) => setIdentityState({ ...identityState, university: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-sm text-white font-mono focus:outline-none focus:border-[#00f5d4]"
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono uppercase text-white/60 mb-1.5">
              Bio / Introduction Statement
            </label>
            <textarea
              rows={4}
              value={identityState.introduction}
              onChange={(e) => setIdentityState({ ...identityState, introduction: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-sm text-white font-sans focus:outline-none focus:border-[#00f5d4]"
            />
          </div>

          {/* Career Interests list */}
          <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                Career Interests & Target Roles
              </span>
              <button
                type="button"
                onClick={() => setCareerInterests([...careerInterests, 'New Role Target'])}
                className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white font-mono text-[11px] flex items-center gap-1"
              >
                <Plus size={12} />
                <span>Add Role</span>
              </button>
            </div>

            <div className="space-y-2">
              {careerInterests.map((interest, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={interest}
                    onChange={(e) => {
                      const updated = [...careerInterests];
                      updated[idx] = e.target.value;
                      setCareerInterests(updated);
                    }}
                    className="flex-1 px-3 py-1.5 rounded-lg bg-black/60 border border-white/10 text-xs text-white font-mono focus:border-[#00f5d4] focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setCareerInterests(careerInterests.filter((_, i) => i !== idx))}
                    className="p-1.5 text-rose-400 hover:text-rose-300"
                    title="Remove"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Current Learning items */}
          <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                Current Technical Focus & Skills
              </span>
              <button
                type="button"
                onClick={() => setCurrentLearning([...currentLearning, 'New Skill Focus'])}
                className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white font-mono text-[11px] flex items-center gap-1"
              >
                <Plus size={12} />
                <span>Add Skill</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {currentLearning.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => {
                      const updated = [...currentLearning];
                      updated[idx] = e.target.value;
                      setCurrentLearning(updated);
                    }}
                    className="flex-1 px-3 py-1.5 rounded-lg bg-black/60 border border-white/10 text-xs text-white font-mono focus:border-[#00f5d4] focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setCurrentLearning(currentLearning.filter((_, i) => i !== idx))}
                    className="p-1.5 text-rose-400 hover:text-rose-300"
                    title="Remove"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl font-mono text-xs uppercase tracking-wider font-bold bg-[#00f5d4] text-black hover:brightness-110 shadow-lg flex items-center gap-2"
            >
              <Save size={14} />
              <span>Save Identity & Hero</span>
            </button>
          </div>
        </form>
      )}

      {/* ================================================================ */}
      {/* SECTION 2: CONTACT & SOCIALS                                     */}
      {/* ================================================================ */}
      {activeSection === 'contact' && (
        <form onSubmit={handleSaveContact} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-mono uppercase text-white/60 mb-1.5">
                Primary Domain Email
              </label>
              <input
                type="email"
                value={contactState.primaryEmail}
                onChange={(e) => setContactState({ ...contactState, primaryEmail: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-sm text-white font-mono focus:outline-none focus:border-[#00f5d4]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase text-white/60 mb-1.5">
                Phone Number / WhatsApp
              </label>
              <input
                type="text"
                value={contactState.phone}
                onChange={(e) => setContactState({ ...contactState, phone: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-sm text-white font-mono focus:outline-none focus:border-[#00f5d4]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase text-white/60 mb-1.5">
                CV File URL / Path
              </label>
              <input
                type="text"
                value={contactState.cvUrl}
                onChange={(e) => setContactState({ ...contactState, cvUrl: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-sm text-white font-mono focus:outline-none focus:border-[#00f5d4]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase text-white/60 mb-1.5">
                CV Download Filename
              </label>
              <input
                type="text"
                value={contactState.cvFilename}
                onChange={(e) => setContactState({ ...contactState, cvFilename: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-sm text-white font-mono focus:outline-none focus:border-[#00f5d4]"
              />
            </div>
          </div>

          {/* Inboxes overview */}
          <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-3">
            <span className="text-xs font-mono font-bold text-white uppercase tracking-wider block">
              Active Inboxes Routing
            </span>
            <div className="space-y-2">
              {data.contact.inboxes.map((inbox, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-black/60 border border-white/10 flex items-center justify-between text-xs font-mono">
                  <span className="text-white/70">{inbox.label} ({inbox.type})</span>
                  <span className="text-[#00f5d4]">{inbox.address}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl font-mono text-xs uppercase tracking-wider font-bold bg-[#00f5d4] text-black hover:brightness-110 shadow-lg flex items-center gap-2"
            >
              <Save size={14} />
              <span>Save Contact Details</span>
            </button>
          </div>
        </form>
      )}

      {/* ================================================================ */}
      {/* SECTION 3: ACADEMICS & WORK HISTORY                              */}
      {/* ================================================================ */}
      {activeSection === 'academics' && (
        <div className="space-y-6">
          {/* Education items */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <GraduationCap size={16} className="text-[#00f5d4]" />
                <span>Education & Qualifications ({educationList.length})</span>
              </h4>
              <button
                type="button"
                onClick={() =>
                  setEducationList([
                    ...educationList,
                    {
                      degree: 'Degree Title',
                      institution: 'University / College',
                      period: '2026',
                      statusNote: 'Status Note',
                    },
                  ])
                }
                className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-mono text-xs flex items-center gap-1"
              >
                <Plus size={13} />
                <span>Add Education</span>
              </button>
            </div>

            <div className="space-y-3">
              {educationList.map((edu, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-black/50 border border-white/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-white/50">Item #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => setEducationList(educationList.filter((_, i) => i !== idx))}
                      className="text-rose-400 hover:text-rose-300 p-1"
                      title="Remove"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[10px] font-mono uppercase text-white/50 mb-1">Degree / Certificate</label>
                      <input
                        type="text"
                        value={edu.degree}
                        onChange={(e) => {
                          const updated = [...educationList];
                          updated[idx].degree = e.target.value;
                          setEducationList(updated);
                        }}
                        className="w-full px-3 py-2 rounded-lg bg-black/70 border border-white/10 text-xs text-white font-mono focus:border-[#00f5d4] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono uppercase text-white/50 mb-1">Institution</label>
                      <input
                        type="text"
                        value={edu.institution}
                        onChange={(e) => {
                          const updated = [...educationList];
                          updated[idx].institution = e.target.value;
                          setEducationList(updated);
                        }}
                        className="w-full px-3 py-2 rounded-lg bg-black/70 border border-white/10 text-xs text-white font-mono focus:border-[#00f5d4] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono uppercase text-white/50 mb-1">Period (Years)</label>
                      <input
                        type="text"
                        value={edu.period}
                        onChange={(e) => {
                          const updated = [...educationList];
                          updated[idx].period = e.target.value;
                          setEducationList(updated);
                        }}
                        className="w-full px-3 py-2 rounded-lg bg-black/70 border border-white/10 text-xs text-white font-mono focus:border-[#00f5d4] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Work experience */}
          <div className="space-y-4 pt-4 border-t border-white/10">
            <h4 className="text-sm font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Briefcase size={16} className="text-[#00f5d4]" />
              <span>Work Experience ({workList.length})</span>
            </h4>

            <div className="space-y-3">
              {workList.map((exp, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-black/50 border border-white/10 space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[10px] font-mono uppercase text-white/50 mb-1">Role</label>
                      <input
                        type="text"
                        value={exp.role}
                        onChange={(e) => {
                          const updated = [...workList];
                          updated[idx].role = e.target.value;
                          setWorkList(updated);
                        }}
                        className="w-full px-3 py-2 rounded-lg bg-black/70 border border-white/10 text-xs text-white font-mono focus:border-[#00f5d4] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono uppercase text-white/50 mb-1">Company</label>
                      <input
                        type="text"
                        value={exp.company}
                        onChange={(e) => {
                          const updated = [...workList];
                          updated[idx].company = e.target.value;
                          setWorkList(updated);
                        }}
                        className="w-full px-3 py-2 rounded-lg bg-black/70 border border-white/10 text-xs text-white font-mono focus:border-[#00f5d4] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono uppercase text-white/50 mb-1">Period</label>
                      <input
                        type="text"
                        value={exp.period}
                        onChange={(e) => {
                          const updated = [...workList];
                          updated[idx].period = e.target.value;
                          setWorkList(updated);
                        }}
                        className="w-full px-3 py-2 rounded-lg bg-black/70 border border-white/10 text-xs text-white font-mono focus:border-[#00f5d4] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={handleSaveAcademics}
              className="px-6 py-2.5 rounded-xl font-mono text-xs uppercase tracking-wider font-bold bg-[#00f5d4] text-black hover:brightness-110 shadow-lg flex items-center gap-2"
            >
              <Save size={14} />
              <span>Save Academics & Experience</span>
            </button>
          </div>
        </div>
      )}

      {/* ================================================================ */}
      {/* SECTION 4: PROJECTS                                              */}
      {/* ================================================================ */}
      {activeSection === 'projects' && (
        <div className="space-y-5">
          <div className="flex items-center gap-3">
            <label className="text-xs font-mono text-white/60">Select Project to Edit:</label>
            <select
              value={selectedProjectIndex}
              onChange={(e) => setSelectedProjectIndex(Number(e.target.value))}
              className="px-3.5 py-2 rounded-xl bg-black/70 border border-white/15 text-xs font-mono text-[#00f5d4] focus:outline-none"
            >
              {projectsList.map((p, idx) => (
                <option key={p.id} value={idx}>
                  {idx + 1}. {p.name}
                </option>
              ))}
            </select>
          </div>

          {projectsList[selectedProjectIndex] && (
            <div className="p-5 rounded-2xl bg-black/50 border border-white/15 space-y-4">
              <div>
                <label className="block text-[11px] font-mono uppercase text-white/50 mb-1">Project Name</label>
                <input
                  type="text"
                  value={projectsList[selectedProjectIndex].name}
                  onChange={(e) => {
                    const updated = [...projectsList];
                    updated[selectedProjectIndex].name = e.target.value;
                    setProjectsList(updated);
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/70 border border-white/15 text-sm text-white font-mono focus:border-[#00f5d4] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-white/50 mb-1">Tagline</label>
                <input
                  type="text"
                  value={projectsList[selectedProjectIndex].tagline}
                  onChange={(e) => {
                    const updated = [...projectsList];
                    updated[selectedProjectIndex].tagline = e.target.value;
                    setProjectsList(updated);
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/70 border border-white/15 text-sm text-white font-mono focus:border-[#00f5d4] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono uppercase text-white/50 mb-1">Status</label>
                  <input
                    type="text"
                    value={projectsList[selectedProjectIndex].status}
                    onChange={(e) => {
                      const updated = [...projectsList];
                      updated[selectedProjectIndex].status = e.target.value;
                      setProjectsList(updated);
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/70 border border-white/15 text-sm text-white font-mono focus:border-[#00f5d4] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase text-white/50 mb-1">Institution</label>
                  <input
                    type="text"
                    value={projectsList[selectedProjectIndex].institution}
                    onChange={(e) => {
                      const updated = [...projectsList];
                      updated[selectedProjectIndex].institution = e.target.value;
                      setProjectsList(updated);
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/70 border border-white/15 text-sm text-white font-mono focus:border-[#00f5d4] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-white/50 mb-1">Short Description</label>
                <textarea
                  rows={3}
                  value={projectsList[selectedProjectIndex].shortDescription}
                  onChange={(e) => {
                    const updated = [...projectsList];
                    updated[selectedProjectIndex].shortDescription = e.target.value;
                    setProjectsList(updated);
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/70 border border-white/15 text-xs text-white font-sans focus:border-[#00f5d4] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-white/50 mb-1">Comprehensive Overview</label>
                <textarea
                  rows={4}
                  value={projectsList[selectedProjectIndex].overview}
                  onChange={(e) => {
                    const updated = [...projectsList];
                    updated[selectedProjectIndex].overview = e.target.value;
                    setProjectsList(updated);
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/70 border border-white/15 text-xs text-white font-sans focus:border-[#00f5d4] focus:outline-none"
                />
              </div>
            </div>
          )}

          <div className="flex justify-end pt-2">
            <button
              onClick={handleSaveProjects}
              className="px-6 py-2.5 rounded-xl font-mono text-xs uppercase tracking-wider font-bold bg-[#00f5d4] text-black hover:brightness-110 shadow-lg flex items-center gap-2"
            >
              <Save size={14} />
              <span>Save Projects</span>
            </button>
          </div>
        </div>
      )}

      {/* ================================================================ */}
      {/* SECTION 5: SECTION ORDERS MANAGEMENT                             */}
      {/* ================================================================ */}
      {activeSection === 'sections' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
            <div>
              <span className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <Layers size={14} className="text-[#00f5d4]" />
                <span>Page Section Order Management</span>
              </span>
              <p className="text-xs text-white/60 font-light mt-0.5">
                Shift the vertical order of page sections up or down. Changes apply instantly across the site and persist.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <label className="text-xs font-mono text-white/60">Target Page:</label>
              <select
                value={selectedRouteForSections}
                onChange={(e) => setSelectedRouteForSections(e.target.value)}
                className="px-3.5 py-1.5 rounded-xl bg-black/70 border border-white/15 text-xs font-mono text-[#00f5d4] focus:outline-none"
              >
                <option value="/">Home (/)</option>
                <option value="/about">About (/about)</option>
                <option value="/projects">Projects (/projects)</option>
                <option value="/labs">Labs (/labs)</option>
                <option value="/contact">Contact (/contact)</option>
              </select>
            </div>
          </div>

          {/* Section Items for selected route */}
          <div className="space-y-2">
            {getCurrentOrderedSections(selectedRouteForSections).map((sec, idx, arr) => (
              <div
                key={sec.id}
                className="p-3.5 rounded-xl bg-black/50 border border-white/10 flex items-center justify-between gap-3 text-xs font-mono"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center font-bold text-white/80 shrink-0">
                    {idx + 1}
                  </span>
                  <div className="min-w-0">
                    <span className="text-white font-medium block truncate">{sec.name}</span>
                    <span className="text-[10px] text-white/40 font-mono">{sec.id}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    disabled={idx === 0}
                    onClick={() => handleCmsMoveSection(selectedRouteForSections, idx, 'up')}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 disabled:opacity-20 text-white transition-colors"
                    title="Move Up"
                  >
                    <ChevronUp size={14} />
                  </button>

                  <button
                    type="button"
                    disabled={idx === arr.length - 1}
                    onClick={() => handleCmsMoveSection(selectedRouteForSections, idx, 'down')}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 disabled:opacity-20 text-white transition-colors"
                    title="Move Down"
                  >
                    <ChevronDown size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-white/10">
            <span className="text-xs font-mono text-white/40">
              {layouts[selectedRouteForSections]?.sectionOrder ? 'Custom order active' : 'Default order active'}
            </span>
            <button
              type="button"
              onClick={() => {
                resetPageLayout(selectedRouteForSections);
                showToast(`Section order for ${selectedRouteForSections} reset to defaults.`);
              }}
              className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-rose-300 border border-rose-500/30 text-xs font-mono flex items-center gap-1.5"
            >
              <RotateCcw size={13} />
              <span>Reset Page Order</span>
            </button>
          </div>
        </div>
      )}

      {/* ================================================================ */}
      {/* SECTION 6: LIVE TEXT OVERRIDES & QUICK REPLACER                  */}
      {/* ================================================================ */}
      {activeSection === 'overrides' && (
        <div className="space-y-6">
          {/* Quick Find & Replace Tool */}
          <form onSubmit={handleAddManualOverride} className="p-5 rounded-2xl bg-black/50 border border-white/15 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-white uppercase">
              <Type size={14} className="text-[#00f5d4]" />
              <span>Quick Global Text Replacer</span>
            </div>
            <p className="text-xs text-white/60 font-light">
              Enter any text that currently exists anywhere on the website to replace it globally with your new text.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-mono uppercase text-white/50 mb-1">Find Existing Text</label>
                <input
                  type="text"
                  value={findText}
                  onChange={(e) => setFindText(e.target.value)}
                  placeholder="e.g. HI, I'M MARK"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/70 border border-white/15 text-xs text-white font-mono focus:border-[#00f5d4] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-white/50 mb-1">Replace With</label>
                <input
                  type="text"
                  value={replaceWithText}
                  onChange={(e) => setReplaceWithText(e.target.value)}
                  placeholder="e.g. WELCOME TO MY VAULT"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/70 border border-white/15 text-xs text-white font-mono focus:border-[#00f5d4] focus:outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end pt-1">
              <button
                type="submit"
                className="px-5 py-2 rounded-xl font-mono text-xs uppercase tracking-wider font-bold bg-[#00f5d4] text-black hover:brightness-110 flex items-center gap-1.5 shadow-lg"
              >
                <Plus size={14} />
                <span>Apply Global Override</span>
              </button>
            </div>
          </form>

          {/* Active Overrides Table */}
          <div className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                Active Live Overrides ({Object.keys(textOverrides).length})
              </span>
              <span className="text-[11px] font-mono text-white/40">Persistent across tabs & refreshes</span>
            </div>

            {Object.keys(textOverrides).length === 0 ? (
              <div className="text-center py-8 text-white/40 font-mono text-xs">
                No custom text overrides active. Use the form above or the Live Visual Editor to edit any content!
              </div>
            ) : (
              <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
                {Object.entries(textOverrides).map(([original, replaced]) => (
                  <div
                    key={original}
                    className="p-3 rounded-xl bg-black/60 border border-white/10 flex items-center justify-between gap-3 text-xs font-mono"
                  >
                    <div className="min-w-0 flex-1 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                      <span className="text-white/50 truncate max-w-xs line-through">{original}</span>
                      <span className="text-white/30 hidden sm:inline">→</span>
                      <span className="text-[#00f5d4] font-semibold truncate max-w-xs">{replaced}</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        removeTextOverride(original);
                        showToast(`Reverted "${original}"`);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[11px] font-mono shrink-0 transition-colors"
                      title="Revert to original"
                    >
                      Revert
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
