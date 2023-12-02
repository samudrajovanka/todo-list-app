import { User } from "@prisma/client";

export type CreateUserData = Pick<User, 'username' | 'password'>;
