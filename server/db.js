import bcrypt from 'bcrypt'
import pg from 'pg'
import { v4 as uuid } from 'uuid'

const client = new pg.Client(process.env.DATABASE_URL || 'postgres://localhost/e_commerce_db')

const createTables = async () => {
  const sql = `
    drop table if exists "user";
    create table "user"(
      id uuid primary key,
      username varchar(255) unique not null,
      password varchar(255) not null
    );
  `
  await client.query(sql)
}

const createUser = async ({ username, password }) => {
  const sql = `
    insert into "user"
      (id, username, password)
    values
      ($1, $2, $3)
    returning *;
  `
  const response = await client.query(sql, [uuid(), username, await bcrypt.hash(password, 5)])
  return response[0]
}

export {
  client,
  createTables,
  createUser,
}