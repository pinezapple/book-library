const axios = require('axios');
const { ALL_BOOKS, BOOK_BY_ID } = require('../constants');

async function callExternalAPI(url) {
  const res = await axios.get(url);
  return res.data;
}

const groupBookByAuthor = (book) => (
  book.reduce((accumulator, currentValue) => {
    const tmp = JSON.parse(JSON.stringify(accumulator));
    // or we can do deep copy by Lodash clone deep
    if (!tmp[currentValue.Author]) {
      tmp[currentValue.Author] = [];
    }
    tmp[currentValue.Author].push({
      ...currentValue,
    });
    return tmp;
  }, {})
);

const getBooksFromAPI = async () => {
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

  // const bookGroup = groupBookByAuthor(bookWithRatings);
  return bookWithRatings;
};

module.exports = { callExternalAPI, groupBookByAuthor, getBooksFromAPI };
