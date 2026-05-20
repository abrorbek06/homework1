class ProductController {
  constructor({ getProductUseCase, buyProductUseCase, restockProductUseCase }) {
    this.getProductUseCase = getProductUseCase;
    this.buyProductUseCase = buyProductUseCase;
    this.restockProductUseCase = restockProductUseCase;
  }

  async getProduct(req, res) {
    const product = await this.getProductUseCase.execute();
    res.json(product);
  }

  async buyProduct(req, res) {
    try {
      const product = await this.buyProductUseCase.execute(req.body.quantity);
      res.json({ message: "Purchase successful", stock: product.stock });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async restockProduct(req, res) {
    try {
      const product = await this.restockProductUseCase.execute(req.body.quantity);
      res.json({ message: "Restock successful", stock: product.stock });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = ProductController;
