import { getRepository, Repository } from 'typeorm';

import { ICreateUserDTO } from '@modules/accounts/DTOs/ICreateUserDTO';
import { IUserRepository } from '@modules/accounts/repositories/IUserRepository';

import { User } from '../typeorm/entities/Users';

class UserRepository implements IUserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({
    name,
    email,
    password,
    drive_license,
    avatar,
    id,
  }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      name,
      email,
      password,
      drive_license,
      avatar,
      id,
    });

    await this.repository.save(user);
  }

  async findByEmail(email: string): Promise<User> {
    return this.repository.findOne({ email });
  }

  async findById(id: string): Promise<User> {
    return this.repository.findOne(id);
  }
}

export { UserRepository };
