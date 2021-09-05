import { AppError } from '../../../../errors/AppError';
import { ICreateUserDTO } from '../../DTOs/ICreateUserDTO';
import { UsersRepositoryInMemory } from '../../repositories/in-memory/UsersRepositoryInMemory';
import { CreateUserUseCase } from '../CreateUser/CreateUserUseCase';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

let authenticateUserUseCase: AuthenticateUserUseCase;
let userRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe('Authenticate user', () => {
  beforeEach(() => {
    userRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      userRepositoryInMemory
    );
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
  });

  it('Should be able to authenticate an user', async () => {
    const user: ICreateUserDTO = {
      name: 'Batman',
      drive_license: '123123',
      email: 'batmail@email.com',
      password: '123456',
    };

    await createUserUseCase.execute(user);

    const response = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(response).toHaveProperty('token');
  });

  it('should not be able to authenticate an nonexistent user', async () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: 'Batman Fake',
        password: 'password',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('Should be not able to authenticate with wrong password', async () => {
    const user: ICreateUserDTO = {
      name: 'Homi das Aranhas',
      drive_license: '123123',
      email: 'spider@email.com',
      password: '123456',
    };

    await createUserUseCase.execute(user);

    expect(async () => {
      await authenticateUserUseCase.execute({
        email: user.email,
        password: 'wrongPassWord',
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
