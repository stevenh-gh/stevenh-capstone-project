import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import pg from 'pg'
import { v4 as uuid } from 'uuid'

const client = new pg.Client(process.env.DATABASE_URL || 'postgres://localhost/e_commerce_db')
const JWT = process.env.JWT || 'secret token'

const createTables = async () => {
  const sql = `
    drop table if exists cart;
    drop table if exists "user";
    drop table if exists product;
    drop table if exists category;

    create table "user"(
      id uuid primary key,
      username varchar(255) unique not null,
      password varchar(255) not null
    );

    create table category(
      id serial primary key,
      name varchar(255)
    );

    create table product(
      id uuid primary key,
      title varchar(255) not null,
      price decimal not null,
      category_id integer references category(id) not null,
      description text not null,
      image varchar(255) not null
    );

    create table cart(
      id uuid primary key,
      userId uuid references "user"(id) not null,
      products jsonb not null
    );
  `
  await client.query(sql)
}

const authenticate = async ({ username, password }) => {
  const sql = `
    select * from "user"
    where username = $1;
  `
  const response = await client.query(sql, [username])
  if (!response.rows.length || (await bcrypt.compare(password, response.rows[0].password)) === false) {
    const err = Error('not authorized')
    err.status = 401
    throw err
  }
  else {
    const token = jwt.sign({ id: response.rows[0].id }, JWT)
    return { token }
  }
}

const findUserWithToken = async (token) => {
  let id
  try {
    const tkn = jwt.decode(token)
    id = tkn.id
  } catch (err) {
    const error = Error('not authorized')
    error.status = 401
    throw error
  }

  const sql = `
    select id, username from "user" where id = $1;
  `
  const response = await client.query(sql, [id])
  if (!response.rows.length) {
    const err = Error('not authorized')
    err.status = 401
    throw err
  }
  else {
    return response.rows[0]
  }
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
  await createCart(response.rows[0].id, JSON.stringify([]))
  return response.rows[0]
}

const getAllUsers = async () => {
  const sql = `
    select * from "user";
  `
  const response = await client.query(sql);
  return response.rows
}

const createProduct = async ({ title, price, category, description, image }) => {
  const sql = `
    insert into product
      (id, title, price, category_id, description, image)
    values
      ($1, $2, $3, $4, $5, $6)
    returning *;
  `
  const response = await client.query(sql, [uuid(), title, price, category, description, image])
  return response.rows[0]
}

const createCategory = async (name) => {
  const sql = `
    insert into category
      (name)
    values
      ($1);
  `
  await client.query(sql, [name])
}

const getAllCategories = async () => {
  const sql = `
    select * from category;
  `
  const response = await client.query(sql)
  return response.rows
}

const getAllProducts = async () => {
  const sql = `
    select
      product.id as id,
      product.title as title,
      product.price as price,
      product.description as description,
      product.image as image,
      category.name as category
    from product
    join category on product.category_id = category.id;
  `
  const response = await client.query(sql)
  return response.rows
}

const getProduct = async (id) => {
  const sql = `
    select
      product.id as id,
      product.title as title,
      product.price as price,
      product.description as description,
      product.image as image,
      category.name as category
    from product
    join category on product.category_id = category.id
    where product.id = $1
  `
  const response = await client.query(sql, [id])
  return response.rows[0]
}

const createCart = async (userId, products) => {
  const sql = `
    insert into cart
      (id, userId, products)
    values
      ($1, $2, $3)
    returning *;
  `
  const response = await client.query(sql, [uuid(), userId, products])
  return response.rows[0]
}

const getCarts = async () => {
  const sql = `
    select * from cart;
  `
  const response = await client.query(sql);
  return response.rows
}

const getCart = async (userId) => {
  const sql = `
    select * from cart
    where userId = $1;
  `
  const response = await client.query(sql, [userId])
  return response.rows[0]
}

export {
  client,
  createTables,
  createUser,
  getAllUsers,
  createCategory,
  createProduct,
  getAllCategories,
  getAllProducts,
  getProduct,
  createCart,
  getCarts,
  getCart,
  authenticate,
  findUserWithToken
}