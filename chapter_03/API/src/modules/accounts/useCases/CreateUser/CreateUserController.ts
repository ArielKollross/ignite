import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateUserCase } from './CreateUserUseCase';

class CreateUserCaseController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password, drive_license } = request.body;

    const createUserCase = container.resolve(CreateUserCase);

    await createUserCase.execute({ name, email, password, drive_license });

    return response.status(201).send();
  }
}

export { CreateUserCaseController };
