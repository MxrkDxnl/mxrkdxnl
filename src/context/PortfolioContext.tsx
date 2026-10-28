import React, { createContext, useContext, useState, useEffect } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export type PortfolioDataType = typeof PORTFOLIO_DATA;

export interface PageLayoutConfig {
  sectionOrder?: string[];
  boxOffsets?: Record<string, { x: number; y: number }>;
  textOverrides?: Record<string, string>;
}

export interface SiteLayoutConfig {
  [route: string]: PageLayoutConfig;
}

interface PortfolioContextType {
  data: PortfolioDataType;
  layouts: SiteLayoutConfig;
  textOverrides: Record<string, string>;
  updateData: (newData: PortfolioDataType) => void;
  updateIdentity: (identity: Partial<PortfolioDataType['identity']>) => void;
  updateContact: (contact: Partial<PortfolioDataType['contact']>) => void;
  updateProjects: (projects: PortfolioDataType['projects']) => void;
  updateLabs: (labs: PortfolioDataType['labs']) => void;
  updateEducation: (education: PortfolioDataType['education']) => void;
  updateWorkExperience: (workExperience: PortfolioDataType['workExperience']) => void;
  updateCurrentLearning: (items: string[]) => void;
  updateMatchingField: (oldText: string, newText: string) => boolean;
  updatePageLayout: (route: string, update: Partial<PageLayoutConfig>) => void;
  updateTextOverride: (route: string, originalText: string, newText: string) => void;
  removeTextOverride: (originalText: string) => void;
  resetPageLayout: (route: string) => void;
  resetToDefaults: () => void;
  exportAsCode: () => string;
  hasCustomizations: boolean;
}

