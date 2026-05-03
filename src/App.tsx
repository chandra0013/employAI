import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Briefcase, 
  UserCheck, 
  Zap, 
  LayoutDashboard, 
  Search, 
  Bell, 
  Settings,
  ArrowRight,
  TrendingUp,
  Award,
  Cpu,
  RefreshCw,
  LogOut,
  ChevronRight,
  ShieldCheck,
  BrainCircuit,
  MessageSquareShare
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { cn } from './lib/utils';
import { MOCK_CANDIDATES, MOCK_JOBS, MOCK_LOGS, Job, Candidate, AgentLog } from './data';

// --- Components ---

const StatCard = ({ title, value, trend, icon: Icon }: any) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-white p-8 rounded-4xl card-shadow border border-black/5"
  >
    <div className="flex justify-between items-start mb-4">
      <div className="p-3 bg-apex-mint-light rounded-2xl text-apex-forest">
        <Icon size={24} strokeWidth={1.5} />
      </div>
      {trend && (
        <span className="text-xs font-semibold px-2 py-1 bg-apex-mint text-apex-forest rounded-full">
          {trend}
        </span>
      )}
    </div>
    <h3 className="text-xs font-display uppercase tracking-widest text-apex-text-muted mb-1">
      {title}
    </h3>
    <p className="text-4xl font-display font-bold text-apex-forest">{value}</p>
  </motion.div>
);

