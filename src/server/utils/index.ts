import { v4 as uuidv4, } from 'uuid';
import { Boom, } from '@hapi/boom';
import {University} from '../models/University'


export function getUUID(): string {
  return uuidv4();
}

export async function createUniversity(): Promise<void> {

  await University.createUniversity('ЗНУ')
  
  await University.createUniversity('ЗНТУ')
  
  await University.createUniversity('ЗГИА')
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

export async function handleValidationError(r, h, err) {
  return error(
    400000,
    'Validation error',
    err.details.map((e) => ({ field: e.context.key, reason: e.type.replace('any.', ''), }))
  );
}


