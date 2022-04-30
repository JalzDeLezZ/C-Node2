const { json } = require('express/lib/response');
const faker = require('faker');

class CategoriesServices {
  constructor() {
    this.categories = [];
    this.generate();
  }

  generate() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.categories.push({
        id: faker.datatype.uuid(),
        number: index,
        name: faker.commerce.department(),
        description: faker.lorem.sentence(),
      });
    }
  }

  find(pOffset= 0, pLimit = 10) {

    const x = JSON.parse(pOffset) + JSON.parse(pLimit);
    console.log(x);
    return this.categories.slice(pOffset, x);
  }

}

module.exports = CategoriesServices;