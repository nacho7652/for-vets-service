import express from 'express';
import dotenv from 'dotenv';
import { connectDatabase } from './config/database';
import { sequelize } from './config/database';
import Company from './entities/company';
import Client from './entities/client';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const startServer = async () => {
    try {
        await connectDatabase();
        console.log('Database connected and models synchronized.');

        // Synchronize models
        sequelize
            .authenticate()
            .then(() => {
                console.log('Connection success');
                return sequelize.sync();
            })
            .catch((error) => {
                console.error('Connection fail', error);
            });

        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (error) {
        console.error('Failed to start the server:', error);
    }
};

startServer();
