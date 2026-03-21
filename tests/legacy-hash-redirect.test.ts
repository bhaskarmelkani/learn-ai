import { applyLegacyHashRedirect } from "../src/pages/LegacyHashRedirect";

describe("applyLegacyHashRedirect", () => {
  const originalReplaceState = window.history.replaceState;

  beforeEach(() => {
    window.history.replaceState = vi.fn();
  });

  afterEach(() => {
    window.history.replaceState = originalReplaceState;
    // Reset hash
    window.location.hash = "";
  });

  it("rewrites #chapter-3-some-slug to /courses/ai-fundamentals/3", () => {
    window.location.hash = "#chapter-3-some-slug";
    applyLegacyHashRedirect();
    expect(window.history.replaceState).toHaveBeenCalledWith(
      null,
      "",
      "/courses/ai-fundamentals/3",
    );
  });

  it("rewrites #chapter-10-from-text-to-llms correctly", () => {
    window.location.hash = "#chapter-10-from-text-to-llms";
    applyLegacyHashRedirect();
    expect(window.history.replaceState).toHaveBeenCalledWith(
      null,
      "",
      "/courses/ai-fundamentals/10",
    );
  });

  it("does nothing when there is no hash", () => {
    window.location.hash = "";
    applyLegacyHashRedirect();
    expect(window.history.replaceState).not.toHaveBeenCalled();
  });

  it("does nothing for a non-chapter hash", () => {
    window.location.hash = "#something-else";
    applyLegacyHashRedirect();
    expect(window.history.replaceState).not.toHaveBeenCalled();
  });
});
