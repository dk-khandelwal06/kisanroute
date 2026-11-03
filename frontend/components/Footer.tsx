"use client";

import React from "react";
import Link from "next/link";
import { Logo } from "./Logo";
import { Shield, Sparkles, BookOpen, ExternalLink, Cpu, GitBranch } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-soil-100/80 dark:bg-agri-950/90 border-t border-soil-200 dark:border-agri-800/60 pt-16 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-soil-200/80 dark:border-agri-800/40">
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-4">
            <Logo size="md" showTagline={true} />
            <p className="text-sm text-soil-600 dark:text-agri-300/80 leading-relaxed">
              Reading a farmer&apos;s question and knowing who should answer it — before a human has to.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-soil-200/60 dark:bg-agri-900/60 text-xs font-mono text-soil-700 dark:text-agri-300">
                <Cpu className="w-3 h-3 text-agri-600 dark:text-agri-400" />
                Scikit-Learn NLP v1.0
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-soil-500 dark:text-agri-400 font-semibold">
              Platform
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-soil-700 dark:text-agri-200 hover:text-agri-700 dark:hover:text-white transition-colors">
                  Home Overview
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="text-soil-700 dark:text-agri-200 hover:text-agri-700 dark:hover:text-white transition-colors">
                  NLP Pipeline Architecture
                </Link>
              </li>
              <li>
                <Link href="/intelligence-lab" className="text-soil-700 dark:text-agri-200 hover:text-agri-700 dark:hover:text-white transition-colors flex items-center gap-1.5">
                  <span>Intelligence Lab</span>
                  <span className="px-1.5 py-0.5 text-[10px] bg-harvest-100 text-harvest-800 dark:bg-harvest-900/60 dark:text-harvest-300 rounded font-mono font-medium">Live</span>
                </Link>
              </li>
              <li>
                <Link href="/insights" className="text-soil-700 dark:text-agri-200 hover:text-agri-700 dark:hover:text-white transition-colors">
                  Model Insights & Confusion Matrix
                </Link>
              </li>
            </ul>
          </div>

          {/* Agricultural Taxonomy */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-soil-500 dark:text-agri-400 font-semibold">
              Supported Domains
            </h4>
            <ul className="space-y-2 text-sm text-soil-700 dark:text-agri-200">
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Plant Protection
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                Agrometeorology & Weather
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                Government Schemes & Credit
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                Nutrient & Soil Management
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                Market Prices & Mandi Info
              </li>
            </ul>
          </div>

          {/* Ethics & Legal */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-soil-500 dark:text-agri-400 font-semibold">
              Transparency
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-soil-700 dark:text-agri-200 hover:text-agri-700 dark:hover:text-white transition-colors">
                  About & Data Provenance
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-soil-700 dark:text-agri-200 hover:text-agri-700 dark:hover:text-white transition-colors">
                  Privacy Policy & Data Safety
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-soil-700 dark:text-agri-200 hover:text-agri-700 dark:hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  <GitBranch className="w-3.5 h-3.5" />
                  GitHub Repository
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-soil-500 dark:text-agri-400/80">
          <p className="max-w-2xl leading-relaxed text-center md:text-left">
            <strong className="text-soil-700 dark:text-agri-200 font-medium">Educational Research Disclaimer:</strong> KisanRoute is an independent applied NLP research project. It demonstrates intelligent routing of agricultural questions to specialist domains based on the KisanRoute-AgriBench v1.0 benchmark dataset. Not affiliated with ICAR or the official Kisan Call Centre (KCC).
          </p>
          <div className="text-center md:text-right whitespace-nowrap">
            &copy; {new Date().getFullYear()} KisanRoute. Designed for Indian Agriculture.
          </div>
        </div>
      </div>
    </footer>
  );
}

