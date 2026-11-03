"use client";

import React from "react";
import Link from "next/link";
import { ArrowDown, Sparkles, Compass, ShieldCheck, Zap, Activity } from "lucide-react";

export function HeroSection() {
  const scrollToExplore = () => {
    const el = document.getElementById("motion-story");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-24 pb-16">
      {/* Cinematic Background Layer */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=2000&q=80')",
          }}
        />
        {/* Soft natural gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-ivory/90 via-ivory/70 to-ivory dark:from-agri-950/95 dark:via-agri-950/85 dark:to-agri-950 transition-colors" />
        <div className="absolute inset-0 bg-grain opacity-40" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Tagline Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-agri-100/90 dark:bg-agri-900/80 border border-agri-300/60 dark:border-agri-700/60 text-xs font-mono text-agri-800 dark:text-agri-300 mb-6 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-harvest-500 animate-ping" />
          <span>PROJECT 006 — APPLIED AGRICULTURAL NLP</span>
        </div>

        {/* Main Headline */}
        <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-agri-950 dark:text-ivory max-w-4xl mx-auto leading-[1.12]">
          Every Farmer&apos;s Question Deserves the{" "}
          <span className="italic font-normal text-agri-700 dark:text-agri-400 underline decoration-harvest-500/60 decoration-wavy decoration-2">
            Right Answer.
          </span>
        </h1>

        {/* Supporting Subheading */}
        <p className="mt-6 text-lg sm:text-xl text-soil-700 dark:text-agri-200/90 max-w-3xl mx-auto leading-relaxed font-sans">
          Connecting agricultural questions with the intelligence, knowledge and expertise needed to move farming forward —{" "}
          <span className="font-medium text-agri-800 dark:text-white">
            reading a farmer&apos;s question and knowing who should answer it, before a human has to.
          </span>
        </p>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/intelligence-lab"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-white bg-agri-700 dark:bg-agri-600 hover:bg-agri-800 dark:hover:bg-agri-500 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
          >
            <Sparkles className="w-4 h-4 text-harvest-300" />
            <span>Enter Intelligence Lab</span>
          </Link>

          <button
            onClick={scrollToExplore}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-agri-900 dark:text-ivory bg-soil-100/80 dark:bg-agri-900/70 hover:bg-soil-200/90 dark:hover:bg-agri-800/80 border border-soil-300/80 dark:border-agri-700/60 rounded-xl shadow-sm transition-all duration-300"
          >
            <Compass className="w-4 h-4 text-agri-600 dark:text-agri-400" />
            <span>Explore KisanRoute</span>
          </button>
        </div>

        {/* Operational Highlights Strip */}
        <div className="mt-14 pt-8 border-t border-soil-200/80 dark:border-agri-800/60 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div className="p-3 rounded-lg bg-soil-50/60 dark:bg-agri-900/40 border border-soil-200/50 dark:border-agri-800/40">
            <div className="text-2xl font-serif font-bold text-agri-800 dark:text-agri-300">91.4%</div>
            <div className="text-xs text-soil-500 dark:text-agri-400/80 font-mono mt-0.5">Macro-F1 Accuracy</div>
          </div>
          <div className="p-3 rounded-lg bg-soil-50/60 dark:bg-agri-900/40 border border-soil-200/50 dark:border-agri-800/40">
            <div className="text-2xl font-serif font-bold text-agri-800 dark:text-agri-300">&lt; 15ms</div>
            <div className="text-xs text-soil-500 dark:text-agri-400/80 font-mono mt-0.5">Inference Latency</div>
          </div>
          <div className="p-3 rounded-lg bg-soil-50/60 dark:bg-agri-900/40 border border-soil-200/50 dark:border-agri-800/40">
            <div className="text-2xl font-serif font-bold text-agri-800 dark:text-agri-300">5 Domains</div>
            <div className="text-xs text-soil-500 dark:text-agri-400/80 font-mono mt-0.5">Specialist Taxonomy</div>
          </div>
          <div className="p-3 rounded-lg bg-soil-50/60 dark:bg-agri-900/40 border border-soil-200/50 dark:border-agri-800/40">
            <div className="text-2xl font-serif font-bold text-agri-800 dark:text-agri-300">Zero PII</div>
            <div className="text-xs text-soil-500 dark:text-agri-400/80 font-mono mt-0.5">Privacy By Design</div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="mt-10 flex justify-center">
          <button
            onClick={scrollToExplore}
            aria-label="Scroll down"
            className="flex flex-col items-center gap-1.5 text-xs font-mono text-soil-500 dark:text-agri-400/80 hover:text-agri-700 transition-colors"
          >
            <span>SCROLL TO DISCOVER</span>
            <ArrowDown className="w-4 h-4 animate-bounce text-agri-600 dark:text-agri-400" />
          </button>
        </div>
      </div>
    </section>
  );
}
