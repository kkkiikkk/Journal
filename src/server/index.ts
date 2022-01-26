import * as Hapi from '@hapi/hapi';
import * as Qs from 'qs';
import config from './config/config';
import {handleValidationError} from './utils';

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
