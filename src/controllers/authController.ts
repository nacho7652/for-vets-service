import { Company } from "../entities/company";
import { Client } from "../entities/client";
import { Request, Response } from "express";

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

export const registerClient = async (req: Request, res: Response): Promise<void> => {
    try {

        const { first_name, last_name, email, password, rut, cellphone, address, pets_owner, role_id, companies } = req.body;
        console.log('BODY:', req.body);

        // Verificar si el email o rut ya existen
        const existingClient = await Client.findOne({ where: { email } });

        if (existingClient) {
            res.status(400).json({ message: 'El email ya está registrado' });
            return;
        }
        
        const existingRut = await Client.findOne({ where: { rut } });
        if (existingRut) {
            res.status(400).json({ message: 'El RUT ya está registrado' });
            return;
        }

        // Verifica que los campos obligatorios estén presentes
        if (!first_name || !last_name || !email || !password || !rut || !role_id || !companies) {
            res.status(400).json({ message: 'Faltan campos obligatorios' });
            return;
        }

        // Hashear la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

         // Crea o encuentra la compañía
         const [company, created] = await Company.findOrCreate({
            where: { rut: companies.rut },
            defaults: {
                full_name: companies.full_name,
                cellphone: companies.cellphone,
                address: companies.address,
                email: companies.email,
            },
        });

        const newClient = await Client.create({
            first_name,
            last_name,
            email,
            password: hashedPassword,
            rut,
            cellphone,
            address,
            type_client: pets_owner ? 'client': 'company',
            client_validate: false,
            role_id: role_id,
            companyId: company.get('id'),
        });

        res.status(201).json({
            message: 'Usuario registrado exitosamente.',
            user: newClient 
        });


    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
};

export const loginClient = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        // Verificar si el email existe
        const client = await Client.findOne({ where: { email } });

        if (!client) {
            return res.status(400).json({ message: 'Credenciales inválidas' });
        }

        // Verificar la contraseña
        const passwordMatch = await bcrypt.compare(password, client.get('password'));

        if (!passwordMatch) {
            return res.status(400).json({ message: 'Credenciales inválidas' });
        }

        // Generar un token JWT
        const token = jwt.sign({ id: client.get('id') }, JWT_SECRET, { expiresIn: '1h' });

        res.json({
            message: 'Inicio de sesión exitoso',
            token,
            user: client,
        });
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
};