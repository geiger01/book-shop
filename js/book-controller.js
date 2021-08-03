'use strict';
function onInit() {
  renderBooks();

}

function renderBooks() {
  var books = getBooksForDisplay();

  var strHTML =
    '<th data-trans="id" onclick="onSortBooks(this.innerText)">Id</th><th data-trans="name" onclick="onSortBooks(this.innerText)">Title</th><th data-trans="price" onclick="onSortBooks(this.innerText)">Price</th><th data-trans="actions">Actions</th><th data-trans="rate" onclick="onSortBooks(this.innerText)">Rating</th>'; //headers

  var strHtmls = books.map(function (book) {
    return `<tr>
    <td>${book.id}</td>
    <td>${book.title}</td>
    <td>${book.price}$</td>
    <td><button data-trans="read" onclick="getInfo('${book.title}',${book.price},'${book.url}')">Read</button><button data-trans="update" onclick="onUpdateBook(${book.id})">Update</button><button data-trans="delete" onclick="onRemoveBook(${book.id},${books.length})">Delete</button></td>
     <td >${book.rate}</td>
    </tr>`;
  });
  
  strHtmls.unshift(strHTML);
  document.querySelector('tbody').innerHTML = strHtmls.join('');

}

function onRemoveBook(bookId) {
  //   console.log(len);
  var booksAmount = getTotalCount();
  if (booksAmount === 1) {
    document.querySelector('table').style.opacity = '0';
  }
  removeBook(bookId);
  renderBooks();
  doTrans()
}

function onAddBook() {
  var elName = document.querySelector('[name="book-name"]');
  var elPrice = document.querySelector('[name="price"]');
  var elUrl = document.querySelector('[name="url"]');

  if (!elName.value) return;
  if (!elPrice.value) return;
  if (elName.value && elPrice.value) {
    document.querySelector('table').style.opacity = '1';
  }

  addBook(elName.value, elPrice.value, elUrl.value);
  elPrice.value = '';
  elName.value = '';
  elUrl.value = '';
  renderBooks();
  doTrans()
}

function onUpdateBook(bookId) {
  // var newPrice = +prompt('New price?');
  document.querySelector('.container').classList.add('blur-page');
  document.querySelector('.update-price-modal').style.display = 'flex';
  document
    .querySelector('.update-price-modal button')
    .setAttribute('id', bookId);

}

function onSubmit() {
  var bookId = +document
    .querySelector('.update-price-modal button')
    .getAttribute('id');

  document.querySelector('.container').classList.remove('blur-page');
  document.querySelector('.update-price-modal').style.display = 'none';

  var elInput = document.querySelector('[name="new-price"]');
  var newPrice = +elInput.value;

  updateBook(bookId, newPrice);
  elInput.value = '';
  renderBooks();
  doTrans()
}

function getInfo(bookName, price, url) {
  document.querySelector('.book-info').style.display = 'flex';
  document.querySelector('.book-info h2 span').innerText = bookName;

  if (url !== '') {
    document.querySelector('.book-info img').setAttribute('src', url);
  }

  document.querySelector('.price').innerText = `${price}$`;
  document.querySelector('.container').classList.add('blur-page');
   doTrans()
}

function exitInfo() {
  document.querySelector('.book-info').style.display = 'none';
  document.querySelector('.container').classList.remove('blur-page');
}

function rateUp(el, rating) {
  var bookName = el.parentElement.parentElement.children[0].innerText;
  var rating = getRating(bookName);
  rating = updateRating(bookName, true);
  document.querySelector('.rate span').innerText = rating;
  renderBooks();
  doTrans()
}
function rateDown(el, rating) {
  var bookName = el.parentElement.parentElement.children[0].innerText;
  var rating = getRating(bookName);
  rating = updateRating(bookName, false);
  document.querySelector('.rate span').innerText = rating;
  renderBooks();
  doTrans()
}

function onSortBooks(filterBy) {
  // console.log('Filtering by:', filterBy);
  console.log(filterBy);
  setFilterBy(filterBy);
  renderBooks();
  doTrans()

}

function onNextPage() {
  nextPage();
  document.querySelector('.page-buttons p').innerText = gPageIdx + 1;
  renderBooks();
  doTrans()
}

function onPrevPage() {
  prevPage();
  document.querySelector('.page-buttons p').innerText = gPageIdx + 1;
  renderBooks();
  doTrans()
}

function onSetLang(lang) {
    setLang(lang);
    // TODO: if lang is hebrew add RTL class to document.body
    if (lang === 'he') {
        document.body.classList.add('rtl')
    } else {
        document.body.classList.remove('rtl')
    }
    renderBooks();
    doTrans();
}