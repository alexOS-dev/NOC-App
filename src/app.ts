import { envs } from './config/plugins';
import { Server } from './presentation';

(async () => {
  main();
})();

function main() {
  Server.start();
  // console.log(envs);
}
