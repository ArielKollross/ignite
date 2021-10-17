import { ICreateUserDTO } from '@modules/accounts/DTOs/ICreateUserDTO';
import { User } from '@modules/accounts/entities/Users';

import { IUserRepository } from '../IUserRepository';

class UsersRepositoryInMemory implements IUserRepository {
  users: User[] = [];

  async create({
    drive_license,
    email,
    name,
    password,
  }: ICreateUserDTO): Promise<void> {
    const user = new User();

    Object.assign(user, {
      drive_license,
      email,
      name,
      password,
    });

    this.users.push(user);
  }

  async findByEmail(email: string): Promise<User> {
    return this.users.find((user) => user.email === email);
  }

  async findById(id: string): Promise<User> {
    return this.users.find((user) => user.id === id);
  }
}

export { UsersRepositoryInMemory };
