/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { EXPERIENCE_DATA, EDUCATION_DATA } from '../types';
import { Calendar, Briefcase, GraduationCap, MapPin, Sparkles, Building } from 'lucide-react';

export default function EducationExperience() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12" id="education-experience-timeline">
      {/* 1. Work Experience Chronology */}
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1.5">
          <h4 className="text-[10px] uppercase tracking-widest text-white/30 font-mono">
            Career Chronicle
          </h4>
          <h3 className="text-xl font-serif italic text-white/80 tracking-tight">
            Professional Internships
          </h3>
          <p className="text-white/40 text-xs font-mono uppercase tracking-widest mt-2">
            Direct roles contributing to production intelligence and blockchain systems.
          </p>
        </div>

        <div className="relative border-l border-white/10 pl-6 ml-2 flex flex-col gap-8">
          {EXPERIENCE_DATA.map((exp, idx) => (
            <div key={idx} className="relative group" id={`exp-timeline-node-${idx}`}>
              {/* Timeline dot */}
              <span className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-none bg-[#0A0A0B] border border-white/30 flex items-center justify-center transition-transform">
                <span className="w-1.5 h-1.5 rounded-none bg-white/60" />
              </span>

              {/* Chronicle Card */}
              <div className="bg-white/5 border border-white/10 p-5 rounded-sm flex flex-col gap-3 transition-all hover:bg-white/10">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-1.5">
                  <div>
                    <h4 className="text-sm font-medium text-white tracking-tight font-sans">
                      {exp.role}
                    </h4>
                    <span className="text-[10px] font-mono text-white/60 uppercase tracking-widest flex items-center gap-1 mt-1">
                      <Building className="w-3 h-3 text-white/30" />
                      {exp.company}
                    </span>
                  </div>
                  <span className="text-[9px] font-mono text-white/40 uppercase tracking-[0.2em] bg-[#0A0A0B] px-2.5 py-1 rounded-sm border border-white/5 shrink-0 self-start md:self-center">
                    {exp.duration}
                  </span>
                </div>

                <ul className="flex flex-col gap-1.5 text-xs text-white/60 list-none pl-0 font-light italic font-serif">
                  {exp.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2 leading-relaxed">
                      <span className="text-white/40 shrink-0 mt-1 not-italic">✦</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Educational Career */}
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1.5">
          <h4 className="text-[10px] uppercase tracking-widest text-white/30 font-mono">
            Academic Track
          </h4>
          <h3 className="text-xl font-serif italic text-white/80 tracking-tight">
            Education Credentials
          </h3>
          <p className="text-white/40 text-xs font-mono uppercase tracking-widest mt-2">
            Specialized studies in computing systems and engineering principles.
          </p>
        </div>

        <div className="relative border-l border-white/10 pl-6 ml-2 flex flex-col gap-8">
          {EDUCATION_DATA.map((edu, idx) => (
            <div key={idx} className="relative group" id={`edu-timeline-node-${idx}`}>
              {/* Timeline dot */}
              <span className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-none bg-[#0A0A0B] border border-white/30 flex items-center justify-center transition-transform">
                <span className="w-1.5 h-1.5 rounded-none bg-white/60" />
              </span>

              {/* Credentials Card */}
              <div className="bg-white/5 border border-white/10 p-5 rounded-sm flex flex-col gap-3 transition-all hover:bg-white/10">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-1.5">
                  <div>
                    <h4 className="text-sm font-medium text-white tracking-tight font-sans leading-snug">
                      {edu.degree}
                    </h4>
                    <span className="text-[10px] font-mono text-white/60 uppercase tracking-widest flex items-center gap-1 mt-1">
                      <GraduationCap className="w-3.5 h-3.5 text-white/30" />
                      {edu.institution}
                    </span>
                  </div>
                  <span className="text-[9px] font-mono text-white/40 uppercase tracking-[0.2em] bg-[#0A0A0B] px-2.5 py-1 rounded-sm border border-white/5 shrink-0 self-start md:self-center">
                    {edu.duration}
                  </span>
                </div>

                {edu.specialization && (
                  <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/40 bg-[#0A0A0B] border border-white/10 p-2.5 rounded-sm flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-white/60 shrink-0" />
                    <span>Specialization: <strong className="text-white font-medium">{edu.specialization}</strong></span>
                  </div>
                )}

                {edu.grade && (
                  <div className="flex items-center gap-1 text-[10px] uppercase tracking-widest font-mono text-white/60">
                    <span className="text-white/40">Academic Score:</span>
                    <span className="font-medium text-white">{edu.grade}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
