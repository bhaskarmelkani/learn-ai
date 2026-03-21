import { PythonNotebook } from "./PythonNotebook";

const cells = [
  {
    title: "Create a tiny XOR dataset",
    description: "A linear model cannot solve XOR, which is why this is a good toy problem for a small neural network.",
    expected: [
      "X should have shape (4, 2) and Y should have shape (4, 1).",
      "The labels alternate in the XOR pattern 0, 1, 1, 0.",
    ],
    hints: [
      "Each row is one input pair.",
      "This dataset is tiny on purpose so you can inspect every example mentally.",
    ],
    noCodeFallback:
      "XOR matters because one linear boundary cannot separate the positive and negative cases cleanly.",
    code: `import numpy as np

X = np.array([
    [0.0, 0.0],
    [0.0, 1.0],
    [1.0, 0.0],
    [1.0, 1.0],
])
Y = np.array([[0.0], [1.0], [1.0], [0.0]])

print("X shape:", X.shape)
print("Y shape:", Y.shape)
print(X)
print(Y)`,
    packages: ["numpy"],
    successKeywords: ["X shape:", "Y shape:"],
  },
  {
    title: "Train a two-layer network in NumPy",
    description: "Edit the hidden size, epochs, or learning rate and watch how the loss changes.",
    expected: [
      "Loss should fall substantially if training works.",
      "The network should learn a representation that solves XOR better than one linear score.",
    ],
    hints: [
      "W1 and b1 create the hidden representation; W2 and b2 turn that representation into the final output.",
      "If training is unstable, lower the learning rate before changing the architecture.",
    ],
    breakPrompt:
      "Set hidden = 1 and rerun. What does that reveal about how much representation capacity XOR needs?",
    noCodeFallback:
      "Backpropagation is just a way to send credit and blame backward so every layer learns how it contributed to the final error.",
    code: `rng = np.random.default_rng(4)

hidden = 4
lr = 0.8
epochs = 4000

W1 = rng.normal(scale=0.5, size=(2, hidden))
b1 = np.zeros((1, hidden))
W2 = rng.normal(scale=0.5, size=(hidden, 1))
b2 = np.zeros((1, 1))

def sigmoid(x):
    return 1 / (1 + np.exp(-x))

for epoch in range(epochs):
    z1 = X @ W1 + b1
    a1 = np.tanh(z1)
    z2 = a1 @ W2 + b2
    y_hat = sigmoid(z2)

    loss = np.mean((Y - y_hat) ** 2)

    d_y_hat = 2 * (y_hat - Y) / len(X)
    d_z2 = d_y_hat * y_hat * (1 - y_hat)
    d_W2 = a1.T @ d_z2
    d_b2 = np.sum(d_z2, axis=0, keepdims=True)

    d_a1 = d_z2 @ W2.T
    d_z1 = d_a1 * (1 - np.tanh(z1) ** 2)
    d_W1 = X.T @ d_z1
    d_b1 = np.sum(d_z1, axis=0, keepdims=True)

    W2 -= lr * d_W2
    b2 -= lr * d_b2
    W1 -= lr * d_W1
    b1 -= lr * d_b1

    if epoch % 800 == 0:
        print(f"epoch={epoch:>4}  loss={loss:.5f}")

print("\\ntraining finished")`,
    packages: ["numpy"],
    successKeywords: ["loss=", "training finished"],
  },
  {
    title: "Inspect the predictions",
    description: "These values should move close to 0, 1, 1, 0 if training worked.",
    expected: [
      "Predictions should roughly match 0, 1, 1, 0 in order.",
    ],
    hints: [
      "If all predictions sit near 0.5, the network did not really learn the pattern.",
      "This cell is the test of whether the hidden layer built useful internal detectors.",
    ],
    breakPrompt:
      "Restart the kernel and run only this cell. What dependency does it reveal about trained parameters and the active notebook session?",
    noCodeFallback:
      "The purpose of this cell is to check whether the learned internal representation actually improved the outputs on all four XOR cases.",
    code: `z1 = X @ W1 + b1
a1 = np.tanh(z1)
z2 = a1 @ W2 + b2
y_hat = sigmoid(z2)

for x_row, pred, actual in zip(X, y_hat.flatten(), Y.flatten()):
    print(f"input={x_row}  pred={pred:.3f}  actual={actual:.1f}")`,
    successKeywords: ["input=", "actual="],
  },
];

export function NeuralNetworkNotebook() {
  return (
    <PythonNotebook
      title="Neural Network Notebook"
      description="This notebook turns the neural-network chapter into something learners can edit, rerun, and break on purpose. It uses NumPy so it can run directly in the browser."
      cells={cells}
      globalPackages={["numpy"]}
    />
  );
}
