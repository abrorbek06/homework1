const express = require("express");
const ProductController = require("../controllers/ProductController");
const ProductRepository = require("../repositories/ProductRepository");
const GetProductUseCase = require("../useCases/GetProductUseCase");
const BuyProductUseCase = require("../useCases/BuyProductUseCase");
const RestockProductUseCase = require("../useCases/RestockProductUseCase");

const router = express.Router();
const repository = new ProductRepository();
const controller = new ProductController({
  getProductUseCase: new GetProductUseCase(repository),
  buyProductUseCase: new BuyProductUseCase(repository),
  restockProductUseCase: new RestockProductUseCase(repository),
});

router.get("/product", controller.getProduct.bind(controller));
router.post("/buy", controller.buyProduct.bind(controller));
router.post("/restock", controller.restockProduct.bind(controller));

module.exports = router;
