import { Role } from "../../enumeration/Role"

export interface UserRegister {
   id: number,
   name: string,
   email: string,
   password: string
   role: Role
}
