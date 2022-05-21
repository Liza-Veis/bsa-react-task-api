import Fastify from 'fastify';
import cors from '@fastify/cors';
import { ENV } from '~/common/enums/enums';
import { initApi } from '~/api/api';
import { initRepositories } from '~/data/repositories/repositories';
import { initServices } from '~/services/services';
import { connectToDatabase } from '~/db';

const app = Fastify({
  logger: {
    prettyPrint: true,
  },
});

app.register(cors, {
  origin: '*',
});

connectToDatabase().then((db) => {
  const repositories = initRepositories(db);
  const { auth, user, trip, booking } = initServices(repositories);

  app.register(initApi, {
    prefix: ENV.API.V1_PREFIX,
    services: {
      auth,
      user,
      trip,
      booking,
    },
  });

  app.listen(ENV.APP.SERVER_PORT, ENV.APP.SERVER_HOST);
});
