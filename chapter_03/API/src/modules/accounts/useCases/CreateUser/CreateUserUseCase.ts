import { inject, injectable } from "tsyringe";
import { ICreateUserDTO } from "../../DTOs/ICreateUserDTO";
import { IUserRepository } from "../../repositories/IUserRepository";
import { hash } from 'bcrypt'

@injectable()
class CreateUserCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}

  async execute({name, password, email, drive_license}: ICreateUserDTO): Promise<void> {

    const findUserExists = await this.userRepository.findByEmail(email)

    if(findUserExists)
      throw new Error("Email is already booked")
      
    const passwordHash = await hash(password, 8)

    await this.userRepository.create({
      name,
      password: passwordHash,
      email,
      drive_license
      })
  }
}

export { CreateUserCase }