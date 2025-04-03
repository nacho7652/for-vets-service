import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

export const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    names: {
        type: DataTypes.STRING,
        allowNull: false
    },
    surnames: {
        type: DataTypes.STRING,
        allowNull: false
    },
    rut: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cellphone: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, { tableName: 'users' });
