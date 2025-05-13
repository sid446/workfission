import dotenv from 'dotenv';
import pkg from 'pg';

dotenv.config();

const { Client } = pkg;

const client = new Client({
  connectionString: process.env.DATABASE_URI,
  
});

client.connect()
  .then(() => console.log('✅ Connected to Neon PostgreSQL'))
  .catch(err => console.error('❌ Connection error:', err.stack));

export default client;
