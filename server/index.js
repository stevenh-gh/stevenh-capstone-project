import {
  client,
  createCart,
  createCategory,
  createProduct,
  createTables,
  createUser,
  getAllCategories,
  getAllProducts,
  getAllUsers,
  getCart,
  getCarts,
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

app.post('/users', async (req, res, next) => {
  try {
    res.send(await createUser(req.body))
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

app.get('/carts', async (req, res, next) => {
  try {
    res.send(await getCarts());
  } catch (err) {
    console.log(err)
  }
})

app.get('/carts/user/:userId', async (req, res, next) => {
  try {
    res.send(await getCart(req.params.userId))
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
  const user1 = await createUser({ username: 'johnd', password: 'm38rmF$' })
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

  console.log('creating carts')
  await createCart(user1.id, JSON.stringify({ productId: 1, quantity: 4 }))
  console.log('carts created')

  const PORT = process.env.PORT || 3000
  app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
  })
}

init()
