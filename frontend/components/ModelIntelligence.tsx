"use client";

import React from "react";
import { Cpu, FileCode2, Scale, AlertOctagon, CheckCircle2 } from "lucide-react";

export function ModelIntelligence() {
  return (
    <section className="py-24 bg-soil-50/50 dark:bg-agri-950/60 transition-colors relative border-y border-soil-200/60 dark:border-agri-800/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="text-xs font-mono uppercase tracking-widest text-harvest-600 dark:text-harvest-400 font-semibold mb-2">
            SECTION 11 &bull; MODEL INTELLIGENCE
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-agri-950 dark:text-ivory">
            Under the Hood: The Agricultural NLP Engine
          </h2>
          <p className="mt-4 text-base sm:text-lg text-soil-600 dark:text-agri-300 leading-relaxed font-sans">
            A transparent architectural breakdown of the preprocessing, feature extraction, and probabilistic classification algorithms powering KisanRoute.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Pillar 1: Feature Extraction */}
          <div className="p-6 rounded-2xl bg-white dark:bg-agri-900/80 border border-soil-200 dark:border-agri-800 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-agri-100 dark:bg-agri-800 text-agri-700 dark:text-agri-300 flex items-center justify-center mb-4">
                <FileCode2 className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl font-bold text-agri-950 dark:text-ivory">
                TF-IDF N-Gram Vectorizer
              </h3>
              <p className="mt-3 text-xs sm:text-sm text-soil-600 dark:text-agri-300/80 leading-relaxed">
                Tokenizes raw inquiries into unigrams and bigrams (e.g., &ldquo;yellow rust&rdquo;, &ldquo;pm kisan&rdquo;, &ldquo;mandi bhav&rdquo;). Uses sublinear term frequency scaling (1 + log(tf)) to reduce the disproportionate influence of high-frequency words.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-soil-100 dark:border-agri-800/60 font-mono text-xs text-soil-500 dark:text-agri-400">
              Vocabulary Size: ~1,250 features
            </div>
          </div>

          {/* Pillar 2: Multinomial Classifier */}
          <div className="p-6 rounded-2xl bg-white dark:bg-agri-900/80 border border-soil-200 dark:border-agri-800 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-agri-100 dark:bg-agri-800 text-agri-700 dark:text-agri-300 flex items-center justify-center mb-4">
                <Scale className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl font-bold text-agri-950 dark:text-ivory">
                Multinomial Probabilistic Engine
              </h3>
              <p className="mt-3 text-xs sm:text-sm text-soil-600 dark:text-agri-300/80 leading-relaxed">
                Computes maximum a posteriori probabilities using Laplace-smoothed log likelihoods (alpha=0.3). Selected as the optimal model outperforming the baseline by +84.5% Macro-F1 and Logistic Regression by +4.4%.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-soil-100 dark:border-agri-800/60 font-mono text-xs text-soil-500 dark:text-agri-400">
              Alpha: 0.3 &bull; Stratified CV: 84.74%
            </div>
          </div>

          {/* Pillar 3: Known Limitations & Ethics */}
          <div className="p-6 rounded-2xl bg-white dark:bg-agri-900/80 border border-soil-200 dark:border-agri-800 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-400 flex items-center justify-center mb-4">
                <AlertOctagon className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl font-bold text-agri-950 dark:text-ivory">
                Known Limitations & Safeguards
              </h3>
              <p className="mt-3 text-xs sm:text-sm text-soil-600 dark:text-agri-300/80 leading-relaxed">
                Multi-intent queries (e.g., asking about fertilizer AND market price in one sentence) may exhibit split probability. All inquiries below 35% confidence are flagged for human supervisor review rather than forced into an incorrect dispatch.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-soil-100 dark:border-agri-800/60 font-mono text-xs text-amber-600 dark:text-amber-400">
              OOD Threshold: 35.0%
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
