import { PythonNotebook } from "./PythonNotebook";

const cells = [
  {
    title: "Create a tiny XOR dataset",
    description: "A linear model cannot solve XOR, which is why this is a good toy problem for a small neural network.",
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
  },
  {
    title: "Train a two-layer network in NumPy",
    description: "Edit the hidden size, epochs, or learning rate and watch how the loss changes.",
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
  },
  {
    title: "Inspect the predictions",
    description: "These values should move close to 0, 1, 1, 0 if training worked.",
    code: `z1 = X @ W1 + b1
a1 = np.tanh(z1)
z2 = a1 @ W2 + b2
y_hat = sigmoid(z2)

for x_row, pred, actual in zip(X, y_hat.flatten(), Y.flatten()):
    print(f"input={x_row}  pred={pred:.3f}  actual={actual:.1f}")`,
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
