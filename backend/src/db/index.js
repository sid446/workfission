import dotenv from 'dotenv';
import pkg from 'pg';

dotenv.config();

const { Client } = pkg;

const client = new Client({
  connectionString: process.env.DATABASE_URI,
  ssl: {
    rejectUnauthorized: false, // required by most cloud PostgreSQL providers like Neon
  },
});

client.connect()
  .then(() => console.log('✅ Connected to Neon PostgreSQL'))
  .catch(err => console.error('❌ Connection error:', err.stack));

export default client;
