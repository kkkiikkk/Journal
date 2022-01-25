import * as jwt from 'jsonwebtoken';
import config from '../config/config';
import {error,} from './index';
import {User,} from '../models/User';
import {Session,} from '../models/Session';
import {Errors,} from './errors';
import * as Boom from '@hapi/boom'

export const generateJwt = (data: object) => {
    const access = jwt.sign(data, config.auth.jwt.access.secret, {expiresIn: config.auth.jwt.access.lifetime,});
    // const refresh = jwt.sign(data, config.auth.jwt.refresh.secret, {expiresIn: config.auth.jwt.refresh.lifetime,});

    return {access };
};

export const decodeJwt = async (token: string, secret: string) => {
    try {
        return await jwt.verify(token, secret);
    } catch (e) {
        const code = e.name === 'TokenExpiredError' ? Errors.TokenExpired : Errors.TokenInvalid;
        const msg = e.name === 'TokenExpiredError' ? 'Token expired' : 'Token invalid';
        throw error(code, msg, {});
    }
};

export type validateFunc = (r, token: string) => Promise<any>;

// Fabric which returns token validate function depending on token type
export function tokenValidate(tokenType: 'access' | 'refresh'): validateFunc {
    return async function (r, token: string) {
        const data = await decodeJwt(token, config.auth.jwt[tokenType].secret);

        // const {user} = await Session.findByPk(data.id, {
        //     include: [{ model: User }],
        // });
        const seesion = await Session.findOne({
            where: {
                id: data.id
            }
        })

        if(!seesion) {
            throw Boom.notFound('Not found session')
        }

        const user = await User.findOne({
            where: {
                id: data.idUser
            }
        })

        if (user) {
            // console.log(user)

            return { isValid: true, credentials: user, artifacts: { token, type: tokenType, }, };
        }

        throw error(Errors.SessionNotFound, 'User not found', {});
    };
}
