const express = require('express');
const { registerClient, loginClient } = require('../controllers/authController');

const router = express.Router();

// Rutas
router.post('/register', registerClient);
router.post('/login', loginClient);

export default router;

/*
import { Router } from 'express';

const router = Router();

// Define your routes here
router.get('/', (req, res) => {
    res.send('Hello, world!');
});

export default router;
*/