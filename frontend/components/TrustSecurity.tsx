"use client";

import React from "react";
import { ShieldCheck, Lock, EyeOff, FileText, Ban, Server } from "lucide-react";

export function TrustSecurity() {
  const securityPillars = [
    {
      title: "Zero Personally Identifiable Information (PII)",
      description: "KisanRoute processes inquiries ephemerally. We do not solicit, record, or retain farmer phone numbers, names, Aadhaar identifiers, or bank credentials.",
      icon: EyeOff,
    },
    {
      title: "Server-Side Credential Isolation",
      description: "All privileged API keys (including optional Gemini endpoints) execute exclusively within backend processes. Zero API tokens are bundled into client JavaScript.",
      icon: Lock,
    },
    {
      title: "Rate Limiting & Abuse Prevention",
      description: "Sliding-window rate limiters cap query submissions at 60 inquiries per minute per IP, preventing denial-of-service degradation of extension systems.",
      icon: ShieldCheck,
    },
    {
      title: "Strict Payload Sanitization",
      description: "Pydantic v2 schemas strictly validate character bounds (3 to 1000 characters), reject non-linguistic repetitions, and neutralize malicious injection attempts.",
      icon: Server,
    },
  ];

  return (
    <section className="py-24 bg-ivory dark:bg-agri-950 transition-colors relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="text-xs font-mono uppercase tracking-widest text-harvest-600 dark:text-harvest-400 font-semibold mb-2">
            SECTION 12 &bull; TRUST, PRIVACY & SECURITY
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-agri-950 dark:text-ivory">
            Responsible AI Architecture
          </h2>
          <p className="mt-4 text-base sm:text-lg text-soil-600 dark:text-agri-300 leading-relaxed font-sans">
            Built from inception with privacy-by-design, cryptographic hygiene, and transparent governance for Indian agricultural communities.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
          {securityPillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="p-6 rounded-2xl bg-soil-50/70 dark:bg-agri-900/60 border border-soil-200/80 dark:border-agri-800/80 shadow-sm flex items-start gap-4"
              >
                <div className="p-3 rounded-xl bg-agri-100 dark:bg-agri-800 text-agri-700 dark:text-agri-300 shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-agri-950 dark:text-ivory">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-soil-600 dark:text-agri-300/80 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Governance Notice Box */}
        <div className="mt-10 p-6 rounded-2xl bg-soil-100/60 dark:bg-agri-900/40 border border-soil-200 dark:border-agri-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase text-soil-500 dark:text-agri-400 font-bold">
              Institutional Governance Disclosure
            </span>
            <p className="text-xs text-soil-600 dark:text-agri-300">
              KisanRoute is an independent applied AI research project. It is not owned, operated, or officially certified by the Indian Council of Agricultural Research (ICAR) or Ministry of Agriculture.
            </p>
          </div>
          <span className="shrink-0 text-xs font-mono px-3 py-1.5 rounded-lg bg-white dark:bg-agri-950 text-agri-800 dark:text-agri-200 border border-soil-200 dark:border-agri-800">
            Open Provenance &bull; v1.0
          </span>
        </div>
      </div>
    </section>
  );
}
