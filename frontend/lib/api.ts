/**
 * KisanRoute API Client
 * Interfaces with the FastAPI backend for classification, routing, analytics, and explanations.
 */

export interface Specialist {
  role: string;
  title: string;
  department: string;
  badge_color: string;
  turnaround_sla: string;
  description: string;
  routing_rationale: string;
  key_responsibilities: string[];
  contact_channel: string;
}

export interface ModelInfo {
  name: string;
  version: string;
  vocabulary_size: number;
  latency_ms: number;
}

export interface PredictionResult {
  query: string;
  cleaned_query: string;
  predicted_category: string;
  confidence: number;
  confidence_level: "High" | "Moderate" | "Low";
  is_low_confidence: boolean;
  class_probabilities: Record<string, number>;
  specialist: Specialist;
  model_info: ModelInfo;
  processing_status: string;
}

export interface ModelAnalytics {
  dataset_metadata: {
    dataset_name: string;
    total_samples: number;
    train_samples: number;
    test_samples: number;
    categories: string[];
    class_distribution: Record<string, number>;
    provenance: string;
  };
  best_model: string;
  models_comparison: Record<
    string,
    {
      model_name: string;
      accuracy: number;
      macro_precision: number;
      macro_recall: number;
      macro_f1: number;
      cv_f1_mean: number;
      cv_f1_std: number;
      confusion_matrix: number[][];
      classification_report: Record<string, any>;
    }
  >;
  evaluation_summary: {
    model_name: string;
    accuracy: number;
    macro_precision: number;
    macro_recall: number;
    macro_f1: number;
    cv_f1_mean: number;
    cv_f1_std: number;
    confusion_matrix: number[][];
    classification_report: Record<string, any>;
  };
}

export interface ExplanationResult {
  source: string;
  explanation: string;
  disclaimer: string;
}

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

export async function fetchHealth(): Promise<{ status: string; model_loaded: boolean; version: string }> {
  try {
    const res = await fetch(`${API_BASE}/api/health`, { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    return { status: "OFFLINE", model_loaded: false, version: "1.0.0" };
  }
}

export async function fetchModelInfo(): Promise<any> {
  const res = await fetch(`${API_BASE}/api/model/info`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to load model info");
  return res.json();
}

export async function predictFarmerQuery(query: string): Promise<PredictionResult> {
  const res = await fetch(`${API_BASE}/api/predict`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.detail || `Prediction request failed (HTTP ${res.status})`);
  }

  return res.json();
}

export async function fetchAnalytics(): Promise<ModelAnalytics> {
  const res = await fetch(`${API_BASE}/api/analytics`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error("Failed to fetch model analytics");
  }
  return res.json();
}

export async function fetchExplanation(
  query: string,
  category: string,
  confidence: number,
  specialistRole: string
): Promise<ExplanationResult> {
  const res = await fetch(`${API_BASE}/api/explain`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query,
      predicted_category: category,
      confidence,
      specialist_role: specialistRole,
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to generate routing explanation");
  }
  return res.json();
}
