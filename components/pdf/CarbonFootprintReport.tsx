import React from "react";
import {
  Document,
  Font,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
  Svg,
  Path,
  Circle
} from "@react-pdf/renderer";

Font.register({
  family: "Inter",
  fonts: [
    {
      src: "https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEJ.woff2",
      fontWeight: 400
    },
    {
      src: "https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKi8kJ.woff2",
      fontWeight: 700
    },
    {
      src: "https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKq8AJ.woff2",
      fontWeight: 800
    }
  ]
});

const colors = {
  bg: "#F5FAF7",
  fg: "#0b1f1a",
  primary: "#1b8d73",
  secondary: "#2e6fa3",
  muted: "#3b5b52",
  border: "#dcebe5"
};

const styles = StyleSheet.create({
  page: {
    padding: 32,
    fontFamily: "Inter",
    color: colors.fg,
    backgroundColor: "#ffffff"
  },
  hero: {
    padding: 24,
    backgroundColor: colors.bg,
    border: `1pt solid ${colors.border}`,
    borderRadius: 12
  },
  h1: { fontSize: 28, fontWeight: 800, color: colors.primary, marginBottom: 6 },
  h2: { fontSize: 18, fontWeight: 800, color: colors.primary, marginBottom: 6, marginTop: 16 },
  h3: { fontSize: 14, fontWeight: 700, color: colors.secondary, marginBottom: 4, marginTop: 10 },
  body: { fontSize: 11, lineHeight: 1.4, color: colors.fg },
  small: { fontSize: 10, color: colors.muted },
  row: { flexDirection: "row", gap: 12 },
  kpi: {
    flexDirection: "row",
    border: `1pt solid ${colors.border}`,
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    marginRight: 10
  },
  icon: { width: 16, height: 16, marginRight: 8 },
  chip: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    backgroundColor: "#e7f4f1",
    color: colors.primary,
    fontSize: 10,
    alignSelf: "flex-start"
  },
  table: {
    width: "100%",
    border: `1pt solid ${colors.border}`,
    borderRadius: 8,
    overflow: "hidden"
  },
  tr: { flexDirection: "row" },
  th: {
    flex: 1,
    backgroundColor: colors.bg,
    padding: 8,
    fontSize: 10,
    fontWeight: 700,
    borderRight: `1pt solid ${colors.border}`
  },
  td: {
    flex: 1,
    padding: 8,
    fontSize: 10,
    borderTop: `1pt solid ${colors.border}`,
    borderRight: `1pt solid ${colors.border}`
  },
  figure: {
    marginVertical: 8,
    padding: 8,
    border: `1pt solid ${colors.border}`,
    borderRadius: 8,
    backgroundColor: "#fff"
  }
});

type Strategy = { title: string; impactTons: number; description: string };
type Timeline = { phase: string; months: string };
type Budget = { item: string; cost: number };
type Challenge = { title: string; mitigation: string };

type Props = {
  logo: string;
  data: {
    projectName: string;
    organization: string;
    goals: string;
    scope: string;
    methodology: string;
    strategies: Strategy[];
    timeline: Timeline[];
    budget: Budget[];
    challenges: Challenge[];
    conclusion: string;
  };
  totals: { baseline: number; projectedReduction: number };
  charts: { pie?: string; bar?: string; line?: string };
};

const Currency = ({ value }: { value: number }) => (
  <Text>
    $
    {value.toLocaleString(undefined, {
      maximumFractionDigits: 0
    })}
  </Text>
);

