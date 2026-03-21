import { useMemo, useState } from "react";

/**
 * Simple BPE-style tokenizer for demonstration purposes.
 * Splits on whitespace, punctuation, and common subword boundaries
 * to give learners an intuitive feel for how tokenization works.
 */

const SUBWORD_SPLITS: Record<string, string[]> = {
  understanding: ["under", "standing"],
  tokenization: ["token", "ization"],
  embedding: ["embed", "ding"],
  transformer: ["transform", "er"],
  prediction: ["predict", "ion"],
  unbelievable: ["un", "believ", "able"],
  preprocessing: ["pre", "process", "ing"],
  unhappiness: ["un", "happi", "ness"],
  relationships: ["relation", "ships"],
  international: ["inter", "national"],
  unfortunately: ["un", "fortunate", "ly"],
  programming: ["programm", "ing"],
  information: ["inform", "ation"],
  communication: ["communic", "ation"],
  automatically: ["automatic", "ally"],
  representations: ["represent", "ations"],
  interesting: ["interest", "ing"],
  conversation: ["convers", "ation"],
  intelligence: ["intellig", "ence"],
  artificial: ["artifici", "al"],
  learning: ["learn", "ing"],
  running: ["run", "ning"],
  walking: ["walk", "ing"],
  playing: ["play", "ing"],
  quickly: ["quick", "ly"],
  slowly: ["slow", "ly"],
  happily: ["happi", "ly"],
  beautiful: ["beauti", "ful"],
  wonderful: ["wonder", "ful"],
  powerful: ["power", "ful"],
  helpful: ["help", "ful"],
  carefully: ["care", "ful", "ly"],
  doesn: ["does", "n"],
  wouldn: ["would", "n"],
  couldn: ["could", "n"],
  shouldn: ["should", "n"],
};

type Token = {
  text: string;
  type: "word" | "subword" | "punctuation" | "whitespace";
};

function tokenize(text: string): Token[] {
  if (!text) return [];

  const tokens: Token[] = [];
  // Split into raw segments: whitespace vs non-whitespace
  const segments = text.match(/(\s+|[^\s]+)/g) ?? [];

  for (const segment of segments) {
    if (/^\s+$/.test(segment)) {
      tokens.push({ text: segment.replace(/ /g, "\u00B7").replace(/\n/g, "\\n"), type: "whitespace" });
      continue;
    }

    // Split punctuation from words
    const parts = segment.match(/([a-zA-Z0-9]+|[^a-zA-Z0-9])/g) ?? [segment];

    for (const part of parts) {
      if (/^[^a-zA-Z0-9]$/.test(part)) {
        tokens.push({ text: part, type: "punctuation" });
        continue;
      }

      const lower = part.toLowerCase();
      if (SUBWORD_SPLITS[lower]) {
        const subwords = SUBWORD_SPLITS[lower];
        let remaining = part;
        for (const sub of subwords) {
          const chunk = remaining.slice(0, sub.length);
          remaining = remaining.slice(sub.length);
          tokens.push({ text: chunk, type: "subword" });
        }
        if (remaining) {
          tokens.push({ text: remaining, type: "subword" });
        }
      } else {
        tokens.push({ text: part, type: "word" });
      }
    }
  }

  return tokens;
}

const TOKEN_COLORS: Record<Token["type"], string> = {
  word: "bg-sky-100 text-sky-800 border-sky-200 dark:bg-sky-500/15 dark:text-sky-200 dark:border-sky-500/30",
  subword: "bg-violet-100 text-violet-800 border-violet-200 dark:bg-violet-500/15 dark:text-violet-200 dark:border-violet-500/30",
  punctuation: "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-500/15 dark:text-amber-200 dark:border-amber-500/30",
  whitespace: "bg-stone-100 text-stone-500 border-stone-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700",
};

const EXAMPLES = [
  "The cat sat on the mat.",
  "Tokenization splits text into smaller pieces.",
  "Artificial intelligence is transforming everything!",
  "I can't believe it's not understanding me.",
];

