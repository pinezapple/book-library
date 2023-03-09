const { getBooksFromAPI, groupBookByAuthor } = require('../helpers');
const { populateBooks, patchBookLike, getBookByID } = require('../services/book');

const handleGet = async (req, res, next) => {
  try {
    const bookFromAPI = await getBooksFromAPI();
    await populateBooks(bookFromAPI);
    const bookGroup = groupBookByAuthor(bookFromAPI);

    const { author } = req.query;
    if (!author) {
      res.json(bookGroup);
    } else {
      res.json(bookGroup[author]);
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
