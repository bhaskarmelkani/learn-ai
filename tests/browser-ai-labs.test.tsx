import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserLLMLab } from "../src/components/interactive/BrowserLLMLab";
import { ContextBudgetLab } from "../src/components/interactive/ContextBudgetLab";
import { EmbeddingSimilarityLab } from "../src/components/interactive/EmbeddingSimilarityLab";
import { RetrievalVsModelOnlyLab } from "../src/components/interactive/RetrievalVsModelOnlyLab";
import { SemanticSearchLab } from "../src/components/interactive/SemanticSearchLab";
import { TokenizerArena } from "../src/components/interactive/TokenizerArena";
import { useBrowserAI } from "../src/lib/browser-ai";
import { disposeMockTask } from "../src/lib/browser-ai/mock";

declare global {
  interface Window {
    __LEARN_AI_BROWSER_AI_MOCK__?: boolean;
  }
}

function BrowserAIHarness() {
  const tokenLab = useBrowserAI("tokenize");

  return (
    <div>
      <p>phase: {tokenLab.phase}</p>
      <p>loaded: {tokenLab.isLoaded ? "yes" : "no"}</p>
      <button type="button" onClick={() => void tokenLab.load()}>
        load
      </button>
      <button
        type="button"
        onClick={() => void tokenLab.run({ text: "Token budgets matter." })}
      >
        run
      </button>
      <button type="button" onClick={() => void tokenLab.dispose()}>
        dispose
      </button>
      <p>result: {tokenLab.lastResult?.comparisons[0]?.label ?? "none"}</p>
    </div>
  );
}

describe("browser AI labs", () => {
  beforeEach(() => {
    disposeMockTask();
    window.__LEARN_AI_BROWSER_AI_MOCK__ = true;
  });

  afterEach(() => {
    disposeMockTask();
    window.__LEARN_AI_BROWSER_AI_MOCK__ = false;
  });

  it("moves the shared hook through load, run, and dispose in mock mode", async () => {
    const user = userEvent.setup();
    render(<BrowserAIHarness />);

    await user.click(screen.getByRole("button", { name: /load/i }));
    await waitFor(() => {
      expect(screen.getByText(/phase: ready/i)).toBeInTheDocument();
      expect(screen.getByText(/loaded: yes/i)).toBeInTheDocument();
    });

    await user.click(screen.getByRole("button", { name: /^run$/i }));
    await waitFor(() => {
      expect(screen.getByText(/result: GPT-4o tokenizer/i)).toBeInTheDocument();
    });

    await user.click(screen.getByRole("button", { name: /dispose/i }));
    await waitFor(() => {
      expect(screen.getByText(/phase: idle/i)).toBeInTheDocument();
      expect(screen.getByText(/loaded: no/i)).toBeInTheDocument();
    });
  });

  it("renders tokenizer comparison results", async () => {
    const user = userEvent.setup();
    render(<TokenizerArena />);

    await user.click(
      screen.getByRole("button", { name: /compare tokenization/i })
    );

    await waitFor(() => {
      expect(screen.getAllByText(/GPT-4o tokenizer/i).length).toBeGreaterThan(
        0
      );
      expect(screen.getAllByText(/SmolLM tokenizer/i).length).toBeGreaterThan(
        0
      );
    });
  });

  it("renders context budget results", async () => {
    const user = userEvent.setup();
    render(<ContextBudgetLab />);

    await user.click(screen.getByRole("button", { name: /analyze budget/i }));

    await waitFor(() => {
      expect(screen.getByText(/GPT-4o tokenizer/i)).toBeInTheDocument();
      expect(screen.getAllByText(/Chat overhead:/i).length).toBeGreaterThan(0);
    });
  });

  it("renders the tiny browser llm output in mock mode", async () => {
    const user = userEvent.setup();
    render(<BrowserLLMLab />);

    await user.click(screen.getByRole("button", { name: /run prompt/i }));

    await waitFor(() => {
      expect(screen.getByText(/Mock local answer:/i)).toBeInTheDocument();
    });
  });

  it("renders embedding similarity neighbors", async () => {
    const user = userEvent.setup();
    render(<EmbeddingSimilarityLab />);

    await user.click(screen.getByRole("button", { name: /embed this set/i }));

    await waitFor(() => {
      expect(screen.getAllByText(/Cosine similarity/i).length).toBeGreaterThan(
        0
      );
    });
  });

  it("renders semantic search rankings", async () => {
    const user = userEvent.setup();
    render(<SemanticSearchLab />);

    await user.click(screen.getByRole("button", { name: /run search/i }));

    await waitFor(() => {
      expect(screen.getAllByText(/Similarity/i).length).toBeGreaterThan(0);
    });
  });

  it("renders retrieval vs model-only comparison", async () => {
    const user = userEvent.setup();
    render(<RetrievalVsModelOnlyLab />);

    await user.click(screen.getByRole("button", { name: /run comparison/i }));

    await waitFor(() => {
      expect(screen.getAllByText(/Mock local answer:/i).length).toBeGreaterThan(
        0
      );
      expect(screen.getByText(/Retrieved source titles/i)).toBeInTheDocument();
    });
  });
});
