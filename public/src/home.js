function getTotalBooksCount(books) {
  return books.length
}

function getTotalAccountsCount(accounts) {
  return accounts.length
}

function getBooksBorrowedCount(books) {
  const borrowed = books.filter(({borrows}) => borrows.some((borrow) => !borrow.returned));
  return borrowed.length;
}

function getMostCommonGenres(books) {
const genreCounts = books.reduce((counts, book) => {
  counts[book.genre] = (counts[book.genre] || 0) + 1;
  return counts;
}, {});

const genres = Object.keys(genreCounts);

return displayData(genres, genreCounts);
}

function getMostPopularBooks(books) {
  const titleCounts = books.reduce((counts, book) => {
    const title = book.title;
    const borrowsCount = book.borrows.length;
    counts[title] = (counts[title] ? counts[title] + borrowsCount : borrowsCount);
    return counts;
  }, {});
  const titles = Object.keys(titleCounts);

  return displayData(titles, titleCounts);
}

function getMostPopularAuthors(books, authors) {
  const authorBorrowCounts = books.reduce((accumulator, book) => {
    const author = authors.find((author) => author.id === book.authorId);
    const authorName = author ? `${author.name.first} ${author.name.last}` : 'Unknown';
    if (!accumulator[authorName]) {
      accumulator[authorName] = 0;
    }
    accumulator[authorName] += book.borrows.length;
    return accumulator;
  }, {});

  const authorBorrowCountArray = Object.entries(authorBorrowCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  return authorBorrowCountArray;
}
                      
function displayData(array, value) {
  const data = array.map((title) => ({ name: title, count: value[title] }))
  .sort((a, b) => b.count - a.count).slice(0, 5);
  return data;
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
