import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

export const Role = sequelize.define('Role', {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, { tableName: 'roles' });
