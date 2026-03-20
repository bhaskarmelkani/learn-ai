import { PythonNotebook } from "./PythonNotebook";

const cells = [
  {
    title: "Set up the data",
    description: "A tiny dataset of house size to price. Feel free to change the numbers and rerun the later cells.",
    code: `import numpy as np

X = np.array([1.0, 1.5, 2.0, 2.5, 3.0])
Y = np.array([200.0, 280.0, 350.0, 420.0, 500.0])

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
    code: `new_x = 2.2
prediction = w * new_x + b

print(f"predicted price for x={new_x}: {prediction:.2f}")`,
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
