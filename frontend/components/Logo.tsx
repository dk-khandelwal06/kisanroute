"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  showTagline?: boolean;
}

export function Logo({ className = "", size = "md", showTagline = false }: LogoProps) {
  const iconSizes = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  };

  const textSizes = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  };

  return (
    <Link href="/" className={`group flex items-center gap-3 ${className}`}>
      {/* Custom Emblem: Leaf + Agricultural Furrow Lines + Routing Nodes */}
      <div className={`relative flex items-center justify-center rounded-xl bg-gradient-to-br from-agri-600 to-agri-800 p-2 text-white shadow-md transition-all duration-300 group-hover:shadow-agri-600/30 group-hover:scale-105 ${iconSizes[size]}`}>
        <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          {/* Leaf outline */}
          <path
            d="M6 30C6 30 10 18 24 10C24 10 28 20 20 28C14 34 6 30 6 30Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Agricultural Field Furrow Lines */}
          <path
            d="M10 26C13 23 18 19 23 13"
            stroke="#D4A373"
            strokeWidth="1.75"
            strokeLinecap="round"
          />
          <path
            d="M14 28C16 26 20 23 23 20"
            stroke="#D4A373"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray="2 2"
          />
          {/* Routing Network Nodes */}
          <circle cx="24" cy="10" r="3" fill="#D4A373" />
          <circle cx="10" cy="26" r="2" fill="#52B788" />
          <circle cx="20" cy="28" r="2" fill="#52B788" />
          <circle cx="30" cy="8" r="2" fill="#E0A96D" />
          {/* Routing Connector */}
          <path
            d="M24 10L30 8"
            stroke="#E0A96D"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="flex flex-col">
        <div className={`font-serif font-bold tracking-tight text-agri-900 dark:text-ivory ${textSizes[size]}`}>
          <span className="text-agri-700 dark:text-agri-400">Kisan</span>
          <span className="text-harvest-600 dark:text-harvest-400 font-sans tracking-wide">Route</span>
        </div>
        {showTagline && (
          <span className="text-[10px] uppercase tracking-widest text-soil-500 dark:text-agri-300/70 font-mono">
            Agricultural Intelligence
          </span>
        )}
      </div>
    </Link>
  );
}
