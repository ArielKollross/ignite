import { ICreateUserDTO } from '../DTOs/ICreateUserDTO';
import { User } from '../entities/Users';

interface IUserRepository {
  create(data: ICreateUserDTO): Promise<void>;
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
}

export { IUserRepository };
