import type { RetrievalDocument, RetrievedDocument } from "./types";

export function cosineSimilarity(left: number[], right: number[]) {
  if (!left.length || !right.length || left.length !== right.length) return 0;

  let dot = 0;
  let leftNorm = 0;
  let rightNorm = 0;

  for (let index = 0; index < left.length; index += 1) {
    dot += left[index] * right[index];
    leftNorm += left[index] ** 2;
    rightNorm += right[index] ** 2;
  }

  const denominator = Math.sqrt(leftNorm) * Math.sqrt(rightNorm);
  return denominator === 0 ? 0 : dot / denominator;
}

export function rankBySimilarity(
  queryVector: number[],
  documentVectors: number[][],
  documents: RetrievalDocument[],
  topK: number,
) {
  const ranked = documents
    .map((document, index) => ({
      ...document,
      score: cosineSimilarity(queryVector, documentVectors[index] ?? []),
    }))
    .sort((left, right) => right.score - left.score)
    .slice(0, topK);

  return ranked satisfies RetrievedDocument[];
}
