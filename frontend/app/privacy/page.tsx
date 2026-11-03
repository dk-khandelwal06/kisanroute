import React from "react";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, EyeOff, Lock, Server } from "lucide-react";

export const metadata = {
  title: "Privacy & Data Safety — KisanRoute",
  description: "Data handling policies, zero-PII architecture, rate limiting, and ethical boundaries of KisanRoute.",
};

export default function PrivacyPage() {
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
            LEGAL & DATA GOVERNANCE
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-agri-950 dark:text-ivory mt-2">
            Privacy Policy & Data Safety Architecture
          </h1>
          <p className="mt-4 text-base sm:text-lg text-soil-600 dark:text-agri-300 leading-relaxed font-sans">
            Our strict commitment to zero personal farmer data harvesting, ephemeral query analysis, and algorithmic transparency.
          </p>
        </div>

        {/* Policy Content */}
        <div className="mt-10 space-y-10 text-sm sm:text-base text-soil-700 dark:text-agri-200 leading-relaxed font-sans">
          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-bold text-agri-950 dark:text-ivory flex items-center gap-2">
              <EyeOff className="w-5 h-5 text-agri-600 dark:text-agri-400" />
              1. Zero Personally Identifiable Information (PII)
            </h2>
            <p>
              KisanRoute operates on a strict zero-PII architectural mandate. We do not require, ask for, collect, store, or transmit:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-soil-600 dark:text-agri-300">
              <li>Farmer full names, nicknames, or family relationships</li>
              <li>Aadhaar numbers or national identity documentation</li>
              <li>Mobile telephone numbers or SIM card identities</li>
              <li>Bank account numbers, IFSC codes, or Kisan Credit Card ledger accounts</li>
              <li>GPS coordinates or precise cadastral land parcel identifiers</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-bold text-agri-950 dark:text-ivory flex items-center gap-2">
              <Server className="w-5 h-5 text-agri-600 dark:text-agri-400" />
              2. Ephemeral Query Processing
            </h2>
            <p>
              Agricultural questions submitted through the Intelligence Lab are ingested in-memory, cleaned, vectorised, and evaluated against the machine learning classification pipeline. The query text is never stored in a persistent database or user-profiling warehouse.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-bold text-agri-950 dark:text-ivory flex items-center gap-2">
              <Lock className="w-5 h-5 text-agri-600 dark:text-agri-400" />
              3. Server-Side Secret Isolation
            </h2>
            <p>
              All external artificial intelligence calls (such as optional Gemini API explanations) are initiated solely from server-side FastAPI workers. Client browser bundles contain zero API keys, service role credentials, or private secrets.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-bold text-agri-950 dark:text-ivory flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-agri-600 dark:text-agri-400" />
              4. Rate Limiting & Denial of Service Protection
            </h2>
            <p>
              To safeguard extension bandwidth, automated scrapers and high-volume scripts are throttled at 60 requests per minute per IP address. Submissions exceeding this threshold receive an HTTP 429 rate-limited response with automated recovery after 60 seconds.
            </p>
          </section>

          <section className="space-y-3 pt-6 border-t border-soil-200 dark:border-agri-800 text-xs font-mono text-soil-500 dark:text-agri-400">
            <div>Last Updated: November 2026 &bull; Project 006 Security Specification</div>
            <div>For governance inquiries, refer to the open-source repository documentation.</div>
          </section>
        </div>
      </div>
    </div>
  );
}
