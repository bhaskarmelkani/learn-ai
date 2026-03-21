import type { LearningTrack } from "./types";

export const learningTracks: LearningTrack[] = [
  {
    id: "ai-foundations",
    title: "AI Foundations",
    shortTitle: "Foundations",
    profession: "foundations",
    tagline: "Build shared intuition before you specialize.",
    description:
      "Start here when you want durable mental models, clear vocabulary, and a common baseline across engineering, product, and business teams.",
    levels: {
      conceptual: {
        label: "Conceptual",
        audience: "Cross-functional learners, workshop groups, and anyone new to AI systems.",
        description:
          "Learn the core ideas behind models, training, classification, neural networks, and LLMs through short chapters and interactive demos.",
        outcomes: [
          "Explain AI systems in terms of inputs, outputs, architectures, and learned parameters.",
          "Build intuition for training loops, loss, gradient descent, and non-linearity.",
          "Connect core ML ideas to the behavior of modern LLMs.",
        ],
        plannedModules: [
          {
            title: "Models and Parameters",
            summary: "Define what a model is and why learned numbers matter.",
          },
          {
            title: "Regression and Optimization",
            summary: "Turn intuition into trainable functions and error minimization.",
          },
          {
            title: "Classification and Decision Boundaries",
            summary: "See how models separate classes and why probabilities matter.",
          },
          {
            title: "Neural Networks and Training",
            summary: "Move from hand-designed functions to learned feature hierarchies.",
          },
          {
            title: "From Neural Nets to LLMs",
            summary: "Translate the same mental models into sequence prediction systems.",
          },
        ],
        contributionPrompt:
          "Favor analogies, clear diagrams, and interactive checkpoints over dense jargon.",
      },
      builder: {
        label: "Builder",
        audience: "Learners preparing to prototype, evaluate, or ship AI-enabled systems.",
        description:
          "Turn intuition into execution by focusing on workflows, evaluation habits, and product delivery choices.",
        outcomes: [
          "Scope an AI feature in terms of problem framing, context, data, evaluation, and risk.",
          "Choose between prompting, retrieval, fine-tuning, and workflow automation with clear trade-offs.",
          "Define the minimum set of evals, safeguards, and operating metrics before launch.",
        ],
        plannedModules: [
          {
            title: "Prototype Shape",
            summary: "Decide what the system should automate, assist, or generate.",
          },
          {
            title: "Context and Data Flow",
            summary: "Map the inputs, retrieval sources, and memory boundaries of the product.",
          },
          {
            title: "Evaluation and Review",
            summary: "Build simple eval loops before scaling usage or complexity.",
          },
          {
            title: "Guardrails and Failure Modes",
            summary: "Plan for misuse, hallucination, leakage, and trust breakdowns.",
          },
          {
            title: "Operational Handoff",
            summary: "Move from prototype intuition to maintainable delivery practices.",
          },
        ],
        contributionPrompt:
          "Favor decision frameworks, reviewable deliverables, and real implementation trade-offs.",
      },
    },
  },
  {
    id: "ai-for-engineering",
    title: "AI for Engineering",
    shortTitle: "Engineering",
    profession: "engineering",
    tagline: "Help engineers design, ship, and maintain AI systems.",
    description:
      "This track centers on architecture, evaluation, reliability, and the boundary between model behavior and application behavior.",
    levels: {
      conceptual: {
        label: "Conceptual",
        audience: "Engineers who need a strong systems view before implementing AI features.",
        description:
          "Learn how AI changes application architecture, observability, and system boundaries.",
        outcomes: [
          "Separate model concerns from product, infrastructure, and data-pipeline concerns.",
          "Reason about latency, cost, determinism, and failure surfaces in AI applications.",
          "Choose the right technical pattern for a given problem shape.",
        ],
        plannedModules: [
          {
            title: "AI System Boundaries",
            summary: "Where prompt logic ends and application logic begins.",
          },
          {
            title: "Retrieval, Tools, and Memory",
            summary: "How context enters the system and what should stay external.",
          },
          {
            title: "Evaluation as Engineering",
            summary: "Why evals deserve the same rigor as tests and metrics.",
          },
          {
            title: "Reliability and Observability",
            summary: "What to log, inspect, and review when outputs are probabilistic.",
          },
        ],
        contributionPrompt:
          "Translate AI choices into architectural implications that engineers can act on immediately.",
      },
      builder: {
        label: "Builder",
        audience: "Engineers implementing production workflows, assistants, or copilots.",
        description:
          "Go deeper on concrete system patterns, eval harnesses, rollout plans, and maintainability.",
        outcomes: [
          "Build an end-to-end prototype with clear boundaries, retrieval, and review loops.",
          "Instrument AI features with offline and online evaluation signals.",
          "Roll out safely with fallback paths and operational playbooks.",
        ],
        plannedModules: [
          {
            title: "Service Skeleton",
            summary: "Set up the minimal runtime, prompts, and context pipeline.",
          },
          {
            title: "Eval Harness",
            summary: "Create regression checks for prompts, retrieval, and outputs.",
          },
          {
            title: "Human Review Workflow",
            summary: "Design escalation and override paths for low-confidence cases.",
          },
          {
            title: "Production Hardening",
            summary: "Handle cost controls, rate limits, and model-version changes.",
          },
        ],
        contributionPrompt:
          "Use code-adjacent examples, operational checklists, and realistic implementation decisions.",
      },
    },
  },
  {
    id: "ai-for-product",
    title: "AI for Product",
    shortTitle: "Product",
    profession: "product",
    tagline: "Teach product teams how to shape useful AI experiences.",
    description:
      "This track focuses on use-case selection, UX design, measurement, and cross-functional delivery for AI products.",
    levels: {
      conceptual: {
        label: "Conceptual",
        audience: "PMs, designers, and product strategists exploring where AI fits.",
        description:
          "Learn how AI changes problem framing, user experience, and product strategy.",
        outcomes: [
          "Recognize strong AI use cases and avoid novelty-driven roadmaps.",
          "Frame UX around confidence, review, and human-in-the-loop control.",
          "Define success beyond demos by linking model behavior to user value.",
        ],
        plannedModules: [
          {
            title: "Use-Case Discovery",
            summary: "Find problems where probabilistic systems are genuinely helpful.",
          },
          {
            title: "AI UX Patterns",
            summary: "Design around transparency, confidence, and iterative refinement.",
          },
          {
            title: "Metrics That Matter",
            summary: "Pair quality signals with adoption, trust, and outcome metrics.",
          },
          {
            title: "Cross-Functional Delivery",
            summary: "Coordinate product, engineering, and business expectations.",
          },
        ],
        contributionPrompt:
          "Keep the material grounded in decision quality, user trust, and outcome-oriented thinking.",
      },
      builder: {
        label: "Builder",
        audience: "Product teams turning AI ideas into scoped bets and shipping plans.",
        description:
          "Convert AI opportunities into PRDs, experiments, review loops, and rollout strategy.",
        outcomes: [
          "Write a scoped AI PRD with constraints, evals, and human review requirements.",
          "Prioritize experiments that de-risk usefulness, quality, and trust.",
          "Drive launch readiness with measurable adoption and quality gates.",
        ],
        plannedModules: [
          {
            title: "PRD for AI Features",
            summary: "Capture ambiguity, safeguards, and operating assumptions explicitly.",
          },
          {
            title: "Experiment Design",
            summary: "Sequence prototypes and pilots to learn before scaling.",
          },
          {
            title: "Feedback Operations",
            summary: "Turn human review and user corrections into product learning loops.",
          },
          {
            title: "Rollout and Governance",
            summary: "Coordinate launch criteria across product, legal, and operations.",
          },
        ],
        contributionPrompt:
          "Bias toward practical artifacts such as PRDs, scorecards, and rollout checklists.",
      },
    },
  },
  {
    id: "ai-for-business",
    title: "AI for Business",
    shortTitle: "Business",
    profession: "business",
    tagline: "Help business teams evaluate, adopt, and operationalize AI.",
    description:
      "This track focuses on value creation, operating models, risk, and adoption for business stakeholders.",
    levels: {
      conceptual: {
        label: "Conceptual",
        audience: "Operators, leaders, and business stakeholders who need a strategic view.",
        description:
          "Understand where AI creates leverage, what it changes in workflows, and where it can go wrong.",
        outcomes: [
          "Evaluate AI opportunities in terms of value, feasibility, and organizational fit.",
          "Spot the difference between compelling demos and durable business capability.",
          "Discuss AI trade-offs clearly with technical and non-technical stakeholders.",
        ],
        plannedModules: [
          {
            title: "Value Pools and Workflow Leverage",
            summary: "Find where AI improves speed, quality, or coverage in business operations.",
          },
          {
            title: "Risk and Governance",
            summary: "Understand trust, compliance, privacy, and decision accountability.",
          },
          {
            title: "Operating Model Changes",
            summary: "See how roles, review loops, and incentives shift with AI adoption.",
          },
          {
            title: "Buying Versus Building",
            summary: "Compare vendor options with internal capabilities and constraints.",
          },
        ],
        contributionPrompt:
          "Anchor every topic in operational reality, measurable outcomes, and adoption constraints.",
      },
      builder: {
        label: "Builder",
        audience: "Business teams creating AI adoption plans, pilots, and governance loops.",
        description:
          "Move from strategy to execution with pilot plans, KPI design, vendor evaluation, and change management.",
        outcomes: [
          "Turn AI opportunities into business cases with explicit assumptions and guardrails.",
          "Run pilots with clear KPIs, ownership, and escalation paths.",
          "Set up adoption rhythms that turn experiments into durable capability.",
        ],
        plannedModules: [
          {
            title: "Business Case Design",
            summary: "Define ROI logic, assumptions, constraints, and decision thresholds.",
          },
          {
            title: "Pilot Governance",
            summary: "Set ownership, review cadence, and risk controls before launch.",
          },
          {
            title: "Vendor Evaluation",
            summary: "Compare tools using workflow fit, data posture, and operating costs.",
          },
          {
            title: "Change Management",
            summary: "Plan enablement, training, and process updates for adoption.",
          },
        ],
        contributionPrompt:
          "Use business artifacts such as scorecards, pilot briefs, and executive updates.",
      },
    },
  },
];
