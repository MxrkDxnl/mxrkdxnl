import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { PortfolioProvider } from './context/PortfolioContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { AltriumCaseStudyPage } from './pages/AltriumCaseStudyPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { LabsPage } from './pages/LabsPage';
import { ContactPage } from './pages/ContactPage';
import { OperatorPage } from './pages/OperatorPage';
import { NotFoundPage } from './pages/NotFoundPage';

function GlobalOperatorShortcut() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl + Shift + L or Cmd + Shift + L to open Operator Gateway
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'L' || e.key === 'l')) {
        e.preventDefault();
        navigate('/operator');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  return null;
}

export function App() {
  return (
    <PortfolioProvider>
      <Router>
        <ScrollToTop />
        <GlobalOperatorShortcut />
        <div
          style={{ overflowX: 'clip' }}
          className="bg-[#0C0C0C] text-[#D7E2EA] font-sans min-h-screen w-full relative flex flex-col justify-between selection:bg-[#B600A8] selection:text-white"
        >
          <Navbar />

          <main className="flex-1 w-full">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route
                path="/projects/altrium-performance-tracker"
                element={<AltriumCaseStudyPage />}
              />
              <Route path="/projects/:slug" element={<ProjectDetailPage />} />
              <Route path="/labs" element={<LabsPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/operator" element={<OperatorPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </PortfolioProvider>
  );
}

export default App;
