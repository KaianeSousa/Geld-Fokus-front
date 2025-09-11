import {Role} from '../../enumeration/Role';

export interface User {
   id: number,
   name: string,
   email: string,
   role: Role
}
