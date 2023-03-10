const axios = require('axios');
// const { get } = require('axios');
const { ALL_BOOKS, BOOK_BY_ID } = require('../constants');

async function callExternalAPI(url) {
  const res = await axios.get(url);
  return res.data;
}

const groupBooksByAuthor = (books) => (
  books.reduce((groupedBooks, currentBook) => {
    const newGroupedBooks = { ...groupedBooks };
    // or we can do deep copy by Lodash clone deep
    if (!newGroupedBooks[currentBook.Author]) {
      newGroupedBooks[currentBook.Author] = [];
    }
    newGroupedBooks[currentBook.Author] = [...newGroupedBooks[currentBook.Author],
      currentBook];
    return newGroupedBooks;
  }, {})
);

const getBooksFromAPI = async () => {
  // ALL_BOOKS -> ALL_BOOK_PATH
  const result = await callExternalAPI(process.env.BOOK_API_URL + ALL_BOOKS);
  const ratingPromises = result.books.map(
    (book) => (callExternalAPI(process.env.BOOK_API_URL + BOOK_BY_ID + book.id)),
  );
  const ratings = await Promise.all(ratingPromises);
  const bookWithRatings = result.books.map((book, index) => (
    {
      ...book,
      rating: ratings[index].rating,
    }
  ));

  // const bookGroup = groupBooksByAuthor(bookWithRatings);
  return bookWithRatings;
};

module.exports = { callExternalAPI, groupBooksByAuthor, getBooksFromAPI };
