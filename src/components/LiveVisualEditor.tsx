import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  ArrowLeft,
  Save,
  RotateCcw,
  Download,
  Eye,
  Type,
  Move,
  Layers,
  CheckCircle2,
  X,
  ChevronUp,
  ChevronDown,
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { HomePage } from '../pages/HomePage';
import { AboutPage } from '../pages/AboutPage';
import { ProjectsPage } from '../pages/ProjectsPage';
import { LabsPage } from '../pages/LabsPage';
import { ContactPage } from '../pages/ContactPage';

interface LiveVisualEditorProps {
  route: string;
  onSelectRoute: (newRoute: string) => void;
  onBackToSnapshots: () => void;
  onExitOperator: () => void;
}

type EditorMode = 'text' | 'drag' | 'sections' | 'preview';

export const LiveVisualEditor: React.FC<LiveVisualEditorProps> = ({
  route,
  onSelectRoute,
  onBackToSnapshots,
  onExitOperator,
}) => {
  const {
    layouts,
    updatePageLayout,
    updateTextOverride,
    updateMatchingField,
    resetPageLayout,
  } = usePortfolio();

  const [mode, setMode] = useState<EditorMode>('text');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Active text being edited in popover
  const [activeEditingElem, setActiveEditingElem] = useState<{
    element?: HTMLElement;
    originalText: string;
    currentText: string;
  } | null>(null);

  // Dragging state
  const [draggingElem, setDraggingElem] = useState<{
    id: string;
    startX: number;
    startY: number;
    offsetX: number;
    offsetY: number;
  } | null>(null);

  // Section list detected on current page
  const [sections, setSections] = useState<{ id: string; name: string }[]>([]);

  const containerRef = useRef<HTMLDivElement>(null);

  // Scan sections inside the rendered page and apply existing sectionOrder
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!containerRef.current) return;
      const sectionNodes = containerRef.current.querySelectorAll<HTMLElement>('section');
      const found: { id: string; name: string }[] = [];

      sectionNodes.forEach((node, i) => {
        let id = node.getAttribute('data-section-id') || node.id;
        if (!id) {
          id = `sec-${route.replace('/', '') || 'home'}-${i + 1}`;
          node.setAttribute('data-section-id', id);
        }
        const heading =
          node.querySelector('h1, h2, h3, h4')?.textContent?.trim() ||
          node.querySelector('span.text-xs, span.font-semibold')?.textContent?.trim();

        found.push({
          id,
          name: heading || `Section ${i + 1}`,
        });
      });

      // Check if saved sectionOrder exists
      const savedOrder = layouts[route]?.sectionOrder;
      if (savedOrder && savedOrder.length > 0) {
        // Sort found array according to savedOrder
        found.sort((a, b) => {
          const idxA = savedOrder.indexOf(a.id);
          const idxB = savedOrder.indexOf(b.id);
          if (idxA === -1 && idxB === -1) return 0;
          if (idxA === -1) return 1;
          if (idxB === -1) return -1;
          return idxA - idxB;
        });

        // Apply order to DOM
        found.forEach((s, orderIdx) => {
          const el = containerRef.current?.querySelector<HTMLElement>(
            `section[data-section-id="${s.id}"], section#${s.id}`
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
      } else {
        // Set default order indices
        found.forEach((s, orderIdx) => {
          const el = containerRef.current?.querySelector<HTMLElement>(
            `section[data-section-id="${s.id}"], section#${s.id}`
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
      }

      setSections(found);
    }, 250);

    return () => clearTimeout(timer);
  }, [route, layouts]);

  // Deterministic box ID generator
  const getDeterministicBoxId = useCallback((el: HTMLElement) => {
    if (el.id) return el.id;
    const heading = el.querySelector('h1, h2, h3, h4, h5')?.textContent?.trim()?.slice(0, 24).replace(/[^a-zA-Z0-9]/g, '_');
    if (heading) return `box_${heading}`;
    const parent = el.parentElement;
    const idx = parent ? Array.from(parent.children).indexOf(el) : 0;
    return `box_${route.replace('/', '') || 'home'}_${el.tagName.toLowerCase()}_${idx}`;
  }, [route]);

  // Apply box offset transforms to DOM on mount or layout change
  useEffect(() => {
    const pageConfig = layouts[route];
    if (!pageConfig || !pageConfig.boxOffsets || !containerRef.current) return;

    Object.entries(pageConfig.boxOffsets).forEach(([key, offset]) => {
      const el = containerRef.current?.querySelector(`[data-ve-box="${key}"]`) as HTMLElement;
      if (el) {
        el.style.transform = `translate3d(${offset.x}px, ${offset.y}px, 0)`;
      }
    });
  }, [route, layouts]);

  // Hover highlighting in Text Mode
  useEffect(() => {
    if (mode !== 'text' || !containerRef.current) return;

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isTextTag = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'P', 'SPAN', 'A', 'BUTTON', 'LABEL', 'LI'].includes(
        target.tagName
      );
      if (isTextTag && target.textContent && target.textContent.trim().length > 0) {
        target.classList.add('ve-editable-hover');
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      target.classList.remove('ve-editable-hover');
    };

    const container = containerRef.current;
    container.addEventListener('mouseover', handleMouseOver);
    container.addEventListener('mouseout', handleMouseOut);

    return () => {
      container.removeEventListener('mouseover', handleMouseOver);
      container.removeEventListener('mouseout', handleMouseOut);
    };
  }, [mode]);

  // Handle interactive clicks on the rendered page
  const handleContainerClick = (e: React.MouseEvent) => {
    if (mode === 'preview') return;

    const target = e.target as HTMLElement;

    // Check if clicked element is text
    if (mode === 'text') {
      const isTextTag = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'P', 'SPAN', 'A', 'BUTTON', 'LABEL', 'LI'].includes(
        target.tagName
      );

      const text = target.innerText?.trim() || target.textContent?.trim();
      if (isTextTag && text && text.length > 0) {
        e.preventDefault();
        e.stopPropagation();

        setActiveEditingElem({
          element: target,
          originalText: text,
          currentText: text,
        });
      }
    }
  };

  // Drag-and-drop box positioning
  const handleMouseDown = (e: React.MouseEvent) => {
    if (mode !== 'drag') return;

    const target = (e.target as HTMLElement).closest('.bg-[#141416], .bg-white\\/5, .rounded-2xl, .rounded-3xl') as HTMLElement;
    if (!target) return;

    e.preventDefault();

    let boxId = target.getAttribute('data-ve-box');
    if (!boxId) {
      boxId = getDeterministicBoxId(target);
      target.setAttribute('data-ve-box', boxId);
    }

    const currentOffsets = layouts[route]?.boxOffsets?.[boxId] || { x: 0, y: 0 };

    setDraggingElem({
      id: boxId,
      startX: e.clientX,
      startY: e.clientY,
      offsetX: currentOffsets.x,
      offsetY: currentOffsets.y,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!draggingElem || mode !== 'drag') return;

    const deltaX = e.clientX - draggingElem.startX;
    const deltaY = e.clientY - draggingElem.startY;

    const newX = draggingElem.offsetX + deltaX;
    const newY = draggingElem.offsetY + deltaY;

    const el = containerRef.current?.querySelector(`[data-ve-box="${draggingElem.id}"]`) as HTMLElement;
    if (el) {
      el.style.transform = `translate3d(${newX}px, ${newY}px, 0)`;
      el.style.zIndex = '50';
      el.style.boxShadow = '0 0 25px rgba(0, 245, 212, 0.4)';
    }
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!draggingElem || mode !== 'drag') return;

    const deltaX = e.clientX - draggingElem.startX;
    const deltaY = e.clientY - draggingElem.startY;

    const finalX = Math.round((draggingElem.offsetX + deltaX) / 4) * 4; // snap 4px
    const finalY = Math.round((draggingElem.offsetY + deltaY) / 4) * 4;

    const el = containerRef.current?.querySelector(`[data-ve-box="${draggingElem.id}"]`) as HTMLElement;
    if (el) {
      el.style.zIndex = '';
      el.style.boxShadow = '';
    }

    const currentBoxOffsets = layouts[route]?.boxOffsets || {};
    updatePageLayout(route, {
      boxOffsets: {
        ...currentBoxOffsets,
        [draggingElem.id]: { x: finalX, y: finalY },
      },
    });

    setDraggingElem(null);
    showToast(`Element moved to (${finalX > 0 ? '+' : ''}${finalX}px, ${finalY > 0 ? '+' : ''}${finalY}px)`);
  };

  // Move Section Up or Down
  const handleMoveSection = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === sections.length - 1)
    ) {
      return;
    }

    const newSections = [...sections];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    const temp = newSections[index];
    newSections[index] = newSections[targetIndex];
    newSections[targetIndex] = temp;

    setSections(newSections);

    // Immediately apply new order to DOM elements
    newSections.forEach((sec, orderIdx) => {
      const el = containerRef.current?.querySelector<HTMLElement>(
        `section[data-section-id="${sec.id}"], section#${sec.id}`
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

    const newOrderIds = newSections.map((s) => s.id);
    updatePageLayout(route, {
      sectionOrder: newOrderIds,
    });

    showToast(`Section "${temp.name}" shifted ${direction}`);
  };

  // Save inline text edit
  const handleSaveTextEdit = () => {
    if (!activeEditingElem) return;

    const oldText = activeEditingElem.originalText.trim();
    const newText = activeEditingElem.currentText.trim();

    if (!newText) {
      showToast('Text cannot be empty');
      return;
    }

    // 1. Immediately apply to the active DOM element
    if (activeEditingElem.element) {
      activeEditingElem.element.textContent = newText;
    }

    // 2. Persist in central PORTFOLIO_DATA and global textOverrides
    updateMatchingField(oldText, newText);
    updateTextOverride(route, oldText, newText);

    setActiveEditingElem(null);
    showToast(`Updated "${oldText.slice(0, 16)}..." → "${newText.slice(0, 16)}..."`);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Reset page customizations
  const handleResetPage = () => {
    if (window.confirm(`Reset all customizations for ${route}? Original layout will be restored.`)) {
      resetPageLayout(route);
      showToast(`Page ${route} reset to original layout`);
      setTimeout(() => window.location.reload(), 300);
    }
  };

  // Export siteConfig.json
  const handleExportConfig = () => {
    const jsonStr = JSON.stringify(layouts, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `siteConfig_${route.replace('/', '') || 'home'}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Config exported to siteConfig.json');
  };

  return (
    <div
      className="relative w-full min-h-screen bg-[#0C0C0C] select-auto"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {/* ============================================================== */}
      {/* FLOATING LIQUID GLASS OPERATOR TOOLBAR (TOP-CENTER FIXED)       */}
      {/* ============================================================== */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-5xl px-3 pointer-events-none ve-ignore-replacer">
        <div className="liquid-glass p-2.5 sm:p-3 pointer-events-auto flex flex-col sm:flex-row items-center justify-between gap-3 shadow-2xl border border-white/15">
          {/* Left: Back & Route Switcher */}
          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-between sm:justify-start">
            <button
              onClick={onBackToSnapshots}
              className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-mono flex items-center gap-1.5 transition-colors border border-white/10"
              title="Return to Page Snapshots Gallery"
            >
              <ArrowLeft size={13} />
              <span>Snapshots</span>
            </button>

            <select
              value={route}
              onChange={(e) => onSelectRoute(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-black/60 border border-white/15 text-xs font-mono text-purple-300 focus:outline-none focus:border-[#A855F7]"
            >
              <option value="/">Home (/)</option>
              <option value="/about">About (/about)</option>
              <option value="/projects">Projects (/projects)</option>
              <option value="/labs">Labs (/labs)</option>
              <option value="/contact">Contact (/contact)</option>
            </select>
          </div>

          {/* Center: Editor Mode Switcher */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-black/40 border border-white/10">
            <button
              onClick={() => setMode('text')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-all ${
                mode === 'text'
                  ? 'bg-[#00f5d4] text-black font-bold shadow-md'
                  : 'text-white/60 hover:text-white'
              }`}
              title="Click any text on the page to edit inline"
            >
              <Type size={13} />
              <span className="hidden sm:inline">Inline Text</span>
            </button>

            <button
              onClick={() => setMode('drag')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-all ${
                mode === 'drag'
                  ? 'bg-[#A855F7] text-white font-bold shadow-md'
                  : 'text-white/60 hover:text-white'
              }`}
              title="Drag and drop cards or text boxes freely"
            >
              <Move size={13} />
              <span className="hidden sm:inline">Box Drag</span>
            </button>

            <button
              onClick={() => setMode('sections')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-all ${
                mode === 'sections'
                  ? 'bg-purple-600 text-white font-bold shadow-md'
                  : 'text-white/60 hover:text-white'
              }`}
              title="Reorder page sections up or down"
            >
              <Layers size={13} />
              <span className="hidden sm:inline">Sections</span>
            </button>

            <button
              onClick={() => setMode('preview')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-all ${
                mode === 'preview'
                  ? 'bg-white/20 text-white font-bold'
                  : 'text-white/60 hover:text-white'
              }`}
              title="Preview mode without editor guides"
            >
              <Eye size={13} />
              <span className="hidden sm:inline">Preview</span>
            </button>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => showToast('Changes saved to live config & localStorage!')}
              className="px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold uppercase tracking-wider text-white shadow-lg flex items-center gap-1.5 transition-all hover:scale-105"
              style={{
                background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
                outline: '1.5px solid #FFFFFF',
                outlineOffset: '-2px',
              }}
              title="Save and publish visual changes"
            >
              <Save size={13} />
              <span>Save & Publish</span>
            </button>

            <button
              onClick={handleExportConfig}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/80 hover:text-white transition-colors border border-white/10"
              title="Export siteConfig.json"
            >
              <Download size={14} />
            </button>

            <button
              onClick={handleResetPage}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-rose-400 transition-colors border border-white/10"
              title="Undo / Reset Page to Defaults"
            >
              <RotateCcw size={14} />
            </button>

            <button
              onClick={onExitOperator}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors border border-white/10"
              title="Exit Operator Mode"
            >
              <X size={14} />
            </button>
          </div>
        </div>

        {/* Action Hint / Toast Banner */}
        <div className="flex justify-center mt-2">
          {toastMessage ? (
            <div className="px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-mono text-xs shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
              <CheckCircle2 size={13} />
              <span>{toastMessage}</span>
            </div>
          ) : (
            <div className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white/60 font-mono text-[11px] shadow-lg flex items-center gap-2 pointer-events-auto">
              {mode === 'text' && (
                <span>💡 Click any headline, paragraph, or badge below to edit its text in-place</span>
              )}
              {mode === 'drag' && (
                <span>✥ Click and drag any card or container to reposition freely (snaps to grid)</span>
              )}
              {mode === 'sections' && (
                <span>☰ Use the section controllers below to rearrange entire page blocks</span>
              )}
              {mode === 'preview' && (
                <span>👁 Pure Live Preview (Editor guides hidden)</span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ============================================================== */}
      {/* SECTION REORDER CONTROLLER SIDEBAR (When in Sections Mode)     */}
      {/* ============================================================== */}
      {mode === 'sections' && sections.length > 0 && (
        <div className="fixed left-6 top-32 z-40 w-72 liquid-glass p-4 border border-white/15 shadow-2xl animate-in fade-in slide-in-from-left-4 ve-ignore-replacer">
          <div className="flex items-center justify-between pb-2 mb-3 border-b border-white/10">
            <span className="font-mono text-xs font-bold text-white uppercase flex items-center gap-1.5">
              <Layers size={13} className="text-[#00f5d4]" />
              <span>Page Section Order</span>
            </span>
            <span className="text-[10px] font-mono text-white/40">{sections.length} blocks</span>
          </div>

          <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-1">
            {sections.map((sec, idx) => (
              <div
                key={sec.id}
                className="p-2.5 rounded-xl bg-black/50 border border-white/10 flex items-center justify-between gap-2"
              >
                <div className="min-w-0 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-md bg-white/10 flex items-center justify-center text-[10px] font-mono text-white/60 shrink-0">
                    {idx + 1}
                  </span>
                  <span className="text-xs font-medium text-white truncate">{sec.name}</span>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => handleMoveSection(idx, 'up')}
                    disabled={idx === 0}
                    className="p-1 rounded bg-white/5 hover:bg-white/15 disabled:opacity-20 text-white transition-colors"
                    title="Move section up"
                  >
                    <ChevronUp size={13} />
                  </button>

                  <button
                    onClick={() => handleMoveSection(idx, 'down')}
                    disabled={idx === sections.length - 1}
                    className="p-1 rounded bg-white/5 hover:bg-white/15 disabled:opacity-20 text-white transition-colors"
                    title="Move section down"
                  >
                    <ChevronDown size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* INLINE TEXT EDIT BUBBLE MODAL                                  */}
      {/* ============================================================== */}
      {activeEditingElem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-150 ve-ignore-replacer">
          <div className="liquid-glass w-full max-w-lg p-5 border border-white/20 shadow-2xl flex flex-col gap-3">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <span className="text-xs font-mono font-bold text-white uppercase flex items-center gap-1.5">
                <Type size={14} className="text-[#00f5d4]" />
                <span>Edit Content Inline</span>
              </span>
              <button
                onClick={() => setActiveEditingElem(null)}
                className="text-white/40 hover:text-white"
              >
                <X size={16} />
              </button>
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase text-white/50 mb-1">
                Original Text
              </label>
              <div className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-white/60 mb-3 max-h-24 overflow-y-auto">
                {activeEditingElem.originalText}
              </div>

              <label className="block text-[11px] font-mono uppercase text-white/50 mb-1">
                New Content Text
              </label>
              <textarea
                rows={4}
                value={activeEditingElem.currentText}
                onChange={(e) =>
                  setActiveEditingElem({
                    ...activeEditingElem,
                    currentText: e.target.value,
                  })
                }
                autoFocus
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/70 border border-white/15 text-sm text-white focus:outline-none focus:border-[#00f5d4] font-sans"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setActiveEditingElem(null)}
                className="px-3.5 py-2 rounded-xl text-xs font-mono text-white/60 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveTextEdit}
                className="px-4 py-2 rounded-xl text-xs font-mono font-semibold uppercase bg-[#00f5d4] text-black hover:brightness-110 shadow-lg flex items-center gap-1.5"
              >
                <Save size={13} />
                <span>Apply to Page</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* RENDERED PAGE CONTAINER                                        */}
      {/* ============================================================== */}
      <div
        ref={containerRef}
        onClick={handleContainerClick}
        onMouseDown={handleMouseDown}
        className={`w-full ${mode === 'text' ? 'cursor-pointer' : mode === 'drag' ? 'cursor-grab' : ''}`}
      >
        {route === '/' && <HomePage />}
        {route === '/about' && <AboutPage />}
        {route === '/projects' && <ProjectsPage />}
        {route === '/labs' && <LabsPage />}
        {route === '/contact' && <ContactPage />}
      </div>
    </div>
  );
};
