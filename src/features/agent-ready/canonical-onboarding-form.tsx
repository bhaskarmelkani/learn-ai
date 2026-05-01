import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { onboardingFormSchema, type OnboardingFormValues } from "./types";

const defaultValues: OnboardingFormValues = {
  learnerName: "",
  role: "pm",
  goal: "",
  track: "conceptual",
  guidedMode: true,
};

const roles: Array<{ label: string; value: OnboardingFormValues["role"] }> = [
  { label: "Founder", value: "founder" },
  { label: "PM", value: "pm" },
  { label: "Engineer", value: "engineer" },
  { label: "Educator", value: "educator" },
];

const tracks: Array<{ label: string; value: OnboardingFormValues["track"] }> = [
  { label: "Conceptual", value: "conceptual" },
  { label: "Builder", value: "builder" },
];

function FieldError({ message }: { message?: string }) {
  if (!message) return null;

  return <p className="text-sm text-red-600 dark:text-red-300">{message}</p>;
}

export function CanonicalOnboardingForm() {
  const [submitted, setSubmitted] = useState<OnboardingFormValues | null>(null);
  const form = useForm<OnboardingFormValues>({
    resolver: zodResolver(onboardingFormSchema),
    defaultValues,
  });
  const selectedRole = useWatch({ control: form.control, name: "role" });
  const selectedTrack = useWatch({ control: form.control, name: "track" });

  const onSubmit = form.handleSubmit((values) => {
    setSubmitted(values);
  });

  return (
    <Card className="border-stone-200/80 bg-white/95 shadow-sm dark:border-gray-800 dark:bg-gray-950/90">
      <CardHeader>
        <div className="flex flex-wrap items-center gap-2">
          <Badge
            variant="outline"
            className="border-cyan-200 text-cyan-800 dark:border-cyan-500/30 dark:text-cyan-200"
          >
            Canonical form
          </Badge>
          <Badge variant="secondary">react-hook-form + zod</Badge>
        </div>
        <CardTitle>Learning onboarding</CardTitle>
        <CardDescription>
          Canonical pattern for new forms in this repo: typed schema, clear guidance,
          accessible labels, and concise feedback.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-6" onSubmit={onSubmit} noValidate>
          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="learnerName">Learner name</Label>
              <Input
                id="learnerName"
                {...form.register("learnerName")}
                aria-invalid={Boolean(form.formState.errors.learnerName)}
                placeholder="Priya"
              />
              <FieldError message={form.formState.errors.learnerName?.message} />
            </div>

            <div className="space-y-2">
              <Label>Primary role</Label>
              <div className="flex flex-wrap gap-2">
                {roles.map((role) => (
                  <button
                    key={role.value}
                    type="button"
                    onClick={() =>
                      form.setValue("role", role.value, { shouldValidate: true })
                    }
                    className={cn(
                      "rounded-full border px-3 py-1.5 text-sm transition-colors",
                      selectedRole === role.value
                        ? "border-cyan-500 bg-cyan-50 text-cyan-900 dark:border-cyan-400/40 dark:bg-cyan-500/10 dark:text-cyan-100"
                        : "border-stone-200 bg-stone-50 text-stone-700 hover:border-stone-300 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300"
                    )}
                  >
                    {role.label}
                  </button>
                ))}
              </div>
              <FieldError message={form.formState.errors.role?.message} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="goal">What should this learner leave able to do?</Label>
            <Textarea
              id="goal"
              {...form.register("goal")}
              aria-invalid={Boolean(form.formState.errors.goal)}
              placeholder="Understand the model lifecycle well enough to scope a product requirement and review the output of an agent-built prototype."
            />
            <FieldError message={form.formState.errors.goal?.message} />
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Preferred track</Label>
              <div className="grid gap-2">
                {tracks.map((track) => (
                  <label
                    key={track.value}
                    className={cn(
                      "flex cursor-pointer items-start gap-3 rounded-2xl border px-4 py-3 transition-colors",
                      selectedTrack === track.value
                        ? "border-cyan-500 bg-cyan-50 dark:border-cyan-400/40 dark:bg-cyan-500/10"
                        : "border-stone-200 bg-stone-50 dark:border-gray-800 dark:bg-gray-900"
                    )}
                  >
                    <input
                      type="radio"
                      value={track.value}
                      className="mt-1"
                      {...form.register("track")}
                    />
                    <span>
                      <span className="block font-medium text-stone-900 dark:text-white">
                        {track.label}
                      </span>
                      <span className="block text-sm text-stone-600 dark:text-gray-400">
                        {track.value === "conceptual"
                          ? "Best for strategy, product, and intuition-first learning."
                          : "Best for implementation details, notebooks, and mechanics."}
                      </span>
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Learning mode</Label>
              <label className="flex items-start gap-3 rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 dark:border-gray-800 dark:bg-gray-900">
                <input type="checkbox" className="mt-1" {...form.register("guidedMode")} />
                <span>
                  <span className="block font-medium text-stone-900 dark:text-white">
                    Start in guided mode
                  </span>
                  <span className="block text-sm text-stone-600 dark:text-gray-400">
                    Prompts learners to predict before they unlock controls in interactive demos.
                  </span>
                </span>
              </label>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col items-start justify-between gap-3 md:flex-row md:items-center">
        <div className="text-sm text-stone-600 dark:text-gray-400">
          Use this as the base pattern for onboarding, admin settings, and learner preference forms.
        </div>
        <Button onClick={onSubmit}>Save learner profile</Button>
      </CardFooter>
      {submitted && (
        <div className="border-t border-stone-200 px-4 py-4 text-sm dark:border-gray-800">
          <p className="font-medium text-stone-900 dark:text-white">Submitted preview</p>
          <pre className="mt-2 overflow-x-auto rounded-xl bg-stone-950 p-3 text-xs text-stone-100">
            {JSON.stringify(submitted, null, 2)}
          </pre>
        </div>
      )}
    </Card>
  );
}
