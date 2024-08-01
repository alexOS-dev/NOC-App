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

  Server.start();
}
