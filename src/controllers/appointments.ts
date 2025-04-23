//import { Appointment, Timeslot, Veterinarian, Client } from '../models';

import { sequelize } from "../config/database";
import { Appointment } from "../entities/appointment";
import { Client } from "../entities/client";
import { Veterinarian } from "../entities/veterinarian";
import { Request, Response } from "express";

interface AppointmentAttributes {
    id?: number;
    veterinarianId: number;
    clientId: number;
    appointmentDate: Date;
    appointmentTime: string; // Formato HH:mm:ss
    status?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

// Crear una cita
export const createAppointment = async (req: Request, res: Response) => {
    const { veterinarianId, clientId, appointmentDate, appointmentTime } = req.body;

    try {
        // Verificar si la hora ya está reservada
        const existingAppointment = await Appointment.findOne({
            where: { veterinarianId, appointmentDate, appointmentTime },
        });

        if (existingAppointment) {
            res.status(400).json({ message: 'La hora ya está reservada' });
            return;
        }

        // Crear la cita
        const appointment = await Appointment.create({
            veterinarianId,
            clientId,
            appointmentDate,
            appointmentTime,
        });

        res.status(201).json(appointment);
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'Error creando la cita' });
    }
};

// Obtener una cita por ID
export const getAppointmentById = async (req: Request, res: Response) => {
    const { id } = req.params;

    console.log('----------------getAppointmentById----------------');
    try {
        const appointment = await Appointment.findByPk(id, {
            include: [
                { model: Veterinarian, attributes: ['name'] },
                { model: Client, attributes: ['first_name', 'email'] },
            ],
        });

        if (!appointment) {
            return res.status(404).json({ error: 'Cita no encontrada' });
        }

        res.json(appointment);
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'Error al rescatar cita por id' });
    }
};

// Actualizar una cita
export const updateAppointment = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { veterinarianId, clientId, appointmentDate, appointmentTime, status } = req.body;

    try {
        // Verificar si la cita existe
        const appointment = await Appointment.findByPk(id);

        if (!appointment) {
            return res.status(404).json({ error: 'Cita no encontrada' });
        }

        const appointmentAttributes: AppointmentAttributes = {
            veterinarianId,
            clientId,
            appointmentDate,
            appointmentTime,
            status,
        };
        // Actualizar la cita
        /*appointment.veterinarianId = veterinarianId;
        appointment.clientId = clientId || appointment.clientId;
        appointment.appointmentDate = appointmentDate || appointment.appointmentDate;
        appointment.appointmentTime = appointmentTime || appointment.appointmentTime;
        appointment.status = status || appointment.status;*/

        appointment.set(appointmentAttributes);

        await appointment.save();

        res.json(appointment);
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'Error al actualizar cita' });
    }
};

// Eliminar una cita
export const deleteAppointment = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const appointment = await Appointment.findByPk(id);

        if (!appointment) {
            return res.status(404).json({ error: 'Cita no encontrada' });
        }

        await appointment.destroy();

        res.json({ message: 'Cita eliminada con éxito' });
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'Error al eliminar cita' });
    }
};

// Obtener horas disponibles de un veterinario
export const getAvailableTimes = async (req: Request, res: Response) => {
    const { id: veterinarianId } = req.params; // Obtener el ID del veterinario desde los parámetros de la ruta
    const { date } = req.query; // Obtener la fecha desde los parámetros de consulta


    console.log('----------------getAvailableTimes----------------');
    console.log('Veterinarian ID:', veterinarianId);
    console.log('Date:', date);
    try {
        // Validar parámetros
        if (!veterinarianId || !date || typeof date !== 'string') {
            return res.status(400).json({ error: 'Los parámetros "veterinarianId" y "date" son requeridos' });
        }

        // Definir el rango de horas de trabajo (8:00 AM a 8:00 PM)
        const startHour = 8; // 8:00 AM
        const endHour = 20; // 8:00 PM
        const appointmentDuration = 45; // Duración de cada consulta en minutos

        // Generar todos los bloques de tiempo disponibles
        const timeSlots: string[] = [];
        for (let hour = startHour; hour < endHour; hour++) {
            for (let minute = 0; minute < 60; minute += appointmentDuration) {
                const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:00`;
                timeSlots.push(time);
            }
        }

        // Consultar las citas existentes del veterinario para la fecha dada
        const existingAppointments = await Appointment.findAll({
            where: {
                veterinarianId,
                appointmentDate: date,
            },
            attributes: ['appointmentTime'], // Solo necesitamos las horas de las citas
        });

        // Extraer las horas ocupadas
        const occupiedTimes = existingAppointments.map(app => app.get('appointmentTime') as string);

        // Filtrar los bloques disponibles
        const availableTimes = timeSlots.filter(time => !occupiedTimes.includes(time));

        res.json({ availableTimes });
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'Error al obtener horas disponibles' });
    }  
};

// Obtener citas de un cliente por mes
export const getClientAppointments = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { month } = req.query;

    console.log('----------------getClientAppointments----------------');
    try {
        console.log('ID:', id);
        console.log('Month:', month);

        // Asegúrate de que el valor de month sea válido
        if (!month || typeof month !== 'string' || !/^\d{4}-\d{2}$/.test(month)) {
            return res.status(400).json({ error: 'El parámetro "month" debe tener el formato YYYY-MM' });
        }

        // Agregar el primer día del mes para la comparación
        const startOfMonth = `${month}-01`;

        const appointments = await Appointment.findAll({
            where: {
                clientId: id,
                appointmentDate: sequelize.where(
                    sequelize.fn('date_trunc', 'month', sequelize.col('appointmentDate')),
                    '=',
                    sequelize.fn('date_trunc', 'month', sequelize.literal(`'${startOfMonth}'::timestamp`))
                ),
            },
            include: [{ model: Veterinarian, attributes: ['name'] }],
        });

        res.json({ appointments });
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'Error al obtener citas del cliente' });
    }
};

// Obtener todas las citas de los veterinarios
export const getVeterinarianAppointments = async (req: Request, res: Response) => {
    console.log('----------------getVeterinarianAppointments----------------');
    try {
        const appointments = await Appointment.findAll({
            include: [
                { model: Veterinarian, attributes: ['name'] },
                { model: Client, attributes: ['first_name'] },
            ],
        });

        res.json({ appointments });
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'Error al obtener todas las citas' });
    }
};