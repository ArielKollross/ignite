import { inject, injectable } from "tsyringe";
import { ICreateUserDTO } from "../../DTOs/ICreateUserDTO";
import { IUserRepository } from "../../repositories/IUserRepository";

@injectable()
class CreateUserCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}

  async execute({name, password, email, drive_license}: ICreateUserDTO): Promise<void> {
    await this.userRepository.create({name, password, email, drive_license})
  }
}

export { CreateUserCase }