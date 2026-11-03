"""
KisanRoute Machine Learning Training & Evaluation Pipeline
Trains:
1. Majority-Class Baseline (DummyClassifier)
2. Multinomial Naive Bayes (TF-IDF + MultinomialNB)
3. Logistic Regression (TF-IDF + LogisticRegression)

Evaluates on a held-out test split (20%) using Stratified sampling.
Computes:
- Accuracy, Precision (Macro), Recall (Macro), Macro-F1
- Per-class precision, recall, f1-score
- Confusion matrix
- 5-Fold Stratified Cross-Validation scores
Serializes best pipeline and exports real evaluation metrics to JSON.
"""

import json
import os
import re
import joblib
import numpy as np
import pandas as pd
from sklearn.dummy import DummyClassifier
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import (
    accuracy_score,
    classification_report,
    confusion_matrix,
    f1_score,
    precision_score,
    recall_score,
)
from sklearn.model_selection import StratifiedKFold, cross_val_score, train_test_split
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import Pipeline

CATEGORIES = [
    "Government Schemes",
    "Market Information",
    "Nutrient Management",
    "Plant Protection",
    "Weather"
]

def preprocess_query(text: str) -> str:
    """
    Standardize farmer query text:
    - Lowercase
    - Retain alphanumeric characters, hyphens (e.g. PM-KISAN, e-NAM)
    - Normalize whitespace
    """
    if not isinstance(text, str):
        return ""
    text = text.lower().strip()
    # Normalize common abbreviations and clean noise
    text = re.sub(r"[^\w\s\-]", " ", text)
    text = re.sub(r"\s+", " ", text)
    return text.strip()

