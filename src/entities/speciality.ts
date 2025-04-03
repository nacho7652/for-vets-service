import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

export const Speciality = sequelize.define('Speciality', {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, { tableName: 'Specialitys' });
