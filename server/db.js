import pg from 'pg'

const client = new pg.Client(process.env.DATABASE_URL || 'postgres://localhost/e_commerce_db')

const createTables = async () => {
  const sql = `
    drop table if exists users;
    create table users(
      id uuid primary key,
      username varchar(255) unique not null,
      password varchar(255) not null
    );
  `
  await client.query(sql)
}

export {
  client,
  createTables,
}