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
    status: "complete",
    details: [
      "Present initial prototype dashboard",
      "Walk through data model and assumptions",
      "Capture feedback on metrics, layout, priorities",
      "Identify gaps and refinement areas",
    ],
    deliverables: ["Interactive prototype dashboard with core metrics, scoring model, and initial data views"],
    meetingNotes: {
      sections: [
        {
          heading: "Meeting Context",
          items: [
            "Progress check between Tony's team (PerformanceLabs.ai) and Kevin Roselli to review the Revenue Intelligence Dashboard",
            "Team demonstrated work integrating Kevin's company data into HubSpot and presented initial insights and visualizations",
          ],
        },
        {
          heading: "Completed Work (Weeks 1–2)",
          items: [
            "Received initial spreadsheets from Kevin containing pipeline, forecast, and historical data",
            "Connected HubSpot API on Tuesday (read-only access — no changes to the system)",
            "Performed ETL (Extract, Transform, Load) operations to normalize data",
            "Embedded three documents for cross-data intelligence",
            "Identified 3,200 duplicate records in HubSpot for potential cleanup",
            "Built initial dashboard prototype with multiple visualization views",
          ],
        },
        {
          heading: "Key Decisions",
          items: [
            "Separate store pipeline (recurring revenue) from transactional orders throughout dashboard with a global toggle",
            "Toggle should apply globally across all dashboard sections and enable comparative analysis (view both simultaneously)",
            "Deprioritize geographic analysis view — high numbers reflect where reps were located (e.g., Arizona rep added many contacts), not actual wins. Keep for potential future use",
            "Provision dashboard access for Kevin and new fractional CMO by Fri 3/27",
            "Marketing efforts should focus on increasing lead volume for high-value categories within the annual closing window",
            "Keep insurance industry context: strong with financial services companies that have insurance arms (e.g., Pacific Life), not pure insurance carriers (lost USAA, GEICO, Progressive in past 2 years)",
            "If project does not continue past Week 8, will export all visualizations for Kevin's team",
          ],
        },
        {
          heading: "Pipeline Separation — Critical Finding",
          items: [
            "Two distinct pipelines with different purposes were being mixed in reports",
            "Store Pipeline: recurring revenue, primary focus, represents ongoing customer relationships, critical for growth strategy. Deal stages use capitalized 'Closed Won' and 'Closed Lost'",
            "Transactional Orders: one-off sales, unpredictable windfall revenue. Often from store pipeline prospects not ready to commit but placing trial orders. Deal stages use lowercase 'closed won' and 'closed lost'",
            "Each rep has a $100K–$300K 'other business' budget for transactional orders",
            "Case sensitivity difference in deal stages was causing data extraction issues and mixing pipeline types",
            "Without separation, metrics are misleading — e.g., Kendra shows highest win rate because she logs every small transactional order ($1,000 t-shirts) and marks them closed won, but hasn't onboarded major store accounts yet",
          ],
        },
        {
          heading: "Action Items — Kevin",
          items: [
            "Send updated salesperson transactional ('other business') budget data file to Tony/Eric team — Kevin had removed this from original file thinking it wasn't needed",
            "Send multi-location business data once received from data team (target: next week)",
            "Flag any data discrepancies (account assignments, house accounts) as identified while reviewing the dashboard",
          ],
        },
        {
          heading: "Action Items — Tony/Eric Team",
          items: [
            "Refine dashboard to separate and toggle between store (recurring) and transactional pipeline data, including win rate and performance metrics",
            "Provide Kevin and new fractional CMO with dashboard access by Friday 3/27",
            "Schedule half-hour follow-up check-in with Kevin the week after access is provided",
            "Continue data reconciliation — account ownership, pipeline mapping (e.g., HERC Rentals, declining account button functionality)",
            "Incorporate feedback after dashboard access to rapidly prototype and refine the model",
            "Available to discuss security/IT concerns with Kevin's IT department if needed",
          ],
        },
        {
          heading: "Key Insights Identified",
          items: [
            "3,200 duplicate records found in HubSpot for potential cleanup",
            "European Wax Center: $5.8M customer with zero contacts/engagement in HubSpot — long-standing customer managed by account managers who don't use HubSpot for logging. 68 similar accounts identified (mostly top customers not tracked in CRM)",
            "Financial Services: large deal sizes, 50%+ win rate, but 6-month sales cycle means deals started after July 1 unlikely to close in current year — impacts 2026 performance planning",
            "Sub-$1M opportunities: 50%+ win rate vs. over-$1M opportunities: 36% win rate — aligns with Kevin's historical pipeline data",
            "Insurance appears in Tier 3 with lower win rate — Kevin explained they perform well with financial services companies that have insurance arms (e.g., Pacific Life), but struggle with pure insurance companies",
            "Tony suggested mapping contacts to get a full customer activity snapshot, but Kevin indicated this may not be necessary for existing accounts",
          ],
        },
        {
          heading: "Dashboard Components Reviewed",
          items: [
            "Data Health Overview — upload status of three spreadsheets, transformed/deduplicated HubSpot data, 3,200 duplicates flagged",
            "Account Growth Analysis — categorizes accounts by 2025 revenue vs. 2026 forecast: growing (Nationwide top growth account), stable, declining, and net new",
            "Data Anomalies & Insights — system-identified issues requiring human validation (European Wax Center, 68 untracked accounts)",
            "Industry Segmentation — number of companies, total deals, total revenue, average deal size, win rate %, and deal velocity by industry",
            "Company Size Segmentation — performance by company revenue tiers",
            "Geographic Analysis — top 15 states by company count and contacts (deprioritized per Kevin's feedback)",
            "Tier-Based Industry Rankings — industries ranked by deal volume, revenue, and 40%+ win rates across Tier 1/2/3",
            "Sales Rep Performance — individual rep dashboards showing pipeline by market/industry, deals won vs. lost, close rates, and performance against target industries",
          ],
        },
        {
          heading: "Engagement Roadmap",
          items: [
            "Week 2–3: Refine model based on Kevin's feedback from this meeting",
            "Friday 3/27 (Week 3): Provision dashboard access for Kevin and new fractional CMO",
            "Week 4–5: Kevin tests dashboard, identifies enhancement needs",
            "Week 6: Rapid prototyping session with Kevin to implement requested changes",
            "Week 8: Deliver value summary and potential continuation roadmap",
          ],
        },
      ],
    },
  },
  {
    id: 4,
    week: "Week 3",
    date: "Fri 3/20",
    title: "Refined Model",
    subtitle: "Incorporating HITL feedback",
    status: "complete",
    details: [
      "Implemented pipeline separation feedback from Week 2 HITL session",
      "Built composite ICP scoring model with 5 weighted dimensions",
      "Added Insight Engine and global Store/Transactional pipeline filtering",
      "Scaffolded full CK Marketing product (backend + frontend) and optimized load performance",
    ],
    deliverables: ["Deployed 14 platform updates including a new Insight Engine that cross-references 13 data dimensions to surface hidden revenue patterns, composite ICP scoring with adjustable weighting, global pipeline filtering across all views, and performance optimizations that cut repeat load times from 16 seconds to instant"],
    sprintData: [
      "14 commits — 8 features, 6 fixes",
      "Composite ICP Scoring: 5-dimension scoring (win rate, deal size, cycle speed, rep efficiency, expansion rate) with client-side weight sliders",
      "Global pipeline filtering: Store/Transactional toggle now wired to every tab and endpoint",
      "Full product scaffold: 112 files created for the complete CK Marketing backend + frontend",
    ],
    meetingNotes: {
      sections: [
        {
          heading: "Executive Summary",
          items: [
            "PerformanceLabs.ai and Kevin Roselli reviewed the custom analytics dashboard ahead of Friday's final handover",
            "Platform's newly built ICP scoring and insights engine successfully surfaced valuable revenue patterns",
            "Critical data flaw identified: mixing current customer revenue with pipeline potential is skewing metrics",
            "Team agreed to separate these data sources immediately",
          ],
        },
        {
          heading: "Key Decision — Data Separation Strategy",
          items: [
            "Dashboard must split into two distinct views: Current Customers and Potential Customers",
            "Current Customers: fed by Sales vs. Budget reports to analyze existing revenue and build the Ideal Customer Profile (ICP)",
            "Potential Customers: fed by HubSpot to track prospecting, deal velocity, and pipeline health",
          ],
        },
        {
          heading: "Data Discrepancies & CRM Hygiene",
          items: [
            "Mixed-data approach caused inaccurate rep performance metrics (e.g., Will and Robert's numbers)",
            "Revealed CRM hygiene issues: mismatched deal ownership and incorrect industry classifications (e.g., Transamerica)",
          ],
        },
        {
          heading: "Platform Wins",
          items: [
            "New composite ICP scoring (using Thompson modeling) is highly effective",
            "Revenue seasonality tracking opens up targeted marketing opportunities based on client buying cycles",
          ],
        },
        {
          heading: "Action Items — Kevin",
          items: [
            "Provide January and February 2026 actuals ASAP (March to follow at month-end)",
            "Review and correct industry categorizations for current customers in HubSpot",
          ],
        },
        {
          heading: "Action Items — Tony/Eric Team",
          items: [
            "Upload the new actuals and the 3 new spreadsheets provided by Kevin",
            "Add date range/time period filters for rep performance",
            "Make ICP cards clickable to sort by individual metrics (win rate, deal size, cycle speed)",
            "Add hover-over 'eye' tooltips to explain data sources and calculation methodologies",
            "Document data sources and calculation methodologies",
          ],
        },
      ],
    },
  },
  {
    id: 5,
    week: "Week 4",
    date: "Fri 3/27",
    title: "Platform Access & Walkthrough",
    subtitle: "Guided first look at the live environment",
    status: "complete",
    details: [
      "Add ICP & persona ranking across 5 composite scoring variables (UX input method refinement)",
      "Ingestion of Q1 Jan/Feb actuals data",
      "Pare down Insights tab to only include 4 initial categories to build from",
      "Complete HubSpot ETL pipeline for contacts, companies, and deals",
    ],
    deliverables: [
      "Live HubSpot sync pipeline: full ETL for contacts, companies, deals with upsert, field mapping, and incremental association resolution",
      "CRM hygiene scanner: stale record detection, orphan finder, source reconciliation with audit trail",
      "AI analyst upgraded to Claude Opus 4.6 with XML-structured prompts and extended thinking enabled",
      "CK auth configuration and set up",
    ],
    sprintData: [
      "Live re-sync of all HubSpot data",
      "Dashboard nav: nav, tabs, filters, drill downs",
      "External authorization configuration",
      "Q1 actuals spreadsheet ingestion and exploration",
    ],
    meetingNotes: {
      sections: [
        {
          heading: "Business Reviews Implementation Discussion",
          items: [
            "Kevin discussed implementing business reviews for Pittsburgh multi-location customers, sharing an experience conducting one with a Pittsburgh customer in Virginia Beach",
            "Tony and Kevin agreed on the importance of these touchpoints for selling opportunities and controlling conversations",
            "Weekend plans: Kevin traveling to Florida, Tony spending time with his daughter during spring break, Paul planning to work, Eric expecting his parents to visit",
          ],
        },
        {
          heading: "System Performance and AI Upgrades",
          items: [
            "Tony reported on recent system adjustments and caching work in progress — current setup pulls real data each time but will be optimized for faster performance",
            "AI assistant upgraded from Sonnet to Opus for improved context and speed",
            "Plans to provide access credentials to Kevin on Monday for review",
            "Tony invited Kevin to examine the system from both a data accuracy perspective and strategic context, particularly regarding how to handle data entry processes when certain team members like Robert won't be using HubSpot",
          ],
        },
        {
          heading: "Analytics System Updates Discussion",
          items: [
            "Updated ICP persona rankings and added January and February actuals",
            "Kevin explained March actuals would likely be available around April 10–13, as data is compiled from invoiced projects rather than immediate order entries",
            "Adjustments made to the revenue tab to improve accuracy and create a better pacing report for the quarter",
            "Plan to walk Kevin through the updated insights tab next week",
          ],
        },
        {
          heading: "Data Pipeline and Dashboard Updates",
          items: [
            "Eric completed two manual full syncs and mapped data directly to HubSpot, identifying areas for data cleanliness and potential behavior changes",
            "Tony mentioned adjustments to the dashboard, external auth setup, and addition of a revenue tab based on Q1 actuals",
            "Team encouraged Kevin to use the advisor module to identify additional insights needed in the future",
          ],
        },
        {
          heading: "Data Integration and Dashboard Planning",
          items: [
            "Tony and Kevin agreed to keep forecast data separate from HubSpot rather than importing it due to ERP system limitations",
            "Reviewed a new dashboard with simplified insights and discussed how it could help marketing understand peak revenue months and plan accordingly",
            "Kevin will provide updated sales data around the 10th or 11th of each month for the dashboard to refresh",
            "Plans to eventually enable direct data uploads through the data health section",
          ],
        },
        {
          heading: "Data Visualization and Insights Review",
          items: [
            "Discussed issues with store revenue calculations and year-over-year comparisons",
            "ICP data shows construction as the top performing category across multiple metrics",
            "Financial services showed mixed results — dropping in cycle speed metrics but remaining strong in deal size",
            "Need to investigate how expansion opportunity scores are calculated and flagged for review",
            "Current categorization using 'Tier 3' language may not be appropriate",
          ],
        },
        {
          heading: "Dashboard Improvement and Functionality Updates",
          items: [
            "Kevin requested enhancements including hover states for insurance data, year-over-year comparisons, and ability to denote former representatives (Dan Geyer, Mike Feeley, and Chloe Layton) in the system",
            "Next meeting postponed to March 10th due to Kevin's vacation and upcoming rebranding exercise, with plans to schedule a 30-minute feedback session before then",
            "When asked about desired dashboard features, Kevin emphasized the importance of pipeline health and forward-looking revenue insights over historical data",
          ],
        },
      ],
    },
  },
  {
    id: 6,
    week: "Week 5",
    date: "Fri 4/3",
    title: "Week 1 Findings + Rapid Co-Prototyping",
    subtitle: "First-week insights drive live changes together",
    status: "complete",
    details: [
      "Review Week 1 observations, questions, and friction points",
      "Identify what's working well and what needs to shift",
      "Rapid co-prototyping session: making changes together in real time",
      "Align on priority refinements for the next iteration",
    ],
    deliverables: ["Prioritized findings from Week 1 exploration with real-time refinements applied in co-prototyping session"],
    sprintData: [],
  },
  {
    id: 7,
    week: "Week 6",
    date: "Fri 4/10",
    title: "Deep Refinement & Workflow Integration",
    subtitle: "Tuning the platform to real workflows",
    status: "complete",
    details: [
      "Apply co-prototyping refinements from Week 5",
      "Map platform outputs to actual decision-making workflows",
      "Fine-tune metrics, filters, and views based on usage patterns",
      "Stress-test model outputs against domain expertise",
    ],
    deliverables: [
      "Platform outputs mapped to real decision-making workflows with tuned metrics, filters, and views",
      "Production-grade Contact Classification Engine: Live in your CK analyst workflow, running reliably with timeout issues cleared.",
      "Executive access layer: Secure login deployed, giving your leadership team direct visibility without going through the analyst team.",
    ],
    sprintData: [
      "Lapsed buyer analysis: Dormant customer deep-dive complete. Findings ready for re-engagement.",
      "Contact Classification Engine: Shipped to production. CK analyst timeout issues resolved.",
      "Executive access: Secure login deployed for your leadership team",
    ],
  },
  {
    id: 8,
    week: "Week 7",
    date: "Fri 4/17",
    title: "Value Validation & KPI Benchmarking",
    subtitle: "Quantifying impact against real outcomes",
    status: "active",
    details: [
      "Benchmark platform insights against pre-engagement baseline",
      "Identify measurable efficiency gains and decision-quality improvements",
      "Document specific use cases where the platform changed an outcome",
      "Capture client perspective on value delivered",
    ],
    deliverables: ["Pre/post benchmarking of platform impact on efficiency gains and decision quality"],
    sprintData: [],
    meetingNotes: {
      sections: [
        {
          heading: "Business Development Findings Review",
          items: [
            "Kevin shared that he had traveled to Cincinnati and Indianapolis for new business meetings",
            "Kevin had been working with a Word document to track his findings and planned to share his screen to review his observations about the platform",
            "Kevin requested feedback from the team, particularly from Tony in his CRO role, to review his findings and provide additional insights",
          ],
        },
        {
          heading: "Data Implementation and Anomalies Discussion",
          items: [
            "Tony shared that he connected with Brad, who provided a new lead and requested an executive summary ahead of an upcoming board meeting",
            "Identified a discrepancy in HERC account data — system showed no dedicated rep despite having a listed salesperson in HubSpot and the sales dashboard",
            "Tony explained that this type of anomaly requires both data analysis and understanding the underlying reasons for the discrepancies, suggesting a two-part approach",
          ],
        },
        {
          heading: "HubSpot Data Visibility Challenges",
          items: [
            "Discussed challenges with data visibility in HubSpot, particularly regarding existing customers like Country Financial",
            "Kevin explained that while he had marked existing customers in HubSpot to prevent new sales efforts, there was a disconnect in how the data was being pulled — Country Financial appearing under 'CC Services' rather than its actual name",
            "Eric suggested using a semantic layer to capture nuanced information like customer status and train the system based on human insights rather than trying to perfect HubSpot data entry",
            "Discussion highlighted the need to balance structured data entry with the practical realities of how accounts are managed across different teams",
          ],
        },
        {
          heading: "HubSpot Data Accuracy Improvements",
          items: [
            "Kevin identified data accuracy issues in HubSpot, particularly with silent or inactive accounts, and discussed plans to clean up the system in 2026",
            "Paul Gardner suggested making UI/UX editable fields to allow for easier data modifications",
            "Tony and Eric emphasized the importance of isolating and properly categorizing anomalies to avoid misinterpretation by stakeholders, particularly the CFO",
            "Eric highlighted the need to refine criteria for identifying silent decliners and suggested exploring specific variables to improve data analysis",
          ],
        },
        {
          heading: "HubSpot Data Management Improvements",
          items: [
            "Focused on identifying and addressing silent decliners versus active decliners",
            "Kevin suggested removing silent decliners from reports and focusing only on the biggest decliners, particularly for customers worth $100,000 and above",
            "Team agreed to segment data by tiers, dates, and deal sizes",
            "Eric committed to investigating a discrepancy in the reported $317 million revenue at risk figure, which appeared to be an aggregation error",
          ],
        },
        {
          heading: "HubSpot Restaurant Pipeline Categorization",
          items: [
            "Identified that while restaurant accounts are properly tagged at the contact and account level, deals are defaulting to store pipeline rather than transactional pipeline due to lack of restaurant-specific pipeline or deal types",
            "Tony suggested adding an industry dropdown field to deals and noted that this could be addressed through better training for executive advisors over time",
            "Paul Gardner recommended asking the tool's chat feature for additional insights about restaurant deals",
          ],
        },
        {
          heading: "Restaurant Industry Data Review",
          items: [
            "Reviewed data pulled from 179 restaurant industry companies — only three deals were recorded and all were in the store pipeline",
            "Agreed to add a 2026 budget column for better visibility of year-over-year and budget performance",
            "Tony confirmed that actuals for Q1 were correctly updated in the system after Kevin's March data was provided",
            "Clarified that multi-location growth numbers were showing year-over-year projections rather than current performance",
          ],
        },
        {
          heading: "Data Quality and Persona Mapping",
          items: [
            "Kevin identified that the persona with the highest win rate was labeled as 'other' — suggesting better persona mapping is needed",
            "Kevin plans to present feedback to the sales team on Tuesday using a PowerPoint rather than going through the full review",
            "Emphasized the importance of clean data for better targeting and segmentation",
            "Outlined plans to implement industry-focused sales approaches, with Matt Wittenhall serving as an example of success in the construction industry",
          ],
        },
        {
          heading: "Data Hygiene and Sales Insights",
          items: [
            "Kevin noted that George Eichard was now listed as a representative",
            "Tony suggested using the findings as a benchmark and training tool for new reps, while highlighting the importance of considering ICP and time-to-close metrics, particularly for Q4 financial services sales",
            "Team agreed to update documentation with strategic recommendations and planned to create a more detailed proposal based on the past eight weeks of data",
            "Follow-up meeting scheduled for the following Friday that might include Brad",
          ],
        },
      ],
    },
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
    sprintData: [],
  },
];

