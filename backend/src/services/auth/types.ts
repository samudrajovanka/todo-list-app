import { User } from "@prisma/client";

export type LoginData = Pick<User, "username" | "password">;
