import { getRepository, Repository } from 'typeorm';

import {
  ICreateSpecificationDTO,
  ISpecificationRepository,
} from '@modules/cars/repositories/ISpecificationRepository';

import { Specification } from '../typeorm/entities/Specification';

class SpecificationRepository implements ISpecificationRepository {
  private repository: Repository<Specification>;

  private constructor() {
    this.repository = getRepository(Specification);
  }

  async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
    const specification = this.repository.create({
      name,
      description,
    });

    await this.repository.save(specification);
  }

  async findByName(name: string): Promise<Specification> {
    const specification = this.repository.findOne({
      name,
    });

    return specification;
  }
}

export { SpecificationRepository };
