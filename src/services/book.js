const prisma = require('../../client');

const populateBooks = async (bookFromAPI) => {
  await Promise.all(bookFromAPI.map(async (book) => (
    prisma.book.upsert({
      where: {
        id: book.id,
      },
      update: {
        author: book.Author,
        name: book.Name,
        rating: book.rating,
      },
      create: {
        author: book.Author,
        name: book.Name,
        rating: book.rating,
        id: book.id,
      },
    }))));
};

const patchBookLike = async (id, isLiked) => {
  await prisma.book.update({
    where: {
      id,
    },
    data: {
      isLiked,
    },
  });
};

const getBookByID = async (id) => {
  const book = await prisma.book.findFirstOrThrow({
    where: {
      id,
    },
  });
  return book;
};

module.exports = { populateBooks, patchBookLike, getBookByID };