const CK_INSIGHTS = {
  stats: [
    { value: "$6.4M", label: "Unassigned Revenue" },
    { value: "46%", label: "Closed-Lost Rate", variant: "alert" },
    { value: "38K", label: "Inactive Contacts" },
    { value: "+8.8%", label: "YoY Revenue Growth", variant: "positive" },
  ],
  insights: [
    {
      title: "$6.4M in growing accounts have no assigned rep",
      metricValue: "$6.4M",
      metricLabel: "At Risk",
      body: 'The Intelligence tab flagged 4 accounts worth $6.4M that are growing but sitting in "House" with no dedicated coverage. Herc Rentals alone is forecasted at $6.2M with a perfect 100/100 growth score, and nobody owns it.',
      salesAction: "This is the single biggest revenue-at-risk opportunity to claim. Assign reps to all 4 accounts this week.",
      marketingAction: "Exclude these accounts from generic nurture. Treat as priority hand-raisers needing a warm handoff, not more drip emails.",
      theme: "navy",
    },
    {
      title: "46% closed-lost rate is bleeding pipeline, concentrated on a few reps",
      metricValue: "46%",
      metricLabel: "Lost Rate",
      body: "Out of 220 deals, 102 are closed-lost with $59.2M in lost revenue dwarfing the $19.3M in wins. Several reps show 0% win rates while Jerry Brauneis and Robert Conte close at 67-75%. The gap between top and bottom performers is enormous.",
      salesAction: "Study deal motion of top closers (deal size, velocity, stage progression). Use as the coaching template across the team.",
      marketingAction: "Leads routed to underperforming reps are being wasted. Lead scoring and routing rules need a hard look immediately.",
      theme: "red",
    },
    {
      title: "58% of contacts are inactive: a massive re-engagement opportunity",
      metricValue: "38K",
      metricLabel: "Sleeping",
      body: "Only 26,957 active contacts out of nearly 65,000, with an average engagement score of just 40.2. That is a sleeping database with significant latent value.",
      salesAction: "Focus outreach on the ~27K active contacts where signals exist. Stop spraying across the full list.",
      marketingAction: "Run a targeted reactivation campaign against the 38K inactive contacts, segmented by Construction and Insurance where win rates are strongest.",
      theme: "navy",
    },
    {
      title: "Construction is the best-performing vertical and it is being under-invested",
      metricValue: "41.7%",
      metricLabel: "Win Rate",
      body: "Construction leads with $14.4M in revenue, a 41.7% win rate, and $1.2M average deal size across 224 companies. Financial Services (50% win rate, $1.9M avg) and Accounting (50%, $625K) show even better conversion on smaller samples. You are currently spreading resources across 41 industries.",
      salesAction: "Prioritize prospecting in Construction and Financial Services where the data proves deals close more often and bigger.",
      marketingAction: "Shift content, case studies, and ad spend toward top verticals. Spreading across 41 industries dilutes effectiveness.",
      theme: "orange",
    },
    {
      title: "Revenue is growing YoY (+8.8%) but momentum is decelerating month-over-month",
      metricValue: "-1.9%",
      metricLabel: "MoM Trend",
      body: "Q1 came in at $18.8M against a $17.3M prior year. But March ($6.1M) dipped from February ($6.2M), and the Intelligence tab flagged 23 accounts decelerating in Q1 with $1.1M at risk. The April forecast ($7.2M) is ambitious.",
      salesAction: "The 23 decelerating accounts need proactive check-ins now before Q1 dip becomes a full-year trend.",
      marketingAction: "March slowdown signals a need to accelerate pipeline generation into Q2. The April forecast needs more top-of-funnel support.",
      theme: "orange",
    },
  ],
};

