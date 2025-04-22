import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";

export const Shift = sequelize.define('Shift', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    veterinarianId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    day: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    startTime: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    endTime: {
        type: DataTypes.STRING,
        allowNull: true,
    },
},
{
    tableName: "shifts",

});