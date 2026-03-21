import { getTrackLabel } from "../src/learning/LearningContext";

describe("getTrackLabel", () => {
  it("returns the conceptual label", () => {
    expect(getTrackLabel("conceptual")).toBe("Conceptual");
  });

  it("returns the builder label", () => {
    expect(getTrackLabel("builder")).toBe("Builder");
  });
});
