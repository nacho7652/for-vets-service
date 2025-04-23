import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

export const Permission = sequelize.define('Permission', {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, { tableName: 'specialitys' });
