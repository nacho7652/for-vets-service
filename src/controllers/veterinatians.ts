import { Request, Response } from "express";
import { Veterinarian } from "../entities/veterinarian";
import { Shift } from "../entities/shift";

export const createVeterinarian = async (req: Request, res: Response) => {
    try {
        const { name, email, phone } = req.body;

        console.log('Datos recibidos:', req.body);
        // Crear el veterinario
        const newVeterinarian = await Veterinarian.create({
            name,
            email,
            phone
        });

        res.status(201).json({
            message: 'Veterinario registrado exitosamente.',
            user: newVeterinarian 
        });
    } catch (error) {
        console.error('Error al registrar veterinario:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
}

export const assignShifts = async (req: Request, res: Response) => {
    try {
        const { id: veterinarianId } = req.params; 
        const { shifts } = req.body;

        // Validar los datos de entrada
        if (!veterinarianId || !Array.isArray(shifts)) {
            return res.status(400).json({ message: 'El ID del veterinario y los turnos son requeridos.' });
        }

        // Validar que los turnos tengan el formato correcto
        for (const shift of shifts) {
            if (!shift.day || !shift.type) {
                return res.status(400).json({ message: 'Cada turno debe incluir un día y un tipo.' });
            }
        }

        // Buscar al veterinario
        const veterinarian = await Veterinarian.findByPk(veterinarianId);
        if (!veterinarian) {
            return res.status(404).json({ message: 'Veterinario no encontrado.' });
        }

        // Validar si ya existen turnos para el veterinario en los días especificados
        for (const shift of shifts) {
            const existingShift = await Shift.findOne({
                where: {
                    veterinarianId,
                    day: shift.day,
                },
            });

            if (existingShift) {
                return res.status(400).json({
                    message: `Ya existe un turno asignado para el día ${shift.day} y el veterinario con ID ${veterinarianId}.`,
                });
            }
        }

        // Guardar los turnos en la base de datos
        const savedShifts = [];
        for (const shift of shifts) {
            let startTime: string | null = null;
            let endTime: string | null = null;

            // Asignar horarios según el tipo de turno
            switch (shift.type) {
                case "diurno":
                    startTime = "08:00";
                    endTime = "20:00";
                    break;
                case "vespertino":
                    startTime = "20:00";
                    endTime = "08:00";
                    break;
                case "24 horas":
                    startTime = "08:00";
                    endTime = "08:00";
                    break;
                case "libre":
                    startTime = null;
                    endTime = null;
                    break;
                default:
                    return res.status(400).json({ message: `Tipo de turno inválido: ${shift.type}` });
            }

            const newShift = await Shift.create({
                veterinarianId,
                day: shift.day, // Ejemplo: "lunes"
                type: shift.type, // Ejemplo: "diurno", "vespertino", "libre", "24 horas"
                startTime,
                endTime,
            });
            savedShifts.push(newShift);
        }

        res.status(201).json({
            message: 'Turnos asignados exitosamente.',
            shifts: savedShifts,
        });
    } catch (error) {
        console.error('Error al asignar turnos:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
};