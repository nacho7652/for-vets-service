import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

export const Pet = sequelize.define('Pet', {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    petName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    chipNumber: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    petColors: {
        type: DataTypes.STRING,
        allowNull: false
    },
    species: {
        type: DataTypes.STRING,
        allowNull: false
    },
    race: {
        type: DataTypes.STRING,
        allowNull: false
    },
    birthday: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    sex: {
        type: DataTypes.STRING,
        allowNull: false
    },
    rutOwner: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, { tableName: 'pets' });
