import { ICreateUserDTO } from '../DTOs/ICreateUserDTO'

interface IUserRepository {
  create(data: ICreateUserDTO): Promise<void> 
}

export { IUserRepository }