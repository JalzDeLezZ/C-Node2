const express = require('express');
const routerApi = require('./routes')
const morgan = require('morgan') // include morgan module

const { logErrors, errorHandler, boomErrorHandler} = require('./middlewares/error.handler.js')

const app = express();
const port = 3000;

/* MIDLEWARES */
app.use(express.json());
app.use(morgan('dev'));

/* ROUTES */
app.get('/', (req,res) => {
  res.send('Hello World!');
})
app.get('/nueva-ruta', (req,res) => {
  res.send('NEW RUTE!');
})
routerApi(app);


app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

/* PORT */
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
















/*

app.get('/categories/:categoryId/products/:productId', (req,res) => {
  const { categoryId, productId } = req.params;
  res.json({
    categoryId,
    productId,
    name: 'Producto 1',
    price: '$100'
    });
  })

  */