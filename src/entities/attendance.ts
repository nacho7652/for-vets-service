import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

export const Attendance = sequelize.define('Attendance', {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, { tableName: 'attendances' });
