import {
  client,
  createCategory,
  createProduct,
  createTables,
  createUser,
  getAllCategories,
  getAllProducts,
  getAllUsers
} from './db.js';

import express from 'express';
import morgan from 'morgan'
import path from 'path'

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
  await createProduct({
    title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    price: 109.95,
    description: "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    category: 3,
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
  })
  console.log('products created')

  const PORT = process.env.PORT || 3000
  app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
  })
}

init()
