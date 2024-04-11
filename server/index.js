import {
  client,
  createCategory,
  createProduct,
  createTables,
  createUser,
  getAllCategories,
  getAllProducts,
  getAllUsers,
  getProduct
} from './db.js';

import express from 'express';
import morgan from 'morgan'
import path from 'path'
import seedProducts from './seedProducts.js';

const app = express();

app.use(express.json())
app.use(morgan('dev'))

app.get('/users', async (req, res, next) => {
  try {
    res.send(await getAllUsers());
  } catch (err) {
    console.log(err)
  }
})

app.get('/products/categories', async (req, res, next) => {
  try {
    res.send(await getAllCategories());
  } catch (err) {
    console.log(err)
  }
})

app.get('/products', async (req, res, next) => {
  try {
    res.send(await getAllProducts())
  } catch (err) {
    console.log(err)
  }
})

app.get('/products/:id', async (req, res, next) => {
  try {
    res.send(await getProduct(req.params.id))
  } catch (err) {
    console.log(err)
  }
})

const init = async () => {
  await client.connect()
  console.log('connected to db')

  console.log('creating tables...')
  await createTables()
  console.log('tables created')

  console.log('creating users...')
  await createUser({ username: 'johnd', password: 'm38rmF$' })
  console.log('users created')

  console.log('creating categories...')
  await createCategory('electronics')
  await createCategory('jewelry')
  await createCategory('men\'s clothing')
  await createCategory('women\'s clothing')
  console.log('categories created')

  console.log('creating products...')
  await seedProducts();
  console.log('products created')

  const PORT = process.env.PORT || 3000
  app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
  })
}

init()
