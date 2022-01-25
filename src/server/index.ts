import * as Hapi from '@hapi/hapi';
import * as Nes from '@hapi/nes';
import * as Inert from '@hapi/inert';
import * as Vision from '@hapi/vision';
import * as Pino from 'hapi-pino';
import * as Basic from '@hapi/basic';
import * as HapiCors from 'hapi-cors';
import * as HapiBearer from 'hapi-auth-bearer-token';
import * as HapiPulse from 'hapi-pulse';
import * as Qs from 'qs';
import routes from './routes';
import config from './config/config';
import { handleValidationError, responseHandler, } from './utils';
import SwaggerOptions from './config/swagger';
import { pinoConfig, } from './config/pino';
import { tokenValidate, } from './utils/auth';
import { dbInit } from './models';

const HapiSwagger = require('hapi-swagger');
const Package = require('../../package.json');

SwaggerOptions.info.version = Package.version;

const init = async () => {
  const server = await new Hapi.Server({
    port: config.server.port,
    host: config.server.host,
    query: {
      parser: (query) => Qs.parse(query),
    },
    routes: {
      validate: {
        options: {
          // Handle all validation errors
          abortEarly: false,
        },
        failAction: handleValidationError,
      },
      response: {
        failAction: 'log',
      },
    },
  });
  server.realm.modifiers.route.prefix = '/api';
  // Регистрируем расширения
  await server.register([
    Basic,
    Nes,
    Inert,
    Vision,
    HapiBearer,
    { plugin: Pino, options: pinoConfig(false), },
    { plugin: HapiSwagger, options: SwaggerOptions, },
    {
      plugin: HapiPulse,
      options: {
        timeout: 15000,
        signals: ['SIGINT'],
      },
    },
    {
      plugin: HapiCors,
      options: config.cors,
    }
  ]);

  // JWT Auth
  server.auth.strategy('jwt-access', 'bearer-access-token', {
    validate: tokenValidate('access'),
  });

  server.auth.default('jwt-access');

  await dbInit()
  // Загружаем маршруты
  server.route(routes);
  // Error handler
  //   server.ext('onPreResponse', responseHandler);
  // Enable CORS (Do it last required!)
  // Запускаем сервер
  try {
    await server.start();
    server.log('info', `Server running at: ${server.info.uri}`);
  }
  catch (err) {
    server.log('error', JSON.stringify(err));
  }

  return server;
};

export { init, };
