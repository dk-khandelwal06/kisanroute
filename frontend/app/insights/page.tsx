import React from "react";
import { AnalyticsDashboard } from "../../components/AnalyticsDashboard";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Model Insights & Analytics — KisanRoute",
  description: "Comprehensive model evaluation metrics, 5x5 confusion matrix, and model comparison across Baseline, Logistic Regression, and Naive Bayes.",
};

export default function InsightsPage() {
  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-soil-500 dark:text-agri-400 hover:text-agri-700 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </Link>
      </div>
      <AnalyticsDashboard />
    </div>
  );
}

