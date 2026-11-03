"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { Sparkles, Trash2, Send, AlertCircle, RefreshCw, Cpu, CheckCircle2 } from "lucide-react";
import { predictFarmerQuery, fetchExplanation, PredictionResult, ExplanationResult } from "../lib/api";
import { ResultCard } from "./ResultCard";

const SAMPLE_QUESTIONS = [
  {
    category: "Plant Protection",
    text: "My wheat leaves are turning yellow with brown powdery rust spots. What spray should I use?",
  },
  {
    category: "Weather",
    text: "Heavy rain and hailstorm alert forecasted for Punjab and Haryana over next 48 hours. Should we harvest?",
  },
  {
    category: "Government Schemes",
    text: "When will the next 2000 rupee installment of PM-KISAN be credited? My land seeding status shows pending.",
  },
  {
    category: "Nutrient Management",
    text: "What is the recommended NPK fertilizer dose of urea and DAP per acre for timely sown irrigated wheat?",
  },
  {
    category: "Market Information",
    text: "What is today wholesale mandi bhav of mustard and wheat in Bharatpur and Khanna market yards?",
  },
  {
    category: "Out-of-Distribution",
    text: "Can you tell me how to repair my smartphone screen and download video games?",
  },
];

const PROCESSING_STAGES = [
  "RECEIVING QUERY",
  "CLEANING TEXT & REMOVING STOPWORDS",
  "TF-IDF VECTORIZATION & N-GRAM ANALYSIS",
  "MULTINOMIAL STATISTICAL CLASSIFICATION",
  "ROUTING TO SPECIALIST COMPLETE",
];

