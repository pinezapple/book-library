const { patchBookLike } = require('../../src/services/book');
const { handlePatchBookLike } = require('../../src/controllers');

jest.mock('../../src/services/book', () => ({
  patchBookLike: jest.fn(),
}));

describe('handlePatchBookLike', () => {
  const mockJson = jest.fn();
  const mockNext = jest.fn();
  beforeEach(() => {
    patchBookLike.mockClear();
    mockJson.mockClear();
    mockNext.mockClear();
  });

  it('should change book isLiked field when id is parsed', async () => {
    patchBookLike.mockResolvedValue({});
    expect(patchBookLike).toHaveBeenCalledTimes(0);
    await handlePatchBookLike({
      params: {
        id: '10',
      },
      body: {
        isLike: true,
      },
    }, {
      json: mockJson,
    }, mockNext);
    expect(patchBookLike).toHaveBeenCalledTimes(1);
    expect(mockJson).toHaveBeenCalledTimes(1);
    expect(patchBookLike).toHaveBeenCalledWith(10, true);
  });

  it('should change book isLiked field when id is parsed', async () => {
    const mockError = new Error('ERROR!');
    patchBookLike.mockRejectedValue(mockError);
    expect(patchBookLike).toHaveBeenCalledTimes(0);
    await handlePatchBookLike({
      params: {
        id: 10,
      },
      body: {
        isLike: true,
      },
    }, {
      json: mockJson,
    }, mockNext);
    expect(mockNext).toHaveBeenCalledTimes(1);
    expect(mockNext).toHaveBeenCalledWith(mockError);
  });
});
