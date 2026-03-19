# Building a local-first interactive AI/ML learning platform

**Vite + React + MDX is the optimal stack for this project**, combining near-instant HMR, first-class WebAssembly support for TensorFlow.js and Pyodide, and clean MDX integration—all without the SSR complexity that Next.js would impose on a local-only app. Below is a complete technical plan with every library, version, and architectural decision an AI coding agent needs to build this from scratch.

## Why Vite wins over Next.js for this use case

The framework choice comes down to one decisive factor: **WebAssembly support**. Next.js has well-documented, persistent issues with WASM file path resolution during builds, requiring custom `WasmChunksFixPlugin` webpack hacks. Pyodide has no webpack plugin at all—its official bundler documentation targets Vite specifically. Meanwhile, `vite-plugin-wasm` (142K+ weekly npm downloads) handles WASM cleanly across Vite 2–7.

Beyond WASM, every requirement points to Vite. This is a local-first SPA run via `npm run dev`—there is no SEO, no server-side rendering, no edge deployment. Next.js's App Router, React Server Components, and `'use client'` directive ceremony add complexity with zero benefit here. Vite starts cold in under 2 seconds with sub-50ms HMR updates, compared to Turbopack's 3–5 second cold starts. The `import.meta.glob` API lets you dynamically load all chapter MDX files without a separate content build tool. Vite's Rollup-based tree-shaking produces smaller client bundles since there's no framework runtime overhead—critical when pages already load **~700KB of TensorFlow.js** and potentially **7–17MB of Pyodide**.

MDX integration follows naturally: `@mdx-js/rollup` plugs directly into Vite's plugin pipeline with 5 lines of config, supporting frontmatter, table-of-contents generation, and math rendering via remark/rehype plugins. Next.js's `@next/mdx` requires a mandatory `mdx-components.tsx` file, lacks native frontmatter support, and forces page-naming conventions.

## Recommended stack and package versions

| Category | Package | Version | Purpose |
|----------|---------|---------|---------|
| **Build** | `vite` | ^7.0.0 | Dev server and bundler |
| | `@vitejs/plugin-react` | ^4.0.0 | React Fast Refresh |
| | `@mdx-js/rollup` | ^3.0.0 | MDX compilation in Vite |
| | `vite-plugin-wasm` | ^3.5.0 | WebAssembly support |
| | `vite-plugin-top-level-await` | ^1.4.0 | Top-level await for WASM |
| **Framework** | `react` / `react-dom` | ^19.0.0 | UI framework |
| | `react-router-dom` | ^7.0.0 | Client-side routing |
| | `typescript` | ^5.6.0 | Type safety |
| **UI** | `shadcn/ui` | latest CLI | Component primitives (Radix + Tailwind) |
| | `tailwindcss` | ^4.0.0 | Utility CSS |
| | `framer-motion` | ^11.0.0 | Animation for widgets and transitions |
| **Math** | `katex` | ^0.16.38 | LaTeX rendering engine |
| | `react-katex` | ^3.1.0 | `<BlockMath>` and `<InlineMath>` components |
| | `remark-math` + `rehype-katex` | ^6.0.0 / ^7.0.0 | Math in MDX via `$...$` syntax |
| **Visualization** | `@visx/*` (modular) | ^3.12.0 | Custom ML visualizations (gradient descent, decision boundaries) |
| | `recharts` | ^3.1.0 | Standard charts (loss curves, metric dashboards) |
| | `@xyflow/react` | ^12.10.1 | Neural network architecture diagrams |
| **Code** | `shiki` | ^4.0.2 | VS Code-quality syntax highlighting |
| | `@shikijs/rehype` | ^4.0.0 | Code blocks in MDX |
| | `@uiw/react-codemirror` | ^4.x | Live code editors |
| | `@codemirror/lang-python` | latest | Python syntax for editors |
| | `@codemirror/lang-javascript` | latest | JS/TS syntax for editors |
| **ML** | `@tensorflow/tfjs` | ^4.22.0 | In-browser model training |
| | `pyodide` | ^0.29.3 | Python-in-browser via WASM |
| **State** | `zustand` | ^5.0.0 | State management with localStorage persistence |
| | `immer` | ^10.0.0 | Immutable state updates |
| **Content** | `remark-frontmatter` | ^5.0.0 | YAML frontmatter in MDX |
| | `remark-mdx-frontmatter` | ^4.0.0 | Export frontmatter as JS |
| | `remark-gfm` | ^4.0.0 | GitHub-flavored markdown |
| | `rehype-slug` | ^6.0.0 | Heading IDs for ToC |

