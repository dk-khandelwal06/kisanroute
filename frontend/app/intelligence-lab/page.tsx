import React from "react";
import { QueryLab } from "../../components/QueryLab";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Intelligence Lab — KisanRoute Query Classification Workbench",
  description: "Live interactive agricultural query classification laboratory powered by trained Scikit-learn pipelines.",
};

export default function IntelligenceLabPage() {
  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-soil-500 dark:text-agri-400 hover:text-agri-700 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </Link>
      </div>
      <QueryLab />
    </div>
  );
}

