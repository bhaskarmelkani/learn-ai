import { onboardingFormSchema } from "../src/features/agent-ready";

describe("onboardingFormSchema", () => {
  it("accepts a valid learner profile", () => {
    const result = onboardingFormSchema.safeParse({
      learnerName: "Priya",
      role: "pm",
      goal: "Understand AI concepts well enough to review feature work confidently.",
      track: "conceptual",
      guidedMode: true,
    });

    expect(result.success).toBe(true);
  });

  it("rejects short form submissions", () => {
    const result = onboardingFormSchema.safeParse({
      learnerName: "P",
      role: "pm",
      goal: "Too short",
      track: "conceptual",
      guidedMode: true,
    });

    expect(result.success).toBe(false);
  });
});
