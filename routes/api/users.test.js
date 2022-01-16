/* условия проверки:
- статус-код 200
- возвращается токен
- возвращается объект user с 2 полями email и subscription, имеющие тип данных String
 */

const mongoose = require('mongoose');
const request = require('supertest');
require('dotenv').config();

const app = require('../../app');

const { DB_HOST_TEST } = process.env;

describe('test users', () => {
  let server;
  beforeAll(() => (server = app.listen(3000)));
  afterAll(() => server.close());

  beforeEach(done => {
    mongoose.connect(DB_HOST_TEST).then(() => done());
  });

  afterEach(done => {
    mongoose.connection.close(() => done());
  });

  test('test login route', async () => {
    const user = {
      email: 'alex@mail.com',
      password: '123450',
    };

    const response = await request(app).post('/api/users/login').send(user);

    expect(response.statusCode).toBe(200);
    expect(response.body.token).toBeTruthy();
    expect(response.body.user.email).toBeTruthy();
    expect(response.body.user.subscription).toBeTruthy();
  });
});
