import client from '../db/index.js';

export const insertProduct = async (name, price, description, image_url) => {
  const result = await client.query(
    'INSERT INTO products (name, price, description, image_url) VALUES ($1, $2, $3, $4) RETURNING *',
    [name, price, description, image_url]
  );
  return result.rows[0];
};

export const getAllProducts = async () => {
  const result = await client.query('SELECT * FROM products ORDER BY created_at DESC');
  return result.rows;
};

export const getProductById = async (id) => {
  const result = await client.query('SELECT * FROM products WHERE id = $1', [id]);
  return result.rows[0];
};

export const updateProduct = async (id, name, price, description, image_url) => {
  const result = await client.query(
    'UPDATE products SET name = $1, price = $2, description = $3, image_url = $4 WHERE id = $5 RETURNING *',
    [name, price, description, image_url, id]
  );
  return result.rows[0];
};

export const deleteProduct = async (id) => {
  const result = await client.query('DELETE FROM products WHERE id = $1 RETURNING *', [id]);
  return result.rows[0];
};






