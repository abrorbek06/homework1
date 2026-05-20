class Product {
  constructor({ name, stock }) {
    this.name = name;
    this.stock = stock;
  }

  canBuy(quantity) {
    return quantity > 0 && this.stock >= quantity;
  }

  withdraw(quantity) {
    if (!this.canBuy(quantity)) {
      throw new Error("Not enough stock available");
    }
    this.stock -= quantity;
  }

  restock(quantity) {
    if (quantity <= 0) {
      throw new Error("Quantity must be greater than zero");
    }
    this.stock += quantity;
  }

  toJSON() {
    return { name: this.name, stock: this.stock };
  }
}

module.exports = Product;
