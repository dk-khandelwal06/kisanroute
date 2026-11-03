"use client";

import React from "react";
import Image from "next/image";
import { Wheat, CloudRain, Landmark, Sprout, TrendingUp, Compass } from "lucide-react";

export function AgricultureMotion() {
  const narrativeCards = [
    {
      step: "01",
      title: "The Scale of Indian Agriculture",
      description: "Over 140 million agricultural households manage more than 150 million hectares of cultivated land across 15 distinct agro-climatic zones.",
      stat: "140M+",
      label: "Farming Families",
      icon: Wheat,
      image: "https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=1000&q=80",
    },
    {
      step: "02",
      title: "The Velocity of Agronomic Risk",
      description: "A sudden pest outbreak, unseasonal frost, or fertilizer deficiency can alter harvest yields by 30-60% within 48 critical hours.",
      stat: "48 Hrs",
      label: "Critical Decision Window",
      icon: Sprout,
      image: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=1000&q=80",
    },
    {
      step: "03",
      title: "The Routing Bottleneck",
      description: "When farmers ask questions, manual triage operator queues cause routing delays. Machine intelligence can direct the query to the exact specialist instantly.",
      stat: "Instant",
      label: "Autonomous Classification",
      icon: Compass,
      image: "https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=1000&q=80",
    },
  ];

  return (
    <section id="motion-story" className="py-24 bg-soil-50/50 dark:bg-agri-950/60 relative overflow-hidden transition-colors border-y border-soil-200/60 dark:border-agri-800/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="text-xs font-mono uppercase tracking-widest text-harvest-600 dark:text-harvest-400 font-semibold mb-2">
            SECTION 02 &bull; AGRICULTURE IN MOTION
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-agri-950 dark:text-ivory">
            The Living Pulse of Indian Agriculture
          </h2>
          <p className="mt-4 text-base sm:text-lg text-soil-600 dark:text-agri-300 leading-relaxed font-sans">
            Indian agriculture is not uniform. A wheat grower in Punjab faces terminal heat stress, while a cotton farmer in Telangana combats pink bollworm. Every inquiry carries urgency, micro-climate context, and livelihoods.
          </p>
        </div>

        {/* Editorial Storytelling Grid */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {narrativeCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={card.step}
                className="group relative rounded-2xl overflow-hidden bg-white dark:bg-agri-900/60 border border-soil-200 dark:border-agri-800/80 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col justify-between"
              >
                {/* Visual Header */}
                <div className="relative h-60 w-full overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url('${card.image}')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  
                  {/* Step Pill */}
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 dark:bg-agri-900/90 backdrop-blur-sm text-xs font-mono font-bold text-agri-800 dark:text-agri-200">
                    PHASE {card.step}
                  </div>

                  {/* Floating Metric */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">
                    <div>
                      <div className="text-3xl font-serif font-bold text-harvest-300">{card.stat}</div>
                      <div className="text-xs font-mono uppercase tracking-wider text-white/80">{card.label}</div>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-agri-700/80 backdrop-blur-sm flex items-center justify-center text-white">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                {/* Narrative Body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-agri-950 dark:text-ivory group-hover:text-agri-700 dark:group-hover:text-agri-300 transition-colors">
                      {card.title}
                    </h3>
                    <p className="mt-3 text-sm text-soil-600 dark:text-agri-300/80 leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-soil-100 dark:border-agri-800/50 flex items-center justify-between text-xs font-mono text-soil-500 dark:text-agri-400">
                    <span>AGRONOMIC CONTINUUM</span>
                    <span className="text-agri-600 dark:text-agri-300 font-bold">&rarr;</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

