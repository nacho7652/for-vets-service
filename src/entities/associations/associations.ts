import { Role } from '../role';
import { Permission } from '../permission';
import { User } from '../user';
import { Pet } from '../pet';
import { Client } from '../client';
import { Company } from '../company';
import { Veterinarian } from '../veterinarian';
import { Appointment } from '../appointment';
import { Timeslot } from '../timeslot';

Role.belongsToMany(Permission, {
    through: 'role_permissions',
    foreignKey: 'roleId',
    otherKey: 'permissionId'
});

Permission.belongsToMany(Role, {
    through: 'role_permissions',
    foreignKey: 'permissionId',
    otherKey: 'roleId'
});

User.belongsToMany(Pet, {
    through: 'user_pet',
    foreignKey: 'userId',
    otherKey: 'petId'
});

Pet.belongsToMany(User, {
    through: 'user_pet',
    foreignKey: 'petId',
    otherKey: 'userId'
});

Client.belongsTo(Company, {
    foreignKey: 'companyId',
    as: 'company'
});

// Relación Veterinarian -> Appointment
Veterinarian.hasMany(Appointment, {
    foreignKey: 'veterinarianId',
    onDelete: 'CASCADE',
});

Appointment.belongsTo(Veterinarian, {
    foreignKey: 'veterinarianId',
});

// Relación Client -> Appointment
Client.hasMany(Appointment, {
    foreignKey: 'clientId',
    onDelete: 'CASCADE',
});

Appointment.belongsTo(Client, {
    foreignKey: 'clientId',
});

Timeslot.hasMany(Appointment, {
    foreignKey: 'timeslotId'
});

Appointment.belongsTo(Timeslot, {
    foreignKey: 'timeslotId'
});

// Relación Veterinarian -> Timeslot
/*Veterinarian.hasMany(Timeslot, {
    foreignKey: 'veterinarianId'
});
Timeslot.belongsTo(Veterinarian, {
    foreignKey: 'veterinarianId',
});*/