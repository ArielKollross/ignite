import { getRepository, Repository } from 'typeorm';

import { Category } from '@modules/cars/entities/Category';

import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from '../ICategoriesRepository';

class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>;

  // just this class instantiated
  constructor() {
    this.repository = getRepository(Category);
  }

  //   public static getInstance(): CategoriesRepository {
  //     if (!CategoriesRepository.INSTANCE) {
  //       CategoriesRepository.INSTANCE = new CategoriesRepository();
  //     }

  //     return CategoriesRepository.INSTANCE;
  //   }

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = this.repository.create({
      name,
      description,
    });

    await this.repository.save(category);
  }

  async list(): Promise<Category[]> {
    const categories = await this.repository.find();
    return categories;
  }

  async findByName(name: string): Promise<Category> {
    // const QUERY = `SELECT * FROM categories where name = ${name}`;
    // query = findOne({ name }), {} = where
    // const category = await this.repository.query(QUERY);
    const category = await this.repository.findOne({ name });

    return category;
  }
}

export { CategoriesRepository };