const statusConfig = {
  complete: { label: "Complete", color: BRAND.green, bg: "rgba(34,197,94,0.12)", icon: "checkmark" },
  active: { label: "Current", color: BRAND.orange, bg: "rgba(250,168,64,0.12)", icon: "pulse" },
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
    milestones.filter(m => m.status === "complete" || m.status === "active").map(m => m.week)
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
            display: "grid",
            gridTemplateColumns: milestone.sprintData ? "1fr 1fr 1fr" : "1fr 1fr",
            gap: 0,
          }}>
            <div style={{ paddingRight: 20 }}>
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
            {milestone.sprintData && (
              <div style={{
                borderLeft: "1px solid rgba(255,255,255,0.1)",
                paddingLeft: 20,
                paddingRight: 20,
              }}>
                <div style={{
                  fontSize: 12, fontWeight: 700, letterSpacing: "0.1em",
                  color: BRAND.orange, marginBottom: 10, textTransform: "uppercase",
                }}>
                  Weekly Sprint
                </div>
                {milestone.sprintData.length > 0 && (
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 4 }}>
                    {milestone.sprintData.map((d, i) => (
                      <li key={i} style={{
                        fontSize: 15, color: "rgba(255,255,255,0.75)",
                        lineHeight: 1.6, paddingLeft: typeof d === "string" ? 16 : 0, position: "relative",
                      }}>
                        {typeof d === "string" ? (
                          <>
                            <span style={{
                              position: "absolute", left: 0, top: 10,
                              width: 5, height: 5, borderRadius: "50%",
                              background: "rgba(255,255,255,0.3)",
                            }} />
                            {d}
                          </>
                        ) : (
                          <span style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                            <span style={{
                              fontSize: 9, fontWeight: 700, letterSpacing: "0.08em",
                              padding: "2px 6px", borderRadius: 3, flexShrink: 0,
                              color: { FEAT: BRAND.green, FIX: BRAND.orange, TEST: "#60a5fa" }[d.tag],
                              background: { FEAT: "rgba(34,197,94,0.12)", FIX: "rgba(250,168,64,0.12)", TEST: "rgba(96,165,250,0.12)" }[d.tag],
                            }}>
                              {d.tag}
                            </span>
                            <span style={{ flex: 1 }}>{d.text}</span>
                            <span style={{
                              fontSize: 11, color: "rgba(255,255,255,0.3)", flexShrink: 0,
                            }}>
                              {d.date}
                            </span>
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
            <div style={{
              borderLeft: "1px solid rgba(255,255,255,0.1)",
              paddingLeft: 20,
            }}>
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

function MeetingNotesModal({ milestonesWithNotes, onClose }) {
  const [selectedId, setSelectedId] = useState(
    milestonesWithNotes[milestonesWithNotes.length - 1].id
  );
  const selected = milestonesWithNotes.find((m) => m.id === selectedId);
  const notes = selected.meetingNotes;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        animation: "fadeIn 0.2s ease",
        padding: 20,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: BRAND.navyDark,
          border: `1px solid rgba(255,255,255,0.1)`,
          borderRadius: 16,
          width: "100%", maxWidth: 600,
          maxHeight: "80vh", overflowY: "auto",
          animation: "modalSlideIn 0.25s ease",
        }}
      >
        {/* Modal header */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "20px 24px", borderBottom: "1px solid rgba(255,255,255,0.08)",
          position: "sticky", top: 0, background: BRAND.navyDark, zIndex: 2,
          borderRadius: "16px 16px 0 0",
        }}>
          <div style={{
            fontSize: 16, fontWeight: 700, color: BRAND.white,
            display: "flex", alignItems: "center", gap: 8,
          }}>
            <span style={{ color: BRAND.orange }}>&#9672;</span> Meeting Notes
          </div>
          <button
            onClick={onClose}
            style={{
              background: "rgba(255,255,255,0.06)", border: "none",
              color: BRAND.gray300, width: 32, height: 32,
              borderRadius: 8, cursor: "pointer", fontSize: 18,
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.12)"}
            onMouseLeave={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.06)"}
          >
            &times;
          </button>
        </div>

        {/* Tab bar */}
        <div style={{
          display: "flex", gap: 0, padding: "0 24px",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          position: "sticky", top: 61, background: BRAND.navyDark, zIndex: 1,
          overflowX: "auto",
        }}>
          {milestonesWithNotes.map((m) => {
            const isActive = m.id === selectedId;
            return (
              <button
                key={m.id}
                onClick={() => setSelectedId(m.id)}
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  padding: "12px 16px",
                  fontSize: 12, fontWeight: isActive ? 700 : 500,
                  letterSpacing: "0.03em", whiteSpace: "nowrap",
                  color: isActive ? BRAND.white : BRAND.gray500,
                  borderBottom: isActive
                    ? `2px solid ${BRAND.orange}`
                    : "2px solid transparent",
                  transition: "all 0.2s",
                }}
              >
                {m.week} &middot; {m.date}
              </button>
            );
          })}
        </div>

        {/* Modal body */}
        <div style={{ padding: "20px 24px" }}>
          {notes.sections.map((section, i) => (
            <div key={i} style={{ marginBottom: i < notes.sections.length - 1 ? 24 : 0 }}>
              <div style={{
                fontSize: 12, fontWeight: 700, letterSpacing: "0.1em",
                color: BRAND.orange, textTransform: "uppercase", marginBottom: 10,
              }}>
                {section.heading}
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 6 }}>
                {section.items.map((item, j) => (
                  <li key={j} style={{
                    fontSize: 14, color: "rgba(255,255,255,0.8)",
                    lineHeight: 1.6, paddingLeft: 16, position: "relative",
                  }}>
                    <span style={{
                      position: "absolute", left: 0, top: 10,
                      width: 5, height: 5, borderRadius: "50%",
                      background: "rgba(255,255,255,0.3)",
                    }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function InsightCard({ insight, index }) {
  const themes = {
    navy: { numberBg: "#102d50", numberColor: "#fff", metricColor: "#102d50" },
    red: { numberBg: "#ef4537", numberColor: "#fff", metricColor: "#ef4537" },
    orange: { numberBg: "#faa840", numberColor: "#102d50", metricColor: "#faa840" },
  };
  const t = themes[insight.theme];

  return (
    <div style={{
      marginBottom: 24, padding: "24px 28px",
      background: "#fff", borderRadius: 10,
      border: "1px solid rgba(16,45,80,0.07)",
      position: "relative",
    }}>
      <div style={{
        position: "absolute", top: -1, left: -1,
        width: 32, height: 32, borderRadius: "10px 0 8px 0",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 13, fontWeight: 700,
        color: t.numberColor, background: t.numberBg,
      }}>
        {index + 1}
      </div>
      <div style={{
        display: "flex", alignItems: "flex-start", gap: 16,
        marginBottom: 14, paddingLeft: 24,
      }}>
        <div style={{ flex: 1 }}>
          <div style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: 17, lineHeight: 1.3, color: "#102d50",
          }}>
            {insight.title}
          </div>
        </div>
        <div style={{ flexShrink: 0, textAlign: "right", minWidth: 80 }}>
          <div style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: 26, lineHeight: 1, letterSpacing: "-0.02em",
            color: t.metricColor,
          }}>
            {insight.metricValue}
          </div>
          <div style={{
            fontSize: 10, fontWeight: 600, textTransform: "uppercase",
            letterSpacing: "0.08em", color: "#64748b", marginTop: 2,
          }}>
            {insight.metricLabel}
          </div>
        </div>
      </div>
      <div style={{
        fontSize: 13.5, color: "#3d4f63", lineHeight: 1.65,
        marginBottom: 14, paddingLeft: 24,
      }}>
        {insight.body}
      </div>
      <div style={{
        display: "grid", gridTemplateColumns: "1fr 1fr",
        gap: 12, paddingLeft: 24,
      }}>
        <div style={{
          padding: "12px 16px", borderRadius: 8, fontSize: 12.5, lineHeight: 1.55,
          background: "rgba(16,45,80,0.04)", borderLeft: "3px solid #102d50",
        }}>
          <div style={{
            fontSize: 9, fontWeight: 700, textTransform: "uppercase",
            letterSpacing: "0.1em", color: "#102d50", marginBottom: 4,
          }}>
            Sales Action
          </div>
          <div style={{ color: "#4a5568" }}>{insight.salesAction}</div>
        </div>
        <div style={{
          padding: "12px 16px", borderRadius: 8, fontSize: 12.5, lineHeight: 1.55,
          background: "rgba(250,168,64,0.06)", borderLeft: "3px solid #faa840",
        }}>
          <div style={{
            fontSize: 9, fontWeight: 700, textTransform: "uppercase",
            letterSpacing: "0.1em", color: "#c07800", marginBottom: 4,
          }}>
            Marketing Action
          </div>
          <div style={{ color: "#4a5568" }}>{insight.marketingAction}</div>
        </div>
      </div>
    </div>
  );
}

function CKInsightsModal({ onClose }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        animation: "fadeIn 0.2s ease",
        padding: 20,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#faf8f5",
          borderRadius: 16,
          width: "100%", maxWidth: 900,
          maxHeight: "90vh", overflowY: "auto",
          animation: "modalSlideIn 0.25s ease",
          fontFamily: "'DM Sans', sans-serif",
          color: "#102d50",
          lineHeight: 1.6,
          WebkitFontSmoothing: "antialiased",
        }}
      >
        {/* Header */}
        <div style={{
          background: "#102d50",
          padding: "40px 48px 36px",
          position: "relative", overflow: "hidden",
          borderRadius: "16px 16px 0 0",
        }}>
          <button
            onClick={onClose}
            style={{
              position: "absolute", top: 12, right: 12,
              background: "rgba(255,255,255,0.15)", border: "none",
              color: "rgba(255,255,255,0.7)", width: 32, height: 32,
              borderRadius: 8, cursor: "pointer", fontSize: 18,
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "background 0.2s", zIndex: 3,
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.3)"}
            onMouseLeave={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.15)"}
          >
            &times;
          </button>
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0, height: 4,
            background: "linear-gradient(90deg, #faa840, #ef4537, #faa840)",
          }} />
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "flex-start",
            marginBottom: 28,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{
                width: 32, height: 32, background: "#faa840", borderRadius: 6,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#102d50" strokeWidth="2.5" strokeLinecap="round" width="18" height="18">
                  <path d="M3 12h4l3-9 4 18 3-9h4" />
                </svg>
              </div>
              <div>
                <div style={{
                  fontSize: 13, fontWeight: 600,
                  color: "rgba(255,255,255,0.7)",
                  letterSpacing: "0.06em", textTransform: "uppercase",
                }}>
                  PerformanceLabs.ai
                </div>
                <div style={{
                  fontSize: 10, fontWeight: 500,
                  color: "rgba(255,255,255,0.4)",
                  letterSpacing: "0.08em", textTransform: "uppercase", marginTop: 2,
                }}>
                  Powered by Aplora Revenue Intelligence
                </div>
              </div>
            </div>
            <div style={{
              fontSize: 12, fontWeight: 500,
              color: "rgba(255,255,255,0.45)",
              textAlign: "right", letterSpacing: "0.04em",
            }}>
              Prepared April 10, 2026<br />
              <span style={{ color: "rgba(255,255,255,0.3)" }}>Q1 2026 Review</span>
            </div>
          </div>
          <div style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: 32, color: "#fff",
            lineHeight: 1.15, letterSpacing: "-0.02em", marginBottom: 8,
          }}>
            CK Marketing: 5 Revenue Signals<br />That Need Action This Week
          </div>
          <div style={{
            fontSize: 15, color: "rgba(255,255,255,0.6)", fontWeight: 400, maxWidth: 620,
          }}>
            Extracted from your Aplora Marketing Dashboard. Each insight includes{" "}
            <strong style={{ color: "#faa840", fontWeight: 600 }}>what we found</strong>,{" "}
            <strong style={{ color: "#faa840", fontWeight: 600 }}>why it matters</strong>, and{" "}
            <strong style={{ color: "#faa840", fontWeight: 600 }}>what to do next</strong> for both sales and marketing.
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: "36px 48px 40px" }}>
          {/* Stats Bar */}
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
            gap: 1, background: "rgba(16,45,80,0.06)",
            borderRadius: 10, overflow: "hidden", marginBottom: 28,
          }}>
            {CK_INSIGHTS.stats.map((stat, i) => (
              <div key={i} style={{
                background: "#fff", padding: "16px 20px", textAlign: "center",
              }}>
                <div style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontSize: 22, lineHeight: 1, letterSpacing: "-0.02em",
                  color: stat.variant === "alert" ? "#ef4537"
                    : stat.variant === "positive" ? "#16a34a"
                    : "#102d50",
                }}>
                  {stat.value}
                </div>
                <div style={{
                  fontSize: 10, fontWeight: 600, textTransform: "uppercase",
                  letterSpacing: "0.06em", color: "#64748b", marginTop: 4,
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Section: Immediate Priority */}
          <div style={{
            fontSize: 10, fontWeight: 700, textTransform: "uppercase",
            letterSpacing: "0.12em", color: "#64748b",
            marginBottom: 20, display: "flex", alignItems: "center", gap: 10,
          }}>
            Immediate Priority
            <span style={{ flex: 1, height: 1, background: "rgba(16,45,80,0.1)" }} />
          </div>

          {CK_INSIGHTS.insights.slice(0, 2).map((insight, i) => (
            <InsightCard key={i} insight={insight} index={i} />
          ))}

          {/* Priority Break */}
          <div style={{
            display: "flex", alignItems: "center", gap: 12,
            margin: "28px 0 20px",
          }}>
            <span style={{ flex: 1, height: 1, background: "rgba(16,45,80,0.1)" }} />
            <span style={{
              fontSize: 9, fontWeight: 700, textTransform: "uppercase",
              letterSpacing: "0.12em", color: "#64748b", whiteSpace: "nowrap",
            }}>
              Strategic Opportunities
            </span>
            <span style={{ flex: 1, height: 1, background: "rgba(16,45,80,0.1)" }} />
          </div>

          {CK_INSIGHTS.insights.slice(2).map((insight, i) => (
            <InsightCard key={i + 2} insight={insight} index={i + 2} />
          ))}
        </div>

        {/* Footer */}
        <div style={{
          padding: "20px 48px 32px",
          display: "flex", justifyContent: "space-between", alignItems: "flex-end",
          borderTop: "1px solid rgba(16,45,80,0.1)",
          margin: "0 48px",
        }}>
          <div style={{ fontSize: 11, color: "#64748b", lineHeight: 1.6 }}>
            <strong style={{ color: "#102d50", fontWeight: 600 }}>Prepared for CK Marketing</strong> by PerformanceLabs.ai<br />
            Data source: Aplora Revenue Intelligence Dashboard | Q1 2026
          </div>
          <div style={{ fontSize: 11, fontWeight: 600, color: "#faa840", textAlign: "right" }}>
            Questions? Let&apos;s dig in together.
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ClientStatusReport() {
  const [expandedId, setExpandedId] = useState(null);
  const [showNotes, setShowNotes] = useState(false);
  const [showInsights, setShowInsights] = useState(false);
  const activeMilestone = milestones.find((m) => m.status === "active");
  const milestonesWithNotes = milestones.filter((m) => m.meetingNotes);

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
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes modalSlideIn {
          from { opacity: 0; transform: translateY(16px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
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
                PerformanceLabs.ai + Aplora.ai | Forward-Deployed Execution
              </div>
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{
              fontSize: 11, color: BRAND.white, letterSpacing: "0.03em",
            }}>
              Week 7 of 8 | Meeting: Friday 4/17
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 8, justifyContent: "flex-end" }}>
              <a
                href="https://www.dropbox.com/scl/fi/2rc0pyz1cwwmawrfndsy1/CK_Marketing_Exec_Briefing.pdf?rlkey=ezxsw2e14h9thos387aq6r652&st=6tipa2c9&dl=0"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: "6px 14px",
                  fontSize: 11, fontWeight: 600, letterSpacing: "0.04em",
                  color: BRAND.orange, background: "rgba(250,168,64,0.1)",
                  border: `1px solid rgba(250,168,64,0.25)`,
                  borderRadius: 6, cursor: "pointer",
                  transition: "all 0.2s",
                  textDecoration: "none",
                  display: "inline-flex", alignItems: "center",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(250,168,64,0.18)";
                  e.currentTarget.style.borderColor = "rgba(250,168,64,0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(250,168,64,0.1)";
                  e.currentTarget.style.borderColor = "rgba(250,168,64,0.25)";
                }}
              >
                Exec Briefing
              </a>
              <button
                onClick={() => setShowInsights(true)}
                style={{
                  padding: "6px 14px",
                  fontSize: 11, fontWeight: 600, letterSpacing: "0.04em",
                  color: BRAND.orange, background: "rgba(250,168,64,0.1)",
                  border: `1px solid rgba(250,168,64,0.25)`,
                  borderRadius: 6, cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(250,168,64,0.18)";
                  e.currentTarget.style.borderColor = "rgba(250,168,64,0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(250,168,64,0.1)";
                  e.currentTarget.style.borderColor = "rgba(250,168,64,0.25)";
                }}
              >
                CK Insights
              </button>
              {milestonesWithNotes.length > 0 && (
                <button
                  onClick={() => setShowNotes(true)}
                  style={{
                    padding: "6px 14px",
                    fontSize: 11, fontWeight: 600, letterSpacing: "0.04em",
                    color: BRAND.orange, background: "rgba(250,168,64,0.1)",
                    border: `1px solid rgba(250,168,64,0.25)`,
                    borderRadius: 6, cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(250,168,64,0.18)";
                    e.currentTarget.style.borderColor = "rgba(250,168,64,0.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(250,168,64,0.1)";
                    e.currentTarget.style.borderColor = "rgba(250,168,64,0.25)";
                  }}
                >
                  Meeting Notes
                </button>
              )}
            </div>
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
          PerformanceLabs.ai | Confidential
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
            Current
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

      {showInsights && (
        <CKInsightsModal onClose={() => setShowInsights(false)} />
      )}

      {showNotes && milestonesWithNotes.length > 0 && (
        <MeetingNotesModal
          milestonesWithNotes={milestonesWithNotes}
          onClose={() => setShowNotes(false)}
        />
      )}
    </div>
  );
}
