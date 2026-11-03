"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, BarChart3 } from "lucide-react";

export function CallToAction() {
  return (
    <section className="relative py-28 overflow-hidden bg-agri-950 text-white">
      {/* Background Cinematic Visual with Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 scale-105 transition-transform duration-1000"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=2000&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-agri-950 via-agri-950/80 to-agri-950/60" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-agri-800/80 border border-agri-700/80 text-xs font-mono text-agri-300 mb-6">
          <span className="w-2 h-2 rounded-full bg-harvest-400" />
          <span>JOIN THE FUTURE OF AGRICULTURAL EXTENSION</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-ivory max-w-3xl mx-auto leading-tight">
          Better Questions. Smarter Routing. Stronger Agricultural Support.
        </h2>

        <p className="mt-6 text-base sm:text-lg text-agri-200/90 max-w-2xl mx-auto leading-relaxed font-sans">
          Experience the live classification workbench or inspect the genuine Scikit-learn confusion matrix and evaluation metrics.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/intelligence-lab"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-white bg-agri-600 hover:bg-agri-500 rounded-xl shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
          >
            <Sparkles className="w-4 h-4 text-harvest-300" />
            <span>Launch Intelligence Lab</span>
          </Link>

          <Link
            href="/insights"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-agri-200 hover:text-white bg-agri-900/80 hover:bg-agri-800 border border-agri-700/80 rounded-xl shadow-sm transition-all duration-200"
          >
            <BarChart3 className="w-4 h-4" />
            <span>Inspect Analytics</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
