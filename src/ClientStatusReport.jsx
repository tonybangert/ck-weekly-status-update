import { useState } from "react";
import ckLogo from "./assets/ck-logo.png";

const BRAND = {
  navy: "#102d50",
  navyLight: "#1a3d66",
  navyDark: "#0a1e35",
  orange: "#faa840",
  orangeLight: "#fbb960",
  red: "#ef4537",
  white: "#ffffff",
  gray100: "#f7f8fa",
  gray200: "#e8eaef",
  gray300: "#c5c9d3",
  gray500: "#6b7280",
  gray700: "#374151",
  green: "#22c55e",
  greenDark: "#16a34a",
};

const milestones = [
  {
    id: 1,
    week: "Week 1",
    date: "Fri 3/6",
    title: "Discovery & Data Landscape",
    subtitle: "Data sources, access, landscape assessment",
    status: "complete",
    details: [
      "Identified and cataloged all available data sources",
      "Assessed data quality and completeness",
      "Mapped current reporting landscape and gaps",
      "Documented access requirements and permissions",
    ],
    deliverables: ["Comprehensive inventory of all data sources with quality ratings and gap analysis"],
  },
  {
    id: 2,
    week: "Week 1",
    date: "Tues 3/10",
    title: "HubSpot Connected",
    subtitle: "CRM integration live",
    status: "complete",
    details: [
      "HubSpot API connection established",
      "Initial data pull validated",
      "Field mapping documented",
    ],
    deliverables: ["Live HubSpot CRM connection with validated data pipeline and field mapping"],
  },
  {
    id: 3,
    week: "Week 2",
    date: "Fri 3/13",
    title: "Prototype Demo + HITL Feedback",
    subtitle: "Human-in-the-loop review session",
    status: "active",
    details: [
      "Present initial prototype dashboard",
      "Walk through data model and assumptions",
      "Capture feedback on metrics, layout, priorities",
      "Identify gaps and refinement areas",
    ],
    deliverables: ["Interactive prototype dashboard with core metrics, scoring model, and initial data views"],
  },
  {
    id: 4,
    week: "Week 3",
    date: "Fri 3/20",
    title: "Refined Model",
    subtitle: "Incorporating HITL feedback",
    status: "upcoming",
    details: [
      "Apply feedback from prototype review",
      "Refine predictive model and scoring logic",
      "Update dashboard with revised metrics",
      "Prepare for secondary review",
    ],
    deliverables: ["Refined dashboard incorporating stakeholder feedback with updated metrics and scoring logic"],
  },
  {
    id: 5,
    week: "Week 4",
    date: "Fri 3/27",
    title: "Platform Access & Walkthrough",
    subtitle: "Guided first look at the live environment",
    status: "upcoming",
    details: [
      "Provision platform access and credentials",
      "Guided walkthrough of dashboards, views, and navigation",
      "Validate data pipelines and model outputs in production",
      "Set expectations for Week 1 self-directed exploration",
    ],
    deliverables: ["Full platform access with guided walkthrough of live dashboards, views, and navigation"],
  },
  {
    id: 6,
    week: "Week 5",
    date: "Fri 4/3",
    title: "Week 1 Findings + Rapid Co-Prototyping",
    subtitle: "First-week insights drive live changes together",
    status: "upcoming",
    details: [
      "Review Week 1 observations, questions, and friction points",
      "Identify what's working well and what needs to shift",
      "Rapid co-prototyping session: making changes together in real time",
      "Align on priority refinements for the next iteration",
    ],
    deliverables: ["Prioritized findings from Week 1 exploration with real-time refinements applied in co-prototyping session"],
  },
  {
    id: 7,
    week: "Week 6",
    date: "Fri 4/10",
    title: "Deep Refinement & Workflow Integration",
    subtitle: "Tuning the platform to real workflows",
    status: "upcoming",
    details: [
      "Apply co-prototyping refinements from Week 5",
      "Map platform outputs to actual decision-making workflows",
      "Fine-tune metrics, filters, and views based on usage patterns",
      "Stress-test model outputs against domain expertise",
    ],
    deliverables: ["Platform outputs mapped to real decision-making workflows with tuned metrics, filters, and views"],
  },
  {
    id: 8,
    week: "Week 7",
    date: "Fri 4/17",
    title: "Value Validation & KPI Benchmarking",
    subtitle: "Quantifying impact against real outcomes",
    status: "upcoming",
    details: [
      "Benchmark platform insights against pre-engagement baseline",
      "Identify measurable efficiency gains and decision-quality improvements",
      "Document specific use cases where the platform changed an outcome",
      "Capture client perspective on value delivered",
    ],
    deliverables: ["Pre/post benchmarking of platform impact on efficiency gains and decision quality"],
  },
  {
    id: 9,
    week: "Week 8",
    date: "Fri 4/24",
    title: "Value Summary & Forward Roadmap",
    subtitle: "What we built together, what comes next",
    status: "upcoming",
    details: [
      "Present comprehensive value summary with client input",
      "Document ROI indicators and efficiency gains",
      "Outline roadmap for expanded scope or sustained engagement",
      "Define next-phase options and investment considerations",
    ],
    deliverables: ["Comprehensive value summary with ROI indicators and forward roadmap for expanded engagement"],
  },
];

