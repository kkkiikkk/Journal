import { v4 as uuidv4, } from 'uuid';
import { Boom, } from '@hapi/boom';
import * as FileType from 'file-type';
import * as speakeasy from 'speakeasy';
import config from '../config/config';


interface IFileWithExt {
  data: Buffer;
  fileExt: string;
}

export function getUUID(): string {
  return uuidv4();
}

export function getRealIp(request): string {
  return request.headers['cf-connecting-ip']
    ? request.headers['cf-connecting-ip']
    : request.info.remoteAddress;
}

export function output(res?: object | null): object {
  return {
    ok: true,
    result: res,
  };
}

export function error(code: number, msg: string, data: object): Boom {
  return new Boom(msg, {
    data: {
      code,
      data,
      api: true,
    },
    statusCode: Math.floor(code / 1000),
  });
}

export function totpValidate(totp: string, secret: string): boolean {
  return speakeasy.totp.verify({
    secret,
    encoding: 'base32',
    token: Number(totp),
  });
}

export function responseHandler(r, h) {
  try {
    const additionalHeaders = {
      'access-control-allow-credentials': true,
      'access-control-allow-origin': '*'
    };
    if (r.app.error || (r.response.isBoom && r.response.data)) {
      const errorData = r.app.error ? r.app.error.data : r.response.data;
      const {message} = r.app.error ? r.app.error.output.payload : r.response.output.payload;
      if (r.response.data && r.response.data.custom) {
        r.response = h.response({
          ok: false,
          statusCode: Math.floor(errorData.code / 1000),
          data: errorData.data,
          message
        }).code(Math.floor(errorData.code / 1000));
      }

      return h.continue;
    }

    r.response.headers = {...r.response.headers, ...additionalHeaders};
    return h.continue;
  } catch (e) {
    console.log(e);
  }
}

export async function handleValidationError(r, h, err) {
  return error(
    400000,
    'Validation error',
    err.details.map((e) => ({ field: e.context.key, reason: e.type.replace('any.', ''), }))
  );
}


