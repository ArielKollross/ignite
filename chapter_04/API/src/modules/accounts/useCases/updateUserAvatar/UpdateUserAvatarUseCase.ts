import { inject, injectable } from 'tsyringe';

import { IUserRepository } from '@modules/accounts/repositories/IUserRepository';
import { deleteFile } from '@utils/file';

interface IRequest {
  user_id: string;
  avatarFile: string;
}

@injectable()
class UpdateUserAvatarUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository
  ) {}
  async execute({ user_id, avatarFile }: IRequest): Promise<void> {
    const user = await this.userRepository.findById(user_id);

    //  befor upload user avatar image, the older avatar image, must be deleted
    if (user.avatar) {
      await deleteFile(`./tmp/avatar/${user.avatar}`);
    }

    user.avatar = avatarFile;

    await this.userRepository.create(user);
  }
}

export { UpdateUserAvatarUseCase };