const statusConfig = {
  complete: { label: "Complete", color: BRAND.green, bg: "rgba(34,197,94,0.12)", icon: "checkmark" },
  active: { label: "Today", color: BRAND.orange, bg: "rgba(250,168,64,0.12)", icon: "pulse" },
  upcoming: { label: "Upcoming", color: BRAND.gray300, bg: "rgba(197,201,211,0.08)", icon: "circle" },
};

function StatusIcon({ status }) {
  if (status === "complete") {
    return (
      <div style={{
        width: 28, height: 28, borderRadius: "50%",
        background: BRAND.green, display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M2.5 7.5L5.5 10.5L11.5 3.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    );
  }
  if (status === "active") {
    return (
      <div style={{
        width: 28, height: 28, borderRadius: "50%",
        background: BRAND.orange, display: "flex", alignItems: "center", justifyContent: "center",
        animation: "activePulse 2s ease-in-out infinite",
      }}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "white" }} />
      </div>
    );
  }
  return (
    <div style={{
      width: 28, height: 28, borderRadius: "50%",
      border: `2px solid ${BRAND.gray300}`, background: "transparent",
    }} />
  );
}

function ProgressBar({ milestones }) {
  const totalWeeks = 8;
  const completedWeeks = new Set(
    milestones.filter(m => m.status === "complete").map(m => m.week)
  ).size;
  const pct = (completedWeeks / totalWeeks) * 100;

  return (
    <div style={{ marginTop: 4 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
        <span style={{ fontSize: 13, color: BRAND.gray500, letterSpacing: "0.03em" }}>
          ENGAGEMENT PROGRESS
        </span>
        <span style={{ fontSize: 13, fontWeight: 700, color: BRAND.green }}>
          {Math.round(pct)}%
        </span>
      </div>
      <div style={{
        height: 6, borderRadius: 3, background: "rgba(255,255,255,0.06)",
        overflow: "hidden",
      }}>
        <div style={{
          height: "100%", borderRadius: 3,
          background: BRAND.green,
          width: `${pct}%`, transition: "width 1s ease",
        }} />
      </div>
    </div>
  );
}


function MilestoneCard({ milestone, isExpanded, onToggle, index }) {
  const config = statusConfig[milestone.status];

  return (
    <div
      onClick={onToggle}
      style={{
        borderRadius: 12, overflow: "hidden", cursor: "pointer",
        background: isExpanded ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.015)",
        border: milestone.status === "active"
          ? `1px solid ${BRAND.orange}40`
          : "1px solid rgba(255,255,255,0.06)",
        transition: "all 0.3s ease",
        animation: `fadeSlideIn 0.4s ease ${index * 0.08}s both`,
      }}
    >
      <div style={{ padding: "18px 24px", display: "flex", alignItems: "center", gap: 16 }}>
        <StatusIcon status={milestone.status} />
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
            <span style={{
              fontSize: 10, fontWeight: 700, letterSpacing: "0.08em",
              color: BRAND.gray500, textTransform: "uppercase",
            }}>
              {milestone.week}
            </span>
            <span style={{
              fontSize: 10, color: BRAND.gray500, letterSpacing: "0.03em",
            }}>
              {milestone.date}
            </span>
            <span style={{
              fontSize: 10, fontWeight: 600, letterSpacing: "0.06em",
              color: config.color, background: config.bg,
              padding: "3px 10px", borderRadius: 20, textTransform: "uppercase",
            }}>
              {config.label}
            </span>
          </div>
          <div style={{
            fontSize: 16, fontWeight: 600, color: BRAND.white,
            marginTop: 4, lineHeight: 1.3,
          }}>
            {milestone.title}
          </div>
          <div style={{
            fontSize: 13, color: "rgba(255,255,255,0.5)", marginTop: 2,
          }}>
            {milestone.subtitle}
          </div>
        </div>
        <svg
          width="20" height="20" viewBox="0 0 20 20" fill="none"
          style={{
            transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.3s ease", flexShrink: 0,
          }}
        >
          <path d="M5 8L10 13L15 8" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      {isExpanded && (
        <div style={{
          padding: "4px 24px 20px 68px",
          animation: "expandIn 0.3s ease",
        }}>
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40,
          }}>
            <div>
              <div style={{
                fontSize: 12, fontWeight: 700, letterSpacing: "0.1em",
                color: BRAND.orange, marginBottom: 10, textTransform: "uppercase",
              }}>
                Scope
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 4 }}>
                {milestone.details.map((d, i) => (
                  <li key={i} style={{
                    fontSize: 15, color: "rgba(255,255,255,0.75)",
                    lineHeight: 1.6, paddingLeft: 16, position: "relative",
                  }}>
                    <span style={{
                      position: "absolute", left: 0, top: 10,
                      width: 5, height: 5, borderRadius: "50%",
                      background: "rgba(255,255,255,0.3)",
                    }} />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div style={{
                fontSize: 12, fontWeight: 700, letterSpacing: "0.1em",
                color: BRAND.orange, marginBottom: 10, textTransform: "uppercase",
              }}>
                Deliverables
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 4 }}>
                {milestone.deliverables.map((d, i) => (
                  <li key={i} style={{
                    fontSize: 15, color: "rgba(255,255,255,0.75)",
                    lineHeight: 1.6, paddingLeft: 16, position: "relative",
                  }}>
                    <span style={{
                      position: "absolute", left: 0, top: 10,
                      width: 5, height: 5, borderRadius: 1,
                      background: BRAND.orange, opacity: 0.5,
                    }} />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ClientStatusReport() {
  const [expandedId, setExpandedId] = useState(null);


  return (
    <div style={{
      minHeight: "100vh",
      background: "#080e1a",
      fontFamily: "'Segoe UI', 'Helvetica Neue', sans-serif",
      color: BRAND.white,
      padding: "0 0 60px 0",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Mesh gradient layer */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0,
        background: [
          "radial-gradient(ellipse 80% 60% at 10% 0%, rgba(35,45,107,0.7) 0%, transparent 60%)",
          "radial-gradient(ellipse 60% 50% at 90% 15%, rgba(0,107,84,0.5) 0%, transparent 55%)",
          "radial-gradient(ellipse 50% 70% at 50% 50%, rgba(25,35,80,0.4) 0%, transparent 60%)",
          "radial-gradient(ellipse 70% 50% at 80% 80%, rgba(0,107,84,0.3) 0%, transparent 55%)",
          "radial-gradient(ellipse 40% 40% at 20% 90%, rgba(35,45,107,0.35) 0%, transparent 50%)",
          "radial-gradient(ellipse 30% 25% at 65% 35%, rgba(250,168,64,0.06) 0%, transparent 50%)",
        ].join(", "),
        animation: "meshDrift 20s ease-in-out infinite alternate",
      }} />
      {/* Noise texture overlay */}
      <svg style={{ position: "absolute", width: 0, height: 0 }}>
        <filter id="noiseFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </svg>
      <div style={{
        position: "absolute", inset: 0, zIndex: 1,
        opacity: 0.03,
        filter: "url(#noiseFilter)",
        pointerEvents: "none",
      }} />
      {/* Content layer */}
      <div style={{ position: "relative", zIndex: 2 }}>
      <style>{`
        @keyframes activePulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(250,168,64,0.4); }
          50% { box-shadow: 0 0 0 8px rgba(250,168,64,0); }
        }
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes expandIn {
          from { opacity: 0; max-height: 0; }
          to { opacity: 1; max-height: 500px; }
        }
        @keyframes headerFade {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes meshDrift {
          0% { transform: scale(1) translate(0, 0); }
          50% { transform: scale(1.05) translate(-1%, 2%); }
          100% { transform: scale(1) translate(1%, -1%); }
        }
        * { box-sizing: border-box; }
      `}</style>

      {/* HEADER */}
      <div style={{
        padding: "40px 40px 0",
        animation: "headerFade 0.6s ease",
      }}>
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "flex-start",
          flexWrap: "wrap", gap: 20,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <img
              src={ckLogo}
              alt="CK Marketing Solutions"
              style={{
                height: 52,
                width: "auto",
                borderRadius: 8,
                background: "rgba(255,255,255,0.95)",
                padding: 6,
              }}
            />
            <div style={{
              width: 1, height: 48,
              background: "rgba(255,255,255,0.12)",
            }} />
            <div>
              <div style={{
                fontSize: 10, fontWeight: 700, letterSpacing: "0.15em",
                color: BRAND.orange, textTransform: "uppercase", marginBottom: 8,
              }}>
                Client Engagement Status
              </div>
              <h1 style={{
                fontSize: 28, fontWeight: 700, margin: 0, lineHeight: 1.2,
                background: `linear-gradient(135deg, ${BRAND.white}, ${BRAND.gray300})`,
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}>
                CK Marketing Solutions - Data Segmentation Project
              </h1>
              <div style={{
                fontSize: 14, color: "rgba(255,255,255,0.45)", marginTop: 6,
              }}>
                PerformanceLabs.AI + Aplora.ai | Forward-Deployed Execution
              </div>
            </div>
          </div>
          <div style={{
            fontSize: 11, color: BRAND.white, letterSpacing: "0.03em",
          }}>
            Week 2 of 8 | Meeting: Fri 3/13
          </div>
        </div>

        <div style={{ marginTop: 28 }}>
          <ProgressBar milestones={milestones} />
        </div>
      </div>

      {/* MILESTONE TIMELINE */}
      <div style={{ padding: "32px 40px 0" }}>
        <div style={{
          fontSize: 10, fontWeight: 700, letterSpacing: "0.15em",
          color: BRAND.gray500, textTransform: "uppercase", marginBottom: 16,
        }}>
          Engagement Milestones
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {milestones.map((m, i) => (
            <MilestoneCard
              key={m.id}
              milestone={m}
              isExpanded={expandedId === m.id}
              onToggle={() => setExpandedId(expandedId === m.id ? null : m.id)}
              index={i}
            />
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <div style={{
        padding: "40px 40px 0",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        flexWrap: "wrap", gap: 12,
      }}>
        <div style={{
          fontSize: 11, color: "rgba(255,255,255,0.25)", letterSpacing: "0.03em",
        }}>
          PerformanceLabs.AI | Confidential
        </div>
        <div style={{ display: "flex", gap: 16 }}>
          <div style={{
            display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "rgba(255,255,255,0.35)",
          }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: BRAND.green }} />
            Complete
          </div>
          <div style={{
            display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "rgba(255,255,255,0.35)",
          }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: BRAND.orange }} />
            Today
          </div>
          <div style={{
            display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "rgba(255,255,255,0.35)",
          }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", border: `2px solid ${BRAND.gray300}` }} />
            Upcoming
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
