import { assignShifts, createVeterinarian } from "../controllers/veterinatians";
import { createAppointment,
    deleteAppointment,
    getAppointmentById,
    getAvailableTimes,
    getClientAppointments,
    getVeterinarianAppointments,
    updateAppointment } from "../controllers/appointments";

const { registerClient, loginClient } = require('../controllers/authController');    
const express = require('express');
const { verifyToken } = require('../middlewares/authMiddleware');

const router = express.Router();

// Rutas publicas
router.post('/register', registerClient);
router.post('/login', loginClient);

// Rutas privadas
router.post('/veterinarian', verifyToken, createVeterinarian); // Crear un veterinario
// Ruta para obtener las horas disponibles de un veterinario
router.get('/veterinarians/:id/available-times', verifyToken, getAvailableTimes);
// Ruta para guardar turnos un veterinario
router.post('/veterinarians/:id/shifts', verifyToken, assignShifts);
// Ruta para obtener todas las horas ocupadas de cada veterinario
router.get('/veterinarians/appointments', verifyToken, getVeterinarianAppointments);

router.post('/appointments', verifyToken, createAppointment); // Crear una cita
router.get('/appointments/:id', verifyToken, getAppointmentById); // Obtener una cita por ID
router.put('/appointments/:id', verifyToken, updateAppointment); // Actualizar una cita
router.delete('/appointments/:id', verifyToken, deleteAppointment); // Eliminar una cita

// Ruta para obtener las citas de un cliente por mes
router.get('/clients/:id/appointments', verifyToken, getClientAppointments); 


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