/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { pdf } from "@react-pdf/renderer";
import { CarbonFootprintReport } from "@/components/pdf/CarbonFootprintReport";
import { buildCharts, destroyCharts } from "@/utils/buildCharts";

const initialData = {
  projectName: "Green Horizons Initiative",
  organization: "EcoNova Labs",
  goals:
    "Reduce organizational carbon footprint by 35% over 36 months through energy efficiency, renewable integration, and sustainable mobility.",
  scope:
    "Scope 1 (direct), Scope 2 (purchased electricity), and key Scope 3 categories (business travel, waste).",
  methodology:
    "GHG Protocol Corporate Standard; location-based and market-based accounting for electricity; activity data converted to CO2e with region-specific emission factors.",
  strategies: [
    { title: "LED Retrofits", impactTons: 120, description: "Replace legacy fixtures across sites." },
    { title: "Solar PV (500 kW)", impactTons: 420, description: "On-site generation, net-metered." },
    { title: "EV Fleet Transition", impactTons: 260, description: "Phase-in 50% EVs with chargers." },
    { title: "Travel Policy & VC", impactTons: 90, description: "Shift to rail/virtual meetings." },
    { title: "Waste Diversion", impactTons: 45, description: "Organics and recycling expansion." }
  ],
  timeline: [
    { phase: "Audit & Baseline", months: "M1?M2" },
    { phase: "Quick Wins (LEDs)", months: "M3?M6" },
    { phase: "Solar Deployment", months: "M5?M14" },
    { phase: "Fleet Transition", months: "M6?M24" },
    { phase: "Policy Rollout", months: "M3?M8" },
    { phase: "Monitoring & Review", months: "M9?M36" }
  ],
  budget: [
    { item: "Energy Audit", cost: 25000 },
    { item: "LED Retrofits", cost: 180000 },
    { item: "Solar PV (CapEx)", cost: 700000 },
    { item: "EVs & Chargers", cost: 480000 },
    { item: "Travel Program", cost: 15000 },
    { item: "Waste Program", cost: 30000 }
  ],
  challenges: [
    { title: "Capital Constraints", mitigation: "Blend incentives, PPAs, phased rollout." },
    { title: "Change Management", mitigation: "Training, champions, transparent reporting." },
    { title: "Data Quality", mitigation: "Automated metering, audit trails, QA checks." }
  ],
  conclusion:
    "This program delivers substantial emissions cuts, long-term OpEx savings, and reputational value. Continuous monitoring ensures measurable progress."
};

export default function HomePage() {
  const [logo, setLogo] = useState<string | null>(null);
  const [downloading, setDownloading] = useState(false);
  const defaultLogo =
    'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="%231b8d73"/><path d="M5 13c0-4.418 5-7 7-8 0 3-1 9-7 10 2 2 6 3 9 1 3-2 5-6 5-10" stroke="white" stroke-width="1.5" fill="none" stroke-linecap="round"/></svg>';

  const pieRef = useRef<HTMLCanvasElement | null>(null);
  const barRef = useRef<HTMLCanvasElement | null>(null);
  const lineRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstances = useRef<any[]>([]);

  const totals = useMemo(() => {
    return {
      baseline: 3150,
      projectedReduction: initialData.strategies.reduce((s, v) => s + v.impactTons, 0)
    };
  }, []);

  useEffect(() => {
    if (pieRef.current && barRef.current && lineRef.current) {
      chartInstances.current = buildCharts(pieRef.current, barRef.current, lineRef.current);
    }
    return () => destroyCharts(chartInstances.current);
  }, []);

  const handleLogoUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setLogo(reader.result as string);
    reader.readAsDataURL(file);
  }, []);

  const toDataUrl = (canvas: HTMLCanvasElement | null) =>
    canvas ? canvas.toDataURL("image/jpeg", 0.7) : undefined;

  const downloadPdf = useCallback(async () => {
    setDownloading(true);
    try {
      const doc = (
        <CarbonFootprintReport
          logo={logo || defaultLogo}
          data={initialData}
          totals={totals}
          charts={{
            pie: toDataUrl(pieRef.current),
            bar: toDataUrl(barRef.current),
            line: toDataUrl(lineRef.current)
          }}
        />
      );
      const blob = await pdf(doc).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Carbon-Footprint-Reduction-Project.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } finally {
      setDownloading(false);
    }
  }, [logo, totals]);

  return (
    <div className="container">
      <div className="card">
        <h1 className="title">Carbon Footprint Reduction Report Template</h1>
        <p className="subtitle">
          Accessible, modern PDF template with charts, icons, and strong visual hierarchy.
        </p>
        <div className="grid">
          <div>
            <div className="kpi" aria-label="Key metrics summary">
              <img className="icon" src="/icons/leaf.svg" alt="Leaf icon" />
              <div>
                <div className="sectionTitle">Baseline Emissions</div>
                <div aria-live="polite">{totals.baseline.toLocaleString()} tCO2e/year</div>
              </div>
            </div>
            <div className="kpi" style={{ marginTop: 12 }}>
              <img className="icon" src="/icons/target.svg" alt="Target icon" />
              <div>
                <div className="sectionTitle">Projected Reductions</div>
                <div>{totals.projectedReduction.toLocaleString()} tCO2e/year</div>
              </div>
            </div>

            <div className="sectionTitle" style={{ marginTop: 24 }}>Upload Logo (optional)</div>
            <input
              aria-label="Upload logo"
              type="file"
              accept="image/*"
              onChange={handleLogoUpload}
            />

            <div className="sectionTitle" style={{ marginTop: 24 }}>
              Chart Previews (exported to PDF)
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
              <canvas ref={pieRef} width={300} height={220} aria-label="Emissions by source preview" />
              <canvas ref={barRef} width={300} height={220} aria-label="Monthly emissions preview" />
              <canvas ref={lineRef} width={300} height={220} aria-label="Reduction trajectory preview" />
            </div>
          </div>
          <div>
            <div className="sectionTitle">Template Includes</div>
            <ul>
              <li>Title page with project name and logo</li>
              <li>Introduction: goals and scope</li>
              <li>Assessment methodology (GHG Protocol)</li>
              <li>Current footprint with charts and graphs</li>
              <li>Reduction strategies and quantified impacts</li>
              <li>Timeline and budget breakdown</li>
              <li>Challenges and mitigation strategies</li>
              <li>Conclusion and overall impact</li>
            </ul>
            <button className="button" onClick={downloadPdf} aria-label="Download PDF" disabled={downloading}>
              {downloading ? "Preparing PDF..." : "Download PDF"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
