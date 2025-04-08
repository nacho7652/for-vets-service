import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

export const Client = sequelize.define('Client', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    rut: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    cellphone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    client_validate: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    type_client: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    /*rol_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },*/
    companyId: {
        type: DataTypes.INTEGER,
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
}, { tableName: 'clients' });