import _ from 'lodash';

import { Category } from '../../models/Category';
import { ICreateCategoryDTO } from '../ICategoriesRepository';

class CategoriesRepository {
  private categories: Category[];

  private static INSTANCE: CategoriesRepository;

  // just this class instantiated
  private constructor() {
    this.categories = [];
  }

  public static getInstance(): CategoriesRepository {
    if (!CategoriesRepository.INSTANCE) {
      CategoriesRepository.INSTANCE = new CategoriesRepository();
    }

    return CategoriesRepository.INSTANCE;
  }

  create({ name, description }: ICreateCategoryDTO): void {
    const category = new Category();

    Object.assign(category, {
      name,
      description,
      created_at: new Date(),
    });

    this.categories.push(category);
  }

  list(): Category[] {
    return this.categories;
  }

  findByName(name: string): Category {
    const category = _.find(this.categories, ['name', name]);
    // const category = this.categories.find((category) => category.name === name);

    return category;
  }
}

export { CategoriesRepository };
