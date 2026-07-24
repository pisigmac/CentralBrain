import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useParams } from 'react-router-dom';
import { Brain, Folders, FileText, Activity } from 'lucide-react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import './index.css';

// --- Dashboard Component ---
function Dashboard() {
  const [stats, setStats] = useState<string>('Loading dashboard data...');

  useEffect(() => {
    // Fetching the local AgentDrive README and stats data
    fetch('./data/README.md')
      .then(res => {
        if (!res.ok) throw new Error('No README found');
        return res.text();
      })
      .then(text => setStats(DOMPurify.sanitize(marked(text) as string)))
      .catch(() => setStats('<p>Data has not been generated yet.</p>'));
  }, []);

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">AgentDrive Core</h1>
      <div 
        className="markdown-body"
        dangerouslySetInnerHTML={{ __html: stats }}
      />
    </div>
  );
}

function GovernanceView() {
  const [data, setData] = useState<string>('Loading...');
  useEffect(() => {
    fetch('./data/AGENTS.md')
      .then(res => res.text())
      .then(text => setData(DOMPurify.sanitize(marked(text) as string)))
      .catch(() => setData('AGENTS.md not found.'));
  }, []);
  return <div className="bg-white border border-gray-200 rounded-lg p-8"><h1 className="text-3xl font-bold mb-6 text-gray-900">Governance Rules</h1><div className="markdown-body" dangerouslySetInnerHTML={{ __html: data }} /></div>;
}

function ProjectsView() {
  const [data, setData] = useState<string>('Loading...');
  useEffect(() => {
    fetch('./data/master-overview.md')
      .then(res => res.text())
      .then(text => setData(DOMPurify.sanitize(marked(text) as string)))
      .catch(() => setData('Projects overview not found.'));
  }, []);
  return <div className="bg-white border border-gray-200 rounded-lg p-8"><h1 className="text-3xl font-bold mb-6 text-gray-900">Linked Projects</h1><div className="markdown-body" dangerouslySetInnerHTML={{ __html: data }} /></div>;
}

function DecisionsView() {
  const [data, setData] = useState<string>('Loading...');
  useEffect(() => {
    fetch('./data/global-memory.md')
      .then(res => res.text())
      .then(text => setData(DOMPurify.sanitize(marked(text) as string)))
      .catch(() => setData('Global memory not found. Run vault pull.'));
  }, []);
  return <div className="bg-white border border-gray-200 rounded-lg p-8"><h1 className="text-3xl font-bold mb-6 text-gray-900">Global Memory</h1><div className="markdown-body" dangerouslySetInnerHTML={{ __html: data }} /></div>;
}

// --- App Layout ---
export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 flex">
        
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 flex flex-col p-6 space-y-8">
          <div className="flex items-center space-x-3">
            <Brain size={32} className="text-gray-800" />
            <span className="text-xl font-bold text-gray-900 tracking-wider">AgentDrive</span>
          </div>

          <nav className="flex flex-col space-y-4 flex-grow">
            <Link to="/" className="nav-item group">
              <Activity size={20} />
              <span>Overview</span>
            </Link>
            <Link to="/projects" className="nav-item group">
              <Folders size={20} />
              <span>Projects</span>
            </Link>
            <Link to="/governance" className="nav-item group">
              <FileText size={20} />
              <span>Governance</span>
            </Link>
            <Link to="/decisions" className="nav-item group">
              <Brain size={20} />
              <span>Global Memory</span>
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-10 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/projects" element={<ProjectsView />} />
            <Route path="/governance" element={<GovernanceView />} />
            <Route path="/decisions" element={<DecisionsView />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
