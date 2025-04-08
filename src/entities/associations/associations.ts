import { Role } from '../role';
import { Permission } from '../permission';
import { User } from '../user';
import { Pet } from '../pet';
import { Client } from '../client';
import { Company } from '../company';

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

Client.belongsTo(Company, { foreignKey: 'companyId', as: 'company' }); // Relación de uno a muchos con Company
//Client.belongsTo(Role, { foreignKey: 'rol_id', as: 'role' }); // Relación de uno a uno con Role