export function TokenizerPlayground() {
  const [text, setText] = useState(EXAMPLES[0]);
  const tokens = useMemo(() => tokenize(text), [text]);

  const counts = useMemo(() => {
    const word = tokens.filter((t) => t.type === "word").length;
    const subword = tokens.filter((t) => t.type === "subword").length;
    const punctuation = tokens.filter((t) => t.type === "punctuation").length;
    return { total: word + subword + punctuation, word, subword, punctuation };
  }, [tokens]);

  return (
    <div className="my-8 rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-700 dark:text-cyan-300">
          Tokenizer Playground
        </p>
        <h3 className="mt-2 text-xl font-semibold text-stone-900 dark:text-white">
          See how text becomes tokens
        </h3>
        <p className="mt-2 text-sm leading-6 text-stone-600 dark:text-gray-400">
          Type or paste text below to see how a simplified BPE-style tokenizer splits it into pieces. Real tokenizers (like those used by GPT or Claude) work similarly but with a much larger vocabulary.
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {EXAMPLES.map((example) => (
          <button
            key={example}
            type="button"
            onClick={() => setText(example)}
            className={`rounded-full border px-3 py-1 text-xs transition-colors ${
              text === example
                ? "border-cyan-300 bg-cyan-50 text-cyan-800 dark:border-cyan-500/30 dark:bg-cyan-500/10 dark:text-cyan-200"
                : "border-stone-200 text-stone-600 hover:border-stone-300 dark:border-gray-700 dark:text-gray-400 dark:hover:border-gray-600"
            }`}
          >
            {example.length > 40 ? example.slice(0, 37) + "..." : example}
          </button>
        ))}
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={3}
        className="mt-4 w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm leading-6 text-stone-800 outline-none transition-colors focus:border-cyan-400 dark:border-gray-700 dark:bg-gray-950/60 dark:text-gray-100 dark:focus:border-cyan-500"
        placeholder="Type or paste text here..."
      />

      <div className="mt-4 rounded-xl border border-stone-200 bg-stone-50 px-4 py-4 dark:border-gray-800 dark:bg-gray-950/60">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500 dark:text-gray-500">
          Tokens ({counts.total})
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {tokens.map((token, i) => (
            <span
              key={`${token.text}-${i}`}
              className={`inline-flex items-center rounded-lg border px-2 py-1 font-mono text-sm ${TOKEN_COLORS[token.type]}`}
            >
              {token.text}
            </span>
          ))}
          {tokens.length === 0 && (
            <span className="text-sm text-stone-400 dark:text-gray-500">
              Start typing to see tokens...
            </span>
          )}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3">
        <div className="rounded-xl border border-stone-200 bg-stone-50 px-3 py-2 text-center dark:border-gray-800 dark:bg-gray-950/60">
          <p className="text-lg font-bold text-sky-700 dark:text-sky-300">{counts.word}</p>
          <p className="text-xs text-stone-500 dark:text-gray-400">Whole words</p>
        </div>
        <div className="rounded-xl border border-stone-200 bg-stone-50 px-3 py-2 text-center dark:border-gray-800 dark:bg-gray-950/60">
          <p className="text-lg font-bold text-violet-700 dark:text-violet-300">{counts.subword}</p>
          <p className="text-xs text-stone-500 dark:text-gray-400">Subwords</p>
        </div>
        <div className="rounded-xl border border-stone-200 bg-stone-50 px-3 py-2 text-center dark:border-gray-800 dark:bg-gray-950/60">
          <p className="text-lg font-bold text-amber-700 dark:text-amber-300">{counts.punctuation}</p>
          <p className="text-xs text-stone-500 dark:text-gray-400">Punctuation</p>
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-cyan-200 bg-cyan-50 px-4 py-3 text-sm leading-6 text-cyan-900 dark:border-cyan-500/20 dark:bg-cyan-500/10 dark:text-cyan-100">
        <p className="font-semibold">What to notice</p>
        <p className="mt-1">
          Long words often get split into subword pieces (shown in purple). This is how models handle words they have never seen before — by breaking them into familiar parts.
        </p>
      </div>
    </div>
  );
}
