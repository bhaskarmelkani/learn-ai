import{t as e}from"./jsx-runtime-D-oznMWL.js";import{t}from"./PythonNotebook-Drjr-ncC.js";var n=e(),r=[{title:`Set up the data`,description:`A tiny house-price dataset using the same units as the slider demo: x is thousand sqft, y is price in $100k.`,expected:[`You should see 10 samples and two arrays with matching lengths.`,`The values should rise together, which hints at an upward trend.`],hints:[`Do not optimize anything yet. Just verify the dataset shape and the units.`,`If X and Y had different lengths, training would fail immediately.`],noCodeFallback:`Even without running this cell, the important idea is that training starts with examples where each input has a known target output.`,code:`import numpy as np

X = np.array([1.0, 1.4, 1.8, 2.2, 2.6, 3.0, 3.4, 3.8, 4.2, 4.6])
Y = np.array([1.9, 2.4, 2.9, 3.3, 3.8, 4.3, 4.9, 5.4, 6.0, 6.5])

print("samples:", len(X))
print("X:", X)
print("Y:", Y)`,packages:[`numpy`],successKeywords:[`samples: 10`,`X:`,`Y:`]},{title:`Train with gradient descent`,description:`Change the learning rate or number of epochs and watch how the learned line moves.`,expected:[`Loss should fall as training proceeds.`,`The final line should end up close to the visible slider-demo fit.`],hints:[`If the loss explodes, lower the learning rate.`,`If the final line looks poor, raise the number of epochs before changing the math.`],breakPrompt:`Set lr to 0.2 or 0.5 and rerun. What unstable behavior do you see in the printed loss values?`,noCodeFallback:`The training loop is always the same story: predict, measure error, compute an update, and repeat.`,code:`w = 0.0
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

print("\\nfinal line: y = {:.2f}x + {:.2f}".format(w, b))`,packages:[`numpy`],successKeywords:[`final line`,`loss=`]},{title:`Make a prediction`,description:`Once the model is trained, try predicting a new example.`,expected:[`The predicted price should land in the same rough range as the slider demo for x = 3.2.`],hints:[`This cell depends on w and b from the training cell above.`,`If you restarted the kernel, rerun the earlier cells first.`],breakPrompt:`Change new_x to a much larger value like 8.0. What does that reveal about extrapolating past the data you actually saw?`,noCodeFallback:`Prediction is just feeding a new input into the trained equation. The new example never changes the learned parameters by itself.`,code:`new_x = 3.2
prediction = w * new_x + b

print(f"predicted price for x={new_x}: \${prediction * 100:.0f}k")`,successKeywords:[`predicted price`]}];function i(){return(0,n.jsx)(t,{title:`Linear Regression Notebook`,description:`This notebook keeps the same mental model as the slider demo, but lets learners edit the training loop directly and see the numbers move.`,cells:r,globalPackages:[`numpy`]})}export{i as LinearRegressionNotebook};