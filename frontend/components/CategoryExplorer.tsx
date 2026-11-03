"use client";

import React, { useState } from "react";
import { Bug, CloudSun, FileSpreadsheet, FlaskConical, TrendingUp, CheckCircle, ArrowRight, UserCheck } from "lucide-react";

interface CategoryData {
  id: string;
  name: string;
  tag: string;
  icon: React.ElementType;
  color: string;
  badgeBg: string;
  description: string;
  whyItMatters: string;
  exampleQuery: string;
  specialist: {
    role: string;
    department: string;
    sla: string;
  };
  metrics: {
    precision: string;
    recall: string;
    f1Score: string;
  };
}

export function CategoryExplorer() {
  const categories: CategoryData[] = [
    {
      id: "plant-protection",
      name: "Plant Protection",
      tag: "Entomology & Pathology",
      icon: Bug,
      color: "emerald",
      badgeBg: "bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800",
      description: "Diagnosis and remediation of insect pest infestations, fungal rusts, bacterial blights, nematodes, and viral mosaics. Focuses on IPM thresholds and registered chemical/biological control schedules.",
      whyItMatters: "Uncontrolled pests and disease blights can eradicate 40-70% of crop yield within 72 hours if pesticide or biological interventions are misapplied or delayed.",
      exampleQuery: "\"My wheat leaves are turning yellow with brown powdery spots. What spray should I use?\"",
      specialist: {
        role: "Crop Protection & Pathology Specialist",
        department: "Division of Plant Protection & IPM Clinic",
        sla: "2-4 Hours (High Urgency)",
      },
      metrics: {
        precision: "82.4%",
        recall: "100.0%",
        f1Score: "90.3%",
      },
    },
    {
      id: "weather",
      name: "Weather",
      tag: "Agricultural Meteorology",
      icon: CloudSun,
      color: "sky",
      badgeBg: "bg-sky-50 text-sky-800 dark:bg-sky-950/60 dark:text-sky-300 border-sky-300 dark:border-sky-800",
      description: "Localized agromet advisory bulletins covering multi-day block rainfall forecasts, unseasonal precipitation, frost (paala) alerts, hailstorm advisories, and terminal heat stress.",
      whyItMatters: "Weather dictates irrigation schedules, sowing dates, chemical spraying windows, and post-harvest drying on the threshing floor.",
      exampleQuery: "\"Severe frost warning predicted tonight. How to protect mustard crop from cold injury?\"",
      specialist: {
        role: "Agricultural Meteorology Specialist",
        department: "Agromet Advisory Field Unit (AMFU) / IMD",
        sla: "1-2 Hours (Immediate Advisory)",
      },
      metrics: {
        precision: "86.7%",
        recall: "92.9%",
        f1Score: "89.7%",
      },
    },
    {
      id: "government-schemes",
      name: "Government Schemes",
      tag: "Subsidies & Rural Credit",
      icon: FileSpreadsheet,
      color: "amber",
      badgeBg: "bg-amber-50 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border-amber-300 dark:border-amber-800",
      description: "Statutory agricultural welfare schemes: PM-KISAN installment verification, PMFBY crop insurance claim filing within 72 hours, Kisan Credit Card (KCC) interest subvention, and PM-KUSUM solar pumps.",
      whyItMatters: "Ensures smallholder farmers access financial entitlements, claim payouts for climate distress, and subsidized modern mechanization without predatory lending.",
      exampleQuery: "\"How to file crop damage claim under Pradhan Mantri Fasal Bima Yojana (PMFBY)?\"",
      specialist: {
        role: "Rural Scheme & Credit Liaison Officer",
        department: "District Agriculture Extension & Direct Benefit Cell",
        sla: "24-48 Hours",
      },
      metrics: {
        precision: "100.0%",
        recall: "100.0%",
        f1Score: "100.0%",
      },
    },
    {
      id: "nutrient-management",
      name: "Nutrient Management",
      tag: "Soil Science & Agronomy",
      icon: FlaskConical,
      color: "teal",
      badgeBg: "bg-teal-50 text-teal-800 dark:bg-teal-950/60 dark:text-teal-300 border-teal-300 dark:border-teal-800",
      description: "Soil fertility testing, Soil Health Card parameter interpretation, balanced NPK split applications, zinc deficiency (khaira disease), gypsum reclamation of sodic soils, and organic green manuring.",
      whyItMatters: "Excessive or unbalanced urea application causes lodging and soil degradation, while targeted micronutrient application unlocks 20-30% higher nutrient use efficiency.",
      exampleQuery: "\"What is the recommended NPK fertilizer dose per acre for Timely Sown Irrigated Wheat?\"",
      specialist: {
        role: "Agronomist & Soil Health Specialist",
        department: "Division of Soil Science & Agricultural Chemistry",
        sla: "4-8 Hours",
      },
      metrics: {
        precision: "90.9%",
        recall: "71.4%",
        f1Score: "80.0%",
      },
    },
    {
      id: "market-information",
      name: "Market Information",
      tag: "APMC Mandis & MSP",
      icon: TrendingUp,
      color: "indigo",
      badgeBg: "bg-indigo-50 text-indigo-800 dark:bg-indigo-950/60 dark:text-indigo-300 border-indigo-300 dark:border-indigo-800",
      description: "Real-time APMC wholesale mandi modal rates, arrival quantities, Minimum Support Price (MSP) central procurement notifications, e-NAM digital trading, and warehouse receipt financing.",
      whyItMatters: "Price discovery allows growers to choose between immediate mandi selling, holding produce in WDRA accredited warehouses, or selling at government MSP procurement centers.",
      exampleQuery: "\"What is today wholesale market price of Sharbati wheat in Khanna and Indore mandi?\"",
      specialist: {
        role: "Agricultural Marketing & Mandi Analyst",
        department: "Directorate of Marketing & Inspection (Agmarknet & e-NAM)",
        sla: "2-4 Hours",
      },
      metrics: {
        precision: "100.0%",
        recall: "92.9%",
        f1Score: "96.3%",
      },
    },
  ];

  const [selectedCatId, setSelectedCatId] = useState<string>("plant-protection");
  const selectedCat = categories.find((c) => c.id === selectedCatId) || categories[0];
  const IconComponent = selectedCat.icon;

  return (
    <section id="categories" className="py-24 bg-soil-50/50 dark:bg-agri-950/60 transition-colors relative border-y border-soil-200/60 dark:border-agri-800/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="text-xs font-mono uppercase tracking-widest text-harvest-600 dark:text-harvest-400 font-semibold mb-2">
            SECTION 06 &bull; CATEGORY INTELLIGENCE
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-agri-950 dark:text-ivory">
            The 5 Agricultural Knowledge Disciplines
          </h2>
          <p className="mt-4 text-base sm:text-lg text-soil-600 dark:text-agri-300 leading-relaxed font-sans">
            Every farmer question maps to one of five rigorously trained taxonomy classes. Select a category below to inspect its domain scope, example inquiries, and assigned specialist.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
          {categories.map((cat) => {
            const CatIcon = cat.icon;
            const isSelected = cat.id === selectedCatId;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCatId(cat.id)}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all duration-200 border ${
                  isSelected
                    ? "bg-agri-700 text-white dark:bg-agri-600 border-agri-800 shadow-sm scale-105"
                    : "bg-white dark:bg-agri-900/60 text-soil-700 dark:text-agri-200 border-soil-200 dark:border-agri-800 hover:border-agri-400"
                }`}
              >
                <CatIcon className="w-4 h-4" />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Category Detail Dossier */}
        <div className="mt-10 rounded-2xl bg-white dark:bg-agri-900/80 border border-soil-200 dark:border-agri-800/80 p-8 shadow-sm transition-all duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left 2 Cols: Description, Example Query, and Why It Matters */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-agri-100 dark:bg-agri-800 text-agri-700 dark:text-agri-200">
                  <IconComponent className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-mono uppercase text-harvest-600 dark:text-harvest-400 font-bold">
                    {selectedCat.tag}
                  </span>
                  <h3 className="font-serif text-3xl font-bold text-agri-950 dark:text-ivory">
                    {selectedCat.name}
                  </h3>
                </div>
              </div>

              <p className="text-sm sm:text-base text-soil-700 dark:text-agri-200 leading-relaxed font-sans">
                {selectedCat.description}
              </p>

              {/* Example Question Pill */}
              <div className="p-4 rounded-xl bg-soil-50 dark:bg-agri-950/70 border border-soil-200/80 dark:border-agri-800">
                <span className="text-[11px] font-mono uppercase tracking-wider text-soil-500 dark:text-agri-400 font-semibold block mb-1">
                  Representative Farmer Inquiry:
                </span>
                <p className="font-serif italic text-sm text-soil-900 dark:text-ivory">
                  {selectedCat.exampleQuery}
                </p>
              </div>

              {/* Why It Matters */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-soil-500 dark:text-agri-400 font-semibold mb-1">
                  Agronomic Significance
                </h4>
                <p className="text-sm text-soil-600 dark:text-agri-300/90 leading-relaxed font-sans">
                  {selectedCat.whyItMatters}
                </p>
              </div>
            </div>

            {/* Right Col: Specialist Dossier & Performance Metrics */}
            <div className="p-6 rounded-xl bg-soil-50/80 dark:bg-agri-950/60 border border-soil-200 dark:border-agri-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-soil-200 dark:border-agri-800">
                  <span className="text-xs font-mono uppercase tracking-wider text-soil-500 dark:text-agri-400 font-semibold">
                    Assigned Specialist
                  </span>
                  <UserCheck className="w-4 h-4 text-agri-600 dark:text-agri-400" />
                </div>

                <div className="mt-4">
                  <div className="font-serif text-lg font-bold text-agri-900 dark:text-ivory leading-snug">
                    {selectedCat.specialist.role}
                  </div>
                  <div className="text-xs text-soil-600 dark:text-agri-300/80 mt-1">
                    {selectedCat.specialist.department}
                  </div>
                  <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white dark:bg-agri-900 text-xs font-mono text-agri-700 dark:text-agri-300 border border-soil-200 dark:border-agri-800">
                    SLA: {selectedCat.specialist.sla}
                  </div>
                </div>
              </div>

              {/* Verified Metrics for this class */}
              <div className="mt-6 pt-4 border-t border-soil-200 dark:border-agri-800">
                <div className="text-[11px] font-mono uppercase tracking-wider text-soil-500 dark:text-agri-400 font-semibold mb-3">
                  Verified Test Metrics (Scikit-Learn)
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2 rounded bg-white dark:bg-agri-900 border border-soil-200/60 dark:border-agri-800/60">
                    <div className="text-xs font-mono text-soil-500 dark:text-agri-400">Precision</div>
                    <div className="text-sm font-bold font-mono text-agri-800 dark:text-agri-300 mt-0.5">
                      {selectedCat.metrics.precision}
                    </div>
                  </div>
                  <div className="p-2 rounded bg-white dark:bg-agri-900 border border-soil-200/60 dark:border-agri-800/60">
                    <div className="text-xs font-mono text-soil-500 dark:text-agri-400">Recall</div>
                    <div className="text-sm font-bold font-mono text-agri-800 dark:text-agri-300 mt-0.5">
                      {selectedCat.metrics.recall}
                    </div>
                  </div>
                  <div className="p-2 rounded bg-white dark:bg-agri-900 border border-soil-200/60 dark:border-agri-800/60">
                    <div className="text-xs font-mono text-soil-500 dark:text-agri-400">F1-Score</div>
                    <div className="text-sm font-bold font-mono text-agri-800 dark:text-agri-300 mt-0.5">
                      {selectedCat.metrics.f1Score}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

