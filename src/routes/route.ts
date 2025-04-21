import { createVeterinarian } from "../controllers/veterinatians";
import { createAppointment,
    deleteAppointment,
    getAppointmentById,
    getAvailableTimes,
    getClientAppointments,
    getVeterinarianAppointments,
    updateAppointment } from "../controllers/appointments";

const express = require('express');
const { registerClient, loginClient } = require('../controllers/authController');

const router = express.Router();

// Rutas
router.post('/register', registerClient);
router.post('/login', loginClient);

router.post('/veterinarian', createVeterinarian); // Crear un veterinario

router.post('/appointments', createAppointment); // Crear una cita
router.get('/appointments/:id', getAppointmentById); // Obtener una cita por ID
router.put('/appointments/:id', updateAppointment); // Actualizar una cita
router.delete('/appointments/:id', deleteAppointment); // Eliminar una cita

// Ruta para obtener las horas disponibles de un veterinario
router.get('/veterinarians/:id/available-times', getAvailableTimes); 

// Ruta para obtener las citas de un cliente por mes
router.get('/clients/:id/appointments', getClientAppointments); 

// Ruta para obtener todas las horas ocupadas de cada veterinario
router.get('/veterinarians/appointments', getVeterinarianAppointments); 


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