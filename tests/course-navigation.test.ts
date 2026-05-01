import {
  findNearestChapterNumber,
  resolveChapterNumber,
} from "../src/courses/navigation";

const chapters = [{ chapter: 1 }, { chapter: 3 }, { chapter: 5 }, { chapter: 8 }];

describe("course navigation helpers", () => {
  it("returns the exact chapter when it exists", () => {
    expect(findNearestChapterNumber(chapters, 5)).toBe(5);
  });

  it("returns the nearest valid chapter when the request is between chapters", () => {
    expect(findNearestChapterNumber(chapters, 6)).toBe(5);
    expect(findNearestChapterNumber(chapters, 7)).toBe(8);
  });

  it("falls back to the closest boundary chapter when out of range", () => {
    expect(findNearestChapterNumber(chapters, -10)).toBe(1);
    expect(findNearestChapterNumber(chapters, 99)).toBe(8);
  });

  it("uses the requested chapter before resume state", () => {
    expect(
      resolveChapterNumber({
        chapters,
        requestedChapter: 4,
        resumeChapter: 8,
      }),
    ).toBe(3);
  });

  it("uses resume state when no chapter is requested", () => {
    expect(
      resolveChapterNumber({
        chapters,
        requestedChapter: null,
        resumeChapter: 6,
      }),
    ).toBe(5);
  });

  it("falls back to the first chapter when neither request nor resume is available", () => {
    expect(
      resolveChapterNumber({
        chapters,
        requestedChapter: null,
        resumeChapter: null,
      }),
    ).toBe(1);
  });

  it("returns null when a course has no chapters", () => {
    expect(
      resolveChapterNumber({
        chapters: [],
        requestedChapter: 1,
        resumeChapter: 1,
      }),
    ).toBeNull();
  });
});
