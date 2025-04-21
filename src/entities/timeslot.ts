import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

export const Timeslot = sequelize.define('Timeslot', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    veterinarianId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    availableDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    availableTime: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, { tableName: 'timeslots' });