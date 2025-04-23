import { Sequelize } from 'sequelize';

import dotenv from 'dotenv';

dotenv.config();

const database = process.env.DB_NAME || 'for-vets';
const username = process.env.DB_USER || 'postgres';
const password = process.env.DB_PASSWORD || 'for-vets2024.';
const host = process.env.DB_HOST || 'localhost';
const dialect = 'postgres'; // or 'postgres', 'sqlite', etc.

const sequelize = new Sequelize(database, username, password, {
    host,
    dialect,
  });

  export { sequelize };
