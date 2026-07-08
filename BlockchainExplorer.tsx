/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { CERTIFICATIONS_DATA } from '../types';
import { Award, Calendar, CheckCircle2, ShieldCheck, ExternalLink } from 'lucide-react';

export default function Certifications() {
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);

  // Extra details to display on the back of each 3D card
  const certDetails = [
    {
      credentialId: "OCI-DS-2025-4921",
      skillsVerified: ["Supervised ML", "Model Evaluation", "Oci Data Flow", "AutoML Pipelines"],
      grade: "Certified Professional"
    },
    {
      credentialId: "MS-AI-900-884A",
      skillsVerified: ["Azure Cognitive Services", "Computer Vision Core", "Conversational AI", "Responsible AI Principles"],
      grade: "Passing score: 920/1000"
    },
    {
      credentialId: "W3-ETH-JUN-88C",
      skillsVerified: ["Solidity Compiler", "ERC standards", "Hardhat testing", "Gas mechanics"],
      grade: "Honors Certificate"
    },
    {
      credentialId: "ML-STAN-8902F",
      skillsVerified: ["Regression matrices", "Random Forest Trees", "Stochastic Gradient Descent", "Clustering algorithms"],
      grade: "Completed with Distinction"
    },
    {
      credentialId: "JS-HR-FEB-40291",
      skillsVerified: ["ES6 syntax", "Asynchronous promises", "Array prototyping", "DOM mechanics"],
      grade: "Advanced Level Verified"
    }
  ];

  const handleCardClick = (idx: number) => {
    if (flippedIndex === idx) {
      setFlippedIndex(null);
    } else {
      setFlippedIndex(idx);
    }
  };

  return (
    <div className="flex flex-col gap-6" id="certifications-section">
      <div className="flex flex-col gap-1">
        <h4 className="text-[10px] uppercase tracking-widest text-white/30 font-mono">
          Credentials Vault
        </h4>
        <h3 className="text-xl font-serif italic text-white/80 tracking-tight">
          Professional Certifications
        </h3>
        <p className="text-white/40 text-xs font-mono uppercase tracking-widest mt-2">
          Click any card to flip and verify verified skills & credential IDs in 3D.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {CERTIFICATIONS_DATA.map((cert, idx) => {
          const detail = certDetails[idx] || certDetails[0];
          const isFlipped = flippedIndex === idx;

          return (
            <div
              key={idx}
              onClick={() => handleCardClick(idx)}
              className="h-[210px] w-full [perspective:1000px] cursor-pointer group"
              id={`cert-3d-card-${idx}`}
            >
              <div
                className={`relative w-full h-full duration-700 [transform-style:preserve-3d] transition-transform ease-out ${
                  isFlipped ? '[transform:rotateY(180deg)]' : ''
                }`}
              >
                {/* FRONT FACE */}
                <div className="absolute inset-0 w-full h-full rounded-sm bg-[#0A0A0B] border border-white/5 p-5 flex flex-col justify-between [backface-visibility:hidden] hover:border-white/30 transition-all">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <div className="p-2 rounded-sm bg-white/5 text-white border border-white/10">
                        <Award className="w-4 h-4" />
                      </div>
                      <ShieldCheck className="w-4 h-4 text-white/30" />
                    </div>
                    
                    <h4 className="text-sm font-medium text-white leading-tight font-sans tracking-tight line-clamp-2">
                      {cert.title}
                    </h4>
                  </div>

                  <div className="flex flex-col gap-1 text-[10px] font-mono text-white/40 mt-2 uppercase tracking-widest">
                    <div className="text-white/60">{cert.issuer}</div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-white/30" />
                      <span>{cert.date}</span>
                    </div>
                  </div>
                </div>

                {/* BACK FACE */}
                <div className="absolute inset-0 w-full h-full rounded-sm bg-white border border-white p-5 flex flex-col justify-between [backface-visibility:hidden] [transform:rotateY(180deg)] shadow-xl shadow-black/50">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-mono text-[#0A0A0B]/60 tracking-widest uppercase">Credential Details</span>
                      <span className="text-[9px] font-mono text-[#0A0A0B]/60">{detail.grade}</span>
                    </div>
                    
                    <div className="font-mono text-[9px] text-[#0A0A0B]/80 bg-[#0A0A0B]/5 p-1.5 rounded-sm border border-[#0A0A0B]/10">
                      ID: <span className="text-[#0A0A0B] font-medium">{detail.credentialId}</span>
                    </div>

                    <div className="flex flex-col gap-1 mt-1">
                      <span className="text-[8px] font-mono text-[#0A0A0B]/60 uppercase tracking-widest">Verified Skills:</span>
                      <div className="flex flex-wrap gap-1">
                        {detail.skillsVerified.map((sk, sIdx) => (
                          <span
                            key={sIdx}
                            className="text-[8px] font-mono bg-[#0A0A0B] text-white px-1.5 py-0.5 rounded-sm uppercase tracking-widest"
                          >
                            {sk}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#0A0A0B] justify-end uppercase tracking-widest font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>VERIFIED</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
