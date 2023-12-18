import { KnexDatabase } from '@/Infrastructure/Database/KnexDatabase';
import { RoleModel, CredentialModel, CredentialRoleModel } from '@/Infrastructure/Repository/Model';
import { IRoleDTO, ICrendentialDTO } from '@/Data/DTO/Models';

export class CredentialCreationTransaction {

    public async execute(credentialDTO: Partial<ICrendentialDTO>): Promise<void> {
        const knex = KnexDatabase.getInstance().database;
        const credentialModel: CredentialModel = new CredentialModel();
        const roleModel: RoleModel = new RoleModel();
        const credentialRoleModel: CredentialRoleModel = new CredentialRoleModel();
        await knex?.transaction(async (trx): Promise<void> => {
            const [credential]: Pick<ICrendentialDTO, 'uuid'>[] = await credentialModel.transactionCreate([credentialDTO], { uuid: true }, trx);

            const [role]: Pick<IRoleDTO, 'id'>[] = await roleModel.transactionGet({ role: 'user' }, { id: true }, trx);

            await credentialRoleModel.transactionCreate([{ credentialUuid: credential?.uuid, roleId: role?.id }], { id: true }, trx);
        });
    }
}
