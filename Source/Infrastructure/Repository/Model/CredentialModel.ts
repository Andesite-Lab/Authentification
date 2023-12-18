import { AbstractModel } from './AbstractModel';
import { ICrendentialDTO } from '@/Data/DTO/Models';

export class CredentialModel extends AbstractModel<ICrendentialDTO>{
    constructor() {
        super('credential');
    }
}