Total estimated additional bundle: **~450–550KB gzipped** for the UI/visualization layer (KaTeX ~100KB, Recharts ~40KB, Visx modules ~30KB, React Flow ~80KB, Shiki lazy-loaded ~200KB). TensorFlow.js adds ~700KB gzipped. Pyodide's 7–17MB loads lazily in a Web Worker.

## Project structure

```
ml-learning-platform/
├── public/
│   ├── datasets/                     # Sample data (iris.json, mnist-sample.json)
│   └── models/                       # Pre-trained TF.js model artifacts
│
├── src/
│   ├── main.tsx                      # Entry point
│   ├── App.tsx                       # Router setup
│   │
│   ├── content/                      # MDX chapters (the "textbook")
│   │   ├── index.ts                  # Chapter registry via import.meta.glob
│   │   ├── 01-llm-intuition/
│   │   │   ├── 01-linear-functions.mdx
│   │   │   ├── 02-gradient-descent.mdx
│   │   │   ├── 03-logistic-regression.mdx
│   │   │   ├── 04-neural-networks.mdx
│   │   │   ├── 05-from-mlp-to-llm.mdx
│   │   │   ├── lab-fit-a-line.mdx
│   │   │   ├── lab-train-classifier.mdx
│   │   │   └── meta.json
│   │   └── 02-next-chapter/
│   │       └── ...
│   │
│   ├── components/
│   │   ├── ui/                       # shadcn/ui components (auto-generated)
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── slider.tsx
│   │   │   ├── tabs.tsx
│   │   │   ├── accordion.tsx
│   │   │   └── ...
│   │   │
│   │   ├── layout/                   # App shell
│   │   │   ├── ChapterLayout.tsx     # Sidebar + content + ToC
│   │   │   ├── Sidebar.tsx           # Chapter/section navigation
│   │   │   ├── TableOfContents.tsx   # Right-side heading nav
│   │   │   ├── NavigationFooter.tsx  # Prev/Next section
│   │   │   └── ProgressBar.tsx       # Chapter completion indicator
│   │   │
│   │   ├── mdx/                      # MDX component overrides
│   │   │   ├── MDXComponents.tsx     # Global component map
│   │   │   ├── Callout.tsx           # Info/Warning/Tip boxes
│   │   │   ├── MathBlock.tsx         # KaTeX wrapper
│   │   │   ├── CodeBlock.tsx         # Shiki-highlighted code
│   │   │   └── Quiz.tsx              # Inline comprehension checks
│   │   │
│   │   └── widgets/                  # Interactive educational widgets
│   │       ├── core/
│   │       │   ├── Playground.tsx     # Reusable: params panel + viz area
│   │       │   ├── LabShell.tsx       # Exercise wrapper with validation
│   │       │   ├── PythonEditor.tsx   # Pyodide-powered Python REPL
│   │       │   └── JSEditor.tsx       # CodeMirror + live execution
│   │       │
│   │       ├── regression/
│   │       │   ├── LinearRegressionPlayground.tsx
│   │       │   ├── GradientDescentVisualizer.tsx
│   │       │   └── LossLandscape3D.tsx
│   │       │
│   │       ├── neural-network/
│   │       │   ├── NetworkArchitectureViewer.tsx  # React Flow
│   │       │   ├── ActivationFunctionPlot.tsx     # Visx
│   │       │   ├── ForwardPassAnimator.tsx
│   │       │   ├── DecisionBoundaryPlot.tsx       # Visx
│   │       │   └── TrainingDashboard.tsx           # Recharts
│   │       │
│   │       └── llm/
│   │           ├── AttentionHeatmap.tsx
│   │           ├── EmbeddingVisualizer.tsx
│   │           └── TokenPredictionView.tsx
│   │
│   ├── lib/                          # Non-React logic
│   │   ├── ml/
│   │   │   ├── models.ts            # TF.js model factory functions
│   │   │   ├── datasets.ts          # Data generation (spiral, XOR, etc.)
│   │   │   └── training.ts          # Training loop utilities
│   │   │
│   │   ├── workers/
│   │   │   ├── tf-worker.ts         # TensorFlow.js training in worker
│   │   │   └── pyodide-worker.ts    # Pyodide runtime in worker
│   │   │
│   │   └── utils/
│   │       ├── math.ts
│   │       └── debounce.ts
│   │
│   ├── stores/
│   │   ├── progressStore.ts          # Persisted: completed sections, lab results
│   │   ├── widgetStore.ts            # Ephemeral: slider values, training state
│   │   └── preferencesStore.ts       # Persisted: theme, difficulty level
│   │
│   ├── hooks/
│   │   ├── useTraining.ts            # Web Worker training hook
│   │   ├── usePyodide.ts            # Lazy-load Pyodide with progress
│   │   ├── useDebounce.ts
│   │   └── useAnimationFrame.ts
│   │
│   └── styles/
│       ├── globals.css               # Tailwind base + custom variables
│       └── prose.css                 # Typography for MDX content
│
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── components.json                   # shadcn/ui configuration
└── package.json
```

