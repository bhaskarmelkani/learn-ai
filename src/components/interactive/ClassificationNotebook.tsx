import { PythonNotebook } from "./PythonNotebook";

const cells = [
  {
    title: "Create a tiny spam dataset",
    description: "Each row is [word_count, has_link, exclamation_marks]. You can edit the examples to see how the classifier changes.",
    code: `import numpy as np

X = np.array([
    [50.0, 1.0, 5.0],
    [200.0, 0.0, 0.0],
    [30.0, 1.0, 8.0],
    [150.0, 0.0, 1.0],
    [20.0, 1.0, 10.0],
])
Y = np.array([1.0, 0.0, 1.0, 0.0, 1.0])

print("samples:", len(X))
print("feature shape:", X.shape)`,
    packages: ["numpy"],
  },
  {
    title: "Train logistic regression",
    description: "Change the learning rate or epochs and watch the accuracy move.",
    code: `def sigmoid(z):
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
print("bias:", b)`,
    packages: ["numpy"],
  },
  {
    title: "Test a new email",
    description: "Edit the test example to see how the spam probability changes.",
    code: `test = np.array([25.0, 1.0, 7.0])
prob = sigmoid(test @ w + b)

print(f"spam probability: {prob:.2%}")
print("prediction:", "spam" if prob > 0.5 else "not spam")`,
  },
];

export function ClassificationNotebook() {
  return (
    <PythonNotebook
      title="Classification Notebook"
      description="Learners can edit the dataset, retrain the classifier, and immediately see how the predicted probability changes."
      cells={cells}
      globalPackages={["numpy"]}
    />
  );
}
