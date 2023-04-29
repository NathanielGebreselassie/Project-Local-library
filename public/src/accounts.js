function findAccountById(accounts, id=[]) {
  return accounts.find(accounts => accounts.id === id)
 }
 
 function sortAccountsByLastName(accounts=[]) {
  return accounts.sort((lastA, lastB) => lastA.name.last < lastB.name.last ? -1 : 1)
 }
 
 function getTotalNumberOfBorrows(account, books) {
  const accountId = account.id;
  return books.reduce((totalBorrowed, { borrows }) => {
     if (borrows.some((book) => book.id === accountId)) totalBorrowed++;
     return totalBorrowed;
   }, 0);
 }
 
 function getBooksPossessedByAccount(account, books, authors) {
   const accountId = account.id;
   const borrowedBooks = books.filter(({ borrows }) => {
     return borrows.some((borrow) => borrow.id === accountId && !borrow.returned);
   }).map((book) => {
     const author = authors.find((author) => author.id === book.authorId);
     return {
       ...book,
       author,
     };
   });
   return borrowedBooks;
 }
 
 module.exports = {
   findAccountById,
   sortAccountsByLastName,
   getTotalNumberOfBorrows,
   getBooksPossessedByAccount,
 };
 