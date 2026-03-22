# Browser AI Labs

Use this workflow when adding or revising browser-only AI labs in the learning product.

## Approved Stack

- `@huggingface/transformers` for browser inference
- `gpt-tokenizer` for GPT-style token counting
- in-app cosine similarity for small in-browser retrieval demos

## Core Rules

- Keep the experience static-hosting compatible
- Do not require a backend or API keys
- Do not vendor model weights into the repo
- Prefer first-run downloads with browser caching
- Run heavy inference in Web Workers, not directly in React components
- Reuse the shared runtime in `src/lib/browser-ai/`

## Default Coverage

- tokenization
- context budgets
- embeddings
- semantic search
- retrieval vs model-only comparisons
- tiny local text generation

## Quality Bar

- loading, offline, unsupported-browser, and failure states are visible to learners
- copy makes the local-model limitations explicit
- labs reinforce the chapter concept rather than becoming a generic playground