## Vite configuration — the critical foundation

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mdx from '@mdx-js/rollup'
import wasm from 'vite-plugin-wasm'
import topLevelAwait from 'vite-plugin-top-level-await'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeSlug from 'rehype-slug'
import rehypeKatex from 'rehype-katex'
import rehypeShiki from '@shikijs/rehype'

export default defineConfig({
  plugins: [
    { enforce: 'pre', ...mdx({
      remarkPlugins: [
        remarkGfm,
        remarkFrontmatter,
        remarkMdxFrontmatter,
        remarkMath,
      ],
      rehypePlugins: [
        rehypeSlug,
        rehypeKatex,
        [rehypeShiki, { themes: { light: 'github-light', dark: 'github-dark' } }],
      ],
    })},
    react({ include: /\.(jsx|js|mdx|md|tsx|ts)$/ }),
    wasm(),
    topLevelAwait(),
  ],
  optimizeDeps: {
    exclude: ['pyodide'],       // Pyodide must not be pre-bundled
  },
  worker: {
    format: 'es',               // ES modules in Web Workers
    plugins: () => [wasm(), topLevelAwait()],
  },
})
```

The `enforce: 'pre'` on the MDX plugin is essential—it must run before `@vitejs/plugin-react` so that `.mdx` files are compiled to JSX before React's transform processes them. The `remarkMath` + `rehypeKatex` pipeline enables `$y = wx + b$` inline math and `$$` block equations directly in MDX without any component imports.

## How the chapter content system works

Each MDX file is a self-contained section that combines prose, math, and interactive widgets. The `import.meta.glob` API eliminates the need for a content management layer:

```typescript
// src/content/index.ts
const modules = import.meta.glob('./chapters/**/*.mdx', { eager: true })

export const chapters = Object.entries(modules)
  .map(([path, mod]: [string, any]) => ({
    path,
    Component: mod.default,
    meta: mod.frontmatter,       // title, chapter, section, order
  }))
  .sort((a, b) => a.meta.chapter - b.meta.chapter || a.meta.order - b.meta.order)
```

A typical MDX section looks like this:

```mdx
---
title: "From y=wx+b to Neural Networks"
chapter: 1
section: 4
order: 4
---

import { Playground } from '@/components/widgets/core/Playground'
import { DecisionBoundaryPlot } from '@/components/widgets/neural-network/DecisionBoundaryPlot'

# From $y = wx + b$ to neural networks

A single neuron computes exactly the same function you already know—a weighted
sum plus a bias, passed through an activation function:

$$
a = \sigma(w_1 x_1 + w_2 x_2 + b)
$$

But stack enough of these together, and something remarkable happens. The
network can learn **any continuous function**—a result known as the universal
approximation theorem.

## Watch the boundary form

