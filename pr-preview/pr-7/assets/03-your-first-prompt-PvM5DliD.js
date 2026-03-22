import{t as e}from"./jsx-runtime-D-oznMWL.js";var t=e(),n={title:`Your First Prompt`,chapter:3,subtitle:`Audience, task, constraints, and why prompts are an interface`};function r(e){let n={blockquote:`blockquote`,h1:`h1`,h2:`h2`,li:`li`,ol:`ol`,p:`p`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...e.components},{BrowserLLMLab:r,CaseCards:i,ChapterBridge:o,ChapterRecap:s,Checkpoint:c,Exercise:l}=n;return r||a(`BrowserLLMLab`,!0),i||a(`CaseCards`,!0),o||a(`ChapterBridge`,!0),s||a(`ChapterRecap`,!0),c||a(`Checkpoint`,!0),l||a(`Exercise`,!0),(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.h1,{children:`Your First Prompt`}),`
`,(0,t.jsx)(o,{why:`Most beginner frustration comes from treating prompts like wishes instead of instructions. This chapter replaces wishful prompting with simple task design.`,buildsOn:`The model loop: tokens in, token predictions out, shaped by context.`,unlocks:`Stronger prompting habits, clearer workflow design, and less disappointment from vague asks.`,map:[`Goal`,`Context`,`Constraints`,`Output shape`],trackFocus:{conceptual:`Think of a prompt as a way of framing the job clearly for a pattern-based system.`,builder:`Think of a prompt as the first layer of workflow design: task, input, constraints, and output schema.`}}),`
`,(0,t.jsx)(n.p,{children:`The model cannot read your intentions directly.`}),`
`,(0,t.jsx)(n.p,{children:`It only sees the text you gave it and the context that came before.`}),`
`,(0,t.jsx)(n.p,{children:`That means a prompt works best when it tells the model:`}),`
`,(0,t.jsxs)(n.ul,{children:[`
`,(0,t.jsx)(n.li,{children:`what job to do`}),`
`,(0,t.jsx)(n.li,{children:`who the output is for`}),`
`,(0,t.jsx)(n.li,{children:`what context matters`}),`
`,(0,t.jsx)(n.li,{children:`what shape the answer should take`}),`
`]}),`
`,(0,t.jsx)(n.h2,{children:`A Prompt Is an Interface`}),`
`,(0,t.jsx)(n.p,{children:`Beginners often hear "prompt engineering" and imagine hidden magic words.`}),`
`,(0,t.jsx)(n.p,{children:`A better frame is simpler:`}),`
`,(0,t.jsxs)(n.blockquote,{children:[`
`,(0,t.jsx)(n.p,{children:`Prompting is interface design for a probabilistic system.`}),`
`]}),`
`,(0,t.jsx)(n.p,{children:`If the system is ambiguous, your prompt needs to reduce ambiguity.`}),`
`,(0,t.jsx)(n.p,{children:`If the system needs a specific answer format, your prompt should specify the format.`}),`
`,(0,t.jsx)(n.p,{children:`If the system needs to know what matters most, your prompt should rank the priorities.`}),`
`,(0,t.jsx)(n.h2,{children:`A Strong First Template`}),`
`,(0,t.jsx)(n.p,{children:`When in doubt, use this sequence:`}),`
`,(0,t.jsxs)(n.ol,{children:[`
`,(0,t.jsx)(n.li,{children:`state the task`}),`
`,(0,t.jsx)(n.li,{children:`give the necessary context`}),`
`,(0,t.jsx)(n.li,{children:`name the audience`}),`
`,(0,t.jsx)(n.li,{children:`define the output shape`}),`
`,(0,t.jsx)(n.li,{children:`tell it what uncertainty to admit`}),`
`]}),`
`,(0,t.jsx)(n.p,{children:`For example:`}),`
`,(0,t.jsxs)(n.table,{children:[(0,t.jsx)(n.thead,{children:(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.th,{children:`Weak prompt`}),(0,t.jsx)(n.th,{children:`Better first prompt`})]})}),(0,t.jsx)(n.tbody,{children:(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:`"Summarize this."`}),(0,t.jsx)(n.td,{children:`"Summarize this for a busy teammate in 4 bullets: main point, decision, blocker, and next step. If something is unclear, say so."`})]})})]}),`
`,(0,t.jsx)(n.p,{children:`Below is a tiny model running entirely in your browser.`}),`
`,(0,t.jsx)(n.p,{children:`It is intentionally much weaker than a cloud LLM, which makes it useful for learning: vague prompts tend to break fast, and clearer prompts usually help in visible ways.`}),`
`,(0,t.jsx)(r,{}),`
`,(0,t.jsx)(i,{title:`Why first prompts fail`,cards:[{title:`The hidden audience problem`,product:`A model writes an email that sounds too casual for an executive client.`,modelIdea:`The prompt named the task but not the audience, so the model filled that gap with a generic style.`,failureMode:`Users blame the model when the missing detail was in the interface design.`},{title:`The missing output shape`,product:`A learner asks for a research summary and gets a wall of text instead of a structured extraction.`,modelIdea:`The prompt specified topic but not answer format.`,failureMode:`Without a shape constraint, the model defaults to a plausible but not necessarily useful response.`,trackPrompt:{builder:`Whenever the output needs to feed another step, specify the schema early.`}}]}),`
`,(0,t.jsx)(l,{title:`Write Your First Real Prompt`,hint:`A strong answer might say: 'Turn these meeting notes into a project update for the team lead. Use 5 bullets: decision, owner, timeline, blocker, next action. If a date is missing, say missing.'`,children:(0,t.jsx)(n.p,{children:`Pick a real task you do: summarize notes, draft a message, pull action items,
or compare options. Write a prompt that names the task, audience, context,
output format, and how uncertainty should be handled.`})}),`
`,(0,t.jsx)(c,{id:`genai-ch3-interface`,chapter:3,prompt:`Why is prompting better understood as interface design than magic phrasing?`,concepts:[`prompting`,`interface design`,`ambiguity`],options:[{label:`Because the main job is to reduce ambiguity and specify what success looks like for the model.`,correct:!0,explanation:`Yes. Strong prompting is usually clearer task framing, not secret incantations.`},{label:`Because the best prompt is always the longest possible prompt.`,explanation:`Length can help or hurt. Clarity matters more than sheer volume.`},{label:`Because a prompt mainly changes the model's training data.`,explanation:`A prompt changes the immediate context, not the model's learned weights.`}]}),`
`,(0,t.jsx)(c,{id:`genai-ch3-audience`,chapter:3,prompt:`What problem does naming the audience solve?`,concepts:[`audience`,`tone`,`prompt design`],options:[{label:`It helps the model choose the right tone, detail level, and emphasis for the output.`,correct:!0,explanation:`Right. Audience is one of the fastest ways to make the output feel useful instead of generic.`},{label:`It makes the model factually correct automatically.`,explanation:`Audience can improve usefulness, but it does not guarantee truth.`},{label:`It only matters in creative writing, not in work tasks.`,explanation:`Audience matters in summaries, memos, explanations, and extraction tasks too.`}]}),`
`,(0,t.jsx)(c,{id:`genai-ch3-shape`,chapter:3,prompt:`Why specify the output shape early?`,concepts:[`output format`,`workflow`,`prompt design`],options:[{label:`Because a defined structure makes the model easier to use, review, and plug into the next step.`,correct:!0,explanation:`Exactly. The more reusable the output needs to be, the more the format matters.`},{label:`Because models only understand prompts written as bullet lists.`,explanation:`Bullet lists can help, but they are not the only format models can understand.`},{label:`Because structure removes the need to review the answer.`,explanation:`Structure helps review. It does not replace review.`}]}),`
`,(0,t.jsx)(s,{chapter:3,summary:[`A prompt is an interface for task framing, not a magic spell.`,`Strong prompts specify task, context, audience, and output shape.`,`Ambiguity left in the prompt usually becomes ambiguity in the answer.`],checks:[`Can you explain the difference between a vague request and a well-scoped task?`,`Can you name what output shape would help in one of your real workflows?`],nextStep:`Next we sharpen prompting without turning it into brittle prompt-hack culture.`,trackActions:{conceptual:`Rewrite one vague everyday request into a clearer prompt.`,builder:`Choose one workflow and define the exact answer schema you would want from the model.`}})]})}function i(e={}){let{wrapper:n}=e.components||{};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(r,{...e})}):r(e)}function a(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{i as default,n as frontmatter};