import dotenv from 'dotenv';
import express from 'express';
import client from './db/index.js';
import cors from 'cors';
import productRoutes from './routes/product.route.js'; // Adjust the import path as necessary
dotenv.config();

const app = express();


app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running!');
});

// ✅ Test DB connection
app.get('/test-db', async (req, res) => {
  try {
    const result = await client.query('SELECT NOW()');
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Database connection failed');
  }
});
app.use('/products', productRoutes);

const PORT = process.env.PORT 
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
