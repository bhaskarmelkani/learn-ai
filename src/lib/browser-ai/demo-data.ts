import type { RetrievalDocument } from "./types";

export interface PromptScenario {
  betterPrompt: string;
  context: string;
  name: string;
  vaguePrompt: string;
  whatToNotice: string[];
}

export interface RetrievalScenario {
  documents: RetrievalDocument[];
  expectedSourceHint: string;
  name: string;
  question: string;
}

export const PROMPT_SCENARIOS: PromptScenario[] = [
  {
    name: "Meeting summary",
    context:
      "We agreed to launch the beta on April 18 if legal finishes the revised terms. Priya will update the onboarding checklist. We are still blocked on the CRM export. Dan will confirm whether sales needs a separate email sequence.",
    vaguePrompt:
      "Summarize this meeting.\n\nNotes:\nWe agreed to launch the beta on April 18 if legal finishes the revised terms. Priya will update the onboarding checklist. We are still blocked on the CRM export. Dan will confirm whether sales needs a separate email sequence.",
    betterPrompt:
      "Summarize these meeting notes for a busy product manager. Use 4 bullets: decisions, blockers, owners, and next steps. If something is unclear, say so.\n\nNotes:\nWe agreed to launch the beta on April 18 if legal finishes the revised terms. Priya will update the onboarding checklist. We are still blocked on the CRM export. Dan will confirm whether sales needs a separate email sequence.",
    whatToNotice: [
      "The better prompt gives the model an audience and a structure.",
      "The vague prompt usually drifts toward generic prose.",
      "Small models often get noticeably better when the task shape is explicit.",
    ],
  },
  {
    name: "Research extraction",
    context:
      "The article argues that shorter support response times improved renewal rates, citing one quarter of data from enterprise customers and quoting two customer-success managers.",
    vaguePrompt:
      "Read this article and tell me the important parts.\n\nArticle:\nThe article argues that shorter support response times improved renewal rates, citing one quarter of data from enterprise customers and quoting two customer-success managers.",
    betterPrompt:
      "Read this article and extract 3 claims, the evidence for each, and one thing the article does not establish. Return a table with columns: claim, evidence, missing proof.\n\nArticle:\nThe article argues that shorter support response times improved renewal rates, citing one quarter of data from enterprise customers and quoting two customer-success managers.",
    whatToNotice: [
      "Extraction tasks become easier when the model is told exactly what fields to produce.",
      "A tiny local model may still struggle with formatting, but clearer prompts usually reduce drift.",
      "The output is still not guaranteed to be correct, even if it sounds confident.",
    ],
  },
  {
    name: "Delay email",
    context:
      "A third-party security review found an issue that needs one more week to fix before launch.",
    vaguePrompt:
      "Write an email about the delay.\n\nContext:\nA third-party security review found an issue that needs one more week to fix before launch.",
    betterPrompt:
      "Write a calm, direct email to a client explaining a one-week launch delay. Keep it under 140 words, name the cause, explain the impact, and end with one concrete next step.\n\nContext:\nA third-party security review found an issue that needs one more week to fix before launch.",
    whatToNotice: [
      "Length limits and audience clues reduce meandering.",
      "The better prompt gives the model a much clearer success condition.",
      "Tiny browser models can still sound awkward, which is part of the lesson here.",
    ],
  },
];

export const EMBEDDING_TEXT_GROUPS = [
  {
    name: "Animals and pets",
    texts: [
      "A golden retriever waiting by the front door",
      "A sleepy house cat on a windowsill",
      "A puppy chasing a tennis ball",
      "A kitten curled under a blanket",
      "Quarterly revenue guidance for the enterprise sales team",
      "How to plan the next board update for investors",
    ],
  },
  {
    name: "Support and policy",
    texts: [
      "Employees receive 12 vacation days in their first year",
      "Business plan includes SSO and audit logs",
      "Travel reimbursement limit is 180 euros per night",
      "New hires accrue vacation monthly",
      "A customer wants a faster refund for a duplicate charge",
      "Support agents should escalate billing fraud reports",
    ],
  },
] as const;

export const RETRIEVAL_SCENARIOS: RetrievalScenario[] = [
  {
    name: "Vacation policy",
    question: "How many vacation days do new employees get in their first year?",
    expectedSourceHint: "The handbook excerpt about 12 vacation days should rank first.",
    documents: [
      {
        id: "policy-vacation",
        title: "Employee handbook",
        text: "Full-time employees receive 12 vacation days in their first year, accrued at 1 day per month.",
      },
      {
        id: "policy-it",
        title: "IT security policy",
        text: "All laptops must use device encryption and automatic screen locking after 5 minutes.",
      },
      {
        id: "policy-travel",
        title: "Travel policy",
        text: "Hotel reimbursement is capped at 180 euros per night unless a director approves an exception.",
      },
    ],
  },
  {
    name: "Product pricing",
    question: "Does the Pro plan include SSO?",
    expectedSourceHint: "The pricing page showing Business includes SSO should rank first.",
    documents: [
      {
        id: "pricing-basic",
        title: "Pricing overview",
        text: "Pro includes unlimited projects and API access. Business adds SSO, audit logs, and admin controls.",
      },
      {
        id: "pricing-billing",
        title: "Billing FAQ",
        text: "Monthly plans can be upgraded at any time and are prorated for the remaining billing cycle.",
      },
      {
        id: "pricing-support",
        title: "Support article",
        text: "Business customers receive priority support and dedicated onboarding assistance.",
      },
    ],
  },
  {
    name: "Warranty lookup",
    question: "When does the warranty expire for order #A17?",
    expectedSourceHint: "The CRM order record with the 24-month warranty should rank first.",
    documents: [
      {
        id: "crm-a17",
        title: "CRM order A17",
        text: "Order #A17 was purchased on July 9, 2025. Warranty term: 24 months from purchase.",
      },
      {
        id: "crm-b04",
        title: "CRM order B04",
        text: "Order #B04 was purchased on October 14, 2024. Warranty term: 12 months from purchase.",
      },
      {
        id: "general-warranty",
        title: "Warranty policy",
        text: "Most consumer electronics products include a one-year limited warranty unless otherwise specified on the order record.",
      },
    ],
  },
];
