import React from "react";
import { PipelineAnimation } from "../../components/PipelineAnimation";
import { RoutingNetwork } from "../../components/RoutingNetwork";
import { ModelIntelligence } from "../../components/ModelIntelligence";
import { ArrowLeft, Cpu, Compass, BookOpen } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "How It Works — KisanRoute NLP Pipeline",
  description: "Detailed technical architecture of the TF-IDF vectorizer and Scikit-learn classification pipeline.",
};

export default function HowItWorksPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-soil-500 dark:text-agri-400 hover:text-agri-700 transition-colors mb-6"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </Link>
        <div className="max-w-3xl">
          <div className="text-xs font-mono uppercase tracking-widest text-harvest-600 dark:text-harvest-400 font-semibold mb-2">
            TECHNICAL DEEP-DIVE
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-agri-950 dark:text-ivory">
            The Agricultural NLP Architecture
          </h1>
          <p className="mt-4 text-base sm:text-lg text-soil-600 dark:text-agri-300 leading-relaxed font-sans">
            How KisanRoute ingests colloquial farmer questions, applies lexical normalization, performs sublinear TF-IDF vectorization, and predicts calibrated probability distributions across 5 specialized agricultural domains.
          </p>
        </div>
      </div>

      <PipelineAnimation />
      <RoutingNetwork />
      <ModelIntelligence />
    </div>
  );
}

