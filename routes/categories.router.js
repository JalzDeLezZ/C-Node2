const express = require('express');
const router = express.Router();

const CategoriesServices = require('../services/categories.service.js')
const instace_service = new CategoriesServices();

router.get('/', (req,res) => {/* http://localhost:3000/api/v1/categories?limit=10&&offset=3 */
  const {limit, offset } = req.query;
  console.log(limit,"0000000", offset);

  const categories = instace_service.find(limit, offset);

  if(!limit && !offset){
    res.json({message: "No hay Query Params" , data : categories})
  }
  res.json(categories)
})

module.exports = router;
