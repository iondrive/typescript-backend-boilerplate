
import { database, queue, redis } from  './support/';

after('global after', () => {
  return queue.cleanup()
  .then(redis.cleanup)
  .then(database.cleanup)
});