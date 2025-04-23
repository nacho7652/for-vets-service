import { Request as ExpressRequest, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

interface CustomRequest extends ExpressRequest {
    user?: string | JwtPayload;
}

export const verifyToken = (req: CustomRequest, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.split(' ')[1]; // Obtener el token del encabezado Authorization

    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado. Token no proporcionado.' });
    }

    try {
        const secretKey = process.env.JWT_SECRET || 'defaultSecretKey'; // Usar la clave secreta de tu configuración
        const decoded = jwt.verify(token, secretKey); // Verificar el token
        req.user = decoded; // Agregar los datos del usuario al objeto de la solicitud
        next(); // Continuar con la siguiente función
    } catch (err) {
        return res.status(403).json({ message: 'Token inválido.' });
    }
};