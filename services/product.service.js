const faker = require('faker');
const boom = require('@hapi/boom');

class ProductsService {

  constructor(){
    this.products = [];
    this.generate();
  }

  generate() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean(),
      });
    }
  }

  async create(pData) {
    const newProduct = {
      id: faker.datatype.uuid(),
      ...pData
    }
    this.products.push(newProduct);
    return newProduct;
  }

  async find(){
    // return this.products;
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.products);
      }, 3000);
    });
  }

  async findOne(pIdentity){
    const product = this.products.find(pI => pI.id === pIdentity);
    if(!product){
      throw boom.notFound('Product not found');
    }
    if (product.isBlock) {
      throw boom.conflict('Product is blocked');
    }
    return product;
  }

  async update(pIdentity, pChanges){
    const index = this.products.findIndex(pI => pI.id === pIdentity);
    if(index === -1){
      // throw new Error('Product not found');
      throw boom.notFound('Product not found');
    }
    const product =  this.products[index];
    this.products[index] = {
      ...product,
      ...pChanges
    }

    return this.products[index];
  }

  async delete(pIdentity){
    const index = this.products.findIndex(pI => pI.id === pIdentity);
    if(index === -1){
      throw boom.notFound('Product not found');
    }
    this.products.splice(index, 1);
    return { message: `Product ${pIdentity} deleted` };
  }
}

module.exports = ProductsService;