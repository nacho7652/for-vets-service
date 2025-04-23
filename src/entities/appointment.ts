import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database';
import { Veterinarian } from './veterinarian';
import { Client } from './client';

export const Appointment = sequelize.define('Appointment', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    veterinarianId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Veterinarian,
            key: 'id',
        },
        onDelete: 'CASCADE',
    },
    clientId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Client,
            key: 'id',
        },
        onDelete: 'CASCADE',
    },
    appointmentDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    appointmentTime: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'reserved', // Puede ser 'reserved' o 'canceled'.
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    }
}, { tableName: 'appointments', indexes: [{ unique: true, fields: ['veterinarianId', 'appointmentDate', 'appointmentTime'] }] });
