'use client';

import React, { useState } from 'react';
import { 
  Compass, 
  BarChart3, 
  Settings, 
  Bell, 
  Search, 
  Plus, 
  TrendingUp, 
  Users, 
  Target, 
  ShieldCheck, 
  Smartphone, 
  Laptop, 
  Globe, 
  Sparkles, 
  CheckCircle2, 
  ArrowUpRight,
  Menu,
  X
} from 'lucide-react';

export default function AdelightScoutier() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [campaigns, setCampaigns] = useState([
    { id: 1, name: 'Q3 Global Creator Blitz', platform: 'TikTok & IG', status: 'Active', reach: '1.2M', budget: '$15,000' },
    { id: 2, name: 'Tech Innovator Outreach', platform: 'YouTube', status: 'Pending Review', reach: '450K', budget: '$8,500' },
    { id: 3, name: 'Lifestyle Vanguard', platform: 'Instagram', status: 'Active', reach: '890K', budget: '$12,000' },
  ]);

  const [newCampaignName, setNewCampaignName] = useState('');
  const [newPlatform, setNewPlatform] = useState('TikTok');

  const handleCreateCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCampaignName) return;
    const newCamp = {
      id: campaigns.length + 1,
      name: newCampaignName,
      platform: newPlatform,
      status: 'Active',
      reach: '100K',
      budget: '$5,000'
    };
    setCampaigns([newCamp, ...campaigns]);
    setNewCampaignName('');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row font-sans selection:bg-indigo-500 selection:text-white">
      
      {/* Mobile Top Navigation Bar */}
      <div className="md:hidden flex items-center justify-between p-4 bg-slate-900 border-b border-slate-800 sticky top-0 z-50">
        <div className="flex items-center space-x-2">
          <Compass className="h-6 w-6 text-indigo-400 animate-pulse" />
          <span className="font-bold text-lg bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            Adelight Scoutier
          </span>
        </div>
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 text-slate-400 hover:text-white focus:outline-none"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-slate-900 border-r border-slate-800 flex flex-col transition-transform duration-300 ease-in-out md:translate-x-0 md:static
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 hidden md:flex items-center space-x-3">
          <div className="p-2 bg-indigo-600/20 border border-indigo-500/30 rounded-xl">
            <Compass className="h-6 w-6 text-indigo-400" />
          </div>
          <div>
            <h1 className="font-bold tracking-tight text-white">Adelight Scoutier</h1>
            <p className="text-xs text-slate-400">Campaign & Creator Hub</p>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-1 mt-6 md:mt-0">
          <button 
            onClick={() => { setActiveTab('dashboard'); setMobileMenuOpen(false); }}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === 'dashboard' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}
          >
            <BarChart3 className="h-5 w-5" />
            <span>Dashboard</span>
          </button>
          <button 
            onClick={() => { setActiveTab('campaigns'); setMobileMenuOpen(false); }}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === 'campaigns' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}
          >
            <Target className="h-5 w-5" />
            <span>Campaigns</span>
          </button>
          <button 
            onClick={() => { setActiveTab('settings'); setMobileMenuOpen(false); }}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === 'settings' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}
          >
            <Settings className="h-5 w-5" />
            <span>Settings</span>
          </button>
        </nav>

        <div className="p-4 m-4 bg-slate-950/60 rounded-2xl border border-slate-800/80">
          <div className="flex items-center space-x-2 text-xs text-indigo-400 font-semibold mb-1">
            <Globe className="h-4 w-4" />
            <span>Global Web & Mobile Live</span>
          </div>
          <p className="text-xs text-slate-400">Optimized for all browsers, laptops, and mobile devices.</p>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        {/* Desktop Header */}
        <header className="hidden md:flex items-center justify-between px-8 py-5 bg-slate-900/50 backdrop-blur-md border-b border-slate-800 sticky top-0 z-30">
          <div className="flex items-center space-x-4 w-96">
            <div className="relative w-full">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
              <input 
                type="text" 
                placeholder="Search campaigns, creators, analytics..." 
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span>System Online</span>
            </div>
            <button className="p-2 bg-slate-900 border border-slate-800 rounded-xl text-slate-400 hover:text-white transition-colors">
              <Bell className="h-5 w-5" />
            </button>
            <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-indigo-500 to-cyan-400 flex items-center justify-center font-bold text-white text-sm">
              AS
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-4 md:p-8 space-y-6 max-w-7xl mx-auto w-full">
          
          {/* Welcome Banner */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-900/40 via-purple-900/30 to-slate-900 border border-indigo-500/20 p-6 md:p-8">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center space-x-2 px-3 py-1 bg-indigo-500/10 border border-indigo-500/30 rounded-full text-indigo-300 text-xs font-medium mb-3">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Welcome to Adelight Scoutier</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
                  Manage Campaigns Anywhere, Anytime
                </h2>
                <p className="text-slate-400 text-sm mt-1 max-w-xl">
                  Your platform is fully deployed and accessible globally across all web browsers on laptops, tablets, and smartphones.
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 bg-slate-950/80 border border-slate-800 px-4 py-2.5 rounded-2xl">
                  <Laptop className="h-4 w-4 text-indigo-400" />
                  <span className="text-xs text-slate-300">Desktop Ready</span>
                </div>
                <div className="flex items-center space-x-2 bg-slate-950/80 border border-slate-800 px-4 py-2.5 rounded-2xl">
                  <Smartphone className="h-4 w-4 text-cyan-400" />
                  <span className="text-xs text-slate-300">Mobile Optimized</span>
                </div>
              </div>
            </div>
          </div>

          {/* Metrics Overview Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-5 hover:border-slate-700 transition-all">
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-xs font-medium uppercase tracking-wider">Total Reach</span>
                <Users className="h-5 w-5 text-indigo-400" />
              </div>
              <div className="text-2xl font-bold text-white">2.54M</div>
              <div className="flex items-center space-x-1 text-emerald-400 text-xs mt-2 font-medium">
                <ArrowUpRight className="h-3.5 w-3.5" />
                <span>+14.2% from last month</span>
              </div>
            </div>

            <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-5 hover:border-slate-700 transition-all">
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-xs font-medium uppercase tracking-wider">Active Campaigns</span>
                <Target className="h-5 w-5 text-cyan-400" />
              </div>
              <div className="text-2xl font-bold text-white">{campaigns.length}</div>
              <div className="flex items-center space-x-1 text-emerald-400 text-xs mt-2 font-medium">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>Fully Operational</span>
              </div>
            </div>

            <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-5 hover:border-slate-700 transition-all">
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-xs font-medium uppercase tracking-wider">Engagement Rate</span>
                <TrendingUp className="h-5 w-5 text-purple-400" />
              </div>
              <div className="text-2xl font-bold text-white">8.4%</div>
              <div className="flex items-center space-x-1 text-emerald-400 text-xs mt-2 font-medium">
                <ArrowUpRight className="h-3.5 w-3.5" />
                <span>+2.1% spike</span>
              </div>
            </div>

            <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-5 hover:border-slate-700 transition-all">
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-xs font-medium uppercase tracking-wider">Security Status</span>
                <ShieldCheck className="h-5 w-5 text-emerald-400" />
              </div>
              <div className="text-2xl font-bold text-white">Secure</div>
              <div className="text-xs text-slate-400 mt-2">SSL Global Encryption</div>
            </div>
          </div>

          {/* Interactive Campaign Manager Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Campaign Table */}
            <div className="lg:col-span-2 bg-slate-900/80 border border-slate-800/80 rounded-3xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold text-white">Active Campaigns</h3>
                  <p className="text-xs text-slate-400">Manage and monitor live creator operations</p>
                </div>
                <span className="px-3 py-1 bg-slate-800 text-slate-300 rounded-xl text-xs font-medium">
                  {campaigns.length} Total
                </span>
              </div>

              <div className="space-y-3">
                {campaigns.map((camp) => (
                  <div key={camp.id} className="flex items-center justify-between p-4 bg-slate-950/60 border border-slate-800/60 rounded-2xl hover:border-indigo-500/50 transition-colors">
                    <div className="space-y-1">
                      <h4 className="font-semibold text-sm text-white">{camp.name}</h4>
                      <div className="flex items-center space-x-2 text-xs text-slate-400">
                        <span className="px-2 py-0.5 bg-indigo-500/10 text-indigo-300 rounded-md">{camp.platform}</span>
                        <span>•</span>
                        <span>Reach: {camp.reach}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-emerald-400">{camp.budget}</div>
                      <span className="text-[10px] px-2 py-0.5 bg-emerald-500/10 text-emerald-300 rounded-full">{camp.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Creator / Campaign Creator Widget */}
            <div className="bg-slate-900/80 border border-slate-800/80 rounded-3xl p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-white mb-1">Launch New Campaign</h3>
                <p className="text-xs text-slate-400 mb-6">Instantly deploy a new tracking campaign live</p>

                <form onSubmit={handleCreateCampaign} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Campaign Name</label>
                    <input 
                      type="text" 
                      value={newCampaignName}
                      onChange={(e) => setNewCampaignName(e.target.value)}
                      placeholder="e.g. Summer Creator Drive" 
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Target Platform</label>
                    <select 
                      value={newPlatform}
                      onChange={(e) => setNewPlatform(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                    >
                      <option value="TikTok">TikTok</option>
                      <option value="Instagram">Instagram</option>
                      <option value="YouTube">YouTube</option>
                      <option value="Multi-Platform">Multi-Platform</option>
                    </select>
                  </div>

                  <button 
                    type="submit"
                    className="w-full mt-2 flex items-center justify-center space-x-2 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-medium text-sm transition-all shadow-lg shadow-indigo-600/20"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Deploy Campaign</span>
                  </button>
                </form>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 text-center">
                <span className="text-[11px] text-slate-500">Adelight Scoutier v2.4 • Global Cloud Engine</span>
              </div>
            </div>

          </div>

        </div>

      </main>

    </div>
  );
}