const STORAGE_KEY = 'mxrk_live_portfolio_data';
const STORAGE_KEY_LAYOUTS = 'mxrk_live_layout_config';
const STORAGE_KEY_OVERRIDES = 'mxrk_live_text_overrides';

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<PortfolioDataType>(() => {
    try {
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          return { ...PORTFOLIO_DATA, ...parsed };
        }
      }
    } catch {
      // ignore
    }
    return PORTFOLIO_DATA;
  });

  const [layouts, setLayouts] = useState<SiteLayoutConfig>(() => {
    try {
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem(STORAGE_KEY_LAYOUTS);
        if (stored) return JSON.parse(stored);
      }
    } catch {
      // ignore
    }
    return {};
  });

  const [textOverrides, setTextOverrides] = useState<Record<string, string>>(() => {
    try {
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem(STORAGE_KEY_OVERRIDES);
        if (stored) return JSON.parse(stored);
      }
    } catch {
      // ignore
    }
    return {};
  });

  const [hasCustomizations, setHasCustomizations] = useState<boolean>(() => {
    try {
      return Boolean(
        typeof window !== 'undefined' &&
          (localStorage.getItem(STORAGE_KEY) ||
            localStorage.getItem(STORAGE_KEY_LAYOUTS) ||
            localStorage.getItem(STORAGE_KEY_OVERRIDES))
      );
    } catch {
      return false;
    }
  });

  // Save to localStorage whenever data changes
  const updateData = (newData: PortfolioDataType) => {
    setData(newData);
    setHasCustomizations(true);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
      window.dispatchEvent(new Event('portfolio-updated'));
    } catch (e) {
      console.warn('Failed to save portfolio data to localStorage', e);
    }
  };

  const updateIdentity = (identityUpdate: Partial<PortfolioDataType['identity']>) => {
    updateData({
      ...data,
      identity: {
        ...data.identity,
        ...identityUpdate,
      },
    });
  };

  const updateContact = (contactUpdate: Partial<PortfolioDataType['contact']>) => {
    updateData({
      ...data,
      contact: {
        ...data.contact,
        ...contactUpdate,
      },
    });
  };

  const updateProjects = (projectsUpdate: PortfolioDataType['projects']) => {
    updateData({
      ...data,
      projects: projectsUpdate,
    });
  };

  const updateLabs = (labsUpdate: PortfolioDataType['labs']) => {
    updateData({
      ...data,
      labs: labsUpdate,
    });
  };

  const updateEducation = (educationUpdate: PortfolioDataType['education']) => {
    updateData({
      ...data,
      education: educationUpdate,
    });
  };

  const updateWorkExperience = (workExperienceUpdate: PortfolioDataType['workExperience']) => {
    updateData({
      ...data,
      workExperience: workExperienceUpdate,
    });
  };

  const updateCurrentLearning = (itemsUpdate: string[]) => {
    updateData({
      ...data,
      currentLearning: itemsUpdate,
    });
  };

  // Deep search and replace in PORTFOLIO_DATA
  const updateMatchingField = (oldText: string, newText: string): boolean => {
    const cleanOld = oldText.trim();
    const cleanNew = newText.trim();
    if (!cleanOld || cleanOld === cleanNew) return false;

    let matched = false;

    const deepReplace = (obj: any): any => {
      if (typeof obj === 'string') {
        if (obj.trim() === cleanOld) {
          matched = true;
          return cleanNew;
        }
        if (cleanOld.length >= 6 && obj.includes(cleanOld)) {
          matched = true;
          return obj.replaceAll(cleanOld, cleanNew);
        }
        return obj;
      }
      if (Array.isArray(obj)) {
        return obj.map(deepReplace);
      }
      if (obj !== null && typeof obj === 'object') {
        const copy: any = {};
        for (const k of Object.keys(obj)) {
          copy[k] = deepReplace(obj[k]);
        }
        return copy;
      }
      return obj;
    };

    const nextData = deepReplace(data);
    if (matched) {
      updateData(nextData);
    }

    // Always update global textOverrides as well so static JSX text is also replaced
    updateTextOverride('', cleanOld, cleanNew);

    return matched;
  };

  const updatePageLayout = (route: string, update: Partial<PageLayoutConfig>) => {
    setLayouts((prev) => {
      const next = {
        ...prev,
        [route]: {
          ...prev[route],
          ...update,
        },
      };
      try {
        localStorage.setItem(STORAGE_KEY_LAYOUTS, JSON.stringify(next));
        window.dispatchEvent(new Event('layouts-updated'));
      } catch {}
      return next;
    });
    setHasCustomizations(true);
  };

  const updateTextOverride = (route: string, originalText: string, newText: string) => {
    const cleanOriginal = originalText.trim();
    const cleanNew = newText.trim();
    if (!cleanOriginal) return;

    // 1. Update global text overrides
    setTextOverrides((prev) => {
      const next = {
        ...prev,
        [cleanOriginal]: cleanNew,
        [cleanOriginal.toLowerCase()]: cleanNew,
      };
      try {
        localStorage.setItem(STORAGE_KEY_OVERRIDES, JSON.stringify(next));
      } catch {}
      return next;
    });

    // 2. Also track under route if provided
    if (route) {
      setLayouts((prev) => {
        const currentRoute = prev[route] || {};
        const currentOverrides = currentRoute.textOverrides || {};
        const next = {
          ...prev,
          [route]: {
            ...currentRoute,
            textOverrides: {
              ...currentOverrides,
              [cleanOriginal]: cleanNew,
            },
          },
        };
        try {
          localStorage.setItem(STORAGE_KEY_LAYOUTS, JSON.stringify(next));
          window.dispatchEvent(new Event('layouts-updated'));
        } catch {}
        return next;
      });
    }

    setHasCustomizations(true);
  };

  const removeTextOverride = (originalText: string) => {
    const clean = originalText.trim();
    setTextOverrides((prev) => {
      const next = { ...prev };
      delete next[clean];
      delete next[clean.toLowerCase()];
      try {
        localStorage.setItem(STORAGE_KEY_OVERRIDES, JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const resetPageLayout = (route: string) => {
    if (typeof document !== 'undefined') {
      const allSections = document.querySelectorAll<HTMLElement>('section');
      allSections.forEach((s) => {
        s.style.order = '';
      });
    }

    setLayouts((prev) => {
      const next = { ...prev };
      delete next[route];
      try {
        localStorage.setItem(STORAGE_KEY_LAYOUTS, JSON.stringify(next));
        window.dispatchEvent(new Event('layouts-updated'));
      } catch {}
      return next;
    });
  };

  const resetToDefaults = () => {
    if (typeof document !== 'undefined') {
      const allSections = document.querySelectorAll<HTMLElement>('section');
      allSections.forEach((s) => {
        s.style.order = '';
      });
    }
    setData(PORTFOLIO_DATA);
    setLayouts({});
    setTextOverrides({});
    setHasCustomizations(false);
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(STORAGE_KEY_LAYOUTS);
      localStorage.removeItem(STORAGE_KEY_OVERRIDES);
      window.dispatchEvent(new Event('portfolio-updated'));
      window.dispatchEvent(new Event('layouts-updated'));
    } catch {}
  };

  const exportAsCode = (): string => {
    return `/**
 * Central Portfolio Data File
 * Auto-generated via Operator Command Center
 */

export const PORTFOLIO_DATA = ${JSON.stringify(data, null, 2)};
`;
  };

  // Active DOM TreeWalker: guarantees that even hardcoded JSX text strings are replaced
  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;

    const applyOverrides = () => {
      const keys = Object.keys(textOverrides);
      if (keys.length === 0) return;

      const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        {
          acceptNode(node) {
            const val = node.nodeValue?.trim();
            if (!val) return NodeFilter.FILTER_SKIP;
            const parent = node.parentElement;
            if (!parent) return NodeFilter.FILTER_SKIP;
            if (['SCRIPT', 'STYLE', 'INPUT', 'TEXTAREA'].includes(parent.tagName)) {
              return NodeFilter.FILTER_SKIP;
            }
            if (parent.closest('.ve-ignore-replacer')) {
              return NodeFilter.FILTER_SKIP;
            }
            return NodeFilter.FILTER_ACCEPT;
          },
        }
      );

      let currentNode: Node | null = walker.nextNode();
      while (currentNode) {
        const text = currentNode.nodeValue?.trim();
        if (text) {
          if (textOverrides[text] && currentNode.nodeValue !== textOverrides[text]) {
            currentNode.nodeValue = textOverrides[text];
          } else if (
            textOverrides[text.toLowerCase()] &&
            currentNode.nodeValue !== textOverrides[text.toLowerCase()]
          ) {
            currentNode.nodeValue = textOverrides[text.toLowerCase()];
          }
        }
        currentNode = walker.nextNode();
      }
    };

    applyOverrides();
    const interval = setInterval(applyOverrides, 400);

    const observer = new MutationObserver(() => {
      applyOverrides();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      clearInterval(interval);
      observer.disconnect();
    };
  }, [textOverrides]);

  // Active Section Reorder Applicator: applies saved sectionOrder across all pages
  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;

    const applySectionLayouts = () => {
      const pathname = window.location.pathname;
      const normalizedRoute = pathname === '' ? '/' : pathname;
      const pageConfig = layouts[normalizedRoute];
      if (!pageConfig || !pageConfig.sectionOrder || pageConfig.sectionOrder.length === 0) return;

      pageConfig.sectionOrder.forEach((sectionId, orderIdx) => {
        const el = document.querySelector<HTMLElement>(
          `section[data-section-id="${sectionId}"], section#${sectionId}`
        );
        if (el) {
          const parent = el.parentElement;
          if (parent && parent.style.display !== 'flex') {
            parent.style.display = 'flex';
            parent.style.flexDirection = 'column';
          }
          if (el.style.order !== String(orderIdx)) {
            el.style.order = String(orderIdx);
          }
        }
      });
    };

    applySectionLayouts();
    const interval = setInterval(applySectionLayouts, 400);

    const observer = new MutationObserver(() => {
      applySectionLayouts();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      clearInterval(interval);
      observer.disconnect();
    };
  }, [layouts]);

  // Sync across tabs
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          setData(JSON.parse(e.newValue));
          setHasCustomizations(true);
        } catch {}
      } else if (e.key === STORAGE_KEY && !e.newValue) {
        setData(PORTFOLIO_DATA);
        setHasCustomizations(false);
      }
      if (e.key === STORAGE_KEY_LAYOUTS && e.newValue) {
        try {
          setLayouts(JSON.parse(e.newValue));
        } catch {}
      }
      if (e.key === STORAGE_KEY_OVERRIDES && e.newValue) {
        try {
          setTextOverrides(JSON.parse(e.newValue));
        } catch {}
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <PortfolioContext.Provider
      value={{
        data,
        layouts,
        textOverrides,
        updateData,
        updateIdentity,
        updateContact,
        updateProjects,
        updateLabs,
        updateEducation,
        updateWorkExperience,
        updateCurrentLearning,
        updateMatchingField,
        updatePageLayout,
        updateTextOverride,
        removeTextOverride,
        resetPageLayout,
        resetToDefaults,
        exportAsCode,
        hasCustomizations,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = (): PortfolioContextType => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
