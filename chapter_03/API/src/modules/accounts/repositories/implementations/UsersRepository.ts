import { IUserRepository } from "../IUserRepository";
import { ICreateUserDTO } from '../../DTOs/ICreateUserDTO'
import { getRepository, Repository } from "typeorm";
import { User } from "../../entities/Users";


class UserRepository implements IUserRepository {
  private repository: Repository<User>

  constructor() {
    this.repository = getRepository(User)
  }

  async create({ name, username, email, password, drive_license}: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      name,
      username,
      email,
      password,
      drive_license,
    })

    await this.repository.save(user)
  }
}

export { UserRepository }