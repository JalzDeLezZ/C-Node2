const express = require('express');

const ProductsService = require('./../services/product.service.js');
const validatorHandler = require('./../middlewares/validator.handler.js');
const {
  createProductSchema,
  updateProductSchema,
  getProductsSchema,
} = require('./../schemas/product.schema.js');

const router = express.Router();
const instance_service = new ProductsService();

router.get('/', async (req,res) => {
  const products = await instance_service.find();
  res.json( products );
})

router.get('/filter',(req,res) => {
  res.send('FILTER');
})

router.get('/:id',
  validatorHandler(getProductsSchema, 'params'),
  async (req,res,next) => {
    try {
      const { id } = req.params;
      const product = await instance_service.findOne(id);
      res.json(product)
    } catch (error) {
      next(error);
    }
  }
)

router.post('/',
  validatorHandler(createProductSchema, 'body'),
  async (req,res) => {
    const body = req.body;
    const newProduct = await instance_service.create(body);
    res.status(201).json(newProduct);
  }
)

router.patch('/:id',
  validatorHandler(getProductsSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req,res, next) => {
    try {
      const {id} = req.params;
      const body = req.body;
      const updatedProduct = await instance_service.update(id, body);
      res.json(updatedProduct);
    } catch (error) {
      next(error);
    }
  }
)

router.delete('/:id',
  validatorHandler(getProductsSchema, 'params'),
  async (req,res) => {
    const { id } = req.params;
    const deletedProduct = await instance_service.delete(id);
    res.json(deletedProduct);
  }
)

module.exports = router;
