import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import { UserRepository } from '../modules/accounts/repositories/implementations/UsersRepository';

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = request.headers.authorization;

  console.log(request.headers.authorization);

  if (!authHeader) throw new Error('Token missing');

  const [, token] = authHeader.split(' ');

  try {
    const { sub: user_id } = verify(
      token,
      '4f3de86e96b7bf5058e1bb2b6a89cce4'
    ) as IPayload;

    const userRepository = new UserRepository();
    const user = await userRepository.findById(user_id);

    if (!user) throw new Error('User not found/Invalid');

    next();
  } catch (error) {
    throw new Error('Invalid token');
  }
}
