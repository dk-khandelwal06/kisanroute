"use client";

import React, { useState } from "react";
import { MessageSquare, Scissors, Hash, Cpu, BarChart3, UserCheck, ChevronRight, Info } from "lucide-react";

interface PipelineStep {
  id: number;
  name: string;
  shortDesc: string;
  icon: React.ElementType;
  techDetails: {
    title: string;
    description: string;
    input: string;
    output: string;
    technology: string;
  };
}

export function PipelineAnimation() {
  const [activeStep, setActiveStep] = useState<number>(1);

  const steps: PipelineStep[] = [
    {
      id: 1,
      name: "Farmer Query",
      shortDesc: "Natural language input",
      icon: MessageSquare,
      techDetails: {
        title: "Stage 1: Raw Query Ingestion",
        description: "Inquiry entered in English or transliterated Hindi agricultural phrasings typical of Indian farming communities.",
        input: "\"My wheat leaves are turning yellow with brown spots. What should I spray?\"",
        output: "Raw UTF-8 string (length: 68 chars)",
        technology: "FastAPI Pydantic v2 String Validator",
      },
    },
    {
      id: 2,
      name: "Text Preprocessing",
      shortDesc: "Cleaning & normalization",
      icon: Scissors,
      techDetails: {
        title: "Stage 2: Lexical Standardization",
        description: "Lowercasing, punctuation stripping, excess whitespace removal, and preservation of hyphenated domain markers (e.g., PM-KISAN, e-NAM, N-P-K).",
        input: "\"My wheat leaves are turning yellow with brown spots. What should I spray?\"",
        output: "\"my wheat leaves are turning yellow with brown spots what should i spray\"",
        technology: "Python Regex Preprocessing Pipeline",
      },
    },
    {
      id: 3,
      name: "TF-IDF Vectorization",
      shortDesc: "N-gram weighting",
      icon: Hash,
      techDetails: {
        title: "Stage 3: Term Frequency-Inverse Document Frequency",
        description: "Transforms standardized text into a sparse numerical feature vector using unigrams and bigrams (1,2) fitted on the training split only (no data leakage).",
        input: "Standardized token stream",
        output: "Sparse Float64 vector (dimension: ~1,250 vocabulary features)",
        technology: "Scikit-Learn TfidfVectorizer(ngram_range=(1,2), sublinear_tf=True)",
      },
    },
    {
      id: 4,
      name: "ML Classification",
      shortDesc: "Statistical modeling",
      icon: Cpu,
      techDetails: {
        title: "Stage 4: Supervised Categorization",
        description: "The trained classifier computes log-likelihoods across the 5 canonical agricultural taxonomy classes.",
        input: "TF-IDF numerical feature vector",
        output: "Log probability distribution across 5 classes",
        technology: "Multinomial Naive Bayes / Multinomial Logistic Regression",
      },
    },
    {
      id: 5,
      name: "Confidence Scoring",
      shortDesc: "Probability calibration",
      icon: BarChart3,
      techDetails: {
        title: "Stage 5: Confidence & OOD Evaluation",
        description: "Calculates max class probability. Evaluates against a 35% threshold to flag low-confidence or out-of-distribution queries for manual human review.",
        input: "Class probability vector",
        output: "Confidence: 0.825 (High) | Flag: Normal | Probabilities: {Plant Protection: 82.5%, ...}",
        technology: "Numpy Softmax / Predict Proba Calibration",
      },
    },
    {
      id: 6,
      name: "Specialist Routing",
      shortDesc: "Expert domain dispatch",
      icon: UserCheck,
      techDetails: {
        title: "Stage 6: Domain Expert Assignment",
        description: "Maps the verified category to a dedicated agricultural specialist dossier, including turnaround SLA, key intervention tasks, and direct extension channels.",
        input: "Category: 'Plant Protection'",
        output: "Assigned: Crop Protection & Pathology Specialist (SLA: 2-4 Hours)",
        technology: "KisanRoute Deterministic Routing Knowledge Base",
      },
    },
  ];

  const currentStep = steps.find((s) => s.id === activeStep) || steps[0];
  const IconComponent = currentStep.icon;

  return (
    <section className="py-24 bg-soil-50/70 dark:bg-agri-950/80 transition-colors relative border-y border-soil-200/60 dark:border-agri-800/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="text-xs font-mono uppercase tracking-widest text-harvest-600 dark:text-harvest-400 font-semibold mb-2">
            SECTION 04 &bull; PIPELINE ARCHITECTURE
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-agri-950 dark:text-ivory">
            How KisanRoute Processes Every Inquiry
          </h2>
          <p className="mt-4 text-base sm:text-lg text-soil-600 dark:text-agri-300 leading-relaxed font-sans">
            An end-to-end NLP architecture transforming natural language farmer inquiries into calibrated specialist assignments within 15 milliseconds.
          </p>
        </div>

        {/* 6-Stage Progress Nodes Bar */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-6 gap-3">
          {steps.map((step) => {
            const StepIcon = step.icon;
            const isActive = step.id === activeStep;
            return (
              <button
                key={step.id}
                onClick={() => setActiveStep(step.id)}
                className={`relative p-4 rounded-xl text-left transition-all duration-300 border flex flex-col justify-between ${
                  isActive
                    ? "bg-agri-700 text-white dark:bg-agri-600 border-agri-800 shadow-md scale-105 z-10"
                    : "bg-white dark:bg-agri-900/60 text-soil-800 dark:text-agri-200 border-soil-200 dark:border-agri-800 hover:border-agri-400 dark:hover:border-agri-600"
                }`}
              >
                <div className="flex items-center justify-between w-full mb-3">
                  <span
                    className={`text-[11px] font-mono px-2 py-0.5 rounded-full ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-soil-100 dark:bg-agri-800 text-soil-600 dark:text-agri-300"
                    }`}
                  >
                    0{step.id}
                  </span>
                  <StepIcon
                    className={`w-4 h-4 ${
                      isActive ? "text-harvest-300" : "text-agri-600 dark:text-agri-400"
                    }`}
                  />
                </div>
                <div>
                  <div className="font-semibold text-xs leading-snug">{step.name}</div>
                  <div
                    className={`text-[10px] mt-0.5 truncate ${
                      isActive ? "text-agri-100" : "text-soil-500 dark:text-agri-400"
                    }`}
                  >
                    {step.shortDesc}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Interactive Detailed Stage Viewer */}
        <div className="mt-10 rounded-2xl bg-white dark:bg-agri-900/80 border border-soil-200 dark:border-agri-800/80 p-8 shadow-sm transition-all duration-300">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-soil-100 dark:border-agri-800">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-agri-100 dark:bg-agri-800 text-agri-700 dark:text-agri-200">
                <IconComponent className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-mono uppercase text-harvest-600 dark:text-harvest-400 font-bold">
                  STAGE 0{currentStep.id} OF 06
                </span>
                <h3 className="font-serif text-2xl font-bold text-agri-950 dark:text-ivory">
                  {currentStep.techDetails.title}
                </h3>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-soil-100 dark:bg-agri-800/90 text-xs font-mono text-soil-700 dark:text-agri-300 border border-soil-200 dark:border-agri-700">
                {currentStep.techDetails.technology}
              </span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-soil-500 dark:text-agri-400 font-semibold mb-2">
                Operational Function
              </h4>
              <p className="text-sm text-soil-700 dark:text-agri-200/90 leading-relaxed font-sans">
                {currentStep.techDetails.description}
              </p>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-soil-50 dark:bg-agri-950/60 border border-soil-200/60 dark:border-agri-800/60 font-mono text-xs">
                <div className="text-[10px] uppercase text-soil-500 dark:text-agri-400 mb-1 font-bold">
                  Stage Input:
                </div>
                <div className="text-soil-800 dark:text-ivory break-words">
                  {currentStep.techDetails.input}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-agri-50/60 dark:bg-agri-900/40 border border-agri-200/60 dark:border-agri-700/60 font-mono text-xs">
                <div className="text-[10px] uppercase text-agri-600 dark:text-agri-400 mb-1 font-bold">
                  Stage Output:
                </div>
                <div className="text-agri-900 dark:text-agri-200 font-semibold break-words">
                  {currentStep.techDetails.output}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-soil-100 dark:border-agri-800/60 flex items-center justify-between text-xs font-mono text-soil-500 dark:text-agri-400">
            <span>Click any phase above to inspect technical specifications</span>
            <div className="flex gap-2">
              <button
                disabled={activeStep <= 1}
                onClick={() => setActiveStep((prev) => Math.max(1, prev - 1))}
                className="px-3 py-1 rounded bg-soil-100 dark:bg-agri-800 hover:bg-soil-200 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                &larr; Prev
              </button>
              <button
                disabled={activeStep >= 6}
                onClick={() => setActiveStep((prev) => Math.min(6, prev + 1))}
                className="px-3 py-1 rounded bg-agri-700 text-white hover:bg-agri-800 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Next &rarr;
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
