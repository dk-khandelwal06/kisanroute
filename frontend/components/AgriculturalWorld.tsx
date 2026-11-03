"use client";

import React from "react";
import Image from "next/image";
import { Sparkles, Eye } from "lucide-react";

export function AgriculturalWorld() {
  const visualGallery = [
    {
      title: "Wheat Fields & Rust Monitoring",
      location: "Indo-Gangetic Plains & Punjab",
      category: "Plant Protection & Pathology",
      image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=80",
      description: "Detecting yellow rust (Puccinia striiformis) and spot blotch early safeguards staple wheat harvests.",
      colSpan: "lg:col-span-2",
    },
    {
      title: "Precision Micro-Irrigation & Fertigation",
      location: "Deccan Plateau & Western Maharashtra",
      category: "Water & Nutrient Management",
      image: "https://images.unsplash.com/photo-1560493676-04071c5f467b?auto=format&fit=crop&w=800&q=80",
      description: "Drip lateral emitter calibration and water-soluble fertilizer schedules for high-value horticulture.",
      colSpan: "lg:col-span-1",
    },
    {
      title: "Kharif Paddy Panicle Health",
      location: "Cauvery & Godavari River Deltas",
      category: "Agronomy & Blast Prevention",
      image: "https://images.unsplash.com/photo-1530507629858-e4977d30e9e0?auto=format&fit=crop&w=800&q=80",
      description: "Monitoring stem borer dead hearts, sheath blight, and leaf folder during tillering stages.",
      colSpan: "lg:col-span-1",
    },
    {
      title: "APMC Mandi Auction & Price Discovery",
      location: "Regulated Markets Across Gujarat & MP",
      category: "Market Information & MSP",
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80",
      description: "Modal price transparency, e-NAM electronic trade settlement, and warehouse receipt pledge financing.",
      colSpan: "lg:col-span-2",
    },
  ];

  return (
    <section className="py-24 bg-ivory dark:bg-agri-950 transition-colors relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-soil-200 dark:border-agri-800">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-harvest-600 dark:text-harvest-400 font-semibold mb-2">
              SECTION 05 &bull; THE AGRICULTURAL WORLD
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-agri-950 dark:text-ivory">
              Across Indian Agro-Climatic Landscapes
            </h2>
          </div>
          <p className="max-w-md text-sm text-soil-600 dark:text-agri-300 leading-relaxed font-sans">
            Every region presents distinct soil chemistry, pest pressures, and market dynamics. KisanRoute models these contextual variations through specialized domain routing.
          </p>
        </div>

        {/* Editorial Asymmetrical Grid */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {visualGallery.map((item, idx) => (
            <div
              key={item.title}
              className={`group relative rounded-2xl overflow-hidden min-h-[380px] bg-soil-200 dark:bg-agri-900 border border-soil-200/80 dark:border-agri-800/80 shadow-sm flex flex-col justify-end p-6 transition-all duration-500 hover:shadow-xl ${item.colSpan}`}
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                style={{ backgroundImage: `url('${item.image}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

              {/* Top Tag */}
              <div className="absolute top-6 left-6 z-10 flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-white/90 dark:bg-agri-950/90 backdrop-blur-md text-[11px] font-mono font-semibold text-agri-800 dark:text-agri-200">
                  {item.category}
                </span>
              </div>

              {/* Content */}
              <div className="relative z-10 text-white">
                <span className="text-xs font-mono uppercase tracking-wider text-harvest-300 font-medium">
                  {item.location}
                </span>
                <h3 className="font-serif text-2xl font-bold mt-1 text-white group-hover:text-harvest-200 transition-colors">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-white/80 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

