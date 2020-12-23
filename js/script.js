let modal = document.querySelector('#myModal');

let btn = document.querySelector('.add-btn');

let span = document.getElementsByClassName('close')[0];

btn.onclick = function () {
  modal.style.display = 'block';
};

span.onclick = function () {
  modal.style.display = 'none';
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
};

//TODO
/*
1)Write a function,which collect data from user 
2)Write a function,which create a new Book and put into array
3)Write a function,which render a array
*/

document.addEventListener('DOMContentLoaded', main);

class Book {
  constructor(title, author, numberOfPages) {
    this.title = title;
    this.author = author;
    this.numberOfPages = numberOfPages;
  }
}

const repository = [];

function main() {
  reciveDataFromUser();
}

function reciveDataFromUser() {
  const modalBtn = document.querySelector('.submit-btn');

  modalBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const form = document.querySelector('.form-modal');
    let title = form.querySelector('#title');
    let author = form.querySelector('#author');
    let numberOfPages = form.querySelector('#number-of-pages');
    createBook(title.value, author.value, numberOfPages.value);

    title.value = '';
    author.value = '';
    numberOfPages.value = '';
  });
}

function createBook(title, author, numberOfPages) {
  const book = new Book(title, author, numberOfPages);
  repository.push(book);
  showBooks();
}

function showBooks() {
  const previOusBooks = document.querySelectorAll('.book-item');
  previOusBooks.forEach((book) => book.remove());
  renderRepository();
}

function renderRepository() {
  const libraryBody = document.querySelector('.library-body');
  for (let i = 0; i < repository.length; i++) {
    const bookItem = document.createElement('div');
    bookItem.classList.add('book-item');
    let title = document.createElement('div');
    let author = document.createElement('div');
    let numberOfPages = document.createElement('div');
    title.classList.add('book-field');
    author.classList.add('book-field');
    numberOfPages.classList.add('book-field');
    for (key in repository[i]) {
      if (key.includes('title')) {
        title.textContent = repository[i][key];
      } else if (key.includes('author')) {
        author.textContent = repository[i][key];
      } else {
        numberOfPages.textContent = repository[i][key];
      }
    }
    bookItem.append(title);
    bookItem.append(author);
    bookItem.append(numberOfPages);
    libraryBody.append(bookItem);
  }
}
