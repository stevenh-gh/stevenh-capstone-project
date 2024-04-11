import pg from 'pg'

const client = new pg.Client(process.env.DATABASE_URL || 'postgres://localhost/e_commerce_db')

export {
  client
}