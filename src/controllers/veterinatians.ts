import { Request, Response } from "express";
import { Veterinarian } from "../entities/veterinarian";

export const createVeterinarian = async (req: Request, res: Response) => {
    try {
        const { name, email, phone } = req.body;

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