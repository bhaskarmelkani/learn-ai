import{t as e}from"./jsx-runtime-D-oznMWL.js";var t=e(),n={title:`Making Decisions`,chapter:6,subtitle:`From raw scores to probabilities to yes/no and many-way choices`};function r(e){let n={h1:`h1`,h2:`h2`,li:`li`,p:`p`,strong:`strong`,ul:`ul`,...e.components},{Callout:r,CaseCards:i,ChapterBridge:o,Checkpoint:s,ClassificationLab:c,ClassificationNotebook:l,SigmoidDemo:u,SoftmaxDemo:d}=n;return r||a(`Callout`,!0),i||a(`CaseCards`,!0),o||a(`ChapterBridge`,!0),s||a(`Checkpoint`,!0),c||a(`ClassificationLab`,!0),l||a(`ClassificationNotebook`,!0),u||a(`SigmoidDemo`,!0),d||a(`SoftmaxDemo`,!0),(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.h1,{children:`Making Decisions`}),`
`,(0,t.jsx)(o,{why:`This chapter shifts the course from 'predict a number' to 'make a choice,' which is where many real products live.`,buildsOn:`Trainable models, parameters, and the idea that a score can be learned from data.`,unlocks:`Decision boundaries, multiple classes, and the later reason hidden layers help.`,map:[`Raw score`,`Probability`,`Threshold`,`Decision`],trackFocus:{conceptual:`Stay focused on the flow: score first, then probability, then decision.`,builder:`This is the first chapter where tradeoffs like precision and recall become product-shaping choices.`}}),`
`,(0,t.jsx)(n.p,{children:`So far the model predicted numbers.`}),`
`,(0,t.jsx)(n.p,{children:`Now imagine a different kind of question:`}),`
`,(0,t.jsxs)(n.ul,{children:[`
`,(0,t.jsx)(n.li,{children:`approve or reject a mortgage`}),`
`,(0,t.jsx)(n.li,{children:`spam or not spam`}),`
`,(0,t.jsx)(n.li,{children:`cat, dog, or bird`}),`
`]}),`
`,(0,t.jsxs)(n.p,{children:[`These are not number-prediction problems. They are `,(0,t.jsx)(n.strong,{children:`decision`}),` problems.`]}),`
`,(0,t.jsx)(n.h2,{children:`Start with a Score`}),`
`,(0,t.jsx)(n.p,{children:`A model can still begin by producing one raw score.`}),`
`,(0,t.jsx)(n.p,{children:`For example:`}),`
`,(0,t.jsxs)(n.ul,{children:[`
`,(0,t.jsx)(n.li,{children:`low score -> reject`}),`
`,(0,t.jsx)(n.li,{children:`high score -> approve`}),`
`]}),`
`,(0,t.jsxs)(n.p,{children:[`The simplest first decision rule is a `,(0,t.jsx)(n.strong,{children:`threshold`}),`.`]}),`
`,(0,t.jsx)(c,{}),`
`,(0,t.jsx)(n.h2,{children:`Smooth the Decision`}),`
`,(0,t.jsx)(n.p,{children:`Hard thresholds are useful, but probabilities are easier to reason about than raw scores.`}),`
`,(0,t.jsx)(n.p,{children:`So we take the raw score and squash it into the 0-to-1 range.`}),`
`,(0,t.jsxs)(n.p,{children:[`That squashing curve is called `,(0,t.jsx)(n.strong,{children:`sigmoid`}),`, and the resulting model is called `,(0,t.jsx)(n.strong,{children:`logistic regression`}),`.`]}),`
`,(0,t.jsx)(u,{}),`
`,(0,t.jsx)(n.h2,{children:`More Than Two Classes`}),`
`,(0,t.jsx)(n.p,{children:`Now imagine the model must choose between several answers instead of just yes or no.`}),`
`,(0,t.jsx)(n.p,{children:`The same idea extends: turn several raw scores into a probability distribution.`}),`
`,(0,t.jsxs)(n.p,{children:[`That function is called `,(0,t.jsx)(n.strong,{children:`softmax`}),`.`]}),`
`,(0,t.jsx)(d,{}),`
`,(0,t.jsx)(i,{title:`Decision systems in the wild`,cards:[{title:`Medical triage assistant`,product:`Symptom and intake signals become an urgency decision.`,modelIdea:`The model may start with a risk score, then convert that score into a probability or thresholded decision.`,failureMode:`A threshold that is too strict can miss urgent cases. A threshold that is too loose can overwhelm clinicians with false alarms.`,trackPrompt:{builder:`This is the right mental frame for precision-recall tradeoffs: who pays the cost of each error type?`}},{title:`Photo organizer`,product:`Pixels become one label among many possible classes.`,modelIdea:`Softmax is useful when the model must distribute confidence across multiple competing answers.`,failureMode:`The top class can look confident even when the correct class was missing from the model's label set or training coverage.`,trackPrompt:{conceptual:`Notice why multi-class prediction feels different from binary yes/no.`}}]}),`
`,(0,t.jsx)(n.h2,{children:`Guided Lab`}),`
`,(0,t.jsx)(n.p,{children:`The notebook below lets you see the same idea in code: one model, one raw score, one probability, one decision.`}),`
`,(0,t.jsx)(l,{}),`
`,(0,t.jsx)(s,{id:`ch6-threshold-vs-boundary`,chapter:6,prompt:`What is the difference between the 0.5 line and the decision boundary?`,concepts:[`classification`,`threshold`,`decision boundary`],options:[{label:`The 0.5 line is the probability threshold, while the decision boundary is the input value where the curve crosses it.`,correct:!0,explanation:`Exactly. One lives in probability space and the other lives in input space.`},{label:`They are just two names for the same thing.`,explanation:`They are related, but not identical. Mixing them up makes later reasoning about boundaries much harder.`},{label:`The decision boundary is fixed, but the 0.5 threshold changes whenever the model retrains.`,explanation:`The default threshold is fixed at 0.5 in this demo. What changes is where the model's curve crosses that line.`}]}),`
`,(0,t.jsx)(s,{id:`ch6-sigmoid-purpose`,chapter:6,prompt:`What does the sigmoid function do?`,concepts:[`sigmoid`,`probability`,`classification`],options:[{label:`It squashes a raw score into the 0-to-1 range so the output can be interpreted as a probability.`,correct:!0,explanation:`Yes. Sigmoid is the bridge between an unbounded score and a probability a human can reason about.`},{label:`It removes all negative values from the model's output.`,explanation:`Sigmoid does not simply zero out negatives. It smoothly maps any number to a value between 0 and 1.`},{label:`It chooses the final class label directly without producing a probability.`,explanation:`Sigmoid produces a probability. A separate threshold step turns that probability into a decision.`}]}),`
`,(0,t.jsx)(s,{id:`ch6-threshold-tradeoff`,chapter:6,prompt:`What happens if you lower the decision threshold from 0.5 to 0.3?`,concepts:[`threshold`,`precision`,`recall`],options:[{label:`More cases get classified as positive — catching more true positives but also more false positives.`,correct:!0,explanation:`Right. A lower threshold increases recall but typically decreases precision. This is a product tradeoff.`},{label:`The model becomes more accurate on every metric simultaneously.`,explanation:`Lowering the threshold shifts the tradeoff between catching positives and avoiding false alarms.`},{label:`The model retrains itself to use the new threshold internally.`,explanation:`The threshold is a post-model decision, not a training parameter. Changing it does not retrain the model.`}]}),`
`,(0,t.jsx)(r,{type:`idea`,children:(0,t.jsx)(n.p,{children:`Classification starts with a score, then turns that score into a decision. Sigmoid handles two classes. Softmax handles many.`})})]})}function i(e={}){let{wrapper:n}=e.components||{};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(r,{...e})}):r(e)}function a(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{i as default,n as frontmatter};