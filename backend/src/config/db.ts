import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

let pool: Pool | null = null;
let isPostgresConnected = false;

if (process.env.DATABASE_URL) {
  console.log('[Database] DATABASE_URL detected. Initializing PostgreSQL pool...');
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_URL.includes('localhost') ? false : { rejectUnauthorized: false }
  });

  // Test the connection immediately
  pool.query('SELECT NOW()')
    .then(() => {
      isPostgresConnected = true;
      console.log('[Database] PostgreSQL connected successfully.');
    })
    .catch((err) => {
      console.warn('[Database] PostgreSQL connection failed. Falling back to Mock Memory DB.', err.message);
      pool = null;
    });
} else {
  console.log('[Database] No DATABASE_URL found in environment. Running on Mock Memory DB.');
}

export const query = async (text: string, params?: any[]) => {
  if (pool && isPostgresConnected) {
    return pool.query(text, params);
  }
  throw new Error('PostgreSQL database not active. Using Mock fallback.');
};

export const getDbStatus = () => ({
  connected: isPostgresConnected,
  type: isPostgresConnected ? 'PostgreSQL' : 'In-Memory Mock Database'
});
