import { client, createTables, createUser, getAllUsers } from './db.js';

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

const init = async () => {
  await client.connect()
  console.log('connected to db')

  console.log('creating tables...')
  await createTables()
  console.log('tables created')

  console.log('creating users...')
  await createUser({ username: 'johnd', password: 'm38rmF$' })
  console.log('users created')

  const PORT = process.env.PORT || 3000
  app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
  })
}

init()
