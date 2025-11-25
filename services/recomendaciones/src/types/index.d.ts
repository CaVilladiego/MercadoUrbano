import { Role } from '../../prisma/schema';

declare global {
  namespace Express {
    interface User {
      id: string;
      email: string;
      Rol: Role;
    }

    interface Request {
      user: User;
    }
  }
}

export {};
