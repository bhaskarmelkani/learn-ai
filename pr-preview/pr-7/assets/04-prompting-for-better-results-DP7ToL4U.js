import{t as e}from"./jsx-runtime-D-oznMWL.js";var t=e(),n={title:`Prompting for Better Results`,chapter:4,subtitle:`Clarity, examples, constraints, and the iteration habit that actually lasts`};function r(e){let n={h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,ol:`ol`,p:`p`,ul:`ul`,...e.components},{BrowserLLMLab:r,Callout:i,ChapterBridge:o,ChapterRecap:s,Checkpoint:c,Exercise:l,PromptComparison:u}=n;return r||a(`BrowserLLMLab`,!0),i||a(`Callout`,!0),o||a(`ChapterBridge`,!0),s||a(`ChapterRecap`,!0),c||a(`Checkpoint`,!0),l||a(`Exercise`,!0),u||a(`PromptComparison`,!0),(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.h1,{children:`Prompting for Better Results`}),`
`,(0,t.jsx)(o,{why:`Once the first prompt works at all, the next job is making it reliably useful. This chapter teaches durable prompt improvements instead of fragile hacks.`,buildsOn:`The idea that prompting is task design and the model only sees the text you actually provide.`,unlocks:`Better everyday workflows for extraction, drafting, analysis, and review.`,map:[`Clear task`,`Examples`,`Constraints`,`Iteration`],trackFocus:{conceptual:`Notice how small prompt changes often improve usefulness by reducing ambiguity and forcing clearer output expectations.`,builder:`Notice how examples, schemas, and review instructions create repeatable workflows without writing code.`}}),`
`,(0,t.jsx)(n.p,{children:`The best prompt upgrades are usually not fancy.`}),`
`,(0,t.jsx)(n.p,{children:`They are practical:`}),`
`,(0,t.jsxs)(n.ul,{children:[`
`,(0,t.jsx)(n.li,{children:`make the task narrower`}),`
`,(0,t.jsx)(n.li,{children:`show one example`}),`
`,(0,t.jsx)(n.li,{children:`define the format`}),`
`,(0,t.jsx)(n.li,{children:`set boundaries`}),`
`,(0,t.jsx)(n.li,{children:`ask the model to reveal uncertainty`}),`
`]}),`
`,(0,t.jsx)(n.h2,{children:`Four Reliable Upgrades`}),`
`,(0,t.jsx)(n.h3,{children:`1. Add examples when the task is easy to misunderstand`}),`
`,(0,t.jsx)(n.p,{children:`If you want a particular style or answer shape, one example often teaches faster than another paragraph of explanation.`}),`
`,(0,t.jsx)(n.h3,{children:`2. Add constraints when "good" is too vague`}),`
`,(0,t.jsx)(n.p,{children:`Useful constraints include:`}),`
`,(0,t.jsxs)(n.ul,{children:[`
`,(0,t.jsx)(n.li,{children:`word limits`}),`
`,(0,t.jsx)(n.li,{children:`required sections`}),`
`,(0,t.jsx)(n.li,{children:`things to avoid`}),`
`,(0,t.jsx)(n.li,{children:`what to do when the evidence is weak`}),`
`]}),`
`,(0,t.jsx)(n.h3,{children:`3. Ask for structure when the output needs review`}),`
`,(0,t.jsx)(n.p,{children:`A structured answer is easier to scan, compare, verify, or reuse in another step.`}),`
`,(0,t.jsx)(n.h3,{children:`4. Iterate like a collaborator, not a gambler`}),`
`,(0,t.jsx)(n.p,{children:`Good prompting often looks like:`}),`
`,(0,t.jsxs)(n.ol,{children:[`
`,(0,t.jsx)(n.li,{children:`try a first version`}),`
`,(0,t.jsx)(n.li,{children:`inspect what was weak`}),`
`,(0,t.jsx)(n.li,{children:`tighten the task or format`}),`
`,(0,t.jsx)(n.li,{children:`run again`}),`
`]}),`
`,(0,t.jsx)(u,{}),`
`,(0,t.jsx)(n.p,{children:`The design ideas above become more vivid when you run them on a weak local model.`}),`
`,(0,t.jsx)(n.p,{children:`When the model is tiny, vague prompts break faster and structured prompts help more obviously.`}),`
`,(0,t.jsx)(r,{}),`
`,(0,t.jsx)(i,{type:`warning`,title:`Avoid brittle prompt mythology`,children:(0,t.jsx)(n.p,{children:`Do not overfit to internet folklore about one magic phrase that always unlocks
hidden intelligence. Durable prompting is clearer workflow design, not
superstition.`})}),`
`,(0,t.jsx)(l,{title:`Upgrade the Prompt`,hint:`A strong revision might add audience, output structure, and uncertainty handling: 'Extract the risks from this proposal for an operations lead. Return a table with risk, impact, and missing information. If evidence is weak, mark it unclear.'`,children:(0,t.jsx)(n.p,{children:`Take the prompt you wrote in the last chapter. Improve it in three ways: add
one useful constraint, add a better output structure, and add one instruction
about uncertainty, missing information, or evidence.`})}),`
`,(0,t.jsx)(c,{id:`genai-ch4-examples`,chapter:4,prompt:`When are examples especially useful in a prompt?`,concepts:[`examples`,`few-shot`,`prompting`],options:[{label:`When the task or preferred output style is easy to misunderstand from description alone.`,correct:!0,explanation:`Yes. Examples are often the fastest way to show the pattern you want.`},{label:`Only when the model is bad at language and needs training data.`,explanation:`Examples can help even strong models because they reduce ambiguity about the requested pattern.`},{label:`Never, because examples always make prompts too long.`,explanation:`Examples can be extremely helpful when they teach the format or judgment you want.`}]}),`
`,(0,t.jsx)(c,{id:`genai-ch4-constraints`,chapter:4,prompt:`What is the main value of adding constraints to a prompt?`,concepts:[`constraints`,`quality`,`prompt design`],options:[{label:`They narrow the space of acceptable answers so the output is easier to use and review.`,correct:!0,explanation:`Right. Constraints help the model aim at a narrower definition of success.`},{label:`They guarantee the model will never hallucinate.`,explanation:`Constraints can reduce drift, but they do not guarantee factual accuracy.`},{label:`They only matter for creative writing.`,explanation:`Constraints are just as useful for summaries, extractions, and planning tasks.`}]}),`
`,(0,t.jsx)(c,{id:`genai-ch4-iteration`,chapter:4,prompt:`What is the healthiest beginner habit for improving prompts?`,concepts:[`iteration`,`workflow`,`prompting`],options:[{label:`Run a first draft, inspect what failed, then revise the prompt to fix the specific weakness.`,correct:!0,explanation:`Exactly. Prompting improves fastest when you treat it like an iterative workflow.`},{label:`Start from the longest prompt template you can find online and never change it.`,explanation:`Templates can help, but blind reuse usually creates bloated or mismatched prompts.`},{label:`Keep changing random phrases until the model sounds smarter.`,explanation:`Random tweaking is slower than identifying the real failure mode and addressing it directly.`}]}),`
`,(0,t.jsx)(s,{chapter:4,summary:[`Prompt quality improves when you add examples, constraints, and structure where they are genuinely needed.`,`Iteration works better than superstition.`,`The strongest prompt habit is to fix a specific failure mode, not to chase magic wording.`],checks:[`Can you name one prompt weakness that is really a workflow-spec problem?`,`Can you explain when an example teaches faster than extra instructions?`],nextStep:`Next we turn from improvement tactics to the more important question: where do these systems still break?`,trackActions:{conceptual:`Rewrite one sloppy prompt so that success is easier to judge.`,builder:`Define one repeatable prompt pattern you could hand to a teammate without extra explanation.`}})]})}function i(e={}){let{wrapper:n}=e.components||{};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(r,{...e})}):r(e)}function a(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{i as default,n as frontmatter};