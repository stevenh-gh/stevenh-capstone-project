import { client } from './db.js';
import express from 'express';
import morgan from 'morgan'
import path from 'path'
const app = express();

app.use(express.json())
app.use(morgan('dev'))

const init = async () => {
  await client.connect()

  const PORT = process.env.PORT || 3000
  app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
  })
}

init()
