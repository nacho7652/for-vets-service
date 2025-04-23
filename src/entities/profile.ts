import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

export const Profile = sequelize.define('Profile', {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    surNames: {
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
    urlPicture: {
        type: DataTypes.STRING,
        allowNull: false
    }
    ,
    roleId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, { tableName: 'profiles' });
