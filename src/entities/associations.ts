import { Role } from './role';
import { Permission } from './permission';
import { User } from './user';
import { Pet } from './pet';

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
