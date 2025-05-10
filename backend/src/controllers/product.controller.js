import * as ProductModel from '../models/product.model.js';

export const createProduct = async (req, res) => {
  try {
    const { name, price, description, image_url } = req.body;
    const product = await ProductModel.insertProduct(name, price, description, image_url);
    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating product' });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await ProductModel.getAllProducts();
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching products' });
  }
};

export const getProduct = async (req, res) => {
  try {
    const product = await ProductModel.getProductById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching product' });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { name, price, description, image_url } = req.body;
    const product = await ProductModel.updateProduct(req.params.id, name, price, description, image_url);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating product' });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await ProductModel.deleteProduct(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted', product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting product' });
  }
};
