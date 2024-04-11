import bcrypt from 'bcrypt'
import pg from 'pg'
import { v4 as uuid } from 'uuid'

const client = new pg.Client(process.env.DATABASE_URL || 'postgres://localhost/e_commerce_db')

const createTables = async () => {
  const sql = `
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
      description varchar(255) not null,
      image varchar(255) not null
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
  return response[0]
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
    select * , category.name as category from product  
    join category on product.category_id = category.id;
  `
  const response = await client.query(sql)
  return response.rows
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
}