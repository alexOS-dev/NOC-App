import { envs } from './config/plugins';
import { MongoDatabase } from './data/mongo';
import { Server } from './presentation';

(async () => {
  main();
})();

async function main() {
  await MongoDatabase.connect({
    mongoUrl: envs.MONGO_URL,
    dbName: envs.MONGO_NAME,
  });

  // Create Log
  // const newLog = await prisma.logModel.create({
  //   data: {
  //     message: 'Log created from Prisma',
  //     level: 'LOW',
  //     origin: 'app.ts',
  //   },
  // });
  // console.log({ newLog });

  // View Logs
  // const logs = await prisma.logModel.findMany({
  //   where: {
  //     id: 1,
  //   },
  // });
  // console.log(logs);

  Server.start();
}
