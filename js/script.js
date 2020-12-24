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
+1)Write a function,which collect data from user 
+2)Write a function,which create a new Book and put into array
+3)Write a function,which render a array
+4)Wite a function to validate user input
+5)Write a search function
6)Refactor code with classes
*/

document.addEventListener('DOMContentLoaded', main);

class Book {
  constructor(title, author, numberOfPages) {
    this.title = title;
    this.author = author;
    this.numberOfPages = numberOfPages;
  }
}

class Storage {
  static storage = [];

  static getBooks() {
    return storage;
  }

  static addBook(book) {
    storage.push(book);
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
    if (!title.value|| !author.value|| !numberOfPages.value) {
      UI.showAlert();
    } else {
      const modal = document.querySelector('.modal');
      modal.style.display = 'none';
      createBook(title.value, author.value, numberOfPages.value);

      title.value = '';
      author.value = '';
      numberOfPages.value = '';
    }
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
    title.setAttribute('id', 'title')
    author.setAttribute('id', 'author');
    numberOfPages.setAttribute('id', 'number-of-pages');
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

const searchBar = document.querySelector('.search');

searchBar.addEventListener('keyup', search);

function search(e) {
  const userSearch = e.target.value.toLowerCase();
  const bookItems = document.querySelectorAll('.book-item');
  bookItems.forEach(book => checkUserSearch(userSearch,book));
  
  

 
}

function checkUserSearch(userSearch, book) {
  const title = book.querySelector('#title').textContent.toLowerCase();
  const author = book.querySelector('#author').textContent.toLowerCase();
  const number = book.querySelector('#number-of-pages').textContent.toLowerCase()
  if (title.includes(userSearch) || author.includes(userSearch) || number.includes(userSearch)) {
     book.style.display = 'inline-block';
  } 
  else {
    book.style = 'display:none'
  }
   
}