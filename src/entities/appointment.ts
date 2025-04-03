import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

export const Appointment = sequelize.define('Appointment', {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    reason: {
        type: DataTypes.STRING,
        allowNull: false
    },
    patient_naame: {
        type: DataTypes.STRING,
        allowNull: false
    },
    owner_rut: {
        type: DataTypes.STRING,
        allowNull: false
    },
    vetName: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, { tableName: 'appointments' });
