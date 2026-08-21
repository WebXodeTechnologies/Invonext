import React from "react";
import HeroSection from "./components/landing/HeroSection";
import InteractiveTaxDemo from "./components/landing/InteractiveTaxDemo";
import BentoFeatures from "./components/landing/BentoFeatures";
import AboutCompliance from "./components/landing/AboutCompliance";
import WorkflowKanbanPreview from "./components/landing/WorkflowKanbanPreview";
import CTASection from "./components/landing/CTASection";
import Navbar from "./components/landing/Navbar";
import Footer from "./components/landing/Footer";

export const metadata = {
  title: "InvoNxt — SME Billing, GST Compliance & Agile Workflows",
  description:
    "Explore the internal billing suite for Indian SMEs: automated CGST/SGST splits, interstate IGST compliance, zero-rated foreign exports, and Kanban task tracking.",
};

export default function LandingPage() {
  return (
    <main className="space-y-4">
      <Navbar />
      <HeroSection />
      <InteractiveTaxDemo />
      <BentoFeatures />
      <AboutCompliance />
      <WorkflowKanbanPreview />
      <CTASection />
      <Footer />
    </main>
  );
}
