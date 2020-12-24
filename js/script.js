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

document.addEventListener('DOMContentLoaded', main);

class Book {
  constructor(title, author, numberOfPages) {
    this.title = title;
    this.author = author;
    this.numberOfPages = numberOfPages;
  }
}

class Repository {
  static repository = [];

  static getBooks() {
    return this.repository;
  }

  static addBook(book) {
    const repository = this.getBooks();
    repository.push(book);
  }
}

class UI {
  static showAlert() {
    const div = document.createElement('div');
    div.textContent = 'Please fill all fields!';
    div.classList.add('warning');
    const modalContent = document.querySelector('.modal-content');
    modalContent.append(div);
    setTimeout(() => div.remove(), 3000);
  }

  static clearFields() {
    const form = document.querySelector('.form-modal');
    const title = form.querySelector('#title');
    const author = form.querySelector('#author');
    const numberOfPages = form.querySelector('#number-of-pages');

    title.value = '';
    author.value = '';
    numberOfPages.value = '';
  }

  static search() {
    const userInput = document.querySelector('.search').value.toLowerCase();
    const bookItems = document.querySelectorAll('.book-item');
    bookItems.forEach((book) => {
      const title = book.querySelector('#title').textContent.toLowerCase();
      const author = book.querySelector('#author').textContent.toLowerCase();
      const number = book
        .querySelector('#number-of-pages')
        .textContent.toLowerCase();
      if (
        title.includes(userInput) ||
        author.includes(userInput) ||
        number.includes(userInput)
      ) {
        book.style.display = 'inline-block';
      } else {
        book.style = 'display:none';
      }
    });
  }

  static createBookItem(title, author, numberOfPages) {
    const bookItem = document.createElement('div');
    let titleField = document.createElement('div');
    let authorField = document.createElement('div');
    let numberOfPagesField = document.createElement('div');

    bookItem.classList.add('book-item');
    titleField.classList.add('book-field');
    authorField.classList.add('book-field');
    numberOfPagesField.classList.add('book-field');

    titleField.setAttribute('id', 'title');
    authorField.setAttribute('id', 'author');
    numberOfPagesField.setAttribute('id', 'number-of-pages');

    titleField.textContent = title;
    authorField.textContent = author;
    numberOfPagesField.textContent = numberOfPages;

    bookItem.append(titleField);
    bookItem.append(authorField);
    bookItem.append(numberOfPagesField);
  
    return bookItem;
  }

  static renderBookRepository() {
    this.removeBooksFromSite();
    const libraryBody = document.querySelector('.library-body');
    const repository = Repository.getBooks();
    for (let i = 0; i < repository.length; i++) {
      let title;
      let author;
      let numberOfPages;
      for (let key in repository[i]) {
        if (key.includes('title')) {
          title = repository[i][key];
        } else if (key.includes('author')) {
          author = repository[i][key];
        } else {
          numberOfPages = repository[i][key];
        }
      }
      const bookItem = UI.createBookItem(title, author, numberOfPages);
      libraryBody.append(bookItem);
    }
  }

  static removeBooksFromSite() {
    const books = document.querySelectorAll('.book-item');
    books.forEach(book => book.remove());
  }
}

function main() {
  reciveDataFromUser();
}

function reciveDataFromUser() {
  const modalBtn = document.querySelector('.submit-btn');

  modalBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const form = document.querySelector('.form-modal');
    let title = form.querySelector('#title').value;
    let author = form.querySelector('#author').value;
    let numberOfPages = form.querySelector('#number-of-pages').value;
    if (!title || !author || !numberOfPages) {
      UI.showAlert();
    } else {
      const modal = document.querySelector('.modal');
      modal.style.display = 'none';
      let book = new Book(title, author, numberOfPages);
      Repository.addBook(book);
      UI.renderBookRepository();
      UI.clearFields();
    }
  });
}

const searchBar = document.querySelector('.search');

searchBar.addEventListener('keyup', UI.search);
