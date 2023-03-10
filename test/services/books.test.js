const prisma = require('../../client');
const { getBookByID } = require('../../src/services/book');

jest.mock('../../client', () => ({
  book: {
    upsert: jest.fn(),
    update: jest.fn(),
    findFirstOrThrow: jest.fn(),
  },
}));

describe('getBookByID', () => {
  it('should return book by id if book exist', async () => {
    prisma.book.findFirstOrThrow.mockResolvedValue({
      id: 10,
      name: 'abc',
      author: 'abc',
      rating: 4.5,
    });
    expect(prisma.book.findFirstOrThrow).toHaveBeenCalledTimes(0);
    const result = await getBookByID(10);
    expect(prisma.book.findFirstOrThrow).toHaveBeenCalledTimes(1);
    expect(prisma.book.findFirstOrThrow).toHaveBeenCalledWith({
      where: {
        id: 10,
      },
    });
    expect(result).toEqual({
      id: 10,
      name: 'abc',
      author: 'abc',
      rating: 4.5,
    });
  });
});
