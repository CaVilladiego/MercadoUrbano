/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
import { Role } from './core/domain/entities/cart.entity';

declare global {
  namespace Express {
    interface UserPayload {
      id: string;
      email: string;
      role: Role | string;
    }

    interface Request {
      user?: UserPayload;
    }
  }
}

export {};