export function QueryLab() {
  const [query, setQuery] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStageIdx, setCurrentStageIdx] = useState(0);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [explanation, setExplanation] = useState<ExplanationResult | null>(null);
  const [loadingExplanation, setLoadingExplanation] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSelectSample = (text: string) => {
    setQuery(text);
    setErrorMsg(null);
  };

  const handleClear = () => {
    setQuery("");
    setResult(null);
    setExplanation(null);
    setErrorMsg(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || query.trim().length < 3) {
      setErrorMsg("Please enter at least 3 characters for analysis.");
      return;
    }

    setErrorMsg(null);
    setIsProcessing(true);
    setCurrentStageIdx(0);
    setResult(null);
    setExplanation(null);

    // Smooth stage visual progression
    const stageInterval = setInterval(() => {
      setCurrentStageIdx((prev) => {
        if (prev < PROCESSING_STAGES.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 280);

    try {
      const pred = await predictFarmerQuery(query.trim());
      clearInterval(stageInterval);
      setCurrentStageIdx(PROCESSING_STAGES.length - 1);
      
      setTimeout(() => {
        setIsProcessing(false);
        setResult(pred);

        // Celebration confetti if high confidence
        if (pred.confidence >= 0.75) {
          try {
            confetti({
              particleCount: 40,
              spread: 60,
              origin: { y: 0.6 },
              colors: ["#2D6A4F", "#D4A373", "#52B788"],
            });
          } catch (e) {
            // Ignore confetti errors
          }
        }

        // Fetch AI explanation asynchronously
        setLoadingExplanation(true);
        fetchExplanation(
          pred.query,
          pred.predicted_category,
          pred.confidence,
          pred.specialist.role
        )
          .then((exp) => setExplanation(exp))
          .catch(() => {
            setExplanation({
              source: "domain_rules_fallback",
              explanation: "Inquiry mapped according to vocabulary feature weighting and specialist domain scope.",
              disclaimer: "Explanation rendered via domain rules fallback.",
            });
          })
          .finally(() => setLoadingExplanation(false));
      }, 350);
    } catch (err: any) {
      clearInterval(stageInterval);
      setIsProcessing(false);
      setErrorMsg(err.message || "Failed to connect to the classification backend.");
    }
  };

  return (
    <section id="lab" className="py-24 bg-ivory dark:bg-agri-950 transition-colors relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-agri-100 dark:bg-agri-900 border border-agri-300 dark:border-agri-700 text-xs font-mono text-agri-800 dark:text-agri-300 mb-3">
            <Cpu className="w-3.5 h-3.5" />
            <span>INTERACTIVE QUERY CLASSIFICATION WORKBENCH</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-agri-950 dark:text-ivory">
            The Intelligence Lab
          </h2>
          <p className="mt-3 text-base sm:text-lg text-soil-600 dark:text-agri-300 leading-relaxed font-sans">
            Submit an authentic farmer inquiry to run live inference across our trained TF-IDF vectorizer and Scikit-learn classification pipeline.
          </p>
        </div>

        {/* Input Card Container */}
        <div className="mt-12 rounded-2xl bg-white dark:bg-agri-900/80 border border-soil-200 dark:border-agri-800 p-6 sm:p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <label htmlFor="farmer-query-input" className="sr-only">
                Farmer Inquiry
              </label>
              <textarea
                id="farmer-query-input"
                rows={4}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                maxLength={1000}
                placeholder="Type or paste a farmer's question here (e.g., 'My wheat leaves have yellow rust spots. What spray is recommended?')..."
                className="w-full p-4 text-base sm:text-lg rounded-xl bg-soil-50 dark:bg-agri-950/70 border border-soil-300/80 dark:border-agri-700/80 text-agri-950 dark:text-ivory placeholder-soil-400 dark:placeholder-agri-600 focus:outline-none focus:ring-2 focus:ring-agri-600 dark:focus:ring-agri-400 font-sans resize-y transition-all"
              />
              <div className="flex items-center justify-between text-xs font-mono text-soil-500 dark:text-agri-400 mt-2 px-1">
                <span>Supports English and transliterated Hindi agricultural terminology</span>
                <span>{query.length} / 1000 chars</span>
              </div>
            </div>

            {/* Error Message if any */}
            {errorMsg && (
              <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs font-mono flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Preset Samples */}
            <div className="pt-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-soil-500 dark:text-agri-400 font-semibold block mb-2">
                Or load an archetype inquiry:
              </span>
              <div className="flex flex-wrap gap-2">
                {SAMPLE_QUESTIONS.map((s, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectSample(s.text)}
                    className="text-left px-3 py-1.5 rounded-lg text-xs font-sans bg-soil-100 dark:bg-agri-800/80 text-soil-700 dark:text-agri-200 border border-soil-200 dark:border-agri-700 hover:bg-soil-200/80 dark:hover:bg-agri-700/80 transition-colors"
                  >
                    <span className="font-semibold text-agri-700 dark:text-agri-300 font-mono text-[10px] block">
                      {s.category}
                    </span>
                    <span className="line-clamp-1">{s.text}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Actions: Clear & Classify */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-soil-100 dark:border-agri-800">
              <button
                type="button"
                onClick={handleClear}
                disabled={!query && !result}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-mono text-soil-600 dark:text-agri-300 hover:bg-soil-100 dark:hover:bg-agri-800 border border-soil-200 dark:border-agri-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear Input</span>
              </button>

              <button
                type="submit"
                disabled={isProcessing || !query.trim()}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl text-sm font-semibold uppercase tracking-wider text-white bg-agri-700 dark:bg-agri-600 hover:bg-agri-800 dark:hover:bg-agri-500 shadow-md hover:shadow transition-all duration-200 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-harvest-300" />
                    <span>Processing In Realtime...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-harvest-300" />
                    <span>Classify & Route Query</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Animated Processing State */}
          {isProcessing && (
            <div className="mt-8 p-6 rounded-xl bg-agri-50/70 dark:bg-agri-950/70 border border-agri-200 dark:border-agri-800">
              <div className="flex items-center justify-between mb-3 text-xs font-mono text-agri-800 dark:text-agri-300">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  NLP Inference Pipeline Running
                </span>
                <span>
                  Stage {currentStageIdx + 1} of {PROCESSING_STAGES.length}
                </span>
              </div>
              <div className="w-full bg-soil-200 dark:bg-agri-800 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-agri-600 dark:bg-agri-400 h-full transition-all duration-300"
                  style={{
                    width: `${((currentStageIdx + 1) / PROCESSING_STAGES.length) * 100}%`,
                  }}
                />
              </div>
              <div className="mt-3 font-mono text-xs font-bold text-agri-900 dark:text-ivory">
                &gt; {PROCESSING_STAGES[currentStageIdx]}
              </div>
            </div>
          )}
        </div>

        {/* Prediction Result Component */}
        {result && (
          <div className="mt-10 animate-in fade-in-50 duration-500">
            <ResultCard
              result={result}
              explanation={explanation}
              loadingExplanation={loadingExplanation}
            />
          </div>
        )}
      </div>
    </section>
  );
}
