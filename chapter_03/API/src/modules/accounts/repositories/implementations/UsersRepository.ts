import { IUserRepository } from "../IUserRepository";
import { ICreateUserDTO } from '../../DTOs/ICreateUserDTO'
import { getRepository, Repository } from "typeorm";
import { User } from "../../entities/Users";


class UserRepository implements IUserRepository {
  private repository: Repository<User>

  constructor() {
    this.repository = getRepository(User)
  }

  async create({ name, email, password, drive_license}: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      name,
      email,
      password,
      drive_license,
    })

    await this.repository.save(user)
  }

  async findByEmail(email: string): Promise<User> {
    return this.repository.findOne({email})
  }
}

export { UserRepository }