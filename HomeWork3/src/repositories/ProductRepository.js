const Product = require("../entities/Product");

class ProductRepository {
  constructor() {
    this.product = new Product({ name: "Laptop", stock: 5 });
  }

  async getProduct() {
    return this.product;
  }

  async save(product) {
    this.product = product;
    return this.product;
  }
}

module.exports = ProductRepository;
