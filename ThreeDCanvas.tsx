/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Mail, Phone, MapPin, Linkedin, Github, ExternalLink, 
  ChevronRight, Code, Database, Sparkles, Send, CheckCircle2, 
  HelpCircle, ArrowUpRight 
} from 'lucide-react';

import Navbar from './components/Navbar';
import ThreeDCanvas from './components/ThreeDCanvas';
import About from './components/About';
import EducationExperience from './components/EducationExperience';
import BlockchainExplorer from './components/BlockchainExplorer';
import LLMBenchmarker from './components/LLMBenchmarker';
import MLPredictor from './components/MLPredictor';
import Certifications from './components/Certifications';

export default function App() {
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formMsg, setFormMsg] = useState('');
  const [formSuccess, setFormSuccess] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    
    setTimeout(() => {
      setIsSending(false);
      setFormSuccess(true);
      setFormName('');
      setFormEmail('');
      setFormMsg('');
      
      // Clear success notification after 5s
      setTimeout(() => setFormSuccess(false), 5000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-[#D1D1D1] font-sans selection:bg-white/20 selection:text-white" id="main-portfolio-root">
      {/* Background radial overlays for elegant depth */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-white/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <header className="relative pt-32 pb-20 md:pt-40 md:pb-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Hero Text Block */}
          <div className="lg:col-span-6 flex flex-col gap-6" id="hero-text-container">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/60 font-mono text-xs w-fit tracking-[0.2em] uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>PASSIONATE BLOCKCHAIN & DATA SCIENCE ENGINEER</span>
            </div>

            <div className="flex flex-col gap-3">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tighter text-white leading-tight">
                Hi, I'm <span className="font-serif italic text-white/80">Mohan Kumar B</span>
              </h1>
              <p className="text-white/60 text-sm md:text-base leading-relaxed max-w-lg font-serif italic">
                "Enthusiastic and passionate Computer Science & Engineering student specializing in IoT, Cyber Security, Blockchain, and Data Science. Actively designing secure ledger nodes, quantum integrations, and predictive models."
              </p>
            </div>

            {/* Resume Contact Details Grid */}
            <div className="grid grid-cols-2 gap-4 font-mono text-[10px] uppercase tracking-widest text-white/40 border-y border-white/10 py-5 my-1" id="hero-contact-grid">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-sm bg-white/5 border border-white/10 text-white">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <span>+91 94881 07502</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-sm bg-white/5 border border-white/10 text-white">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <a href="mailto:mohan15vk@gmail.com" className="hover:text-white transition-colors">mohan15vk@gmail.com</a>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-sm bg-white/5 border border-white/10 text-white">
                  <Linkedin className="w-3.5 h-3.5" />
                </div>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-0.5">
                  LinkedIn <ArrowUpRight className="w-2.5 h-2.5" />
                </a>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-sm bg-white/5 border border-white/10 text-white">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <span>Krishnagiri, TN, India</span>
              </div>
            </div>

            {/* Call to Actions */}
            <div className="flex flex-wrap gap-3" id="hero-actions">
              <a
                href="#sandbox"
                className="px-5 py-2.5 rounded-sm bg-white hover:bg-white/90 text-[#0A0A0B] font-medium text-[10px] tracking-widest uppercase transition-all flex items-center gap-1.5"
              >
                <span>Deploy Smart Contract</span>
                <ChevronRight className="w-4 h-4" />
              </a>
              <a
                href="#predictors"
                className="px-5 py-2.5 rounded-sm bg-transparent hover:bg-white/5 border border-white/20 text-white/60 hover:text-white font-medium text-[10px] tracking-widest uppercase transition-all flex items-center gap-1.5"
              >
                <span>Run ML Predictors</span>
              </a>
            </div>
          </div>

          {/* Right Interactive 3D Canvas Visualizer */}
          <div className="lg:col-span-6 w-full flex justify-center" id="hero-canvas-container">
            <div className="w-full max-w-lg lg:max-w-none">
              <ThreeDCanvas />
            </div>
          </div>
        </div>
      </header>

      {/* About & Technical Skills Section */}
      <section className="py-20 bg-[#0A0A0B] border-t border-white/10 scroll-mt-20" id="about">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <About />
        </div>
      </section>

      {/* Timeline Experience & Education section */}
      <section className="py-20 bg-[#070708] border-t border-white/10 scroll-mt-20" id="timeline">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <EducationExperience />
        </div>
      </section>

      {/* Highlight Interactive Feature 1: Solidity Smart Contract Sandbox */}
      <section className="py-20 bg-[#0A0A0B] border-t border-white/10 scroll-mt-20" id="sandbox">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-1.5 mb-10 max-w-xl">
            <h4 className="text-[10px] font-mono font-medium tracking-[0.3em] text-white/30 uppercase">
              Decentralized Sandbox
            </h4>
            <h2 className="text-2xl sm:text-3xl font-serif italic text-white/80 tracking-tight">
              Interactive Solidity EVM Simulation
            </h2>
            <p className="text-white/40 text-xs font-mono leading-relaxed mt-2">
              Test Mohan's active studies in blockchain. Fill in the token properties, deploy your token to the simulated EVM ledger, execute transfers, and mine new blocks with cryptographic hashes!
            </p>
          </div>
          <BlockchainExplorer />
        </div>
      </section>

      {/* Highlight Interactive Feature 2: Machine Learning Prediction Suite */}
      <section className="py-20 bg-[#070708] border-t border-white/10 scroll-mt-20" id="predictors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-1.5 mb-10 max-w-xl">
            <h4 className="text-[10px] font-mono font-medium tracking-[0.3em] text-white/30 uppercase">
              Model Diagnostics
            </h4>
            <h2 className="text-2xl sm:text-3xl font-serif italic text-white/80 tracking-tight">
              Machine Learning Prediction Suite
            </h2>
            <p className="text-white/40 text-xs font-mono leading-relaxed mt-2">
              Tweak coefficients to run predictive models built on parameters from his actual projects (IPL, Resale Valuation, Diabetes diagnosis, and Retail seasonal forecasting).
            </p>
          </div>
          <MLPredictor />
        </div>
      </section>

      {/* Highlight Interactive Feature 3: LLM Comparative Analysis */}
      <section className="py-20 bg-[#0A0A0B] border-t border-white/10 scroll-mt-20" id="benchmarks">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-1.5 mb-10 max-w-xl">
            <h4 className="text-[10px] font-mono font-medium tracking-[0.3em] text-white/30 uppercase">
              Research Comparison
            </h4>
            <h2 className="text-2xl sm:text-3xl font-serif italic text-white/80 tracking-tight">
              Comparative Analysis of LLMs
            </h2>
            <p className="text-white/40 text-xs font-mono leading-relaxed mt-2">
              Based on Mohan's Dec 2025 comparative study of ChatGPT-5.1, Gemini-3.0, and Opus-4.5. Benchmark their generated code structures, latency speed, and token costs simultaneously.
            </p>
          </div>
          <LLMBenchmarker />
        </div>
      </section>

      {/* Certifications Vault */}
      <section className="py-20 bg-[#070708] border-t border-white/10 scroll-mt-20" id="credentials">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Certifications />
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-[#0A0A0B] border-t border-white/10 scroll-mt-20" id="contact">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Col Contact channels */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <h4 className="text-[10px] font-mono font-medium tracking-[0.3em] text-white/30 uppercase">
                    Connect Node
                  </h4>
                  <h3 className="text-2xl font-serif italic text-white/80 tracking-tight">
                    Start a Conversation
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed max-w-md font-light">
                    Looking to integrate high-efficiency ML pipelines, deploy robust Solidity contracts, or brainstorm next-gen decentralized ecosystems? Get in touch!
                  </p>
                </div>

                <div className="flex flex-col gap-3 font-mono text-xs text-white/60 mt-4">
                  <div className="flex items-center gap-3 bg-white/5 border border-white/10 p-3.5 rounded-sm">
                    <Mail className="w-4 h-4 text-white/60 shrink-0" />
                    <div>
                      <span className="text-white/40 block text-[10px] tracking-widest mb-0.5">EMAIL ADDRESS</span>
                      <a href="mailto:mohan15vk@gmail.com" className="hover:text-white transition-colors">mohan15vk@gmail.com</a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 bg-white/5 border border-white/10 p-3.5 rounded-sm">
                    <Phone className="w-4 h-4 text-white/60 shrink-0" />
                    <div>
                      <span className="text-white/40 block text-[10px] tracking-widest mb-0.5">PHONE</span>
                      <span className="">+91 94881 07502</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 bg-white/5 border border-white/10 p-3.5 rounded-sm">
                    <Linkedin className="w-4 h-4 text-white/60 shrink-0" />
                    <div>
                      <span className="text-white/40 block text-[10px] tracking-widest mb-0.5">LINKEDIN</span>
                      <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
                        Connect on LinkedIn <ArrowUpRight className="w-3 h-3 text-white/60" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Languages summary inside contact col as design anchor */}
              <div className="mt-8 lg:mt-0 pt-6 border-t border-white/10 text-[10px] font-mono text-white/30 leading-normal uppercase tracking-widest">
                LOC: Krishnagiri, Tamil Nadu, India • UTC_TIME: +5.5hrs • STATUS: Active Student / Open to internships
              </div>
            </div>

            {/* Right Col Contact Form */}
            <div className="lg:col-span-7">
              <div className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-sm">
                <form onSubmit={handleFormSubmit} className="flex flex-col gap-4" id="contact-message-form">
                  <div className="flex items-center gap-2 text-white/40 text-[10px] font-mono font-medium uppercase tracking-[0.2em] mb-2">
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Secure Message</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] uppercase tracking-widest font-mono text-white/40">Your Name</label>
                      <input
                        type="text"
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        className="bg-[#0A0A0B] border border-white/10 rounded-sm px-4 py-2.5 text-sm text-white focus:outline-none focus:border-white/30 transition-all"
                        placeholder="John Doe"
                        required
                        id="contact-name-input"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] uppercase tracking-widest font-mono text-white/40">Email Address</label>
                      <input
                        type="email"
                        value={formEmail}
                        onChange={(e) => setFormEmail(e.target.value)}
                        className="bg-[#0A0A0B] border border-white/10 rounded-sm px-4 py-2.5 text-sm text-white focus:outline-none focus:border-white/30 transition-all"
                        placeholder="john@example.com"
                        required
                        id="contact-email-input"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase tracking-widest font-mono text-white/40">Message Content</label>
                    <textarea
                      value={formMsg}
                      onChange={(e) => setFormMsg(e.target.value)}
                      rows={5}
                      className="bg-[#0A0A0B] border border-white/10 rounded-sm px-4 py-2.5 text-sm text-white focus:outline-none focus:border-white/30 transition-all resize-none"
                      placeholder="Hi Mohan, I saw your 3D engineering portfolio..."
                      required
                      id="contact-message-input"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSending}
                    className="w-full bg-white hover:bg-white/90 text-[#0A0A0B] font-medium py-3 px-5 rounded-sm transition-all text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-2"
                    id="contact-submit-btn"
                  >
                    <Send className={`w-3.5 h-3.5 ${isSending ? 'animate-bounce' : ''}`} />
                    {isSending ? 'SENDING ENCRYPTED PAYLOAD...' : 'TRANSMIT MESSAGE'}
                  </button>

                  <AnimatePresence>
                    {formSuccess && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="bg-white/5 border border-white/10 p-4 rounded-sm flex items-center gap-3 mt-2"
                        id="contact-success-banner"
                      >
                        <CheckCircle2 className="w-5 h-5 text-white/60 shrink-0" />
                        <div>
                          <span className="text-[10px] uppercase tracking-widest font-medium text-white block">Payload Transmitted!</span>
                          <span className="text-[10px] font-mono text-white/40">Message parsed and simulated in console history successfully.</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compact footer */}
      <footer className="h-10 border-t border-white/10 bg-[#070708] flex items-center justify-between px-12 shrink-0">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span className="text-[9px] uppercase tracking-widest text-white/40">System Online</span>
          </div>
          <span className="text-[9px] text-white/20 font-mono hidden sm:block">LAT: 12.5186 // LNG: 78.2137</span>
        </div>
        <div className="text-[9px] uppercase tracking-[0.2em] text-white/40 hidden md:block">
          © 2026 Mohan Kumar B • React Architecture v4.02
        </div>
      </footer>
    </div>
  );
}
