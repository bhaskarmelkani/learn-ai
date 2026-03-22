import{t as e}from"./jsx-runtime-D-oznMWL.js";var t=e(),n={title:`Working With Your Own Knowledge`,chapter:6,subtitle:`Documents, grounding, retrieval, and the practical intuition behind RAG`};function r(e){let n={blockquote:`blockquote`,h1:`h1`,h2:`h2`,li:`li`,ol:`ol`,p:`p`,strong:`strong`,ul:`ul`,...e.components},{CaseCards:r,ChapterBridge:i,ChapterRecap:o,Checkpoint:s,Exercise:c,RetrievalVsModelOnlyLab:l,SemanticSearchLab:u}=n;return r||a(`CaseCards`,!0),i||a(`ChapterBridge`,!0),o||a(`ChapterRecap`,!0),s||a(`Checkpoint`,!0),c||a(`Exercise`,!0),l||a(`RetrievalVsModelOnlyLab`,!0),u||a(`SemanticSearchLab`,!0),(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.h1,{children:`Working With Your Own Knowledge`}),`
`,(0,t.jsx)(i,{why:`Many useful Gen AI workflows are not about world knowledge at all. They are about helping with your own notes, policies, files, and team context.`,buildsOn:`The trust model from the last chapter: answers are stronger when evidence is available and reviewable.`,unlocks:`A practical intuition for grounding, retrieval, and when a model needs your documents rather than its general prior patterns.`,map:[`Question`,`Relevant source`,`Grounded context`,`Generated answer`],trackFocus:{conceptual:`Understand why 'knowing language' is different from 'knowing my documents.'`,builder:`Understand when a workflow needs source retrieval instead of a better prompt alone.`}}),`
`,(0,t.jsx)(n.p,{children:`One of the biggest beginner misconceptions is:`}),`
`,(0,t.jsxs)(n.blockquote,{children:[`
`,(0,t.jsx)(n.p,{children:`"The model is smart, so it probably knows our company information too."`}),`
`]}),`
`,(0,t.jsx)(n.p,{children:`Usually, it does not.`}),`
`,(0,t.jsx)(n.p,{children:`If the answer depends on:`}),`
`,(0,t.jsxs)(n.ul,{children:[`
`,(0,t.jsx)(n.li,{children:`your handbook`}),`
`,(0,t.jsx)(n.li,{children:`your pricing page`}),`
`,(0,t.jsx)(n.li,{children:`your notes`}),`
`,(0,t.jsx)(n.li,{children:`your CRM records`}),`
`,(0,t.jsx)(n.li,{children:`your support docs`}),`
`]}),`
`,(0,t.jsxs)(n.p,{children:[`then the workflow usually needs `,(0,t.jsx)(n.strong,{children:`grounding`}),`.`]}),`
`,(0,t.jsx)(n.p,{children:`Grounding means giving the system relevant context from a trusted source so it can answer with better evidence.`}),`
`,(0,t.jsx)(n.h2,{children:`What Retrieval Adds`}),`
`,(0,t.jsx)(n.p,{children:`Retrieval answers a simple question first:`}),`
`,(0,t.jsxs)(n.blockquote,{children:[`
`,(0,t.jsx)(n.p,{children:`Which source or chunk of source material should the model see before it responds?`}),`
`]}),`
`,(0,t.jsx)(n.p,{children:`That is the heart of many document Q&A systems.`}),`
`,(0,t.jsxs)(n.p,{children:[`The term `,(0,t.jsx)(n.strong,{children:`RAG`}),` usually means retrieval-augmented generation:`]}),`
`,(0,t.jsxs)(n.ol,{children:[`
`,(0,t.jsx)(n.li,{children:`retrieve relevant context`}),`
`,(0,t.jsx)(n.li,{children:`pass that context into the prompt`}),`
`,(0,t.jsx)(n.li,{children:`generate an answer from that grounded context`}),`
`]}),`
`,(0,t.jsx)(n.p,{children:`You do not need infrastructure detail to get the beginner intuition. The important distinction is:`}),`
`,(0,t.jsxs)(n.ul,{children:[`
`,(0,t.jsx)(n.li,{children:`pure generation guesses from prior patterns`}),`
`,(0,t.jsx)(n.li,{children:`grounded generation answers with selected evidence in context`}),`
`]}),`
`,(0,t.jsx)(u,{}),`
`,(0,t.jsx)(n.p,{children:`Retrieval alone is not the final answer.`}),`
`,(0,t.jsx)(n.p,{children:`The model still has to respond after the source is found, which is why it helps to compare the whole system path:`}),`
`,(0,t.jsx)(l,{}),`
`,(0,t.jsx)(r,{title:`Where grounding matters most`,cards:[{title:`Internal policy assistant`,product:`A workplace tool that answers PTO, travel, and expense questions from the company handbook.`,modelIdea:`The value is not broad world knowledge. It is accurate retrieval from the right internal source.`,failureMode:`A generic answer that sounds plausible can create real policy confusion.`},{title:`Support agent helper`,product:`A system that drafts replies using the help center and customer account notes.`,modelIdea:`Generation becomes more useful when the workflow surfaces the right article and the right customer context.`,failureMode:`If retrieval fetches the wrong article, the generated draft may sound polished and still be wrong.`}]}),`
`,(0,t.jsx)(c,{title:`Design the Source Path`,hint:`A strong answer names the exact source and the consequence of missing it: 'For warranty questions, the workflow must look at the order record and warranty terms. Without those, the model will guess from generic patterns.'`,children:(0,t.jsx)(n.p,{children:`Choose one question that depends on private or exact information. Write which
source the system would need, what should be retrieved, and what could go
wrong if it answered without that source.`})}),`
`,(0,t.jsx)(s,{id:`genai-ch6-grounding`,chapter:6,prompt:`What is the main purpose of grounding a Gen AI workflow?`,concepts:[`grounding`,`documents`,`reliability`],options:[{label:`To give the model relevant evidence from trusted sources so the answer depends less on generic guessing.`,correct:!0,explanation:`Yes. Grounding improves the evidence available to the model at answer time.`},{label:`To permanently retrain the model on your private files every time you ask a question.`,explanation:`Grounding typically provides context at runtime. It is not the same as retraining.`},{label:`To make the model more creative when it writes.`,explanation:`Grounding is about relevance and evidence, not creativity.`}]}),`
`,(0,t.jsx)(s,{id:`genai-ch6-rag`,chapter:6,prompt:`Which description best captures the intuition behind RAG?`,concepts:[`rag`,`retrieval`,`generation`],options:[{label:`Find the relevant source first, then let the model answer with that source in context.`,correct:!0,explanation:`Exactly. That is the practical beginner mental model.`},{label:`Ask the model the same question many times until it becomes more certain.`,explanation:`Repetition does not replace evidence.`},{label:`Remove all documents so the model can think more freely.`,explanation:`That does the opposite of grounding.`}]}),`
`,(0,t.jsx)(s,{id:`genai-ch6-private-knowledge`,chapter:6,prompt:`Why is 'the model probably knows our docs' a risky assumption?`,concepts:[`private knowledge`,`context`,`trust`],options:[{label:`Because the workflow may need exact, current, or private information the model does not actually have at answer time.`,correct:!0,explanation:`Right. Many useful business workflows depend on data the base model cannot safely infer.`},{label:`Because models cannot work with documents at all.`,explanation:`They can work well with documents when the workflow provides the right context.`},{label:`Because private knowledge only matters for legal teams.`,explanation:`Support, operations, HR, sales, and learning workflows all depend on private context too.`}]}),`
`,(0,t.jsx)(o,{chapter:6,summary:[`Useful document workflows depend on grounding, not just general model capability.`,`RAG is best understood as retrieve first, then generate from that context.`,`When exact private information matters, pure generation is usually the wrong default.`],checks:[`Can you explain the difference between a general answer and a grounded answer?`,`Can you name one source your ideal workflow would need before it should respond?`],nextStep:`Now that we have text workflows and grounded workflows, we can widen the picture to multimodal Gen AI.`,trackActions:{conceptual:`Find one question in your life that should never be answered without a source.`,builder:`Describe one workflow where retrieval quality matters more than prompt cleverness.`}})]})}function i(e={}){let{wrapper:n}=e.components||{};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(r,{...e})}):r(e)}function a(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{i as default,n as frontmatter};