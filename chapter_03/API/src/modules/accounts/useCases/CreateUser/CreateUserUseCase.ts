import { hash } from 'bcrypt';
import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../erros/AppError';
import { ICreateUserDTO } from '../../DTOs/ICreateUserDTO';
import { IUserRepository } from '../../repositories/IUserRepository';

@injectable()
class CreateUserCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository
  ) {}

  async execute({
    name,
    password,
    email,
    drive_license,
  }: ICreateUserDTO): Promise<void> {
    if (!name || !password || !email || !drive_license) {
      throw new AppError('Miss required field');
    }

    const findUserExists = await this.userRepository.findByEmail(email);

    if (findUserExists) {
      throw new AppError('Email is already booked');
    }

    const passwordHash = await hash(password, 8);

    await this.userRepository.create({
      name,
      password: passwordHash,
      email,
      drive_license,
    });
  }
}

export { CreateUserCase };
