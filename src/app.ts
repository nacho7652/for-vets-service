import express from 'express';
import dotenv from 'dotenv';
import { sequelize } from './config/database';
import router from './routes/route';
import "./entities";
import './entities/associations/associations';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection success');

        await sequelize.sync({ alter: true });
        console.log('Sync models');

        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
        app.use('/auth', router)
        app.listen(port, () => {
            console.log(`Server listen on http://localhost:${port}`);
        });
    } catch (error) {
        console.error('Failed to start the server:', error);
    }
};

startServer();
