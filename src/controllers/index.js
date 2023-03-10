const { getBooksFromAPI, groupBooksByAuthor } = require('../helpers');
const { populateBooks, patchBookLike, getBookByID } = require('../services/book');

// rename index.js -> book.js
// and handleGet to handleGetBooks
const handleGet = async (req, res, next) => {
  try {
    const booksFromAPI = await getBooksFromAPI();
    await populateBooks(booksFromAPI);

    // Get the books from the database
    const groupedBooks = groupBooksByAuthor(booksFromAPI);
    const { author } = req.query;
    if (!author) {
      res.json(groupedBooks);
    } else {
      res.json(groupedBooks[author]);
    }
  } catch (error) {
    next(error);
  }
};

const handlePatchBookLike = async (req, res, next) => {
  try {
    const { id } = req.params;
    const idNum = parseInt(id, 10);
    const { isLike } = req.body;
    // TODO: add joi validation for path param id (integer, not decimal + positive) and query param author (string, min/max char length)
    // TODO: Handle Prisma error with book id not found by sending user-friendly error message + 400 error code
    await patchBookLike(idNum, isLike);
    res.json();
  } catch (error) {
    next(error);
  }
};

const handleGetBookByID = async (req, res, next) => {
  try {
    const { id } = req.params;
    const idNum = parseInt(id, 10);
    const book = await getBookByID(idNum);
    res.send(book);
  } catch (error) {
    next(error);
  }
};

module.exports = { handleGet, handlePatchBookLike, handleGetBookByID };
