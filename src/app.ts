import express from 'express';
import dotenv from 'dotenv';
import { sequelize } from './config/database';
import "./entities";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection success');

        await sequelize.sync({ alter: true });
        console.log('Sync models');

        app.listen(port, () => {
            console.log(`Server listen on http://localhost:${port}`);
        });
    } catch (error) {
        console.error('Failed to start the server:', error);
    }
};

startServer();
