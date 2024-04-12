import {
  authenticate,
  client,
  createCart,
  createCategory,
  createProduct,
  createTables,
  createUser,
  findUserWithToken,
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

async function isLoggedIn(req, res, next) {
  try {
    req.user = await findUserWithToken(req.headers.authorization)
    next()
  } catch (err) {
    console.log(err)
  }
}

app.post('/api/auth/login', async (req, res, next) => {
  try {
    res.send(await authenticate(req.body))
  } catch (err) {
    next(err)
  }
})

app.get('/api/users', async (req, res, next) => {
  try {
    res.send(await getAllUsers());
  } catch (err) {
    next(err)
  }
})

app.post('/api/users', async (req, res, next) => {
  try {
    res.send(await createUser(req.body))
  } catch (err) {
    next(err)
  }
})

app.get('/api/products/categories', async (req, res, next) => {
  try {
    res.send(await getAllCategories());
  } catch (err) {
    next(err)
  }
})

app.get('/api/products', async (req, res, next) => {
  try {
    res.send(await getAllProducts())
  } catch (err) {
    next(err)
  }
})

app.get('/api/products/:id', async (req, res, next) => {
  try {
    res.send(await getProduct(req.params.id))
  } catch (err) {
    next(err)
  }
})

app.get('/api/carts', async (req, res, next) => {
  try {
    res.send(await getCarts());
  } catch (err) {
    next(err)
  }
})

// app.get('/api/carts/user/:userId', async (req, res, next) => {
app.get('/api/carts/user/', isLoggedIn, async (req, res, next) => {
  try {
    res.send(await getCart(req.user.id))
  } catch (err) {
    console.log(err)
    next(err)
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

  // console.log('creating carts')
  // await createCart(user1.id, JSON.stringify({ productId: 1, quantity: 4 }))
  // console.log('carts created')

  const PORT = process.env.PORT || 3000
  app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
  })
}

init()
