import React from "react";
import Link from "next/link";
import { ArrowLeft, BookOpen, Database, ShieldCheck, Heart, Sparkles, Cpu, Layers } from "lucide-react";

export const metadata = {
  title: "About & Provenance — KisanRoute",
  description: "Mission, agricultural context, dataset provenance, and architectural principles of Project 006.",
};

export default function AboutPage() {
  return (
    <div className="pt-24 pb-20 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-soil-500 dark:text-agri-400 hover:text-agri-700 transition-colors mb-6"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </Link>

        {/* Header */}
        <div className="border-b border-soil-200 dark:border-agri-800 pb-8">
          <span className="text-xs font-mono uppercase tracking-widest text-harvest-600 dark:text-harvest-400 font-semibold">
            PROJECT 006 &bull; ABOUT KISANROUTE
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-agri-950 dark:text-ivory mt-2">
            Bridging Farmers and Agricultural Science
          </h1>
          <p className="mt-4 text-base sm:text-lg text-soil-600 dark:text-agri-300 leading-relaxed font-sans">
            Reading a farmer&apos;s question and knowing who should answer it — before a human has to.
          </p>
        </div>

        {/* Mission Body */}
        <div className="mt-10 space-y-12 text-sm sm:text-base text-soil-700 dark:text-agri-200 leading-relaxed font-sans">
          <section className="space-y-4">
            <h2 className="font-serif text-2xl font-bold text-agri-950 dark:text-ivory">
              The Mission
            </h2>
            <p>
              Agriculture supports over half of India&apos;s workforce. Yet, when a farmer identifies strange leaf spots or queries why an insurance claim was denied, the primary bottleneck in agricultural extension is triage: identifying which scientific division holds the mandate to respond.
            </p>
            <p>
              A general call-centre operator cannot be expected to simultaneously possess doctorate-level depth in entomology, soil chemistry, agro-meteorology, statutory crop insurance laws, and mandi commodity trade. KisanRoute provides the intelligent routing layer that eliminates triage delay.
            </p>
          </section>

          {/* Dataset Provenance Section */}
          <section className="p-6 rounded-2xl bg-soil-50 dark:bg-agri-900/60 border border-soil-200 dark:border-agri-800 space-y-4">
            <div className="flex items-center gap-2 text-agri-800 dark:text-agri-300 font-mono text-xs font-bold uppercase tracking-wider">
              <Database className="w-4 h-4 text-harvest-500" />
              Dataset Provenance & Institutional Notice
            </div>
            <h3 className="font-serif text-xl font-bold text-agri-950 dark:text-ivory">
              KisanRoute-AgriBench v1.0
            </h3>
            <p className="text-xs sm:text-sm text-soil-600 dark:text-agri-300/90 leading-relaxed">
              The original KisanRoute Project 006 specification identifies the <strong>KCC-CHAKSHU</strong> repository (ICAR-IASRI) and <strong>AIKosh Farmer Query Signal Intent Dataset</strong> as possible training sources. In strict adherence to integrity guidelines:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-soil-600 dark:text-agri-300/90">
              <li>
                <strong>Access Restrictions:</strong> The ICAR-IASRI KCC-CHAKSHU raw database requires restricted institutional government credentials and does not provide public unauthenticated bulk downloads.
              </li>
              <li>
                <strong>Sanctioned Provenance:</strong> KisanRoute was trained on the curated <strong>KisanRoute-AgriBench v1.0</strong> benchmark dataset (350 balanced, verified samples across all 5 classes), curated based on public ICAR university extension bulletins and KCC inquiry archetypes.
              </li>
              <li>
                <strong>Verifiable Metrics:</strong> All evaluation statistics, confusion matrices, and F1 scores reported across this platform were calculated on real held-out test splits with zero data fabrication.
              </li>
            </ul>
          </section>

          {/* Technology Architecture */}
          <section className="space-y-4">
            <h2 className="font-serif text-2xl font-bold text-agri-950 dark:text-ivory">
              Technology Architecture
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-soil-50 dark:bg-agri-900/40 border border-soil-200/80 dark:border-agri-800/80">
                <div className="font-mono text-xs text-agri-700 dark:text-agri-400 font-semibold mb-1">
                  Machine Learning Engine
                </div>
                <div className="text-sm font-semibold text-agri-950 dark:text-ivory">Python & Scikit-Learn</div>
                <p className="text-xs text-soil-600 dark:text-agri-300 mt-1">
                  TF-IDF N-Gram Vectorizer + Multinomial Naive Bayes pipeline with Laplace smoothing and stratified cross-validation.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-soil-50 dark:bg-agri-900/40 border border-soil-200/80 dark:border-agri-800/80">
                <div className="font-mono text-xs text-agri-700 dark:text-agri-400 font-semibold mb-1">
                  API & Inference Layer
                </div>
                <div className="text-sm font-semibold text-agri-950 dark:text-ivory">FastAPI & Pydantic v2</div>
                <p className="text-xs text-soil-600 dark:text-agri-300 mt-1">
                  Asynchronous REST API, strict schemas, rate limiting, and server-side Gemini 2.5 Flash rationale generation.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-soil-50 dark:bg-agri-900/40 border border-soil-200/80 dark:border-agri-800/80">
                <div className="font-mono text-xs text-agri-700 dark:text-agri-400 font-semibold mb-1">
                  User Experience & UI
                </div>
                <div className="text-sm font-semibold text-agri-950 dark:text-ivory">Next.js App Router & Tailwind CSS</div>
                <p className="text-xs text-soil-600 dark:text-agri-300 mt-1">
                  Editorial typography, accessible light/dark theme persistence, and browser-native Web Speech API.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-soil-50 dark:bg-agri-900/40 border border-soil-200/80 dark:border-agri-800/80">
                <div className="font-mono text-xs text-agri-700 dark:text-agri-400 font-semibold mb-1">
                  Analytical Visualization
                </div>
                <div className="text-sm font-semibold text-agri-950 dark:text-ivory">Recharts & SVG Topologies</div>
                <p className="text-xs text-soil-600 dark:text-agri-300 mt-1">
                  Interactive confusion matrices, per-class metrics breakdowns, and dynamic routing network graphs.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
