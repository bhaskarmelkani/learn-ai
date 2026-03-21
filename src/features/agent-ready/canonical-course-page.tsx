import { ArrowRightIcon, SparklesIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CanonicalOnboardingForm } from "./canonical-onboarding-form";
import { CanonicalProgressTable } from "./canonical-progress-table";
import { CanonicalReviewDialog } from "./canonical-review-dialog";

const principles = [
  "Narrative copy stays concise and educational, not dashboard-jargony.",
  "Interface chrome uses IBM Plex Sans while long-form learning copy stays editorial.",
  "Interactive surfaces are grouped into cards with obvious next actions.",
];

export function CanonicalCoursePage() {
  return (
    <section className="not-prose my-10 space-y-6 rounded-[2rem] border border-stone-200/80 bg-gradient-to-br from-stone-50 via-white to-cyan-50 p-6 shadow-sm dark:border-gray-800 dark:from-gray-950 dark:via-gray-950 dark:to-cyan-500/5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <Badge
              variant="outline"
              className="border-cyan-200 text-cyan-800 dark:border-cyan-500/30 dark:text-cyan-200"
            >
              Canonical page
            </Badge>
            <Badge variant="secondary">Agent copy target</Badge>
          </div>
          <h2 className="mt-4 text-3xl font-semibold text-stone-900 dark:text-white">
            Agent-ready course authoring surface
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-stone-600 dark:text-gray-400">
            This is the canonical composition pattern for new product surfaces in this repo: short framing, clear status, one primary action, and modular sections below.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button>
            Start authoring sprint
            <ArrowRightIcon className="size-4" />
          </Button>
          <Button variant="outline">
            <SparklesIcon className="size-4" />
            Review system rules
          </Button>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <Card className="border-stone-200/80 bg-white/90 dark:border-gray-800 dark:bg-gray-950/80">
          <CardHeader>
            <CardTitle>Canonical page rules</CardTitle>
            <CardDescription>
              Agents should mimic this structure before creating a new layout from scratch.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {principles.map((principle) => (
              <div
                key={principle}
                className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300"
              >
                {principle}
              </div>
            ))}
          </CardContent>
        </Card>

        <CanonicalReviewDialog />
      </div>

      <CanonicalOnboardingForm />
      <CanonicalProgressTable />
    </section>
  );
}
