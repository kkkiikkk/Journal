import * as Hapi from '@hapi/hapi';
import * as Qs from 'qs';
import config from './config/config';
import {handleValidationError} from './utils';
import { dbInit } from './models';
import { tokenValidate, } from './utils/auth';
import * as HapiBearer from 'hapi-auth-bearer-token';
import routes from './routes';


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

    await server.register([
        HapiBearer,
    ])

    // JWT Auth
  server.auth.strategy('jwt-access', 'bearer-access-token', {
    validate: tokenValidate('access'),
  });

  server.auth.default('jwt-access');

    await dbInit()

    // Загружаем маршруты
  server.route(routes);

    // Запускаем сервер
    try {
        await server.start();
        server.log('info', `Server running at: ${server.info.uri}`);
    } catch (err) {
        server.log('error', JSON.stringify(err));
    }

    return server;
};

export {init,};
