import { PythonNotebook } from "./PythonNotebook";

const cells = [
  {
    title: "Set up the data",
    description: "A tiny house-price dataset using the same units as the slider demo: x is thousand sqft, y is price in $100k.",
    code: `import numpy as np

X = np.array([1.0, 1.4, 1.8, 2.2, 2.6, 3.0, 3.4, 3.8, 4.2, 4.6])
Y = np.array([1.9, 2.4, 2.9, 3.3, 3.8, 4.3, 4.9, 5.4, 6.0, 6.5])

print("samples:", len(X))
print("X:", X)
print("Y:", Y)`,
    packages: ["numpy"],
  },
  {
    title: "Train with gradient descent",
    description: "Change the learning rate or number of epochs and watch how the learned line moves.",
    code: `w = 0.0
b = 0.0
lr = 0.01
epochs = 800

for epoch in range(epochs):
    y_pred = w * X + b
    loss = np.mean((Y - y_pred) ** 2)

    dw = -2 * np.mean(X * (Y - y_pred))
    db = -2 * np.mean(Y - y_pred)

    w -= lr * dw
    b -= lr * db

    if epoch % 200 == 0:
        print(f"epoch={epoch:>3}  w={w:6.2f}  b={b:6.2f}  loss={loss:10.2f}")

print("\\nfinal line: y = {:.2f}x + {:.2f}".format(w, b))`,
    packages: ["numpy"],
  },
  {
    title: "Make a prediction",
    description: "Once the model is trained, try predicting a new example.",
    code: `new_x = 3.2
prediction = w * new_x + b

print(f"predicted price for x={new_x}: $\{prediction * 100:.0f}k")`,
  },
];

export function LinearRegressionNotebook() {
  return (
    <PythonNotebook
      title="Linear Regression Notebook"
      description="This notebook keeps the same mental model as the slider demo, but lets learners edit the training loop directly and see the numbers move."
      cells={cells}
      globalPackages={["numpy"]}
    />
  );
}
