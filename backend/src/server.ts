import app from './app.js';
import { env } from './config/env.js';
import { prisma } from './database/prisma.js';

async function bootstrap() {
  await prisma.$connect();
  app.listen(env.PORT, () => {
    console.log(`HE5 SiteGen API listening on port ${env.PORT}`);
  });
}

bootstrap().catch((error) => {
  console.error('Failed to start server', error);
  process.exit(1);
});
