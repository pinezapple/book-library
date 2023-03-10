const request = require('supertest');
const { getBookByID } = require('../src/services/book');

const { app, server } = require('../src/app');

jest.mock('../src/services/book', () => (
  {
    getBookByID: jest.fn(),
  }
));

describe('App', () => {
  describe('GET /books/:id', () => {
    it('should response with a 200 status code and the book with given id when the id is correct', async () => {
      const book = {
        id: 10,
        name: 'abc',
        author: 'abc',
        rating: 4.0,
      };
      getBookByID.mockResolvedValueOnce(book);
      const resp = await request(app).get('/api/book/10').send();
      expect(resp.statusCode).toEqual(200);
      expect(resp.body).toEqual(book);
    });

    it('should response with a 500 status code when there is something wrong with the request', async () => {
      const mockError = new Error('ERROR!');
      getBookByID.mockRejectedValue(mockError);
      const resp = await request(app).get('/api/book/10').send();
      expect(resp.statusCode).toEqual(500);
    });
  });
  afterAll(() => {
    server.close();
  });
});
