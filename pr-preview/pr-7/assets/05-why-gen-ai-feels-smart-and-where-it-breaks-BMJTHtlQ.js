import{t as e}from"./jsx-runtime-D-oznMWL.js";var t=e(),n={title:`Why Gen AI Feels Smart and Where It Breaks`,chapter:5,subtitle:`Fluency, hallucinations, ambiguity, and the trust mistakes beginners make first`};function r(e){let n={blockquote:`blockquote`,h1:`h1`,h2:`h2`,li:`li`,ol:`ol`,p:`p`,strong:`strong`,ul:`ul`,...e.components},{CaseCards:r,ChapterBridge:i,ChapterRecap:o,Checkpoint:s,Exercise:c}=n;return r||a(`CaseCards`,!0),i||a(`ChapterBridge`,!0),o||a(`ChapterRecap`,!0),s||a(`Checkpoint`,!0),c||a(`Exercise`,!0),(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.h1,{children:`Why Gen AI Feels Smart and Where It Breaks`}),`
`,(0,t.jsx)(i,{why:`To use Gen AI well, learners need more than excitement. They need a stable trust model. This chapter explains why fluent output can feel intelligent while still being fragile.`,buildsOn:`The generation loop and the idea that prompts shape outputs but do not guarantee truth.`,unlocks:`Verification habits, grounding, safer workflow design, and more realistic tool selection.`,map:[`Pattern fit`,`Fluency`,`Weak evidence`,`Human verification`],trackFocus:{conceptual:`The goal is calibrated trust: useful, impressive, and still in need of checking.`,builder:`The goal is to identify the failure mode before you scale the workflow.`}}),`
`,(0,t.jsx)(n.p,{children:`Generative AI often feels smart because it is very good at producing:`}),`
`,(0,t.jsxs)(n.ul,{children:[`
`,(0,t.jsx)(n.li,{children:`fluent language`}),`
`,(0,t.jsx)(n.li,{children:`plausible structure`}),`
`,(0,t.jsx)(n.li,{children:`smooth transitions`}),`
`,(0,t.jsx)(n.li,{children:`familiar reasoning patterns`}),`
`]}),`
`,(0,t.jsx)(n.p,{children:`Those are real capabilities.`}),`
`,(0,t.jsxs)(n.p,{children:[`But they do `,(0,t.jsx)(n.strong,{children:`not`}),` prove:`]}),`
`,(0,t.jsxs)(n.ul,{children:[`
`,(0,t.jsx)(n.li,{children:`factual accuracy`}),`
`,(0,t.jsx)(n.li,{children:`access to the right evidence`}),`
`,(0,t.jsx)(n.li,{children:`stable judgment under ambiguity`}),`
`,(0,t.jsx)(n.li,{children:`awareness of your private context`}),`
`]}),`
`,(0,t.jsx)(n.h2,{children:`Hallucination Is a Workflow Problem, Not Just a Buzzword`}),`
`,(0,t.jsx)(n.p,{children:`A hallucination is a confident-looking output that is unsupported, invented, or unjustified.`}),`
`,(0,t.jsx)(n.p,{children:`That can happen because:`}),`
`,(0,t.jsxs)(n.ul,{children:[`
`,(0,t.jsx)(n.li,{children:`the prompt was underspecified`}),`
`,(0,t.jsx)(n.li,{children:`the model lacked the needed facts`}),`
`,(0,t.jsx)(n.li,{children:`the context was noisy or contradictory`}),`
`,(0,t.jsx)(n.li,{children:`the workflow asked the model to sound complete even when evidence was weak`}),`
`]}),`
`,(0,t.jsx)(n.p,{children:`The healthiest beginner habit is not "assume the model lies." It is:`}),`
`,(0,t.jsxs)(n.blockquote,{children:[`
`,(0,t.jsx)(n.p,{children:`Ask what evidence this answer was actually based on.`}),`
`]}),`
`,(0,t.jsx)(n.h2,{children:`Three Common Beginner Mistakes`}),`
`,(0,t.jsxs)(n.ol,{children:[`
`,(0,t.jsx)(n.li,{children:`trusting style as proof`}),`
`,(0,t.jsx)(n.li,{children:`skipping verification on familiar-looking topics`}),`
`,(0,t.jsx)(n.li,{children:`asking the model to guess where a lookup or source check would be better`}),`
`]}),`
`,(0,t.jsx)(r,{title:`What failure really looks like in practice`,cards:[{title:`Confident summary, wrong facts`,product:`A model summarizes a document the user never actually uploaded.`,modelIdea:`The system is still generating plausible language, but it is filling a missing-context gap with learned patterns.`,failureMode:`The answer sounds professional enough that the user notices the error late.`},{title:`Helpful tone, bad legal certainty`,product:`A chat assistant gives policy-sounding advice about a contract clause.`,modelIdea:`Fluent legal-sounding text is easy to generate. Reliable legal review is a separate workflow problem.`,failureMode:`A user mistakes polish for authority and skips expert review.`}]}),`
`,(0,t.jsx)(c,{title:`Spot the Risk`,hint:`A strong answer names the missing evidence and the human check. Example: 'This answer sounds useful, but it depends on a policy document the model may not have. I would ask it to cite the source or check the actual handbook.'`,children:(0,t.jsx)(n.p,{children:`Think of one task where a polished but unsupported answer would be dangerous or costly. Write what the failure would look like and what check you would add before trusting the result.`})}),`
`,(0,t.jsx)(s,{id:`genai-ch5-fluency`,chapter:5,prompt:`Why can Gen AI feel smarter than it really is?`,concepts:[`fluency`,`trust`,`hallucination`],options:[{label:`Because fluent, well-structured language is easier to generate than fully reliable knowledge or judgment.`,correct:!0,explanation:`Yes. Style and coherence can be strong even when factual support is weak.`},{label:`Because every confident answer comes from hidden source checking.`,explanation:`Some systems do source checking, but confidence and style alone do not prove that.`},{label:`Because Gen AI only fails when the prompt is short.`,explanation:`Prompt quality matters, but even long prompts do not remove uncertainty or evidence gaps.`}]}),`
`,(0,t.jsx)(s,{id:`genai-ch5-hallucination`,chapter:5,prompt:`Which habit best reduces hallucination risk?`,concepts:[`verification`,`hallucination`,`grounding`],options:[{label:`Ask what evidence the answer came from and verify important claims against the real source.`,correct:!0,explanation:`Right. Verification works better than assuming tone equals truth.`},{label:`Always increase temperature so the model sounds more creative and honest.`,explanation:`Temperature changes generation style, not factual support.`},{label:`Use Gen AI only for jokes and never for work.`,explanation:`The goal is informed use in the right tasks, not blanket avoidance.`}]}),`
`,(0,t.jsx)(s,{id:`genai-ch5-lookup`,chapter:5,prompt:`When should you prefer a lookup or source-based workflow over pure generation?`,concepts:[`retrieval`,`source-based work`,`workflow design`],options:[{label:`When the answer depends on current, private, or exact information that should be traced back to a source.`,correct:!0,explanation:`Exactly. Those are the cases where grounding matters most.`},{label:`Only when the task is too boring for a language model.`,explanation:`The issue is not boredom. It is whether the answer depends on exact evidence.`},{label:`Never, because generation is always faster and therefore better.`,explanation:`Speed is not the same as reliability.`}]}),`
`,(0,t.jsx)(o,{chapter:5,summary:[`Fluency is a capability, not a guarantee of truth.`,`Hallucinations happen when the workflow asks for confident output without enough evidence or checking.`,`A better trust habit is to ask what the answer was grounded in.`],checks:[`Can you name a task where a polished answer would still need source verification?`,`Can you explain why style is easier to generate than trustworthy evidence?`],nextStep:`Next we move from pure generation to a stronger pattern: working with your own documents and knowledge.`,trackActions:{conceptual:`Pick one workflow where you would require citations or a source excerpt before trusting the answer.`,builder:`List one failure mode you would design around before rolling out a prompt to a team.`}})]})}function i(e={}){let{wrapper:n}=e.components||{};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(r,{...e})}):r(e)}function a(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{i as default,n as frontmatter};