import { AbstractModel } from './AbstractModel';
import { IRoleDTO } from '@/Data/DTO/Models';

export class RoleModel extends AbstractModel<IRoleDTO>{
    constructor() {
        super('role');
    }
}
