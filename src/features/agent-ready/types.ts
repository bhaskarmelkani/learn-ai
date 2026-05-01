import { z } from "zod";

export const onboardingFormSchema = z.object({
  learnerName: z.string().min(2, "Enter at least 2 characters."),
  role: z.enum(["founder", "pm", "engineer", "educator"]),
  goal: z.string().min(12, "Share a bit more so the course can adapt."),
  track: z.enum(["conceptual", "builder"]),
  guidedMode: z.boolean(),
});

export type OnboardingFormValues = z.infer<typeof onboardingFormSchema>;

export type ProgressRow = {
  learner: string;
  track: "Conceptual" | "Builder";
  completion: string;
  checkpointAccuracy: string;
  nextAction: string;
};
