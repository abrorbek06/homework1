class BuyProductUseCase {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  async execute(quantity) {
    const amount = Number(quantity) || 1;
    if (amount <= 0) {
      throw new Error("Quantity must be at least 1");
    }

    const product = await this.productRepository.getProduct();
    product.withdraw(amount);
    await this.productRepository.save(product);
    return product.toJSON();
  }
}

module.exports = BuyProductUseCase;
