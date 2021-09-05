import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../erros/AppError';
import { IUserRepository } from '../../repositories/IUserRepository';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect credentials');
    }

    const verifyPassword = await compare(password, user.password);

    if (!verifyPassword) {
      throw new AppError('Incorrect credentials');
    }

    const token = sign({}, '4f3de86e96b7bf5058e1bb2b6a89cce4', {
      subject: user.id,
      expiresIn: '1d',
    });

    const response: IResponse = {
      token,
      user: {
        name: user.name,
        email: user.email,
      },
    };

    return response;
  }
}

export { AuthenticateUserUseCase };
