import { getRepository, Repository } from 'typeorm';

import { ICreateUserDTO } from '../../DTOs/ICreateUserDTO';
import { User } from '../../entities/Users';
import { IUserRepository } from '../IUserRepository';

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
  }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      name,
      email,
      password,
      drive_license,
    });

    await this.repository.save(user);
  }

  async findByEmail(email: string): Promise<User> {
    return this.repository.findOne({ email });
  }
}

export { UserRepository };
