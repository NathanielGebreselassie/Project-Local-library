function findAuthorById(authors, id) {
  if (!authors) {
   return [];
 }
 return authors.find((author) => author.id === id)
}

function findBookById(books, id) {
  if (!books) {
   return [];
 }
 return books.find((book) => book.id === id)
}

function partitionBooksByBorrowedStatus(books) {
  if (!books) {
   return [];
 }
 const borrowed = books.filter(({borrows}) => {
   return borrows.some((borrow) => !borrow.returned);
 });
 const returned = books.filter(({borrows}) => {
   return borrows.every((borrow) => borrow.returned);
 });
 return [borrowed, returned];
}


function getBorrowersForBook(book, accounts) {
 const borrowers = accounts.filter((account) => {
   return book.borrows.some((borrow) => borrow.id === account.id);
 }).map((user) => {
   const borrow = book.borrows.find((borrow) => borrow.id === user.id);
   return {
     ...user,
     returned: borrow.returned
   };
 });
 return borrowers;
}




module.exports = {
 findAuthorById,
 findBookById,
 partitionBooksByBorrowedStatus,
 getBorrowersForBook,
};
