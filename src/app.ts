import { envs } from './config/plugins';
import { LogModel, MongoDatabase } from './data/mongo';
import { Server } from './presentation';

(async () => {
  main();
})();

async function main() {
  await MongoDatabase.connect({
    mongoUrl: envs.MONGO_URL,
    dbName: envs.MONGO_NAME,
  });

  // Create a new collection in the database
  // const newLog = await LogModel.create({
  //   message: 'Hello World',
  //   origin: 'app.ts',
  //   level: 'low',
  // });

  // await newLog.save();

  const logs = await LogModel.find();
  console.log(logs);

  // Server.start();
}