Drag the learning rate slider and watch how the decision boundary evolves.
Lower rates converge smoothly; higher rates oscillate.

<Playground
  id="decision-boundary-ch1"
  parameters={[
    { key: 'learningRate', label: 'Learning Rate', min: 0.001, max: 1, step: 0.001 },
    { key: 'hiddenUnits', label: 'Hidden Neurons', min: 1, max: 16, step: 1 },
  ]}
  defaultValues={{ learningRate: 0.03, hiddenUnits: 4 }}
>
  {(params) => <DecisionBoundaryPlot {...params} dataset="spiral" />}
</Playground>
```

## Visualization strategy: Visx for custom, Recharts for standard

The visualization layer uses a **dual-library approach**. **Visx** (Airbnb's modular D3-for-React library) handles the custom ML visualizations that define this platform—gradient descent animations, decision boundary plots, activation function curves—because it gives full SVG control while staying in React's component model. Each Visx package is **2–8KB**, and you import only what you need (`@visx/shape`, `@visx/scale`, `@visx/axis`, `@visx/tooltip`, `@visx/responsive`).

**Recharts** handles standard dashboard-style charts—loss curves over epochs, accuracy metrics, data distribution histograms—where you want a `<LineChart>` in 15 lines rather than 60. At **~40KB gzipped**, it's lightweight and fully declarative.

**Plotly.js was rejected** despite its ML-friendly defaults. Its **3.5MB full bundle** (1MB even for the basic distribution) is unacceptable when pages already carry TensorFlow.js and Pyodide. Its React wrapper (`react-plotly.js`) is a thin imperative shell, not true React integration, making real-time updates during training awkward.

For neural network architecture diagrams, **React Flow** (`@xyflow/react`) is the clear choice. Custom nodes are full React components—each neuron can contain activation visualizations, mini-charts, or sliders. Built-in zoom, pan, and selection work out of the box. The library has official shadcn/ui integration, and projects like Neuraliser have already demonstrated neural network visualization with it. Use the `dagre` layout algorithm for automatic layer positioning, and animate forward/backward passes by sequentially highlighting nodes and edges with `framer-motion`.

## TensorFlow.js architecture for in-browser training

All ML training runs in **Web Workers** to keep the UI thread responsive. The WebGL backend is the correct choice for educational training demos—it has full gradient and backpropagation support, while the WASM backend is inference-only and lacks training capabilities.

```typescript
// src/lib/workers/tf-worker.ts
import * as tf from '@tensorflow/tfjs'

let currentModel: tf.Sequential | null = null

self.onmessage = async ({ data }) => {
  if (data.type === 'TRAIN') {
    currentModel?.dispose()
    const { learningRate, epochs, hiddenUnits, dataset } = data.params

    const model = tf.sequential()
    model.add(tf.layers.dense({ units: hiddenUnits, inputShape: [2], activation: 'relu' }))
    model.add(tf.layers.dense({ units: 1, activation: 'sigmoid' }))
    model.compile({
      optimizer: tf.train.sgd(learningRate),
      loss: 'binaryCrossentropy',
      metrics: ['accuracy'],
    })
    currentModel = model

    await model.fit(xTrain, yTrain, {
      epochs,
      callbacks: {
        onEpochEnd: async (epoch, logs) => {
          const weights = model.getWeights().map(w => Array.from(w.dataSync()))
          self.postMessage({ type: 'EPOCH', epoch, loss: logs!.loss, weights })
        },
      },
    })
    self.postMessage({ type: 'DONE' })
  }
  if (data.type === 'STOP') { currentModel!.stopTraining = true }
}
```

The corresponding React hook connects this worker to component state:

```typescript
// src/hooks/useTraining.ts
export function useTraining() {
  const workerRef = useRef<Worker>()
  const [state, setState] = useState({ status: 'idle', lossHistory: [], weights: null })

  useEffect(() => {
    workerRef.current = new Worker(new URL('../lib/workers/tf-worker.ts', import.meta.url))
    workerRef.current.onmessage = ({ data }) => {
      if (data.type === 'EPOCH') {
        setState(prev => ({
          ...prev, status: 'training',
          lossHistory: [...prev.lossHistory, { epoch: data.epoch, loss: data.loss }],
          weights: data.weights,
        }))
      }
      if (data.type === 'DONE') setState(prev => ({ ...prev, status: 'complete' }))
    }
    return () => workerRef.current?.terminate()
  }, [])

  const train = (params) => {
    setState({ status: 'training', lossHistory: [], weights: null })
    workerRef.current?.postMessage({ type: 'TRAIN', params })
  }
  return { ...state, train, stop: () => workerRef.current?.postMessage({ type: 'STOP' }) }
}
```

**Memory management is critical** with TensorFlow.js in the browser. Wrap all tensor operations in `tf.tidy()` to auto-dispose intermediates. Call `model.dispose()` on component unmount. Monitor `tf.memory().numTensors` during development to catch leaks.

## Pyodide integration — feasible with careful UX

Pyodide 0.29.3 compiles CPython 3.11 to WebAssembly, enabling real NumPy, SciPy, and scikit-learn in the browser. The core runtime is **~7MB compressed**; adding the scientific stack brings total download to **~17–18MB**. Initial load takes **3–5 seconds** on a typical connection, dropping to ~2 seconds on subsequent visits thanks to browser caching.

This is feasible for an educational app but demands UX investment. The implementation pattern is a Web Worker that loads Pyodide once and handles all Python execution:

```typescript
// src/lib/workers/pyodide-worker.ts
import { loadPyodide } from 'pyodide'

