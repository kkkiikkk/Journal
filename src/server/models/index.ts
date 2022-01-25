import { Sequelize, } from 'sequelize-typescript';
import config from '../config/config';
import { User, } from './User';
import { Session, } from './Session';

export const dbInit = async () => {
const sequelize = new Sequelize(config.dbLink, {
  dialect: 'postgres',
  models: [User, Session],
});
sequelize.sync();

}

