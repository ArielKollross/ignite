import { container } from 'tsyringe';

import { IUserRepository } from '../../modules/accounts/repositories/IUserRepository';
import { ISpecificationRepository } from '../../modules/cars/repositories/ISpecificationRepository';
import { ICategoriesRepository } from '../../modules/cars/repositories/ICategoriesRepository';

import { CategoriesRepository } from '../../modules/cars/repositories/implementations/CategoriesRepository';
import { SpecificationRepository } from '../../modules/cars/repositories/implementations/SpecificationRepository';
import { UserRepository } from '../../modules/accounts/repositories/implementations/UsersRepository';

//  ICategoriesRepository
container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  CategoriesRepository
);

container.registerSingleton<ISpecificationRepository>(
  'SpecificationRepository',
  SpecificationRepository
);

container.registerSingleton<IUserRepository>('UserRepository', UserRepository)
