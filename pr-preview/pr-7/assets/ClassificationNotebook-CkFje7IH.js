import{t as e}from"./jsx-runtime-D-oznMWL.js";import{t}from"./PythonNotebook-Drjr-ncC.js";var n=e(),r=[{title:`Create a tiny spam dataset`,description:`Each row is [word_count, has_link, exclamation_marks]. You can edit the examples to see how the classifier changes.`,expected:[`You should see 5 samples and a feature shape of (5, 3).`,`The dataset mixes both spam and non-spam labels.`],hints:[`Each row is one email. Each column is one feature signal.`,`Y holds the labels the model is trying to match.`],noCodeFallback:`Classification still starts from examples with labels. The model learns how feature patterns connect to spam vs not spam.`,code:`import numpy as np

X = np.array([
    [50.0, 1.0, 5.0],
    [200.0, 0.0, 0.0],
    [30.0, 1.0, 8.0],
    [150.0, 0.0, 1.0],
    [20.0, 1.0, 10.0],
])
Y = np.array([1.0, 0.0, 1.0, 0.0, 1.0])

print("samples:", len(X))
print("feature shape:", X.shape)`,packages:[`numpy`],successKeywords:[`samples: 5`,`feature shape:`]},{title:`Train logistic regression`,description:`Change the learning rate or epochs and watch the accuracy move.`,expected:[`Loss should trend downward.`,`Accuracy should become high on this tiny toy dataset.`],hints:[`If the probability hits exactly 0 or 1, the small epsilon in the log keeps the loss stable.`,`w learns one weight per feature. b is the baseline shift.`],breakPrompt:`Delete the epsilon terms inside the log call and rerun. Why can that make training numerically fragile?`,noCodeFallback:`This loop is the classification version of the regression loop: compute scores, turn them into probabilities, measure error, update parameters.`,code:`def sigmoid(z):
    return 1 / (1 + np.exp(-z))

w = np.zeros(3)
b = 0.0
lr = 0.01
epochs = 1200

for epoch in range(epochs):
    z = X @ w + b
    pred = sigmoid(z)

    loss = -np.mean(Y * np.log(pred + 1e-8) + (1 - Y) * np.log(1 - pred + 1e-8))
    error = pred - Y
    dw = X.T @ error / len(Y)
    db = np.mean(error)

    w -= lr * dw
    b -= lr * db

    if epoch % 300 == 0:
        accuracy = np.mean((pred > 0.5) == Y)
        print(f"epoch={epoch:>4}  loss={loss:.4f}  accuracy={accuracy:.0%}")

print("\\nweights:", w)
print("bias:", b)`,packages:[`numpy`],successKeywords:[`weights:`,`bias:`]},{title:`Test a new email`,description:`Edit the test example to see how the spam probability changes.`,expected:[`You should get one probability and one yes/no prediction.`],hints:[`The three numbers match the feature order above: word_count, has_link, exclamation_marks.`,`Use this cell to see how feature changes move the probability, not just the final label.`],breakPrompt:`Set the link feature to 0 and reduce exclamation marks. Which change moves the probability more in this toy model?`,noCodeFallback:`The output is not magic. It is a probability produced from the features and the learned weights.`,code:`test = np.array([25.0, 1.0, 7.0])
prob = sigmoid(test @ w + b)

print(f"spam probability: {prob:.2%}")
print("prediction:", "spam" if prob > 0.5 else "not spam")`,successKeywords:[`spam probability`,`prediction:`]}];function i(){return(0,n.jsx)(t,{title:`Classification Notebook`,description:`Learners can edit the dataset, retrain the classifier, and immediately see how the predicted probability changes.`,cells:r,globalPackages:[`numpy`]})}export{i as ClassificationNotebook};