def run_training():
    dataset_path = os.path.join("datasets", "kisanroute_queries.csv")
    if not os.path.exists(dataset_path):
        raise FileNotFoundError(f"Dataset not found at {dataset_path}")
        
    df = pd.read_csv(dataset_path)
    print(f"Loaded {len(df)} samples from {dataset_path}")
    
    # Preprocess text
    df["clean_text"] = df["query_text"].apply(preprocess_query)
    
    X = df["clean_text"].values
    y = df["category"].values
    
    # Stratified 80/20 train/test split (no data leakage)
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.20, random_state=42, stratify=y
    )
    
    print(f"Train samples: {len(X_train)} | Test samples: {len(X_test)}")
    
    # Pipelines
    models = {
        "Majority-Class Baseline": Pipeline([
            ("tfidf", TfidfVectorizer(ngram_range=(1, 2), max_features=2500)),
            ("clf", DummyClassifier(strategy="most_frequent"))
        ]),
        "Multinomial Naive Bayes": Pipeline([
            ("tfidf", TfidfVectorizer(ngram_range=(1, 2), max_features=2500, sublinear_tf=True)),
            ("clf", MultinomialNB(alpha=0.3))
        ]),
        "Logistic Regression": Pipeline([
            ("tfidf", TfidfVectorizer(ngram_range=(1, 2), max_features=2500, sublinear_tf=True)),
            ("clf", LogisticRegression(C=1.5, max_iter=1000, random_state=42, solver="lbfgs"))
        ])
    }
    
    comparison_results = {}
    best_model_name = None
    best_f1 = -1.0
    best_pipeline = None
    
    skf = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
    
    for name, pipeline in models.items():
        print(f"\n--- Training {name} ---")
        # Fit on train set only
        pipeline.fit(X_train, y_train)
        
        # Predict on test set
        y_pred = pipeline.predict(X_test)
        
        # 5-fold CV score on training set
        cv_scores = cross_val_score(pipeline, X_train, y_train, cv=skf, scoring="f1_macro")
        
        acc = float(accuracy_score(y_test, y_pred))
        macro_prec = float(precision_score(y_test, y_pred, average="macro", zero_division=0))
        macro_rec = float(recall_score(y_test, y_pred, average="macro", zero_division=0))
        macro_f1 = float(f1_score(y_test, y_pred, average="macro", zero_division=0))
        
        cm = confusion_matrix(y_test, y_pred, labels=CATEGORIES).tolist()
        report = classification_report(y_test, y_pred, labels=CATEGORIES, output_dict=True, zero_division=0)
        
        comparison_results[name] = {
            "model_name": name,
            "accuracy": round(acc, 4),
            "macro_precision": round(macro_prec, 4),
            "macro_recall": round(macro_rec, 4),
            "macro_f1": round(macro_f1, 4),
            "cv_f1_mean": round(float(np.mean(cv_scores)), 4),
            "cv_f1_std": round(float(np.std(cv_scores)), 4),
            "confusion_matrix": cm,
            "classification_report": report
        }
        
        print(f"Test Accuracy: {acc:.4f} | Macro-F1: {macro_f1:.4f} | 5-Fold CV F1: {np.mean(cv_scores):.4f}")
        
        if macro_f1 > best_f1:
            best_f1 = macro_f1
            best_model_name = name
            best_pipeline = pipeline
            
    print(f"\nSelected Best Model: {best_model_name} (Macro-F1: {best_f1:.4f})")
    
    # Save best pipeline
    os.makedirs(os.path.join("ml", "models"), exist_ok=True)
    pipeline_path = os.path.join("ml", "models", "best_model_pipeline.joblib")
    joblib.dump(best_pipeline, pipeline_path)
    print(f"Saved best pipeline to: {pipeline_path}")
    
    # Also save vectorizer and classifier separately for diagnostic inspection
    vec_path = os.path.join("ml", "models", "tfidf_vectorizer.joblib")
    clf_path = os.path.join("ml", "models", "classifier.joblib")
    joblib.dump(best_pipeline.named_steps["tfidf"], vec_path)
    joblib.dump(best_pipeline.named_steps["clf"], clf_path)
    
    # Save full evaluation metrics JSON
    metrics_output = {
        "dataset_metadata": {
            "dataset_name": "KisanRoute-AgriBench v1.0",
            "total_samples": len(df),
            "train_samples": len(X_train),
            "test_samples": len(X_test),
            "categories": CATEGORIES,
            "class_distribution": df["category"].value_counts().to_dict(),
            "provenance": "Curated Indian Kisan Call Centre (KCC) inquiry archetypes & ICAR advisory domains."
        },
        "best_model": best_model_name,
        "models_comparison": comparison_results,
        "evaluation_summary": comparison_results[best_model_name]
    }
    
    metrics_path = os.path.join("ml", "evaluation_metrics.json")
    with open(metrics_path, "w", encoding="utf-8") as f:
        json.dump(metrics_output, f, indent=2)
    print(f"Saved evaluation metrics to: {metrics_path}")
    
    # Save model metadata
    metadata = {
        "model_name": best_model_name,
        "version": "1.0.0",
        "pipeline_components": ["TfidfVectorizer(ngram_range=(1,2))", str(best_pipeline.named_steps["clf"])],
        "categories": CATEGORIES,
        "vocabulary_size": len(best_pipeline.named_steps["tfidf"].vocabulary_),
        "test_accuracy": comparison_results[best_model_name]["accuracy"],
        "macro_f1": comparison_results[best_model_name]["macro_f1"],
        "date_trained": "2026-11-03"
    }
    metadata_path = os.path.join("ml", "model_metadata.json")
    with open(metadata_path, "w", encoding="utf-8") as f:
        json.dump(metadata, f, indent=2)
    print(f"Saved model metadata to: {metadata_path}")
    
    # Quick verification inference
    test_queries = [
        "My wheat leaves are turning yellow with rust spots",
        "Will there be heavy rain in Punjab this weekend?",
        "When is the next PM-KISAN installment credit date?",
        "How much urea and DAP should I apply to paddy per acre?",
        "What is the current mandi bhav of mustard in Bharatpur?"
    ]
    print("\n--- Model Verification Samples ---")
    for q in test_queries:
        clean_q = preprocess_query(q)
        pred = best_pipeline.predict([clean_q])[0]
        if hasattr(best_pipeline, "predict_proba"):
            probs = best_pipeline.predict_proba([clean_q])[0]
            conf = float(np.max(probs))
        else:
            conf = 1.0
        print(f"Query: '{q}'\n  -> Predicted: {pred} (Confidence: {conf*100:.1f}%)")

if __name__ == "__main__":
    run_training()
