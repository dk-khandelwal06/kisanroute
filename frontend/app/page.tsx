import { HeroSection } from "../components/HeroSection";
import { AgricultureMotion } from "../components/AgricultureMotion";
import { ProblemSection } from "../components/ProblemSection";
import { PipelineAnimation } from "../components/PipelineAnimation";
import { AgriculturalWorld } from "../components/AgriculturalWorld";
import { CategoryExplorer } from "../components/CategoryExplorer";
import { QueryLab } from "../components/QueryLab";
import { RoutingNetwork } from "../components/RoutingNetwork";
import { AnalyticsDashboard } from "../components/AnalyticsDashboard";
import { ModelIntelligence } from "../components/ModelIntelligence";
import { TrustSecurity } from "../components/TrustSecurity";
import { CallToAction } from "../components/CallToAction";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* SECTION 01 — CINEMATIC HERO */}
      <HeroSection />

      {/* SECTION 02 — AGRICULTURE IN MOTION */}
      <AgricultureMotion />

      {/* SECTION 03 — THE PROBLEM */}
      <ProblemSection />

      {/* SECTION 04 — HOW KISANROUTE WORKS */}
      <PipelineAnimation />

      {/* SECTION 05 — THE AGRICULTURAL WORLD */}
      <AgriculturalWorld />

      {/* SECTION 06 — CATEGORY INTELLIGENCE */}
      <CategoryExplorer />

      {/* SECTION 07 & 08 — THE INTELLIGENCE LAB & PREDICTION RESULT */}
      <QueryLab />

      {/* SECTION 09 — INTELLIGENT ROUTING NETWORK */}
      <RoutingNetwork />

      {/* SECTION 10 — ANALYTICS AND INSIGHTS */}
      <AnalyticsDashboard />

      {/* SECTION 11 — MODEL INTELLIGENCE */}
      <ModelIntelligence />

      {/* SECTION 12 — TRUST, PRIVACY AND SECURITY */}
      <TrustSecurity />

      {/* SECTION 13 — FINAL CALL TO ACTION */}
      <CallToAction />
    </div>
  );
}
