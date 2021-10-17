import { ICreateUserDTO } from '../DTOs/ICreateUserDTO';
import { User } from '../infra/typeorm/entities/Users';

interface IUserRepository {
  create(data: ICreateUserDTO): Promise<void>;
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
}

export { IUserRepository };
