const express = require("express");
const app = express();

app.use(express.json());

let product = {
  name: "Laptop",
  stock: 5,
};

function fakeDatabaseDelay() {
  return new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });
}

let isWithdrawInProgress = false;

app.get("/product", async (req, res) => {
    res.json(product);
});

app.post("/buy", async (req, res) => {
    const quantity = req.body.quantity || 1;

    if (isWithdrawInProgress) {
        return res.status(429).json({ message: "Another purchase is in progress. Please try again later." });
    }

    isWithdrawInProgress = true;

    try {
        if (product.stock < quantity) {
            return res.status(400).json({ message: "Not enough stock available", stock: product.stock });
        }

        await fakeDatabaseDelay();

        product.stock -= quantity;

        res.json({ message: "Purchase successful", stock: product.stock });
    
    } finally {
        isWithdrawInProgress = false;
    }
});

app.post("/restock", (req, res) => {
    const quantity = req.body.quantity || 1;
    product.stock += quantity;
    res.json({ message: "Restock successful", stock: product.stock });
});


app.listen(3000, () => {
    console.log("Server is running on port 3000");
});