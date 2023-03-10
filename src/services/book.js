const prisma = require('../../client');

const populateBooks = async (bookFromAPI) => {
  // If book is already in database, don't update it
  // Only create books if not in database
  // OPTIONS?
  // 1. Try creating all books with try-catch so DB does the work for you
  // Disadvantage: Suboptimal, unnecessary queries
  // 2. Query 1: Make DB query to select books where id=[list of ids from API].
  // Query 2: Only create books for ids not in DB.
  await Promise.all(bookFromAPI.map(async (book) => (
    prisma.book.upsert({
      where: {
        id: book.id,
      },
      update: {
        id: book.id,
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
