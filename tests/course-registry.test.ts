import { readdirSync } from "node:fs";
import { join } from "node:path";
import {
  courses,
  getCourse,
  getFirstChapterNumber,
} from "../src/courses/registry";

describe("course registry", () => {
  it("discovers at least one course manifest", () => {
    expect(courses.length).toBeGreaterThanOrEqual(1);
  });

  it("includes ai-fundamentals", () => {
    const aiFund = courses.find((c) => c.slug === "ai-fundamentals");
    expect(aiFund).toBeDefined();
    expect(aiFund!.title).toBe("AI Foundations");
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

  it("keeps ai-fundamentals chapter files sequential and aligned to the manifest", () => {
    const chaptersDir = join(
      process.cwd(),
      "src",
      "courses",
      "ai-fundamentals",
      "chapters",
    );
    const chapterFiles = readdirSync(chaptersDir)
      .filter((file) => file.endsWith(".mdx"))
      .sort();

    expect(chapterFiles).toHaveLength(13);
    expect(chapterFiles[0]).toMatch(/^01-/);
    expect(chapterFiles[12]).toMatch(/^13-/);
    expect(chapterFiles.map((file) => Number(file.slice(0, 2)))).toEqual([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,
    ]);
    expect(getCourse("ai-fundamentals")?.chapterCount).toBe(chapterFiles.length);
  });
});
