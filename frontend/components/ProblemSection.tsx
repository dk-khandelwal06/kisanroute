"use client";

import React from "react";
import { AlertCircle, Clock, CheckCircle2, UserX, UserCheck, ArrowRight, CornerDownRight } from "lucide-react";

export function ProblemSection() {
  return (
    <section className="py-24 bg-ivory dark:bg-agri-950 transition-colors relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="text-xs font-mono uppercase tracking-widest text-harvest-600 dark:text-harvest-400 font-semibold mb-2">
            SECTION 03 &bull; THE ROUTING BOTTLENECK
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-agri-950 dark:text-ivory">
            The Bottleneck in Manual Agricultural Triage
          </h2>
          <p className="mt-4 text-base sm:text-lg text-soil-600 dark:text-agri-300 leading-relaxed font-sans">
            When an agricultural question enters a central intake, human operators must decipher symptoms, identify the relevant scientific discipline, and manually select the appropriate extension specialist.
          </p>
        </div>

        {/* Comparison: Manual Triage vs KisanRoute Autonomous Routing */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Left: The Traditional Bottleneck */}
          <div className="rounded-2xl p-8 bg-red-50/40 dark:bg-red-950/20 border border-red-200/60 dark:border-red-900/40 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-red-200/50 dark:border-red-900/40">
                <span className="text-xs font-mono uppercase tracking-wider text-red-700 dark:text-red-400 font-bold flex items-center gap-2">
                  <UserX className="w-4 h-4" />
                  Conventional Manual Workflow
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-red-100 text-red-800 dark:bg-red-900/60 dark:text-red-300 font-mono">
                  High Triage Latency
                </span>
              </div>

              {/* Step By Step Breakdown */}
              <div className="mt-6 space-y-4">
                <div className="p-3.5 rounded-xl bg-white/70 dark:bg-agri-900/50 border border-red-200/40 dark:border-red-900/30">
                  <div className="text-xs font-mono text-red-600 dark:text-red-400">1. Raw Query Intake</div>
                  <div className="text-sm font-serif italic text-soil-800 dark:text-ivory mt-1">
                    &ldquo;My wheat leaves are turning yellow with brown spots. What should I do?&rdquo;
                  </div>
                </div>

                <div className="flex justify-center text-red-400">
                  <CornerDownRight className="w-5 h-5" />
                </div>

                <div className="p-3.5 rounded-xl bg-white/70 dark:bg-agri-900/50 border border-red-200/40 dark:border-red-900/30">
                  <div className="text-xs font-mono text-red-600 dark:text-red-400 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    2. Manual Operator Triage
                  </div>
                  <p className="text-xs text-soil-600 dark:text-agri-300 mt-1">
                    Operator reviews hundreds of queued tickets. Potential ambiguity between fungal rust (Plant Protection) vs Nitrogen deficiency (Nutrient Management).
                  </p>
                </div>

                <div className="flex justify-center text-red-400">
                  <CornerDownRight className="w-5 h-5" />
                </div>

                <div className="p-3.5 rounded-xl bg-white/70 dark:bg-agri-900/50 border border-red-200/40 dark:border-red-900/30">
                  <div className="text-xs font-mono text-red-600 dark:text-red-400 flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5" />
                    3. Misrouting or Queue Stagnation
                  </div>
                  <p className="text-xs text-soil-600 dark:text-agri-300 mt-1">
                    Query sits in general backlog. If misrouted, the receiving officer must reject and manually re-dispatch to another division.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-red-200/40 dark:border-red-900/30 text-xs text-red-700 dark:text-red-300/80 font-mono">
              Result: Critical spray windows missed while crop damage advances.
            </div>
          </div>

          {/* Right: The KisanRoute Autonomous Pipeline */}
          <div className="rounded-2xl p-8 bg-emerald-50/50 dark:bg-agri-900/30 border border-emerald-300/60 dark:border-agri-700/60 flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-emerald-200/50 dark:border-agri-700/40">
                <span className="text-xs font-mono uppercase tracking-wider text-agri-700 dark:text-agri-300 font-bold flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  KisanRoute NLP Classification
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-agri-800 dark:text-emerald-300 font-mono">
                  &lt; 15ms Autonomous Routing
                </span>
              </div>

              {/* Step By Step Breakdown */}
              <div className="mt-6 space-y-4">
                <div className="p-3.5 rounded-xl bg-white/80 dark:bg-agri-900/70 border border-emerald-200/60 dark:border-agri-700/50">
                  <div className="text-xs font-mono text-agri-700 dark:text-agri-300">1. Instant Token Ingestion</div>
                  <div className="text-sm font-serif italic text-soil-900 dark:text-ivory mt-1">
                    &ldquo;My wheat leaves are turning yellow with brown spots. What should I do?&rdquo;
                  </div>
                </div>

                <div className="flex justify-center text-agri-500">
                  <CornerDownRight className="w-5 h-5" />
                </div>

                <div className="p-3.5 rounded-xl bg-white/80 dark:bg-agri-900/70 border border-emerald-200/60 dark:border-agri-700/50">
                  <div className="text-xs font-mono text-agri-700 dark:text-agri-300 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    2. TF-IDF + Statistical Classifier
                  </div>
                  <p className="text-xs text-soil-600 dark:text-agri-300 mt-1">
                    Evaluates n-grams (yellow, rust, spots) against 5 trained taxonomy classes. Calculates calibrated probability: 82.5% confidence for <span className="font-semibold text-agri-800 dark:text-emerald-400">Plant Protection</span>.
                  </p>
                </div>

                <div className="flex justify-center text-agri-500">
                  <CornerDownRight className="w-5 h-5" />
                </div>

                <div className="p-3.5 rounded-xl bg-white/80 dark:bg-agri-900/70 border border-emerald-200/60 dark:border-agri-700/50">
                  <div className="text-xs font-mono text-agri-700 dark:text-agri-300 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    3. Exact Specialist Dispatch
                  </div>
                  <p className="text-xs text-soil-600 dark:text-agri-300 mt-1">
                    Direct assignment to: <span className="font-semibold text-agri-800 dark:text-ivory">Crop Protection & Pathology Specialist</span> with 2-4 hour emergency turnaround SLA.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-emerald-200/40 dark:border-agri-700/40 text-xs text-agri-700 dark:text-agri-300 font-mono">
              Advantage: Immediate triage, zero queue stagnation, calibrated confidence scoring.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

