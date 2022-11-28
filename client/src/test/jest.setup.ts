import axios from 'axios';
import httpAdapter from 'axios/lib/adapters/http';
import dotenv from 'dotenv';
import 'isomorphic-unfetch';
import nock from 'nock';

dotenv.config({ path: '.env.test' });

axios.defaults.adapter = httpAdapter;

afterAll(() => {
  nock.cleanAll();
  nock.restore();
});
