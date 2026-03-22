---
name: browser-ai-labs
description: Build and review browser-only AI teaching labs that stay static-hosting safe, worker-first, cache-aware, and reusable across courses.
---

# browser-ai-labs

Use this skill when adding or revising browser-only AI labs in this repo.

## Approved Stack

- use `@huggingface/transformers` for browser inference
- use `gpt-tokenizer` for GPT-style token counting and chat-overhead demos
- use in-app cosine similarity for small educational datasets
- reserve `USearch` or larger vector indexes for future scale work, not the default course demos

## Core Constraints

- the project must stay fully static-hosting compatible, including GitHub Pages
- do not require a backend, proxy, or API keys
- do not vendor model weights into the repo
- prefer remote first-run downloads with browser caching
- default to WASM-safe behavior and treat WebGPU as an optional upgrade, not a requirement

## Runtime Rules

1. Put shared browser AI code under `src/lib/browser-ai/`.
2. Run heavy inference in Web Workers, not directly in React components.
3. Reuse the shared model registry and task surface:
   - `tokenize`
   - `countTokens`
   - `embed`
   - `generate`
   - `retrieve`
4. Reuse the shared hook layer before adding one-off browser AI state machines in components.
5. Include loading, offline, unsupported-browser, and model-download failure states in learner-facing copy.
6. Add or preserve mock-mode support so CI and Playwright can verify the shell without live downloads.

## Default Models

- tiny generation: `onnx-community/SmolLM2-135M-Instruct-ONNX-MHA`
- embeddings: `mixedbread-ai/mxbai-embed-xsmall-v1`
- tokenizer comparison:
  - `gpt-tokenizer` for GPT-style token counting
  - model-native tokenizer for SmolLM
  - BERT tokenizer for comparison

## Course Mapping

- `gen-ai-intuition`
  - chapter 2: `TokenizerArena`, `ContextBudgetLab`
  - chapters 3 and 4: `BrowserLLMLab`
  - chapter 6: `SemanticSearchLab`, `RetrievalVsModelOnlyLab`
- `ai-fundamentals`
  - chapter 10: `TokenizerArena`, `ContextBudgetLab`, `EmbeddingSimilarityLab`
  - chapter 12: `SemanticSearchLab`, `RetrievalVsModelOnlyLab`
  - chapter 13: reference the retrieval and system-layer labs in the capstone framing

## Review Checklist

- reuse an existing browser-AI lab before creating a new bespoke interactive
- keep explanatory text concept-first and beginner-readable
- show what the learner should notice after each run
- verify mobile layout and dark mode
- verify that the lab still makes sense when the browser runs in mock mode
