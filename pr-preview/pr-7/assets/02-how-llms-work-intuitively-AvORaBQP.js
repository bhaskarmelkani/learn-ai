import{t as e}from"./jsx-runtime-D-oznMWL.js";var t=e(),n={title:`How LLMs Work, Intuitively`,chapter:2,subtitle:`Tokens, context, next-token prediction, and why the output keeps unfolding`};function r(e){let n={blockquote:`blockquote`,h1:`h1`,h2:`h2`,li:`li`,ol:`ol`,p:`p`,strong:`strong`,ul:`ul`,...e.components},{Callout:r,ChapterBridge:i,ChapterRecap:o,Checkpoint:s,ContextBudgetLab:c,Exercise:l,TokenPredictionDemo:u,TokenizerArena:d}=n;return r||a(`Callout`,!0),i||a(`ChapterBridge`,!0),o||a(`ChapterRecap`,!0),s||a(`Checkpoint`,!0),c||a(`ContextBudgetLab`,!0),l||a(`Exercise`,!0),u||a(`TokenPredictionDemo`,!0),d||a(`TokenizerArena`,!0),(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.h1,{children:`How LLMs Work, Intuitively`}),`
`,(0,t.jsx)(i,{why:`Large language models can feel mysterious until you reduce them to one repeated loop: turn text into tokens, read context, predict likely next tokens, and keep going.`,buildsOn:`The idea that generative AI creates new outputs from learned patterns.`,unlocks:`Practical prompting, better expectations, and a clearer grasp of why models can sound coherent while still being wrong.`,map:[`Text`,`Tokens`,`Context`,`Next-token prediction`],trackFocus:{conceptual:`The main goal is to stop treating the model like a mind and start treating it like a powerful pattern engine.`,builder:`The main goal is to notice what changes quality and cost: context length, tokenization, and output control.`}}),`
`,(0,t.jsx)(n.p,{children:`When you type a prompt, a language model does not receive meaning directly.`}),`
`,(0,t.jsxs)(n.p,{children:[`It receives a sequence of `,(0,t.jsx)(n.strong,{children:`tokens`}),`: chunks of text that get turned into numbers.`]}),`
`,(0,t.jsx)(n.p,{children:`Then it does a repeated job:`}),`
`,(0,t.jsxs)(n.ol,{children:[`
`,(0,t.jsx)(n.li,{children:`read the tokens in context`}),`
`,(0,t.jsx)(n.li,{children:`estimate which token should come next`}),`
`,(0,t.jsx)(n.li,{children:`choose one`}),`
`,(0,t.jsx)(n.li,{children:`repeat until the answer ends`}),`
`]}),`
`,(0,t.jsx)(n.p,{children:`That is why the clearest beginner mental model is:`}),`
`,(0,t.jsxs)(n.blockquote,{children:[`
`,(0,t.jsx)(n.p,{children:`An LLM is a next-token prediction engine wrapped in a useful chat interface.`}),`
`]}),`
`,(0,t.jsx)(n.h2,{children:`Step 1: Text Becomes Tokens`}),`
`,(0,t.jsx)(n.p,{children:`Words are not always tokens one-to-one. A token might be:`}),`
`,(0,t.jsxs)(n.ul,{children:[`
`,(0,t.jsx)(n.li,{children:`a whole word`}),`
`,(0,t.jsx)(n.li,{children:`part of a word`}),`
`,(0,t.jsx)(n.li,{children:`punctuation`}),`
`,(0,t.jsx)(n.li,{children:`a code symbol`}),`
`]}),`
`,(0,t.jsx)(n.p,{children:`That matters because tokenization affects:`}),`
`,(0,t.jsxs)(n.ul,{children:[`
`,(0,t.jsx)(n.li,{children:`cost`}),`
`,(0,t.jsx)(n.li,{children:`context length`}),`
`,(0,t.jsx)(n.li,{children:`how the model chunks meaning`}),`
`]}),`
`,(0,t.jsx)(d,{}),`
`,(0,t.jsx)(n.p,{children:`The same idea shows up again when you think about context windows.`}),`
`,(0,t.jsxs)(n.p,{children:[`It is not just `,(0,t.jsx)(n.strong,{children:`your`}),` words that count.`]}),`
`,(0,t.jsx)(n.p,{children:`System instructions, examples, chat wrappers, and the output you still want all spend the same finite budget.`}),`
`,(0,t.jsx)(c,{}),`
`,(0,t.jsx)(n.h2,{children:`Step 2: Context Shapes the Next Step`}),`
`,(0,t.jsx)(n.p,{children:`A model does not generate all at once. At each step it looks at the current context window and predicts what token is likely next.`}),`
`,(0,t.jsx)(n.p,{children:`That is why changing earlier instructions can change later output. The model is not writing from an internal outline you can fully inspect. It is continuously recomputing what should come next from the context it can currently see.`}),`
`,(0,t.jsx)(u,{}),`
`,(0,t.jsx)(n.h2,{children:`Step 3: Sampling Changes the Feel`}),`
`,(0,t.jsx)(n.p,{children:`Two settings often matter to beginners:`}),`
`,(0,t.jsxs)(n.ul,{children:[`
`,(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:`temperature`}),`: how sharp or spread out the next-token choice is`]}),`
`,(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:`max output length`}),`: how long the model is allowed to keep going`]}),`
`]}),`
`,(0,t.jsx)(n.p,{children:`Low temperature usually feels more stable and repetitive. Higher temperature often feels more varied and creative, but also less controlled.`}),`
`,(0,t.jsx)(r,{type:`tip`,title:`Useful simplification`,children:(0,t.jsx)(n.p,{children:`You do not need transformer math to use Gen AI well. The durable intuition is
that the model sees tokens, uses context, and keeps predicting the next step.`})}),`
`,(0,t.jsx)(l,{title:`Predict the Loop`,hint:`A good answer sounds like: the model breaks my request into tokens, reads them in context, estimates what token should come next, outputs one, then repeats until the response is done.`,children:(0,t.jsxs)(n.p,{children:[`Write the LLM loop in your own words without using the phrase `,(0,t.jsx)(n.strong,{children:`artificial
intelligence`}),`. Aim for one or two sentences that would make sense to a
beginner.`]})}),`
`,(0,t.jsx)(s,{id:`genai-ch2-token`,chapter:2,prompt:`Why do tokens matter?`,concepts:[`tokens`,`context`,`cost`],options:[{label:`Because the model works over token sequences, and tokenization affects context use, behavior, and cost.`,correct:!0,explanation:`Yes. Tokenization is part of how the system actually sees your input.`},{label:`Because tokens are only a billing detail and do not affect behavior.`,explanation:`Billing is one consequence, but tokenization also shapes how text is chunked and processed.`},{label:`Because tokens are the model's final answers, not its inputs.`,explanation:`Tokens are both input and output units in the generation loop.`}]}),`
`,(0,t.jsx)(s,{id:`genai-ch2-next-token`,chapter:2,prompt:`What is the cleanest intuition for how an LLM generates text?`,concepts:[`llm`,`next token`,`generation`],options:[{label:`It repeatedly predicts the next token from the context so far.`,correct:!0,explanation:`Exactly. That loop is the core of the system's generation behavior.`},{label:`It searches a database for a complete sentence and copies it out.`,explanation:`Some outputs may resemble memorized patterns, but the core generation loop is probabilistic prediction.`},{label:`It reasons the full answer silently first, then reveals it word for word from memory.`,explanation:`That picture is too neat. Generation unfolds step by step from the active context.`}]}),`
`,(0,t.jsx)(s,{id:`genai-ch2-temperature`,chapter:2,prompt:`What usually changes when you raise temperature?`,concepts:[`temperature`,`sampling`,`control`],options:[{label:`The output often becomes more varied and less tightly controlled.`,correct:!0,explanation:`Right. Higher temperature usually spreads probability mass more broadly across possible next tokens.`},{label:`The model suddenly gains access to new private documents.`,explanation:`Temperature affects generation style, not what information the model can access.`},{label:`The model switches from token prediction to search.`,explanation:`Temperature does not change the basic kind of system you are using.`}]}),`
`,(0,t.jsx)(o,{chapter:2,summary:[`LLMs process token sequences, not raw meaning.`,`Generation unfolds through repeated next-token prediction over context.`,`Controls like temperature affect how stable or varied the output feels.`],checks:[`Can you explain why changing earlier context changes later output?`,`Can you explain why token count matters for both behavior and cost?`],nextStep:`Now that the loop is clear, we can treat prompting as interface design instead of mystical wording.`,trackActions:{conceptual:`Describe an LLM as a loop, not a personality.`,builder:`Notice one workflow where shorter, more structured context would probably improve reliability.`}})]})}function i(e={}){let{wrapper:n}=e.components||{};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(r,{...e})}):r(e)}function a(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{i as default,n as frontmatter};