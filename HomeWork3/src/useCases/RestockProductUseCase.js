class RestockProductUseCase {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  async execute(quantity) {
    const amount = Number(quantity) || 1;
    const product = await this.productRepository.getProduct();
    product.restock(amount);
    await this.productRepository.save(product);
    return product.toJSON();
  }
}

module.exports = RestockProductUseCase;
