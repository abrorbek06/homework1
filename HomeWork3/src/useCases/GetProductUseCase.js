class GetProductUseCase {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  async execute() {
    const product = await this.productRepository.getProduct();
    return product.toJSON();
  }
}

module.exports = GetProductUseCase;
