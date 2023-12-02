import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

const isProduction = process.env.NODE_ENV === 'production';

if (isProduction) {
  prisma = new PrismaClient();
} else {
  const nodeJsGlobal = global as any;

  if (!nodeJsGlobal.prisma) {
    nodeJsGlobal.prisma = new PrismaClient({
      log: ['query', 'info', 'warn', 'error'],
    });
  }

  prisma = nodeJsGlobal.prisma;
}

export default prisma;
