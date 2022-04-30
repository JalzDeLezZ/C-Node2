const express = require('express');
const router = express.Router();

router.get('/', (req,res) => {
  const {limit, offset } = req.query;
  if(limit && offset){
    res.json([
      {
        limit, offset,
        name: 'User 1',
        age: '20'
      },
    ])
  } else {
    res.send('No hay Query Params')
  }
})

module.exports = router;
