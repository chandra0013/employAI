export interface Candidate {
  id: string;
  name: string;
  location: string;
  role: string;
  experience: number;
  skills: string[];
  education: string;
  confidenceScore: number;
  status: 'available' | 'negotiating' | 'placed';
}

export interface Job {
  id: string;
  company: string;
  title: string;
  location: string;
  salary: string;
  tags: string[];
  matchScore: number;
  description: string;
}

export interface AgentLog {
  id: string;
  agent: 'Candidate' | 'Employer' | 'Negotiator';
  message: string;
  timestamp: string;
  type: 'action' | 'thought' | 'result';
}

export const MOCK_CANDIDATES: Candidate[] = [
  {
    id: 'c1',
    name: 'Arjun Mehta',
    location: 'Bengaluru, KA',
    role: 'Senior AI Engineer',
    experience: 6,
    skills: ['PyTorch', 'LangChain', 'MCP', 'FastAPI'],
    education: 'IIT Madras (B.Tech CSE)',
    confidenceScore: 94,
    status: 'negotiating'
  },
  {
    id: 'c2',
    name: 'Priyanka Sharma',
    location: 'Mumbai, MH',
    role: 'Full Stack Developer',
    experience: 4,
    skills: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
    education: 'NIT Trichy (B.Tech)',
    confidenceScore: 89,
    status: 'available'
  },
  {
    id: 'c3',
    name: 'Mandla Chandra Kiran Reddy',
    location: 'Vellore, TN',
    role: 'Integrated M.Tech AI/ML',
    experience: 2,
    skills: ['LangGraph', 'CrewAI', 'RAG', 'Agentic Systems'],
    education: 'VIT Vellore (M.Tech CSE)',
    confidenceScore: 97,
    status: 'available'
  }
];

export const MOCK_JOBS: Job[] = [
  {
    id: 'j1',
    company: 'Transnational AI',
    title: 'Agentic Systems Architect',
    location: 'Remote / Bengaluru',
    salary: '₹45L - ₹65L',
    tags: ['MCP', 'Orchestration', 'Guardrails'],
    matchScore: 98,
    description: 'Leading the development of agentic middleware for global employment exchanges.'
  },
  {
    id: 'j2',
    company: 'FinTech Solutions',
    title: 'Senior MLOps Engineer',
    location: 'Mumbai',
    salary: '₹35L - ₹50L',
    tags: ['K8s', 'MLflow', 'Python'],
    matchScore: 82,
    description: 'Scaling production-grade AI pipelines for financial fraud detection.'
  }
];

export const MOCK_LOGS: AgentLog[] = [
  { id: '1', agent: 'CandidateAgent', message: 'Parsing resume for Mandla Reddy... Latent skills inferred: Smart Bio-Gloves (Patent), MLOps.', timestamp: '14:20:01', type: 'action' },
  { id: '2', agent: 'EmployerAgent', message: 'Enriching JD for Transnational AI... Market signals indicate high demand for MCP protocols.', timestamp: '14:20:05', type: 'thought' },
  { id: '3', agent: 'NegotiatorAgent', message: 'Computing Pareto-optimal match... Candidate C3 vs Job J1. Confidence: 98%.', timestamp: '14:20:10', type: 'result' }
];
