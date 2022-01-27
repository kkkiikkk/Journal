import { Sequelize, } from 'sequelize-typescript';
import config from '../config/config';
import { User, } from './User';
import { Session, } from './Session';
import { Profile } from './Profile';
import { University } from './University';
import { Grade } from './Grade';


export const dbInit = async () => {
const sequelize = new Sequelize(config.dbLink, {
  dialect: 'postgres',
  models: [User, Session, Profile, University, Grade],
});
sequelize.sync();

}
