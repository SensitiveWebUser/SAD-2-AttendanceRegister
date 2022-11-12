import request from 'supertest';
import { app } from '../app';

beforeAll(async () => {
  //TODO: add in-memory postgresql
  //TODO: add in-memory to Sequelize
});

beforeEach(async () => {
  //TODO: clear in-memory postgresql using Sequelize
});

afterAll(async () => {
  //TODO: close in-memory postgresql
  //TODO: close Sequelize connection
});
