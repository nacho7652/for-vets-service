//import { Appointment, Timeslot, Veterinarian, Client } from '../models';

import { sequelize } from "../config/database";
import { Appointment } from "../entities/appointment";
import { Client } from "../entities/client";
import { Timeslot } from "../entities/timeslot";
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
    const { id } = req.params;
    const { date } = req.query;

    try {
        console.log('ID:', id);
        console.log('Date:', date);
        const timeslots = await Timeslot.findAll({
            where: { veterinarianId: id, availableDate: date },
            attributes: ['availableTime'],
            include: [{
                model: Appointment,
                required: false,
                where: { appointmentDate: date },
            }],
        });

        /*
        const availableTimes = timeslots
            .filter(slot => !slot.Appointment)
            .map(slot => slot.availableTime);
        */
        //res.json({ availableTimes });
        res.json({ timeslots });
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'Error al recuperar horas disponibles' });
    }
};

// Obtener citas de un cliente por mes
export const getClientAppointments = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { month } = req.query;

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