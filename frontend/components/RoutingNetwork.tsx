"use client";

import React, { useState } from "react";
import { GitFork, ArrowRight, UserCheck, Shield, Sparkles, Building, Clock } from "lucide-react";

interface NodeLink {
  sourceCategory: string;
  specialistRole: string;
  department: string;
  sla: string;
  badgeColor: string;
  queriesHandled: string[];
}

export function RoutingNetwork() {
  const [activeDomain, setActiveDomain] = useState<string>("Plant Protection");

  const routingMap: NodeLink[] = [
    {
      sourceCategory: "Plant Protection",
      specialistRole: "Crop Protection & Pathology Specialist",
      department: "Division of Plant Pathology & Extension Entomology",
      sla: "2-4 Hours",
      badgeColor: "emerald",
      queriesHandled: [
        "Fungal leaf rust, powdery mildew, and blight symptoms",
        "Stem borer, leaf folder, and caterpillar infestations",
        "Pesticide spray timing and pre-harvest intervals",
        "Integrated Pest Management (IPM) bio-control thresholds",
      ],
    },
    {
      sourceCategory: "Weather",
      specialistRole: "Agricultural Meteorology Specialist",
      department: "Agromet Advisory Field Unit (AMFU) / IMD Agromet",
      sla: "1-2 Hours",
      badgeColor: "sky",
      queriesHandled: [
        "Multi-day rainfall and monsoon arrival forecasts",
        "Frost (paala) protection through night irrigation",
        "Hailstorm and terminal heat stress mitigation",
        "Spraying window guidance relative to precipitation",
      ],
    },
    {
      sourceCategory: "Government Schemes",
      specialistRole: "Rural Scheme & Credit Liaison Officer",
      department: "District Agriculture Office & DBT Welfare Cell",
      sla: "24-48 Hours",
      badgeColor: "amber",
      queriesHandled: [
        "PM-KISAN installment verification and eKYC rectification",
        "PMFBY crop insurance 72-hour localized damage claims",
        "Kisan Credit Card (KCC) interest subvention limits",
        "PM-KUSUM solar pump and farm mechanization subsidies",
      ],
    },
    {
      sourceCategory: "Nutrient Management",
      specialistRole: "Agronomist & Soil Health Specialist",
      department: "Division of Soil Science & Agricultural Chemistry",
      sla: "4-8 Hours",
      badgeColor: "teal",
      queriesHandled: [
        "Soil Health Card NPK parameter interpretation",
        "Split application dosing for Urea, DAP, and Potash",
        "Zinc deficiency (khaira disease) and micronutrient sprays",
        "Gypsum soil reclamation for alkaline/sodic farmlands",
      ],
    },
    {
      sourceCategory: "Market Information",
      specialistRole: "Agricultural Marketing & Mandi Analyst",
      department: "Directorate of Marketing & Inspection (Agmarknet & e-NAM)",
      sla: "2-4 Hours",
      badgeColor: "indigo",
      queriesHandled: [
        "Daily modal mandi prices across APMC market yards",
        "Minimum Support Price (MSP) central procurement centers",
        "e-NAM digital auction registration and quality testing",
        "Warehouse receipt financing and cold storage rental norms",
      ],
    },
  ];

  const currentRouting = routingMap.find((r) => r.sourceCategory === activeDomain) || routingMap[0];

  return (
    <section className="py-24 bg-soil-50/50 dark:bg-agri-950/60 transition-colors relative border-y border-soil-200/60 dark:border-agri-800/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="text-xs font-mono uppercase tracking-widest text-harvest-600 dark:text-harvest-400 font-semibold mb-2">
            SECTION 09 &bull; INTELLIGENT ROUTING TOPOLOGY
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-agri-950 dark:text-ivory">
            The Multi-Domain Routing Network
          </h2>
          <p className="mt-4 text-base sm:text-lg text-soil-600 dark:text-agri-300 leading-relaxed font-sans">
            How classification outputs are deterministically matched with specialized agronomic extension disciplines across the country.
          </p>
        </div>

        {/* Visual Network Architecture Graph */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: 5 Ingestion Domains */}
          <div className="lg:col-span-4 space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-soil-500 dark:text-agri-400 font-bold mb-2">
              Classified Query Domains
            </div>
            {routingMap.map((node) => {
              const isSelected = node.sourceCategory === activeDomain;
              return (
                <button
                  key={node.sourceCategory}
                  onClick={() => setActiveDomain(node.sourceCategory)}
                  className={`w-full p-4 rounded-xl text-left transition-all duration-200 border flex items-center justify-between ${
                    isSelected
                      ? "bg-agri-700 text-white dark:bg-agri-600 border-agri-800 shadow-md translate-x-2"
                      : "bg-white dark:bg-agri-900/60 text-soil-800 dark:text-agri-200 border-soil-200 dark:border-agri-800 hover:border-agri-400"
                  }`}
                >
                  <div>
                    <div className="font-serif font-bold text-sm">{node.sourceCategory}</div>
                    <div className={`text-[11px] font-mono mt-0.5 ${isSelected ? "text-agri-100" : "text-soil-500 dark:text-agri-400"}`}>
                      SLA: {node.sla}
                    </div>
                  </div>
                  <ArrowRight className={`w-4 h-4 ${isSelected ? "text-harvest-300" : "text-soil-400"}`} />
                </button>
              );
            })}
          </div>

          {/* Center Column: Connecting Vector Node */}
          <div className="lg:col-span-2 flex flex-col items-center justify-center py-6">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-agri-600 to-agri-800 text-white flex items-center justify-center shadow-lg transform rotate-45">
              <GitFork className="w-6 h-6 -rotate-45 text-harvest-300" />
            </div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-soil-500 dark:text-agri-400 mt-4 text-center font-bold">
              Autonomous Dispatch Logic
            </span>
          </div>

          {/* Right Column: Active Specialist Target Dossier */}
          <div className="lg:col-span-6 rounded-2xl bg-white dark:bg-agri-900/80 border border-soil-200 dark:border-agri-800 p-8 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-soil-100 dark:border-agri-800">
              <span className="text-xs font-mono uppercase text-harvest-600 dark:text-harvest-400 font-bold">
                Assigned Specialist Target
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-agri-100 dark:bg-agri-800 text-xs font-mono text-agri-800 dark:text-agri-300">
                <Clock className="w-3 h-3" />
                SLA: {currentRouting.sla}
              </span>
            </div>

            <div className="mt-6">
              <h3 className="font-serif text-2xl font-bold text-agri-950 dark:text-ivory">
                {currentRouting.specialistRole}
              </h3>
              <div className="flex items-center gap-2 text-xs text-soil-600 dark:text-agri-300 mt-1">
                <Building className="w-4 h-4" />
                <span>{currentRouting.department}</span>
              </div>
            </div>

            <div className="mt-6 space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-soil-500 dark:text-agri-400 font-semibold block">
                Typical Inquiries Handled Under This Route:
              </span>
              <div className="space-y-2">
                {currentRouting.queriesHandled.map((q, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-soil-50 dark:bg-agri-950/60 border border-soil-200/50 dark:border-agri-800/50 text-xs text-soil-700 dark:text-agri-200 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-agri-600 mt-1.5 shrink-0" />
                    <span>{q}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-soil-100 dark:border-agri-800 text-[11px] font-mono text-soil-500 dark:text-agri-400 leading-relaxed">
              <strong>Transparent Operational Notice:</strong> Recommended routing identifies the correct scientific extension desk. It does not initiate an unconfirmed governmental field dispatch.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

