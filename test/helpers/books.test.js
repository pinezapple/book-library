const axios = require('axios');
const { getBooksFromAPI } = require('../../src/helpers');
const { ALL_BOOKS, BOOK_BY_ID } = require('../../src/constants');

/*
jest.mock('../../src/helpers', () => ({
  callExternalAPI: jest.fn(),
}));

jest.mock('axios', () => ({
  get: jest.fn(),
}));

*/

jest.mock('axios');

describe('getBooksFromAPI', () => {
  it('should a list of books when url is correct', async () => {
    /*
    axios.get.mockResolvedValueOnce({
      data:
        {
          books: [{
            id: 10,
            name: 'abc',
            author: 'abc',
          },
          {
            id: 20,
            name: 'abc',
            author: 'abc',
          },
          ],
        },
    }).mockResolvedValueOnce({ data: { rating: 4.5 } })
      .mockResolvedValueOnce({ data: { rating: 6.0 } });
      */
    axios.get.mockImplementation((url) => {
      if (url.includes(ALL_BOOKS)) {
        return {
          data:
                  {
                    books: [{
                      id: 10,
                      name: 'abc',
                      author: 'abc',
                    },
                    {
                      id: 20,
                      name: 'abc',
                      author: 'abc',
                    },
                    ],
                  },
        };
      }
      if (url.includes(`${BOOK_BY_ID}10`)) {
        return {
          data: {
            rating: 4.5,
          },
        };
      }
      if (url.includes(`${BOOK_BY_ID}20`)) {
        return {
          data: {
            rating: 6.0,
          },
        };
      }
      return null;
    });

    const result = await getBooksFromAPI();
    expect(result).toEqual(
      [{
        id: 10,
        name: 'abc',
        author: 'abc',
        rating: 4.5,
      },
      {
        id: 20,
        name: 'abc',
        author: 'abc',
        rating: 6.0,
      },
      ],
    );
  });
});