const AgentStatusPanel = ({ logs }: { logs: AgentLog[] }) => (
  <div className="bg-apex-forest text-white p-10 rounded-4xl card-shadow overflow-hidden relative">
    <div className="absolute top-0 right-0 p-8 opacity-10">
      <Cpu size={120} />
    </div>
    <h3 className="text-2xl font-display font-bold mb-6 flex items-center gap-2">
      <BrainCircuit className="text-apex-mint" />
      Agentic Reasoning Engine
    </h3>
    <div className="space-y-4 max-h-[300px] overflow-y-auto pr-4 scrollbar-hide">
      <AnimatePresence mode="popLayout">
        {logs.map((log) => (
          <motion.div 
            key={log.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex gap-4 items-start border-l-2 border-apex-mint/20 pl-4 py-1"
          >
            <div className="text-[10px] font-mono text-apex-mint/60 pt-1 shrink-0">
              [{log.timestamp}]
            </div>
            <div>
              <span className={cn(
                "text-[10px] font-display uppercase tracking-widest px-2 py-0.5 rounded-full mr-2",
                log.agent === 'CandidateAgent' ? "bg-blue-500/20 text-blue-300" :
                log.agent === 'EmployerAgent' ? "bg-amber-500/20 text-amber-300" :
                "bg-apex-mint/20 text-apex-mint"
              )}>
                {log.agent}
              </span>
              <p className="text-sm text-apex-mint-light mt-1">
                {log.message}
              </p>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
    
    <div className="mt-8 pt-8 border-t border-white/10 flex justify-between items-center">
      <div className="flex gap-4">
        <div className="flex items-center gap-2 text-xs text-apex-mint-light">
          <div className="w-2 h-2 rounded-full bg-apex-mint agent-pulsing" />
          CandidateAgent Active
        </div>
        <div className="flex items-center gap-2 text-xs text-apex-mint-light">
          <div className="w-2 h-2 rounded-full bg-apex-mint agent-pulsing" />
          EmployerAgent Active
        </div>
      </div>
      <button className="text-xs font-display uppercase tracking-widest text-apex-mint flex items-center gap-1 hover:brightness-110 transition-all">
        View Full Trace <ChevronRight size={14} />
      </button>
    </div>
  </div>
);

// --- Main App ---

export default function App() {
  const [view, setView] = useState<'landing' | 'dashboard'>('landing');
  const [activeTab, setActiveTab] = useState('overview');
  const [logs, setLogs] = useState<AgentLog[]>(MOCK_LOGS);

  // Scroll effect for landing page
  const [scrollProgress, setScrollProgress] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = window.scrollY / totalHeight;
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const chartData = [
    { name: 'Mon', matches: 12 },
    { name: 'Tue', matches: 18 },
    { name: 'Wed', matches: 15 },
    { name: 'Thu', matches: 22 },
    { name: 'Fri', matches: 30 },
    { name: 'Sat', matches: 25 },
    { name: 'Sun', matches: 40 },
  ];

  const pieData = [
    { name: 'Tech', value: 400 },
    { name: 'Design', value: 300 },
    { name: 'Ops', value: 200 },
    { name: 'Sales', value: 100 },
  ];

  const COLORS = ['#1B4332', '#B7E4C7', '#D8F3DC', '#52796F'];

  if (view === 'landing') {
    return (
      <div className="relative min-h-[200vh]">
        {/* Navbar */}
        <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-12 py-8">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-apex-forest rounded-xl flex items-center justify-center text-white font-display font-bold text-xl">
              E
            </div>
            <span className="font-display font-extrabold text-2xl tracking-tighter mix-blend-difference text-white">
              EmployAI
            </span>
          </div>
          <div className="hidden md:flex gap-12 text-sm font-semibold text-white/80 mix-blend-difference">
            <a href="#vision" className="hover:text-white">Vision</a>
            <a href="#agents" className="hover:text-white">MCP Agents</a>
            <a href="#performance" className="hover:text-white">Benchmarks</a>
          </div>
          <button 
            onClick={() => setView('dashboard')}
            className="group relative px-8 py-3 bg-white rounded-full overflow-hidden transition-all hover:pr-12"
          >
            <span className="relative z-10 font-bold text-apex-forest">Launch App</span>
            <div className="absolute right-0 top-0 h-full w-0 group-hover:w-10 bg-apex-forest transition-all flex items-center justify-center">
              <ArrowRight className="text-white" size={18} />
            </div>
            <div className="absolute inset-0 bg-white group-hover:bg-apex-mint transition-all -z-10" />
          </button>
        </nav>

        {/* Hero Section */}
        <section className="h-screen sticky top-0 flex flex-col items-center justify-center overflow-hidden bg-black">
          {/* Simulated Video/Image Background */}
          <div className="absolute inset-0 opacity-40">
             <img 
               src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop" 
               alt="Digital Network"
               className="w-full h-full object-cover"
             />
          </div>
          
          <motion.div 
            style={{ y: -48, opacity: 1 - scrollProgress * 2 }}
            className="relative z-10 text-center px-6"
          >
            <motion.h1 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-7xl md:text-9xl lg:text-[10rem] font-display font-bold text-white tracking-tighter leading-none"
            >
              DECISION<br />INTELLIGENCE
            </motion.h1>
            <p className="mt-8 text-xl md:text-2xl text-apex-mint-light max-w-2xl mx-auto font-medium">
              MCP-Native Agentic Employment Exchange built for Transnational AI. 
              The next evolution of human-agent collaborative markets.
            </p>
          </motion.div>

          <div className="absolute bottom-12 left-12 flex items-center gap-4 text-white/40 text-xs tracking-widest uppercase font-display">
            <div className="w-12 h-px bg-white/20" />
            Designed for Transnational AI Pvt Ltd
          </div>
        </section>

        {/* Content Section (Transitions as user scrolls) */}
        <section className="relative z-20 bg-apex-bg min-h-screen pt-40 px-12 pb-24">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <div>
                <span className="text-xs font-display uppercase tracking-[0.3em] text-apex-text-muted mb-4 block">
                  The MCP Revolution
                </span>
                <h2 className="text-6xl font-display font-bold text-apex-forest mb-8 leading-tight">
                  Moving from keyword search to <span className="text-apex-text-muted italic">agentic negotiation.</span>
                </h2>
                <div className="space-y-8">
                  {[
                    { icon: Zap, title: "MCP-Native", desc: "Model Context Protocol tools allow agents to seamlessly query real-time market signals and candidate data." },
                    { icon: BrainCircuit, title: "Triple Agent Orchestration", desc: "Specialized agents for Candidates, Employers, and a Negotiator to find Pareto-optimal outcomes." },
                    { icon: ShieldCheck, title: "Guardrail First", desc: "Production-grade safety layers ensure zero hallucinations in salary and contract negotiations." }
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-6">
                      <div className="shrink-0 w-12 h-12 rounded-2xl bg-white card-shadow flex items-center justify-center text-apex-forest">
                        <item.icon size={24} />
                      </div>
                      <div>
                        <h4 className="font-display font-bold text-lg text-apex-forest">{item.title}</h4>
                        <p className="text-apex-text-muted">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="aspect-square bg-white rounded-4xl card-shadow overflow-hidden p-10 flex flex-col justify-center gap-8 border border-black/5">
                   <div className="space-y-4">
                     <div className="h-4 w-3/4 bg-apex-bg rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-apex-forest"
                          initial={{ width: 0 }}
                          whileInView={{ width: '87%' }}
                          transition={{ duration: 1.5 }}
                        />
                     </div>
                     <p className="text-xs font-display uppercase tracking-widest text-apex-text-muted">Task Success Rate: 87%</p>
                   </div>
                   <div className="space-y-4">
                     <div className="h-4 w-1/2 bg-apex-bg rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-apex-mint"
                          initial={{ width: 0 }}
                          whileInView={{ width: '99%' }}
                          transition={{ duration: 1.5, delay: 0.2 }}
                        />
                     </div>
                     <p className="text-xs font-display uppercase tracking-widest text-apex-text-muted">Tool Call Reliability: 99.2%</p>
                   </div>
                   <div className="mt-8 p-6 bg-apex-bg rounded-3xl border border-black/5 italic text-sm text-apex-text-muted">
                     "EmployAI successfully matched 45 candidates with non-linear career gaps to Tier-1 product roles in 24 hours."
                   </div>
                </div>
                {/* Floating decor */}
                <div className="absolute -top-12 -right-12 w-48 h-48 bg-apex-mint opacity-20 blur-3xl -z-10" />
                <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-apex-forest opacity-10 blur-3xl -z-10" />
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // --- Dashboard View ---
  return (
    <div className="flex h-screen bg-apex-bg overflow-hidden">
      {/* Sidebar */}
      <aside className="w-72 bg-apex-forest flex flex-col p-8 gap-12">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-apex-mint rounded-xl flex items-center justify-center text-apex-forest font-display font-bold text-xl">
            E
          </div>
          <span className="font-display font-extrabold text-2xl text-white tracking-tighter">
            EmployAI
          </span>
        </div>

        <nav className="flex-1 flex flex-col gap-2">
          {[
            { id: 'overview', name: 'Overview', icon: LayoutDashboard },
            { id: 'candidates', name: 'Candidate Lab', icon: UserCheck },
            { id: 'jobs', name: 'Market Intel', icon: Briefcase },
            { id: 'negotiations', name: 'Negotiations', icon: MessageSquareShare },
            { id: 'benchmarks', name: 'System Performance', icon: TrendingUp },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "flex items-center gap-4 px-6 py-4 rounded-2xl transition-all font-medium text-sm text-left group",
                activeTab === item.id 
                  ? "bg-white/10 text-white" 
                  : "text-apex-mint/60 hover:text-white"
              )}
            >
              <item.icon size={20} strokeWidth={1.5} />
              {item.name}
              {activeTab === item.id && (
                <motion.div 
                  layoutId="activePill"
                  className="ml-auto w-1.5 h-1.5 rounded-full bg-apex-mint"
                />
              )}
            </button>
          ))}
        </nav>

        <div className="mt-auto pt-8 border-t border-white/5 space-y-4">
           <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5">
              <div className="w-10 h-10 rounded-full bg-apex-mint/20 border border-apex-mint/30 flex items-center justify-center text-apex-mint overflow-hidden">
                 <img src="https://ui-avatars.com/api/?name=Mandla+Reddy&background=B7E4C7&color=1B4332" alt="Avatar" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-white truncate">M. Chandra Reddy</p>
                <p className="text-[10px] text-apex-mint/40">Architect Pro</p>
              </div>
              <button className="text-white/40 hover:text-white transition-colors">
                <Settings size={18} />
              </button>
           </div>
           <button 
             onClick={() => setView('landing')}
             className="flex items-center gap-4 w-full px-6 py-4 rounded-2xl text-apex-mint/40 hover:text-white transition-all text-xs font-display uppercase tracking-widest"
           >
             <LogOut size={18} />
             Exit To Terminal
           </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-y-auto overflow-x-hidden">
        {/* Header */}
        <header className="px-12 py-8 flex justify-between items-center bg-white/50 backdrop-blur-sm sticky top-0 z-10">
          <div>
            <h1 className="text-2xl font-display font-bold text-apex-forest">
               {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Summary
            </h1>
            <p className="text-sm text-apex-text-muted italic">MCP handshakes active across 3 specialized nodes.</p>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-apex-text-muted" size={18} />
              <input 
                type="text" 
                placeholder="Search candidates or JDs..."
                className="pl-12 pr-6 py-3 bg-white border border-black/5 rounded-full text-sm w-80 focus:outline-none focus:border-apex-mint transition-all card-shadow"
              />
            </div>
            <button className="relative p-3 bg-white border border-black/5 rounded-full text-apex-forest hover:bg-apex-mint-light transition-all card-shadow">
              <Bell size={20} strokeWidth={1.5} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            </button>
          </div>
        </header>

        <div className="p-12 space-y-12">
          {activeTab === 'overview' && (
            <>
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <StatCard title="Active Matches" value="1,284" trend="+12.4%" icon={Zap} />
                <StatCard title="Avg. Placement Latency" value="18.4m" trend="-4.2%" icon={RefreshCw} />
                <StatCard title="Negotiation Success" value="94.2%" trend="+2.1%" icon={Award} />
                <StatCard title="Market Sentiment" value="Bullish" icon={TrendingUp} />
              </div>

              {/* Main Analysis Row */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                  {/* Matches Chart */}
                  <div className="bg-white p-10 rounded-4xl card-shadow border border-black/5">
                    <div className="flex justify-between items-center mb-8">
                       <div>
                         <h3 className="text-xs font-display uppercase tracking-widest text-apex-text-muted mb-1">
                           Network Utilization
                         </h3>
                         <p className="text-2xl font-display font-bold text-apex-forest">Placement Velocity</p>
                       </div>
                       <select className="bg-apex-bg border-none rounded-lg text-xs font-semibold px-4 py-2 focus:ring-0">
                         <option>Last 7 Days</option>
                         <option>Last 30 Days</option>
                       </select>
                    </div>
                    <div className="h-80 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData}>
                          <defs>
                            <linearGradient id="colorMatches" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#1B4332" stopOpacity={0.1}/>
                              <stop offset="95%" stopColor="#1B4332" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                          <XAxis 
                            dataKey="name" 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{ fontSize: 10, fill: '#52796F' }}
                            dy={10}
                          />
                          <YAxis 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{ fontSize: 10, fill: '#52796F' }}
                          />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: '#fff', 
                              borderRadius: '24px', 
                              border: '1px solid rgba(0,0,0,0.05)',
                              boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                              padding: '12px 20px'
                            }} 
                            itemStyle={{ color: '#1B4332', fontSize: '14px', fontWeight: 'bold' }}
                          />
                          <Area 
                            type="monotone" 
                            dataKey="matches" 
                            stroke="#1B4332" 
                            strokeWidth={3}
                            fillOpacity={1} 
                            fill="url(#colorMatches)" 
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Candidate List (Recent Activity) */}
                  <div className="bg-white p-10 rounded-4xl card-shadow border border-black/5">
                    <div className="flex justify-between items-center mb-8">
                       <p className="text-2xl font-display font-bold text-apex-forest">High-Confidence Candidates</p>
                       <button className="text-xs font-display uppercase tracking-widest text-apex-text-muted hover:text-apex-forest transition-colors">
                         View All
                       </button>
                    </div>
                    <div className="space-y-6">
                      {MOCK_CANDIDATES.map((c) => (
                        <div key={c.id} className="flex items-center gap-6 group hover:bg-apex-bg p-4 rounded-3xl transition-all border border-transparent hover:border-black/5">
                           <div className="w-14 h-14 rounded-2xl bg-apex-mint-light flex items-center justify-center text-apex-forest shrink-0 overflow-hidden">
                              <img src={`https://ui-avatars.com/api/?name=${c.name.split(' ').join('+')}&background=B7E4C7&color=1B4332`} alt={c.name} />
                           </div>
                           <div className="flex-1">
                             <div className="flex justify-between items-start">
                               <h4 className="font-display font-bold text-apex-forest">{c.name}</h4>
                               <span className="text-xs font-bold text-apex-text-muted">IQ Score: {c.confidenceScore}</span>
                             </div>
                             <p className="text-sm text-apex-text-muted">{c.role} • {c.location}</p>
                             <div className="flex gap-2 mt-2">
                               {c.skills.slice(0, 3).map(s => (
                                 <span key={s} className="text-[10px] bg-apex-mint/20 text-apex-forest px-2 py-0.5 rounded-full font-medium">
                                   {s}
                                 </span>
                               ))}
                             </div>
                           </div>
                           <button className="w-10 h-10 rounded-full bg-apex-bg text-apex-forest flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                             <ArrowRight size={18} />
                           </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column Analysis */}
                <div className="space-y-8">
                  {/* Agentic Log Panel */}
                  <AgentStatusPanel logs={logs} />

                  {/* Distribution Chart */}
                  <div className="bg-white p-10 rounded-4xl card-shadow border border-black/5">
                    <p className="text-xl font-display font-bold text-apex-forest mb-8">Role Distribution</p>
                    <div className="h-64 w-full">
                       <ResponsiveContainer width="100%" height="100%">
                         <PieChart>
                           <Pie
                             data={pieData}
                             cx="50%"
                             cy="50%"
                             innerRadius={60}
                             outerRadius={80}
                             paddingAngle={5}
                             dataKey="value"
                           >
                             {pieData.map((entry, index) => (
                               <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                             ))}
                           </Pie>
                           <Tooltip 
                            contentStyle={{ 
                              backgroundColor: '#fff', 
                              borderRadius: '24px', 
                              border: '1px solid rgba(0,0,0,0.05)',
                              boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                              padding: '12px 20px'
                            }} 
                           />
                         </PieChart>
                       </ResponsiveContainer>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                       {pieData.map((item, idx) => (
                         <div key={item.name} className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[idx] }} />
                            <span className="text-xs font-semibold text-apex-text-muted">{item.name}</span>
                         </div>
                       ))}
                    </div>
                  </div>

                  {/* Job Match Highlight */}
                  <div className="bg-gradient-to-br from-apex-mint-light to-white p-10 rounded-4xl card-shadow border border-black/5">
                    <div className="flex gap-4 items-start mb-6">
                       <div className="p-3 bg-apex-forest text-white rounded-2xl">
                          <Zap size={20} />
                       </div>
                       <div>
                          <h4 className="text-xs font-display uppercase tracking-widest text-apex-forest font-bold">Neural Hot Match</h4>
                          <p className="font-display font-extrabold text-lg text-apex-forest">Systems Architect</p>
                       </div>
                    </div>
                    <p className="text-sm text-apex-text-muted mb-6">
                      Mandla Reddy (C3) & Transnational AI (J1) indicate a 98.4% Pareto-optimal alignment.
                    </p>
                    <button 
                      onClick={() => setActiveTab('negotiations')}
                      className="w-full py-4 bg-apex-forest text-white rounded-full font-bold text-sm tracking-tight hover:brightness-110 transition-all flex items-center justify-center gap-2"
                    >
                      Initialize Negotiation <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'candidates' && (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {MOCK_CANDIDATES.map(c => (
                  <div key={c.id} className="bg-white p-10 rounded-4xl card-shadow border border-black/5 space-y-6">
                     <div className="flex justify-between items-start">
                        <div className="w-20 h-20 rounded-3xl bg-apex-mint-light flex items-center justify-center overflow-hidden">
                           <img src={`https://ui-avatars.com/api/?name=${c.name.split(' ').join('+')}&background=B7E4C7&color=1B4332`} alt={c.name} className="w-full h-full" />
                        </div>
                        <div className="text-right">
                           <p className="text-3xl font-display font-bold text-apex-forest">{c.confidenceScore}%</p>
                           <p className="text-[10px] font-display uppercase tracking-widest text-apex-text-muted">Agent Confidence</p>
                        </div>
                     </div>
                     <div>
                        <h3 className="text-2xl font-display font-bold text-apex-forest">{c.name}</h3>
                        <p className="text-apex-text-muted">{c.role}</p>
                     </div>
                     <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-apex-text-muted">
                           <Briefcase size={16} /> {c.experience} Years Exp
                        </div>
                        <div className="flex items-center gap-2 text-sm text-apex-text-muted">
                           <Award size={16} /> {c.education}
                        </div>
                     </div>
                     <div className="flex flex-wrap gap-2">
                        {c.skills.map(s => (
                          <span key={s} className="px-3 py-1 bg-apex-bg text-apex-forest text-xs font-bold rounded-full border border-black/5">
                             {s}
                          </span>
                        ))}
                     </div>
                     <button className="w-full py-4 bg-apex-mint-light text-apex-forest rounded-full font-extrabold text-sm hover:bg-apex-mint transition-colors">
                        Deep Profile Analysis
                     </button>
                  </div>
                ))}
             </div>
          )}

          {activeTab === 'jobs' && (
             <div className="space-y-6">
                {MOCK_JOBS.map(job => (
                  <div key={job.id} className="bg-white p-10 rounded-4xl card-shadow border border-black/5 flex flex-col md:flex-row gap-8 items-center">
                     <div className="w-20 h-20 rounded-3xl bg-apex-forest flex items-center justify-center text-white shrink-0">
                        <Briefcase size={32} />
                     </div>
                     <div className="flex-1 space-y-2">
                        <div className="flex flex-wrap items-center gap-4">
                           <h3 className="text-2xl font-display font-bold text-apex-forest">{job.title}</h3>
                           <span className="px-3 py-1 bg-apex-forest/5 text-apex-forest text-[10px] font-bold uppercase tracking-widest rounded-full">
                              {job.company}
                           </span>
                        </div>
                        <p className="text-apex-text-muted">{job.description}</p>
                        <div className="flex gap-6 pt-2">
                           <div className="text-xs font-semibold text-apex-text-muted flex items-center gap-1">
                              <TrendingUp size={14} /> {job.salary}
                           </div>
                           <div className="text-xs font-semibold text-apex-text-muted flex items-center gap-1">
                              <Zap size={14} /> {job.matchScore}% Match Index
                           </div>
                        </div>
                     </div>
                     <div className="flex gap-4">
                        <button className="px-8 py-4 bg-apex-bg hover:bg-apex-mint-light text-apex-forest rounded-full font-bold transition-all">
                           JD Enricher
                        </button>
                        <button className="px-8 py-4 bg-apex-forest text-white rounded-full font-bold hover:brightness-110 transition-all">
                           Match Candidates
                        </button>
                     </div>
                  </div>
                ))}
             </div>
          )}

          {activeTab === 'negotiations' && (
            <div className="bg-white rounded-4xl card-shadow border border-black/5 overflow-hidden min-h-[600px] flex">
               <div className="w-1/3 border-r border-black/5 flex flex-col">
                  <div className="p-8 border-b border-black/5">
                     <h3 className="text-xl font-display font-bold text-apex-forest">Active Channels</h3>
                  </div>
                  <div className="flex-1 overflow-y-auto">
                     {MOCK_CANDIDATES.map(c => (
                        <div key={c.id} className="p-8 border-b border-black/5 hover:bg-apex-bg cursor-pointer transition-colors">
                           <div className="flex items-center gap-4 mb-2">
                              <div className="w-10 h-10 rounded-full bg-apex-mint-light flex items-center justify-center text-apex-forest overflow-hidden">
                                 <img src={`https://ui-avatars.com/api/?name=${c.name.split(' ').join('+')}&background=B7E4C7&color=1B4332`} alt="msg" />
                              </div>
                              <h4 className="font-bold text-apex-forest">{c.name}</h4>
                              <div className="ml-auto w-2 h-2 rounded-full bg-apex-mint" />
                           </div>
                           <p className="text-xs text-apex-text-muted truncate">NegotiatorAgent: "Proposal sent regarding salary band..."</p>
                        </div>
                     ))}
                  </div>
               </div>
               <div className="flex-1 flex flex-col bg-apex-bg/30">
                  <div className="p-8 border-b border-black/5 bg-white flex justify-between items-center">
                     <div>
                        <h4 className="font-display font-bold text-apex-forest">Arjun Mehta vs Transnational AI</h4>
                        <p className="text-xs text-apex-text-muted">Agentic Negotiation Protocol V2.1</p>
                     </div>
                     <div className="flex gap-4">
                        <button className="px-4 py-2 bg-apex-forest/5 text-apex-forest text-xs font-bold rounded-full">
                           View Contract Draft
                        </button>
                        <button className="px-4 py-2 bg-apex-forest text-white text-xs font-bold rounded-full">
                           Human Intercept
                        </button>
                     </div>
                  </div>
                  <div className="flex-1 p-8 space-y-6 overflow-y-auto">
                     <div className="max-w-md bg-white p-6 rounded-[32px] card-shadow border border-black/5 self-start">
                        <p className="text-sm text-apex-forest">
                           <strong>CandidateAgent:</strong> Parsed competitive data from Bengaluru market. Arjun's current value is trending 15% above the standard bracket due to specialized MCP expertise.
                        </p>
                     </div>
                     <div className="max-w-md bg-white p-6 rounded-[32px] card-shadow border border-black/5 ml-auto text-right">
                        <p className="text-sm text-apex-forest">
                           <strong>EmployerAgent:</strong> Transnational AI has approved a 10% premium for this role. Budget constraint is ₹60L total package.
                        </p>
                     </div>
                     <div className="max-w-xl mx-auto bg-apex-forest p-8 rounded-[40px] text-white card-shadow text-center">
                        <BrainCircuit className="mx-auto mb-4 text-apex-mint" size={32} />
                        <h5 className="font-display font-bold text-lg mb-2">NegotiatorAgent Proposal</h5>
                        <p className="text-sm text-apex-mint-light mb-4">
                           Found equilibrium: ₹58L Fixed + ₹5L Performance Bonus. Matches candidate's market value while respecting employer's budget node.
                        </p>
                        <div className="flex gap-4 justify-center">
                           <button className="px-6 py-2 bg-apex-mint text-apex-forest rounded-full font-bold text-xs">
                              Send to Parties
                           </button>
                           <button className="px-6 py-2 bg-white/20 text-white rounded-full font-bold text-xs">
                              Aura Recalculate
                           </button>
                        </div>
                     </div>
                  </div>
                  <div className="p-8 bg-white border-t border-black/5">
                     <div className="flex gap-4">
                        <input 
                          type="text" 
                          placeholder="Override agent instruction..."
                          className="flex-1 px-6 py-3 bg-apex-bg border-none rounded-full text-sm focus:ring-0"
                        />
                        <button className="p-3 bg-apex-forest text-white rounded-full">
                           <ArrowRight size={20} />
                        </button>
                     </div>
                  </div>
               </div>
            </div>
          )}
        </div>

        {/* Footer info */}
        <footer className="mt-auto px-12 py-12 border-t border-black/5 text-apex-text-muted">
           <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                 <div className="w-8 h-8 bg-apex-forest rounded-lg flex items-center justify-center text-white font-display font-bold text-sm">E</div>
                 <span className="text-xs font-bold tracking-widest uppercase font-display">EmployAI © 2026</span>
              </div>
              <div className="flex gap-8 text-xs font-semibold uppercase tracking-widest">
                 <a href="#" className="hover:text-apex-forest transition-colors">Documentation</a>
                 <a href="#" className="hover:text-apex-forest transition-colors">Safety Protocol</a>
                 <a href="#" className="hover:text-apex-forest transition-colors">Privacy</a>
              </div>
           </div>
        </footer>
      </main>
    </div>
  );
}