let pyodide = null

self.onmessage = async ({ data }) => {
  if (data.type === 'INIT') {
    self.postMessage({ type: 'STATUS', message: 'Loading Python runtime...' })
    pyodide = await loadPyodide({ indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.29.3/full/' })
    self.postMessage({ type: 'STATUS', message: 'Loading NumPy & scikit-learn...' })
    await pyodide.loadPackage(['numpy', 'scikit-learn'])
    self.postMessage({ type: 'READY' })
  }
  if (data.type === 'RUN') {
    try {
      // Inject context variables into Python's global scope
      for (const [key, val] of Object.entries(data.context ?? {})) {
        pyodide.globals.set(key, val)
      }
      const result = await pyodide.runPythonAsync(data.code)
      self.postMessage({ type: 'RESULT', id: data.id, result: result?.toJs?.() ?? result })
    } catch (e) {
      self.postMessage({ type: 'ERROR', id: data.id, error: e.message })
    }
  }
}
```

The UX strategy: **begin loading Pyodide the moment a user navigates to a chapter containing Python labs**, not when they click "Run." Show educational reading content while the runtime initializes in the background. Display a progress bar with specific status messages ("Loading Python runtime… Loading NumPy…"). By the time a user reads through the introductory text and reaches the first code cell, Pyodide is typically ready. Skulpt and Brython were rejected because they cannot run NumPy or scikit-learn—the entire educational value of Python labs depends on the real scientific stack.

## Live code editing with CodeMirror 6

**CodeMirror 6** (`@uiw/react-codemirror`) is the right editor for inline educational widgets. Its **~300KB core** is a fraction of Monaco Editor's 5–10MB, it has excellent mobile support, and Replit's migration from Monaco to CodeMirror 6 validates it for code editing at scale. Python syntax highlighting comes via `@codemirror/lang-python`.

The connection pattern between editor, execution, and visualization:

```typescript
function PythonLab({ initialCode, onResult }) {
  const [code, setCode] = useState(initialCode)
  const { runPython, status } = usePyodide()
  const debouncedCode = useDebounce(code, 500)

  const execute = async () => {
    const result = await runPython(debouncedCode)
    onResult(result)
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      <CodeMirror value={code} onChange={setCode} extensions={[python()]} theme="dark" />
      <div>
        <Button onClick={execute} disabled={status !== 'ready'}>Run</Button>
        <OutputPanel result={result} />
      </div>
    </div>
  )
}
```

For JavaScript/TensorFlow.js widgets where users tweak parameters rather than write full programs, simpler parameter-bound sliders connected to visualization state are more appropriate than a code editor. Reserve CodeMirror for Python labs and "full playground" experiences.

## State management with Zustand

State divides into two stores. The **progress store** persists to localStorage and tracks educational progress—completed sections, lab results, chapter progress percentages, last visited path. The **widget store** is ephemeral and tracks interactive state—slider positions, current training parameters, model weights mid-training.

```typescript
// src/stores/progressStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

export const useProgressStore = create(
  persist(
    immer((set) => ({
      completedSections: {} as Record<string, boolean>,
      labResults: {} as Record<string, { score: number; completedAt: number }>,
      lastVisitedPath: '/',

      markComplete: (sectionId: string) => set((s) => { s.completedSections[sectionId] = true }),
      saveLabResult: (labId: string, result) => set((s) => { s.labResults[labId] = result }),
      setLastVisited: (path: string) => set((s) => { s.lastVisitedPath = path }),
    })),
    { name: 'ml-learning-progress' }
  )
)
```

Zustand was chosen over Jotai because its centralized stores with selector-based subscriptions map cleanly to the two distinct state categories. The `persist` middleware provides localStorage integration with zero boilerplate—critical for a learning app where users return across sessions. Zustand also allows **outside-React access**, meaning Web Workers can read and write state without hooks, which simplifies the ML training ↔ UI bridge.

## Component architecture for reusable widgets

The **Playground** pattern (inspired by TensorFlow Playground and CNN Explainer) is the core reusable abstraction. It combines a parameter panel with a visualization area and manages the reactive flow: parameter change → debounce → computation → render.

```typescript
// src/components/widgets/core/Playground.tsx
interface PlaygroundProps {
  id: string
  title: string
  parameters: ParameterConfig[]   // { key, label, min, max, step }
  defaultValues: Record<string, number>
  children: (params: Record<string, number>) => React.ReactNode
}

export function Playground({ id, title, parameters, defaultValues, children }: PlaygroundProps) {
  const params = useWidgetStore((s) => s.parameters[id] ?? defaultValues)
  const setParam = useWidgetStore((s) => s.setParameter)

  return (
    <Card className="my-8">
      <CardHeader><CardTitle>{title}</CardTitle></CardHeader>
      <CardContent className="grid grid-cols-[240px_1fr] gap-6">
        <div className="space-y-4">
          {parameters.map((p) => (
            <div key={p.key}>
              <Label>{p.label}: {params[p.key]?.toFixed(3)}</Label>
              <Slider min={p.min} max={p.max} step={p.step}
                value={[params[p.key]]} onValueChange={([v]) => setParam(id, p.key, v)} />
            </div>
          ))}
        </div>
        <div className="min-h-[300px]">{children(params)}</div>
      </CardContent>
    </Card>
  )
}
```

The **LabShell** pattern wraps exercise components with instructions, validation, and completion tracking:

```typescript
export function LabShell({ id, title, objectives, validate, children }) {
  const { labResults, saveLabResult, markComplete } = useProgressStore()
  const [labState, setLabState] = useState({})

  const result = validate(labState)
  const handleSubmit = () => {
    saveLabResult(id, { ...result, completedAt: Date.now() })
    if (result.passed) markComplete(`lab-${id}`)
  }

  return (
    <Card className="my-8 border-2 border-blue-500/20">
      <LabInstructions title={title} objectives={objectives} />
      <LabContext.Provider value={{ labState, setLabState }}>
        {children}
      </LabContext.Provider>
      <Button onClick={handleSubmit} disabled={!result.passed}>Submit</Button>
    </Card>
  )
}
```

Both patterns are designed to be **embedded directly in MDX** without friction, making content authoring feel like writing a blog post with superpowers.

## Math rendering, code highlighting, and the MDX pipeline

**KaTeX** renders math synchronously with a **~100KB bundle** (compared to MathJax's heavier dynamic loading). It handles all ML notation—partial derivatives `\frac{\partial L}{\partial w}`, summations `\sum_{i=1}^{n}`, gradient operators `\nabla_\theta J(\theta)`, matrix notation `\begin{bmatrix}...\end{bmatrix}`, and activation functions `\sigma(z)`. The `remark-math` + `rehype-katex` pipeline in the Vite config means authors write `$y = wx + b$` in MDX and it renders automatically—no component imports needed.

**Shiki** provides VS Code-quality syntax highlighting at build time via `@shikijs/rehype`. Code blocks in MDX are pre-rendered to HTML with zero client-side JavaScript cost. Dual theme support (`github-light` / `github-dark`) switches automatically with the app's dark mode. For Python and TypeScript highlighting specifically, Shiki is significantly more accurate than Prism.js (which has a known, unfixed 2018 issue with TypeScript typed variables).

## Neural network visualization with React Flow

React Flow renders network architectures as interactive node graphs where each layer is a custom React component. This means a "Dense(16, relu)" node can show a mini activation function plot, live neuron activations during a forward pass, or a slider to change the layer size—all as standard React components with standard state management.

The implementation approach for the "LLM Intuition" chapter:

- **Custom `LayerNode` component**: Displays layer type, neuron count, activation function, with expandable detail view
- **Animated edges**: Color-coded by weight sign (blue = positive, red = negative), thickness proportional to weight magnitude, animated during forward/backward pass using framer-motion
- **`dagre` layout**: Automatic left-to-right layer positioning so users don't manually arrange nodes
- **Interactive drill-down**: Click a node to see its activation values; hover an edge to see its weight; drag to rearrange

React Flow's official shadcn/ui component library (at `ui.reactflow.dev`) provides pre-styled controls, minimaps, and panels that match the rest of the app's design language.

## Implementation sequence for Claude Code

The recommended build order minimizes blocking dependencies and produces a working app at each stage:

1. **Scaffold** (30 min): `npm create vite@latest`, install all dependencies, configure `vite.config.ts` with MDX + WASM plugins, initialize shadcn/ui and Tailwind, set up TypeScript paths
2. **Layout shell** (2 hrs): Build `ChapterLayout`, `Sidebar`, `NavigationFooter`, and React Router configuration. Create 2–3 stub MDX files to verify the content pipeline works end-to-end
3. **Content system** (1 hr): Implement `import.meta.glob` chapter registry, frontmatter extraction, ToC generation, and MDX component mapping (math, code, callouts)
4. **Progress tracking** (1 hr): Zustand stores with persist middleware, section completion UI, progress bar in sidebar
5. **First interactive widget** (3 hrs): `LinearRegressionPlayground`—the signature widget for chapter 1. Slider for `w` and `b`, Visx scatter plot showing `y = wx + b` fitting to data points, "Train" button that runs gradient descent via TensorFlow.js and shows the loss curve updating in Recharts
6. **Training infrastructure** (2 hrs): Web Worker pattern for TF.js, `useTraining` hook, real-time epoch callbacks updating React state
7. **Neural network viewer** (3 hrs): React Flow-based architecture diagram, custom layer nodes, animated edges, forward pass animation
8. **Python labs** (3 hrs): Pyodide Web Worker, lazy loading with progress UI, CodeMirror editor, `PythonEditor` widget that executes code and displays output
9. **Full Chapter 1 content** (4+ hrs): Write all MDX sections for "LLM Intuition," build remaining widgets (gradient descent visualizer, sigmoid/ReLU activation plots, decision boundary plot, tiny MLP trainer)
10. **Polish** (2 hrs): Dark mode, responsive layout, loading states, error boundaries, keyboard navigation

## Conclusion

This architecture draws directly from proven interactive ML education projects—TensorFlow Playground's URL-encoded state and custom TypeScript ML engine, CNN Explainer's tight integration of explanatory text with D3 visualizations, and Transformer Explainer's Vite-based SvelteKit stack running ONNX models client-side. The key insight from studying these reference implementations is that **client-side-everything works**. No backend is needed. The Vite + React + MDX stack provides the right level of abstraction: Vite handles the gnarly WASM bundling, MDX lets authors write prose with embedded React components, and the Playground/Lab component patterns create a consistent interactive experience. The total page weight for a typical section—framework, visualizations, math rendering, and TensorFlow.js—comes to roughly **1.2MB gzipped** before Pyodide, which loads lazily only when Python labs are reached. That's a fast, self-contained learning experience that runs entirely on `localhost:5173`.