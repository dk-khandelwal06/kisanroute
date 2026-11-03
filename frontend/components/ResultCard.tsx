"use client";

import React, { useState } from "react";
import { PredictionResult } from "../lib/api";
import { Volume2, VolumeX, Copy, Check, AlertTriangle, ShieldCheck, Clock, Phone, Sparkles, Building2, User } from "lucide-react";

interface ResultCardProps {
  result: PredictionResult;
  explanation: { source: string; explanation: string; disclaimer: string } | null;
  loadingExplanation: boolean;
}

export function ResultCard({ result, explanation, loadingExplanation }: ResultCardProps) {
  const [copied, setCopied] = useState(false);
  const [speaking, setSpeaking] = useState(false);

  const copyToClipboard = () => {
    const text = `KisanRoute Query Classification Result:
Query: "${result.query}"
Predicted Category: ${result.predicted_category}
Confidence: ${(result.confidence * 100).toFixed(1)}% (${result.confidence_level})
Assigned Specialist: ${result.specialist.role}
Department: ${result.specialist.department}
Turnaround SLA: ${result.specialist.turnaround_sla}
Contact Channel: ${result.specialist.contact_channel}`;
    
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSpeak = () => {
    if (!("speechSynthesis" in window)) {
      alert("Browser speech synthesis is not supported on your browser.");
      return;
    }

    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }

    const textToSpeak = `Inquiry classified under ${result.predicted_category} with ${(result.confidence * 100).toFixed(0)} percent confidence. Routed to ${result.specialist.role}. Expected turnaround window: ${result.specialist.turnaround_sla}.`;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);

    setSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const categoryBadgeColors: Record<string, string> = {
    "Plant Protection": "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700",
    "Weather": "bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300 border-sky-300 dark:border-sky-700",
    "Government Schemes": "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border-amber-300 dark:border-amber-700",
    "Nutrient Management": "bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300 border-teal-300 dark:border-teal-700",
    "Market Information": "bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300 border-indigo-300 dark:border-indigo-700",
  };

  const badgeClass = categoryBadgeColors[result.predicted_category] || "bg-soil-100 text-soil-800 dark:bg-agri-900 dark:text-agri-200 border-soil-300";

  return (
    <div className="rounded-2xl bg-white dark:bg-agri-900/90 border border-soil-200 dark:border-agri-800 p-6 sm:p-8 shadow-lg transition-all duration-300">
      {/* Top Banner: Status, Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-soil-100 dark:border-agri-800">
        <div>
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold border ${badgeClass}`}>
              {result.predicted_category}
            </span>
            {result.is_low_confidence ? (
              <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300 text-xs font-mono border border-red-300">
                <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
                Low Confidence (Human Review Advised)
              </span>
            ) : (
              <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-agri-100 text-agri-800 dark:bg-agri-800 dark:text-agri-300 text-xs font-mono border border-agri-300/60">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Autonomous Route Verified
              </span>
            )}
          </div>
          <div className="mt-2 text-xs font-mono text-soil-500 dark:text-agri-400">
            Model: {result.model_info.name} v{result.model_info.version} &bull; Latency: {result.model_info.latency_ms}ms
          </div>
        </div>

        {/* Action Buttons: Speech & Copy */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleSpeak}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-lg border transition-colors ${
              speaking
                ? "bg-agri-700 text-white border-agri-800"
                : "bg-soil-100 dark:bg-agri-800 text-soil-700 dark:text-agri-200 border-soil-200 dark:border-agri-700 hover:bg-soil-200"
            }`}
            title="Read Aloud via Web Speech API"
          >
            {speaking ? <VolumeX className="w-3.5 h-3.5 text-white" /> : <Volume2 className="w-3.5 h-3.5" />}
            <span>{speaking ? "Stop Voice" : "Read Aloud"}</span>
          </button>

          <button
            onClick={copyToClipboard}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-lg bg-soil-100 dark:bg-agri-800 text-soil-700 dark:text-agri-200 border border-soil-200 dark:border-agri-700 hover:bg-soil-200 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? "Copied!" : "Copy Result"}</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Specialist Dossier & Probability Distribution */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Specialist Dossier */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-harvest-600 dark:text-harvest-400 font-semibold block mb-1">
              Recommended Agricultural Specialist
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-agri-950 dark:text-ivory flex items-center gap-2">
              <User className="w-6 h-6 text-agri-700 dark:text-agri-400" />
              {result.specialist.role}
            </h3>
            <div className="flex items-center gap-2 text-xs text-soil-600 dark:text-agri-300 mt-1">
              <Building2 className="w-3.5 h-3.5" />
              <span>{result.specialist.department}</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-soil-50 dark:bg-agri-950/60 border border-soil-200/60 dark:border-agri-800/60">
            <span className="text-[11px] font-mono uppercase tracking-wider text-soil-500 dark:text-agri-400 font-semibold block mb-1">
              Routing Rationale:
            </span>
            <p className="text-sm text-soil-700 dark:text-agri-200 leading-relaxed font-sans">
              {result.specialist.routing_rationale}
            </p>
          </div>

          {/* Key Intervention Tasks */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-soil-500 dark:text-agri-400 font-semibold mb-2">
              Assigned Specialist Responsibilities
            </h4>
            <ul className="space-y-2">
              {result.specialist.key_responsibilities.map((task, i) => (
                <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-soil-700 dark:text-agri-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-agri-600 dark:text-agri-400 mt-1.5 shrink-0" />
                  <span>{task}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* SLA & Channel */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-3.5 rounded-xl bg-soil-50 dark:bg-agri-950/60 border border-soil-200/60 dark:border-agri-800/60 flex items-center gap-3">
              <Clock className="w-5 h-5 text-harvest-600 dark:text-harvest-400 shrink-0" />
              <div>
                <div className="text-[10px] font-mono uppercase text-soil-500 dark:text-agri-400">Turnaround SLA</div>
                <div className="text-xs font-bold text-soil-800 dark:text-ivory mt-0.5">{result.specialist.turnaround_sla}</div>
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-soil-50 dark:bg-agri-950/60 border border-soil-200/60 dark:border-agri-800/60 flex items-center gap-3">
              <Phone className="w-5 h-5 text-agri-600 dark:text-agri-400 shrink-0" />
              <div>
                <div className="text-[10px] font-mono uppercase text-soil-500 dark:text-agri-400">Extension Channel</div>
                <div className="text-xs font-bold text-soil-800 dark:text-ivory mt-0.5 truncate">{result.specialist.contact_channel}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Calibrated Confidence Meter & Class Probabilities */}
        <div className="p-6 rounded-xl bg-soil-50/80 dark:bg-agri-950/70 border border-soil-200 dark:border-agri-800 flex flex-col justify-between">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-soil-500 dark:text-agri-400 font-semibold mb-3">
              Calibrated Confidence Score
            </div>
            
            {/* Confidence Number & Meter */}
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-4xl font-bold text-agri-900 dark:text-ivory">
                {(result.confidence * 100).toFixed(1)}%
              </span>
              <span className={`text-xs font-mono font-semibold ${
                result.confidence_level === "High" ? "text-emerald-600 dark:text-emerald-400" :
                result.confidence_level === "Moderate" ? "text-amber-600 dark:text-amber-400" : "text-red-600"
              }`}>
                {result.confidence_level} Confidence
              </span>
            </div>

            <div className="w-full bg-soil-200 dark:bg-agri-800 h-2.5 rounded-full overflow-hidden mt-3">
              <div
                className={`h-full transition-all duration-1000 ${
                  result.confidence >= 0.70 ? "bg-emerald-500" :
                  result.confidence >= 0.50 ? "bg-amber-500" : "bg-red-500"
                }`}
                style={{ width: `${Math.min(100, result.confidence * 100)}%` }}
              />
            </div>

            {/* Probability Breakdown across all 5 classes */}
            <div className="mt-8 space-y-3">
              <div className="text-[11px] font-mono uppercase tracking-wider text-soil-500 dark:text-agri-400 font-semibold">
                Class Probability Distribution
              </div>
              {Object.entries(result.class_probabilities || {}).map(([cat, prob]) => {
                const isWinner = cat === result.predicted_category;
                return (
                  <div key={cat} className="space-y-1">
                    <div className="flex justify-between text-xs font-mono">
                      <span className={isWinner ? "font-bold text-agri-800 dark:text-agri-200" : "text-soil-600 dark:text-agri-400"}>
                        {cat}
                      </span>
                      <span className={isWinner ? "font-bold text-agri-800 dark:text-agri-200" : "text-soil-500 dark:text-agri-500"}>
                        {(prob * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="w-full bg-soil-200/70 dark:bg-agri-800/60 h-1.5 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${isWinner ? "bg-agri-600 dark:bg-agri-400" : "bg-soil-400 dark:bg-agri-700"}`}
                        style={{ width: `${Math.min(100, prob * 100)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-soil-200 dark:border-agri-800/80 text-[10px] font-mono text-soil-400 dark:text-agri-500">
            Probabilities computed via Multinomial log-likelihoods over TF-IDF n-gram vectorizer.
          </div>
        </div>
      </div>

      {/* AI Explanation Card (Gemini / Domain Fallback) */}
      <div className="mt-8 p-6 rounded-xl bg-gradient-to-r from-soil-50 to-agri-50/40 dark:from-agri-950/80 dark:to-agri-900/60 border border-agri-200/60 dark:border-agri-800">
        <div className="flex items-center justify-between pb-3 border-b border-agri-200/40 dark:border-agri-800/60">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-agri-800 dark:text-agri-300 font-bold">
            <Sparkles className="w-4 h-4 text-harvest-500" />
            AI Rationale & Routing Context
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/80 dark:bg-agri-900 text-soil-600 dark:text-agri-300 border border-soil-200 dark:border-agri-700">
            {explanation ? explanation.source : "Loading..."}
          </span>
        </div>

        <div className="mt-3">
          {loadingExplanation ? (
            <div className="text-xs font-mono text-soil-500 dark:text-agri-400 animate-pulse">
              Synthesizing domain routing rationale...
            </div>
          ) : explanation ? (
            <div>
              <p className="text-sm text-soil-700 dark:text-agri-200 leading-relaxed font-sans">
                {explanation.explanation}
              </p>
              <div className="mt-2 text-[11px] font-mono text-soil-500 dark:text-agri-400 italic">
                {explanation.disclaimer}
              </div>
            </div>
          ) : (
            <p className="text-xs text-soil-500 dark:text-agri-400">
              The query was categorized based on vocabulary feature weighting and mapped to the relevant agricultural specialist.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