export function CarbonFootprintReport({ logo, data, charts, totals }: Props) {
  const budgetTotal = data.budget.reduce((s, v) => s + v.cost, 0);

  return (
    <Document title={`${data.projectName} - Carbon Reduction Report`} author={data.organization} producer="React-PDF">
      {/* Title Page */}
      <Page size="A4" style={styles.page}>
        <View style={styles.hero}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <View>
              <Text style={styles.h1} aria-label="Report Title">
                {data.projectName}
              </Text>
              <Text style={styles.body}>{data.organization}</Text>
              <View style={{ marginTop: 8 }}>
                <Text style={styles.chip}>Carbon Footprint Reduction Project</Text>
              </View>
            </View>
            {!!logo && <Image src={logo} style={{ width: 72, height: 72, borderRadius: 12 }} />}
          </View>
          <View style={{ marginTop: 16 }}>
            <View style={[styles.kpi, { marginBottom: 8 }]}>
              <Svg width="16" height="16" viewBox="0 0 24 24" style={styles.icon}>
                <Path d="M3 12c0 4.97 4.03 9 9 9 4.34 0 7.98-3.08 8.82-7.14.27-1.3-.86-2.43-2.16-2.16-4.06.84-7.14 4.48-7.14 8.82-3.31 0-6-2.69-6-6 0-5.52 6.48-9.18 11.4-10.34 1.23-.29 1.23-2.06 0-2.35C11.18 1.68 3 5.28 3 12z" fill="#1b8d73" />
              </Svg>
              <Text style={styles.small}>Baseline Emissions: {totals.baseline.toLocaleString()} tCO2e/yr</Text>
            </View>
            <View style={styles.kpi}>
              <Svg width="16" height="16" viewBox="0 0 24 24" style={styles.icon}>
                <Circle cx="12" cy="12" r="9" stroke="#2e6fa3" strokeWidth={2} fill="none" />
                <Circle cx="12" cy="12" r="5.5" stroke="#2e6fa3" strokeWidth={2} fill="none" />
                <Circle cx="12" cy="12" r="2" fill="#2e6fa3" />
              </Svg>
              <Text style={styles.small}>
                Projected Reductions: {totals.projectedReduction.toLocaleString()} tCO2e/yr
              </Text>
            </View>
          </View>
        </View>
        <View style={{ marginTop: 18 }}>
          <Text style={styles.h2}>Introduction</Text>
          <Text style={styles.h3}>Goals</Text>
          <Text style={styles.body}>{data.goals}</Text>
          <Text style={styles.h3}>Scope</Text>
          <Text style={styles.body}>{data.scope}</Text>
        </View>
      </Page>

      {/* Methodology and Current Footprint */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.h2}>Assessment Methodology</Text>
        <Text style={styles.body}>{data.methodology}</Text>

        <Text style={styles.h2}>Current Carbon Footprint</Text>
        <View style={{ flexDirection: "row", gap: 12 }}>
          {charts.pie && (
            <View style={{ flex: 1 }}>
              <View style={styles.figure}>
                <Image src={charts.pie} style={{ width: "100%", height: 180 }} />
              </View>
              <Text style={styles.small}>Figure 1. Emissions by source (tCO2e)</Text>
            </View>
          )}
          {charts.bar && (
            <View style={{ flex: 1 }}>
              <View style={styles.figure}>
                <Image src={charts.bar} style={{ width: "100%", height: 180 }} />
              </View>
              <Text style={styles.small}>Figure 2. Monthly emissions (tCO2e)</Text>
            </View>
          )}
        </View>
        {charts.line && (
          <View style={{ marginTop: 10 }}>
            <View style={styles.figure}>
              <Image src={charts.line} style={{ width: "100%", height: 160 }} />
            </View>
            <Text style={styles.small}>Figure 3. Reduction trajectory vs. target</Text>
          </View>
        )}
      </Page>

      {/* Strategies and Timeline */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.h2}>Reduction Strategies</Text>
        {data.strategies.map((s) => (
          <View key={s.title} style={{ marginBottom: 8, borderBottom: `1pt solid ${colors.border}`, paddingBottom: 6 }}>
            <Text style={styles.h3}>{s.title}</Text>
            <Text style={styles.body}>{s.description}</Text>
            <Text style={styles.small}>Estimated Impact: {s.impactTons.toLocaleString()} tCO2e/yr</Text>
          </View>
        ))}

        <Text style={styles.h2}>Timeline</Text>
        <View style={styles.table} aria-label="Project implementation timeline">
          <View style={styles.tr}>
            <Text style={styles.th}>Phase</Text>
            <Text style={[styles.th, { borderRight: "none" }]}>Months</Text>
          </View>
          {data.timeline.map((t, idx) => (
            <View key={idx} style={styles.tr}>
              <Text style={styles.td}>{t.phase}</Text>
              <Text style={[styles.td, { borderRight: "none" }]}>{t.months}</Text>
            </View>
          ))}
        </View>
      </Page>

      {/* Budget, Risks, Conclusion */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.h2}>Budget Breakdown</Text>
        <View style={styles.table} aria-label="Budget breakdown table">
          <View style={styles.tr}>
            <Text style={styles.th}>Item</Text>
            <Text style={[styles.th, { borderRight: "none" }]}>Cost (USD)</Text>
          </View>
          {data.budget.map((b, idx) => (
            <View key={idx} style={styles.tr}>
              <Text style={styles.td}>{b.item}</Text>
              <Text style={[styles.td, { borderRight: "none" }]}><Currency value={b.cost} /></Text>
            </View>
          ))}
          <View style={styles.tr}>
            <Text style={[styles.td, { fontWeight: 700 }]}>Total</Text>
            <Text style={[styles.td, { borderRight: "none", fontWeight: 700 }]}><Currency value={budgetTotal} /></Text>
          </View>
        </View>

        <Text style={styles.h2}>Challenges & Mitigation</Text>
        {data.challenges.map((c) => (
          <View key={c.title} style={{ marginBottom: 8 }}>
            <Text style={styles.h3}>{c.title}</Text>
            <Text style={styles.body}>{c.mitigation}</Text>
          </View>
        ))}

        <Text style={styles.h2}>Conclusion</Text>
        <Text style={styles.body}>{data.conclusion}</Text>
      </Page>
    </Document>
  );
}

