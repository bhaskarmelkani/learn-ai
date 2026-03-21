import { courses, getCourse, getFirstChapterNumber } from "../src/courses/registry";

describe("course registry", () => {
  it("discovers at least one course manifest", () => {
    expect(courses.length).toBeGreaterThanOrEqual(1);
  });

  it("includes ai-fundamentals", () => {
    const aiFund = courses.find((c) => c.slug === "ai-fundamentals");
    expect(aiFund).toBeDefined();
    expect(aiFund!.title).toBe("AI In-tuition");
    expect(aiFund!.chapterCount).toBe(13);
  });

  it("getCourse returns the manifest for a known slug", () => {
    const course = getCourse("ai-fundamentals");
    expect(course).toBeDefined();
    expect(course!.slug).toBe("ai-fundamentals");
  });

  it("getCourse returns undefined for an unknown slug", () => {
    expect(getCourse("nonexistent-course")).toBeUndefined();
  });

  it("getFirstChapterNumber defaults to 1 when chapters are not loaded", () => {
    expect(getFirstChapterNumber("ai-fundamentals")).toBe(1);
  });

  it("getFirstChapterNumber defaults to 1 for unknown course", () => {
    expect(getFirstChapterNumber("unknown")).toBe(1);
  });
});
