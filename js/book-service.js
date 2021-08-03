'use strict';
const PAGE_SIZE = 5;
var gPageIdx = 0;

var gBooks = [];
var gFilterBy = 'Price';
_createBooks();

function nextPage() {
  gPageIdx++;
  if (gPageIdx * PAGE_SIZE >= gBooks.length) {
    gPageIdx = 0;
  }
}
function prevPage() {
  if (gPageIdx < 1) return;
  gPageIdx--;
  if (gPageIdx * PAGE_SIZE >= gBooks.length) {
    gPageIdx = 0;
  }
}

function getBooksForDisplay() {
  var startIdx = gPageIdx * PAGE_SIZE;
  return gBooks.slice(startIdx, startIdx + PAGE_SIZE);
}

function _createBooks() {
  var books = loadFromStorage('books');
  if (!books || !books.length) {
    books = [
      {
        title: 'Harry Potter',
        price: 31,
        id: makeId(),
        rate: 5,
        url: 'https://i.guim.co.uk/img/media/1d4b16d4c6703e9bec9174f1cadc278026de0647/0_75_1280_768/master/1280.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=d036928c5974e9e8bfd87be5dcf37dd7',
      },
    ];
  }
  gBooks = books;
  saveToStorage('books', gBooks);
}

function removeBook(bookId) {
  //   console.log(bookId);
  var bookIdx = gBooks.findIndex(function (book) {
    return book.id === bookId;
  });

  //   console.log(bookIdx);
  gBooks.splice(bookIdx, 1);
  saveToStorage('books', gBooks);
}

function addBook(name, price, url) {
  var book = {
    title: name,
    price: price,
    id: makeId(),
    rate: 0,
    url: url
      ? url
      : 'https://play-lh.googleusercontent.com/ZqSUbqjoUmb-2MpPNkzvh9O0jBiOffhdocrZRwZ2Jliwy3TJ8DawPvjZx_AonSiw7e5p',
  };
  gBooks.push(book);
  saveToStorage('books', gBooks);
}

function updateBook(bookId, price) {
  var bookIdx = gBooks.findIndex(function (book) {
    return book.id === bookId;
  });

  gBooks[bookIdx].price = price;
  saveToStorage('books', gBooks);
}

function getRating(bookName) {
  var bookIdx = gBooks.findIndex(function (book) {
    return book.title === bookName;
  });

  return gBooks[bookIdx].rate;
}

function updateRating(bookName, isAdd) {
  var bookIdx = gBooks.findIndex(function (book) {
    return book.title === bookName;
  });
  //   console.log(bookIdx);

  if (isAdd) gBooks[bookIdx].rate++;
  else gBooks[bookIdx].rate--;
  if (gBooks[bookIdx].rate < 0) gBooks[bookIdx].rate = 0;
  if (gBooks[bookIdx].rate > 10) gBooks[bookIdx].rate = 10;

  saveToStorage('books', gBooks);
  return gBooks[bookIdx].rate;
}

function getTotalCount() {
  return gBooks.length;
}

function setFilterBy(filterBy) {
  gFilterBy = filterBy;

  if (gFilterBy === 'Id'|| gFilterBy === 'מק"ט') {
    return gBooks.sort(function (a, b) {
      return a.id - b.id; //filter by price
    });
  }
  if (gFilterBy === 'Price' || gFilterBy === 'מחיר') {
    return gBooks.sort(function (a, b) {
      return a.price - b.price; //filter by price
    });
  }
  if (gFilterBy === 'Rating'|| gFilterBy === 'דירוג') {
    return gBooks.sort(function (a, b) {
      return b.rate - a.rate; //filter by rate
    });
  }

  if (gFilterBy === 'Title'|| gFilterBy === 'שם הספר') {
    return gBooks.sort(function (a, b) {
      if (a.title < b.title) {
        return -1; //filter by title
      }
      if (a.title > b.title) {
        return 1;
      }
      return 0;
    });
  }
}
