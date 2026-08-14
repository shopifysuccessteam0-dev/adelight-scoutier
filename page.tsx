'use client';

import React, { useState, useEffect } from 'react';
import { 
  Mail, Users, FolderKanban, FileText, Wrench, BarChart3, Settings, 
  Search, ShieldCheck, Zap, ArrowRight, CheckCircle2, AlertCircle, 
  Trash2, Copy, ExternalLink, Menu, X, Sun, Moon, Sparkles, Upload, Plus
} from 'lucide-react';

// --- TYPES ---
type ViewMode = 'landing' | 'login' | 'signup' | 'dashboard' | 'scout' | 'prospects' | 'campaigns' | 'templates' | 'tools' | 'analytics' | 'settings';
type FilterTab = 'all' | 'sent' | 'pending';

interface Prospect {
  id: string;
  email: string;
  name: string;
  company: string;
  status: 'valid' | 'invalid';
  source: string;
  sent?: boolean;
}

interface Template {
  id: string;
  name: string;
  subject: string;
  message: string;
  category: string;
}

interface Campaign {
  id: string;
  name: string;
  prospectCount: number;
  status: 'Draft' | 'Ready' | 'Completed';
  date: string;
}

export default function AdelightScoutierApp() {
  // Navigation & State
  const [view, setView] = useState<ViewMode>('landing');
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Filter tab state ('all' | 'sent' | 'pending')
  const [activeTab, setActiveTab] = useState<FilterTab>('all');

  // App Data State with initial prospects mimicking user requirements
  const [prospects, setProspects] = useState<Prospect[]>([
    { id: '1', email: 'safenesty@gmail.com', name: 'Safenesty', company: 'Gmail', status: 'valid', source: 'Demo' },
    { id: '2', email: 'wowow5623@gmail.com', name: 'Wowow', company: 'Gmail', status: 'valid', source: 'Demo' },
    { id: '3', email: 'safenesty@gmail.com', name: 'Safenesty', company: 'Gmail', status: 'valid', source: 'Demo' },
    { id: '4', email: 'infopawrist@gmail.com', name: 'Infopawrist', company: 'Gmail', status: 'valid', source: 'Demo' },
    { id: '5', email: 'infopawrist@gmail.com', name: 'Infopawrist', company: 'Gmail', status: 'valid', source: 'Demo' },
    { id: '6', email: 'infopawmora@gmail.com', name: 'Infopawmora', company: 'Gmail', status: 'valid', source: 'Demo' },
    { id: '7', email: 'solarisprosevilla@gmail.com', name: 'Solaris', company: 'Gmail', status: 'valid', source: 'Demo' },
  ]);

  const [templates, setTemplates] = useState<Template[]>([
    { id: '1', name: 'Cold Outreach - Sales', subject: 'Quick question for {company}', message: 'Hi {name},\n\nI came across {company} and wanted to connect regarding scaling your outreach.\n\nBest,\nAdelight', category: 'Sales' },
    { id: '2', name: 'Partnership Inquiry', subject: 'Collaboration opportunity with {company}', message: 'Hello {name},\n\nLove what you are doing at {company}. Would love to explore a partnership.\n\nBest,\nAdelight', category: 'Partnership' }
  ]);

  const [campaigns, setCampaigns] = useState<Campaign[]>([
    { id: '1', name: 'Q3 Agency Outreach', prospectCount: 7, status: 'Ready', date: '2026-08-13' }
  ]);

  // Scout Input State
  const [rawText, setRawText] = useState('');
  const [extractedLogs, setExtractedLogs] = useState<string[]>([]);

  // Custom Outreach Composer State
  const [customSubject, setCustomSubject] = useState('Quick question for {company}');
  const [customBody, setCustomBody] = useState('Hi {name},\n\nI came across {company} and wanted to connect.\n\nBest,\nAdelight');

  // Toggle Theme
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // --- EXTRACTION & VALIDATION ENGINE ---
  const handleExtractAndValidate = () => {
    const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi;
    const matches = rawText.match(emailRegex) || [];
    const uniqueEmails = Array.from(new Set(matches));

    const newProspects: Prospect[] = uniqueEmails.map((email, idx) => {
      const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      const localPart = email.split('@')[0];
      const name = localPart.charAt(0).toUpperCase() + localPart.slice(1);
      const company = email.split('@')[1]?.split('.')[0] || 'Unknown';

      return {
        id: Date.now().toString() + idx,
        email,
        name: isValid ? name : '',
        company: isValid ? company.charAt(0).toUpperCase() + company.slice(1) : '',
        status: isValid ? 'valid' : 'invalid',
        source: 'Pasted Input',
        sent: false
      };
    });

    setProspects([...prospects, ...newProspects]);
    setExtractedLogs(`Extracted ${uniqueEmails.length} emails successfully.`);
    setRawText('');
  };

  // Format message tags ({name}, {company})
  const formatTemplateText = (text: string, prospect: Prospect) => {
    return text
      .replace(/\{name\}/g, prospect.name || 'there')
      .replace(/\{company\}/g, prospect.company || 'your company');
  };

  // Handle clicking an email in the batch list
  const handleEmailClick = (id: string, email: string, formattedSubject: string, formattedBody: string) => {
    // Mark as sent
    setProspects(prev => prev.map(p => p.id === id ? { ...p, sent: true } : p));
    // Open Gmail
    const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}&su=${encodeURIComponent(formattedSubject)}&body=${encodeURIComponent(formattedBody)}`;
    window.open(gmailComposeUrl, '_blank');
  };

  // --- RENDER VIEWS ---

  if (view === 'landing') {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans">
        <header className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur sticky top-0 z-50">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 text-white p-2 rounded-xl font-bold">AS</div>
            <span className="text-xl font-extrabold tracking-tight">Adelight Scoutier</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
            <button onClick={() => setView('landing')} className="hover:text-indigo-600">Home</button>
            <button onClick={() => setView('login')} className="hover:text-indigo-600">Login</button>
            <button onClick={() => setView('signup')} className="bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700 transition">Start Scouting Free</button>
          </div>
        </header>

        <section className="py-20 px-6 text-center max-w-4xl mx-auto">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 mb-6">
            <Sparkles className="w-3.5 h-3.5" /> 100% Free Core Version
          </span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
            Scout Smarter. Personalize Faster. <span className="text-indigo-600">Reach More People.</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto">
            Adelight Scoutier helps freelancers, agencies, recruiters and businesses organize prospects, personalize outreach emails and prepare campaigns faster from one simple workspace.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button onClick={() => setView('signup')} className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-3.5 rounded-xl shadow-lg transition flex items-center justify-center gap-2">
              Start Scouting Free <ArrowRight className="w-4 h-4" />
            </button>
            <button onClick={() => setView('dashboard')} className="border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-900 font-medium px-6 py-3.5 rounded-xl transition">
              Explore Dashboard Demo
            </button>
          </div>
        </section>

        <footer className="border-t border-slate-200 dark:border-slate-800 py-8 text-center text-sm text-slate-500">
          © 2026 Adelight Scoutier. Smart Email Scouting & Outreach Made Simple. Free Access Version.
        </footer>
      </div>
    );
  }

  if (view === 'login' || view === 'signup') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4">
        <div className="max-w-md w-full bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl">
          <div className="text-center mb-6">
            <div className="bg-indigo-600 text-white w-12 h-12 mx-auto rounded-2xl flex items-center justify-center font-bold text-xl mb-3">AS</div>
            <h2 className="text-2xl font-bold">{view === 'login' ? 'Welcome Back' : 'Create Free Account'}</h2>
            <p className="text-sm text-slate-500">Smart Email Scouting & Outreach Made Simple</p>
          </div>
          <div className="space-y-4">
            {view === 'signup' && (
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase">Full Name</label>
                <input type="text" placeholder="John Doe" className="w-full mt-1 p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent" />
              </div>
            )}
            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase">Email Address</label>
              <input type="email" placeholder="you@example.com" className="w-full mt-1 p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase">Password</label>
              <input type="password" placeholder="••••••••" className="w-full mt-1 p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent" />
            </div>
            <button onClick={() => setView('dashboard')} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-xl transition">
              {view === 'login' ? 'Secure Login' : 'Create Account Free'}
            </button>
            <div className="text-center text-sm text-slate-500">
              {view === 'login' ? (
                <p>Don&apos;t have an account? <button onClick={() => setView('signup')} className="text-indigo-600 font-medium">Sign up</button></p>
              ) : (
                <p>Already have an account? <button onClick={() => setView('login')} className="text-indigo-600 font-medium">Log in</button></p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- MAIN DASHBOARD LAYOUT ---
  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans">
      <aside className="w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hidden md:flex flex-col justify-between p-4">
        <div>
          <div className="flex items-center gap-2 px-2 py-3 mb-6">
            <div className="bg-indigo-600 text-white p-2 rounded-xl font-bold">AS</div>
            <span className="font-extrabold tracking-tight">Scoutier</span>
          </div>
          <nav className="space-y-1">
            <SidebarItem icon={<BarChart3 />} label="Dashboard" active={view === 'dashboard'} onClick={() => setView('dashboard')} />
            <SidebarItem icon={<Search />} label="Scout Prospects" active={view === 'scout'} onClick={() => setView('scout')} />
            <SidebarItem icon={<Users />} label="Prospects" active={view === 'prospects'} onClick={() => setView('prospects')} />
            <SidebarItem icon={<FolderKanban />} label="Campaigns & Message" active={view === 'campaigns'} onClick={() => setView('campaigns')} />
            <SidebarItem icon={<FileText />} label="Templates" active={view === 'templates'} onClick={() => setView('templates')} />
            <SidebarItem icon={<Settings />} label="Settings" active={view === 'settings'} onClick={() => setView('settings')} />
          </nav>
        </div>
        <div className="p-3 bg-indigo-50 dark:bg-indigo-950/50 rounded-2xl border border-indigo-100 dark:border-indigo-900">
          <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">Free Access Version</p>
          <p className="text-xs text-slate-500 mt-1">All core outreach and scouting features are unlocked.</p>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-h-screen">
        <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between px-6 sticky top-0 z-40">
          <div className="flex items-center gap-3">
            <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="font-bold capitalize">{view === 'campaigns' ? 'Campaigns & Outreach Message' : view}</h1>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800">
              {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
            </button>
            <button onClick={() => setView('landing')} className="text-sm font-medium text-rose-600 hover:underline">Logout</button>
          </div>
        </header>

        <main className="flex-1 p-6 overflow-y-auto">
          {view === 'dashboard' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard title="Total Prospects" value={prospects.length.toString()} icon={<Users />} />
                <StatCard title="Valid Emails" value={prospects.filter(p => p.status === 'valid').length.toString()} icon={<ShieldCheck />} />
                <StatCard title="Active Campaigns" value={campaigns.length.toString()} icon={<FolderKanban />} />
                <StatCard title="Templates" value={templates.length.toString()} icon={<FileText />} />
              </div>

              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl">
                <h3 className="font-bold mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <button onClick={() => setView('scout')} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-indigo-600 text-left transition">
                    <Search className="w-5 h-5 text-indigo-600 mb-2" />
                    <p className="font-semibold text-sm">Scout Prospects</p>
                    <p className="text-xs text-slate-500 mt-1">Extract emails from text</p>
                  </button>
                  <button onClick={() => setView('campaigns')} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-indigo-600 text-left transition">
                    <FolderKanban className="w-5 h-5 text-indigo-600 mb-2" />
                    <p className="font-semibold text-sm">Campaigns & Message</p>
                    <p className="text-xs text-slate-500 mt-1">Set custom message & send</p>
                  </button>
                  <button onClick={() => setView('templates')} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-indigo-600 text-left transition">
                    <FileText className="w-5 h-5 text-indigo-600 mb-2" />
                    <p className="font-semibold text-sm">Manage Templates</p>
                    <p className="text-xs text-slate-500 mt-1">Edit outreach messages</p>
                  </button>
                  <button onClick={() => setView('prospects')} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-indigo-600 text-left transition">
                    <Users className="w-5 h-5 text-indigo-600 mb-2" />
                    <p className="font-semibold text-sm">View Database</p>
                    <p className="text-xs text-slate-500 mt-1">Filter clean lists</p>
                  </button>
                </div>
              </div>
            </div>
          )}

          {view === 'scout' && (
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl">
                <h3 className="font-bold text-lg mb-2">Extract & Validate Prospects</h3>
                <p className="text-sm text-slate-500 mb-4">Paste messy email lists or text blocks below. Scoutier will automatically clean, extract valid emails, and estimate names/companies.</p>
                <textarea 
                  rows={6}
                  value={rawText}
                  onChange={(e) => setRawText(e.target.value)}
                  placeholder="Paste messy text or emails here..." 
                  className="w-full p-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-sm mb-4"
                />
                <button onClick={handleExtractAndValidate} className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-3 rounded-xl transition flex items-center gap-2">
                  <Zap className="w-4 h-4" /> Extract & Clean Emails
                </button>
                {extractedLogs && <p className="text-sm font-medium text-emerald-600 mt-3">{extractedLogs}</p>}
              </div>
            </div>
          )}

          {view === 'prospects' && (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
              <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
                <h3 className="font-bold">Prospect Database ({prospects.length})</h3>
                <button onClick={() => setView('scout')} className="bg-indigo-600 text-white text-sm px-4 py-2 rounded-xl">Add Prospects</button>
              </div>
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="p-4">Name</th>
                    <th className="p-4">Email</th>
                    <th className="p-4">Company</th>
                    <th className="p-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  {prospects.map(p => (
                    <tr key={p.id}>
                      <td className="p-4 font-medium">{p.name || '—'}</td>
                      <td className="p-4">{p.email}</td>
                      <td className="p-4">{p.company || '—'}</td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded-md text-xs font-semibold ${p.status === 'valid' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                          {p.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {view === 'templates' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-lg">Email Templates</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {templates.map(t => (
                  <div key={t.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-indigo-50 dark:bg-indigo-950 text-indigo-600">{t.category}</span>
                      <span className="font-bold text-sm">{t.name}</span>
                    </div>
                    <p className="text-sm font-medium">Subject: {t.subject}</p>
                    <pre className="text-xs text-slate-500 whitespace-pre-wrap font-sans bg-slate-50 dark:bg-slate-800 p-3 rounded-xl">{t.message}</pre>
                    <button 
                      onClick={() => {
                        setCustomSubject(t.subject);
                        setCustomBody(t.message);
                        setView('campaigns');
                      }}
                      className="w-full mt-2 bg-slate-100 dark:bg-slate-800 hover:bg-indigo-600 hover:text-white text-xs font-semibold py-2.5 rounded-xl transition"
                    >
                      Use in Campaign Composer
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {view === 'campaigns' && (
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl space-y-6 shadow-sm">
                <div>
                  <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100">Global Outreach Message Builder</h3>
                  <p className="text-sm text-slate-500 mt-1">Configure your email subject and message body below. Use <code>{'{name}'}</code> and <code>{'{company}'}</code> for automated personalization across all recipients.</p>
                </div>

                {/* Subject Line Section */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-indigo-600" /> Subject Line (Max 200 characters)
                  </label>
                  <input 
                    type="text"
                    maxLength={200}
                    value={customSubject}
                    onChange={(e) => setCustomSubject(e.target.value)}
                    placeholder="Email Subject - Use {name} for personalization"
                    className="w-full p-3.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  />
                  <div className="flex flex-wrap gap-2 pt-1">
                    <button onClick={() => setCustomSubject('Quick question for {company}')} className="text-xs bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 transition">
                      💡 Quick question
                    </button>
                    <button onClick={() => setCustomSubject('Collaboration opportunity with {company}')} className="text-xs bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 transition">
                      🤝 Partnership
                    </button>
                    <button onClick={() => setCustomSubject('Exclusive offer for {company}')} className="text-xs bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 transition">
                      🎁 Exclusive offer
                    </button>
                  </div>
                  <div className="text-right text-xs text-slate-400">{customSubject.length}/200</div>
                </div>

                {/* Message Body Section */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-indigo-600" /> Message Body (Max 2000 characters)
                  </label>
                  <textarea 
                    rows={7}
                    maxLength={2000}
                    value={customBody}
                    onChange={(e) => setCustomBody(e.target.value)}
                    placeholder="Write your message here... Use {name} for names and {company} for companies." 
                    className="w-full p-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  />
                  <div className="flex flex-wrap gap-2 pt-1">
                    <button onClick={() => setCustomBody('Hi {name},\n\nI came across {company} and wanted to connect regarding scaling your outreach.\n\nBest,\nAdelight')} className="text-xs bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 hover:text-indigo-600 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 transition">
                      💼 Professional
                    </button>
                    <button onClick={() => setCustomBody('Hey {name},\n\nLove what you are building at {company}! Let us catch up.\n\nBest,\nAdelight')} className="text-xs bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 hover:text-indigo-600 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 transition">
                      👤 Casual
                    </button>
                    <button onClick={() => setCustomBody('Hello {name},\n\nYou are cordially invited to review our latest partnership proposal for {company}.\n\nBest,\nAdelight')} className="text-xs bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 hover:text-indigo-600 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 transition">
                      📅 Invitation
                    </button>
                  </div>
                  <div className="text-right text-xs text-slate-400">{customBody.length}/2000</div>
                </div>
              </div>

              {/* Ready-to-Send Prospect Batch Section */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl space-y-4 shadow-sm">
                
                {/* Clickable Metric Counter Badges */}
                <div className="flex flex-wrap items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
                  <button 
                    onClick={() => setActiveTab('all')}
                    className={`text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1 transition ${activeTab === 'all' ? 'bg-indigo-900 text-white shadow-sm' : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700'}`}
                  >
                    All ({prospects.filter(p => p.status === 'valid').length})
                  </button>
                  <button 
                    onClick={() => setActiveTab('sent')}
                    className={`text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1 transition ${activeTab === 'sent' ? 'bg-indigo-900 text-white shadow-sm' : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700'}`}
                  >
                    Sent ({prospects.filter(p => p.status === 'valid' && p.sent).length})
                  </button>
                  <button 
                    onClick={() => setActiveTab('pending')}
                    className={`text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1 transition ${activeTab === 'pending' ? 'bg-indigo-900 text-white shadow-sm' : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700'}`}
                  >
                    Pending ({prospects.filter(p => p.status === 'valid' && !p.sent).length})
                  </button>
                </div>

                {/* Email List filtered by active tab */}
                <div className="space-y-2 pt-2 font-mono text-sm">
                  {prospects
                    .map((p, originalIndex) => ({ ...p, originalIndex }))
                    .filter(({ status, sent }) => {
                      if (status !== 'valid') return false;
                      if (activeTab === 'sent') return sent;
                      if (activeTab === 'pending') return !sent;
                      return true; // 'all'
                    })
                    .map((p) => {
                      const formattedSubject = formatTemplateText(customSubject, p);
                      const formattedBody = formatTemplateText(customBody, p);
                      const isSent = p.sent;
                      const displayIndex = p.originalIndex + 1;

                      return (
                        <div key={p.id} className="py-1">
                          {activeTab === 'pending' ? (
                            // When viewing pending, clicking an item triggers email opening, advances list, does NOT turn red here.
                            <button
                              onClick={() => handleEmailClick(p.id, p.email, formattedSubject, formattedBody)}
                              className="text-emerald-500 hover:underline text-left cursor-pointer focus:outline-none"
                            >
                              {displayIndex}. {p.email}
                            </button>
                          ) : isSent ? (
                            <span className="text-red-500 font-semibold cursor-default select-none">
                              {displayIndex}. {p.email}
                            </span>
                          ) : (
                            <button
                              onClick={() => handleEmailClick(p.id, p.email, formattedSubject, formattedBody)}
                              className="text-emerald-500 hover:underline text-left cursor-pointer focus:outline-none"
                            >
                              {displayIndex}. {p.email}
                            </button>
                          )}
                        </div>
                      );
                    })}
                </div>

              </div>
            </div>
          )}

          {view === 'settings' && (
            <div className="max-w-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl space-y-4">
              <h3 className="font-bold text-lg">Account Settings</h3>
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase">Your Name</label>
                <input type="text" defaultValue="Adelight User" className="w-full mt-1 p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-sm" />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase">Email Address</label>
                <input type="email" defaultValue="user@adelight.com" className="w-full mt-1 p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-sm" />
              </div>
              <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-xs rounded-xl font-medium">
                Adelight Scoutier is running in Free Mode. All features are fully accessible.
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

// --- HELPER SUB-COMPONENTS ---
function SidebarItem({ icon, label, active, onClick }: { icon: React.ReactNode; label: string; active: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition ${active ? 'bg-indigo-600 text-white' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}>
      {React.cloneElement(icon as React.ReactElement, { className: 'w-4 h-4' })}
      {label}
    </button>
  );
}

function StatCard({ title, value, icon }: { title: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-semibold text-slate-500">{title}</span>
        <div className="p-2 bg-indigo-50 dark:bg-indigo-950 text-indigo-600 rounded-xl">{icon}</div>
      </div>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}