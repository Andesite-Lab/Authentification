import { Knex } from 'knex';

interface IRolesPermissions {
  roles: string[];
  permissions: string[];
  rolePermission: {
    [key: string]: string[];
  };
}

const RolesPermissions: IRolesPermissions = {
    roles: [
        'admin',
        'user',
    ],
    permissions: [
        'admin',
        'me',
        'me.read',
        'me.update',
        'me.delete',
        'user',
        'user.read',
        'user.update',
        'user.delete',
        'permission',
        'permission.create',
        'permission.read',
        'permission.update',
        'permission.delete',
        'role',
        'role.create',
        'role.read',
        'role.update',
        'role.delete',
        'role_permission',
        'role_permission.create',
        'role_permission.read',
        'role_permission.update',
        'role_permission.delete'
    ],
    rolePermission: {
        admin: [
            'admin'
        ],
        user: [
            'me.read',
            'me.update',
            'me.delete',
        ],
    }
};

interface IRole {
    role: string,
    id: number
}

interface IPermission {
    permission: string,
    id: number
}

interface IRolePermission {
    roleId: number,
    permissionId: number
}

export async function seed(knex: Knex): Promise<void> {
    try {
        await knex.transaction(async (trx): Promise<void> => {
            const roles: Partial<IRole>[] = [];
            for (let i = 0; i < RolesPermissions.roles.length; ++i)
                roles.push({
                    role: RolesPermissions.roles[i] as string,
                });

            const permissions: Partial<IPermission>[] = [];

            for (let i = 0; i < RolesPermissions.permissions.length; ++i)
                permissions.push({
                    permission: RolesPermissions.permissions[i] as string,
                });

            await knex.insert(roles).into('role').transacting(trx);
            await knex.insert(permissions).into('permission').transacting(trx);

            const rolesId = await knex.select().from('role').transacting(trx);
            const permissionsId = await knex.select().from('permission').transacting(trx);

            for (const role of roles)
                if (RolesPermissions.rolePermission[role.role as string]) {
                    const rolePermission: IRolePermission[] = [];
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    for (const permission of RolesPermissions.rolePermission[role.role as string]!) {

                        const roleId = rolesId.find((r) => r.role === role.role).id;
                        const permissionId = permissionsId.find((m) => m.permission === permission).id;

                        rolePermission.push({
                            roleId: roleId as number,
                            permissionId: permissionId as number
                        });
                    }
                    await knex.insert(rolePermission).into('role_permission').transacting(trx);
                }
        });
    } catch (_) { /* empty */ }
}
