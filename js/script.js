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
        this.id = Book.createBookId();
    }

    static createBookId() {
        const books = Repository.getBooks();
        let set = new Set();
        for (let key in books) {
            if (key === 'id') {
                set.add(books[key]);
            }
        }
        const setOldSize = set.size;
        let setNewSize;
        let condition = true;
        while (condition) {
            let id = Math.floor((Math.random() * 10000) + 1)
            setNewSize = set.add(id).size;
            if (setOldSize === setNewSize) {
                continue;
            } else {
                condition = false;
                return id;
            }
        }

    }
}

class Repository {
    static getBooks() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static addBook(book) {
        const books = Repository.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

    /*Take id from book-element on page and search in each book,if match-delete this item from localStorage*/
    static removeBookFromRepository(bookId) {
        bookId = Number.parseInt(bookId);
        const books = Repository.getBooks();
        for (let i = 0; i < books.length; i++) {
            if (books[i]['id'] === bookId) {
                books.splice(i, 1);
                break;
            }
        }
        localStorage.setItem('books', JSON.stringify(books));
    }

    /* Update info for book in Local Storage*/
    static editBook(bookId, newTitle, newAuthor, newNumberOfPages) {
        bookId = Number.parseInt(bookId);
        const books = Repository.getBooks();
        for (let i = 0; i < books.length; i++) {
            if (books[i]['id'] === bookId) {
                for (let key in books[i]) {
                    if (key === 'title') {
                        books[i][key] = newTitle;
                    } else if (key === 'author') {
                        books[i][key] = newAuthor;
                    } else if (key === 'numberOfPages') {
                        books[i][key] = newNumberOfPages;
                    }
                }
                break;
            }
        }
        localStorage.setItem('books', JSON.stringify(books));
    }
}

class UI {
    static showAlert(typeOfModalWindow) {
        let modalWindowContent;
        if (typeOfModalWindow === 'add') {
            modalWindowContent = document.querySelector('.modal-content');
        } else {
            modalWindowContent = document.querySelector('.modal-content-edit');
        }
        const div = document.createElement('div');
        div.textContent = 'Please fill all fields!';
        div.classList.add('warning');
        modalWindowContent.append(div);
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

    static createBookItem(title, author, numberOfPages, id) {
        const bookItem = document.createElement('div');
        const titleField = document.createElement('div');
        const authorField = document.createElement('div');
        const numberOfPagesField = document.createElement('div');
        const idField = document.createElement('span');
        const buttonsContainer = document.createElement('div');
        const deleteBtn = document.createElement('button');
        const editBtn = document.createElement('button');

        bookItem.classList.add('book-item');
        titleField.classList.add('book-field');
        authorField.classList.add('book-field');
        numberOfPagesField.classList.add('book-field');
        idField.classList.add('id-number');
        deleteBtn.classList.add('delete-btn');
        editBtn.classList.add('edit-btn');
        buttonsContainer.classList.add('buttons-container');

        titleField.setAttribute('id', 'title');
        authorField.setAttribute('id', 'author');
        numberOfPagesField.setAttribute('id', 'number-of-pages');

        titleField.textContent = title;
        authorField.textContent = author;
        numberOfPagesField.textContent = numberOfPages;
        idField.textContent = id;
        deleteBtn.innerHTML = '&times;';
        editBtn.innerHTML = '&#128394;';

        buttonsContainer.append(editBtn);
        buttonsContainer.append(deleteBtn);
        bookItem.append(buttonsContainer);
        bookItem.append(titleField);
        bookItem.append(authorField);
        bookItem.append(numberOfPagesField);
        bookItem.append(idField);

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
            let id;
            for (let key in repository[i]) {
                if (key.includes('title')) {
                    title = repository[i][key];
                } else if (key.includes('author')) {
                    author = repository[i][key];
                } else if (key.includes('numberOfPages')) {
                    numberOfPages = repository[i][key];
                } else {
                    id = repository[i][key];
                }
            }
            const bookItem = UI.createBookItem(title, author, numberOfPages, id);
            libraryBody.append(bookItem);
        }
    }

    static removeBooksFromSite() {
        const books = document.querySelectorAll('.book-item');
        books.forEach((book) => book.remove());
    }

    static removeBook(e) {
        let bookItem = e.target.parentElement.parentElement;
        let bookId = bookItem.querySelector('.id-number').textContent;
        Repository.removeBookFromRepository(bookId);
        bookItem.remove();
    }

    static listenToDelete() {
        let deleteBtns = document.querySelectorAll('.delete-btn');
        deleteBtns.forEach((button) =>
            button.addEventListener('click', UI.removeBook)
        );
    }

    static listenToEditBook() {
        const editBtns = document.querySelectorAll('.edit-btn');
        editBtns.forEach((button) =>
            button.addEventListener('click', UI.showEditModal)
        );
    }

    static showEditModal(e) {
        const editModalWindow = document.querySelector('#edit-modal');
        const bookItem = e.target.parentElement.parentElement;
        const bookId = bookItem.querySelector('.id-number').textContent;
        const currentBookTitle = bookItem.querySelector('#title');
        const currentBookAuthor = bookItem.querySelector('#author');
        const currentBookNumberOfPages = bookItem.querySelector('#number-of-pages');
        const editModalBtn = editModalWindow.querySelector('.modal-edit-btn');
        const editModalTitle = editModalWindow.querySelector('#edit-title');
        const editModalAuthor = editModalWindow.querySelector('#edit-author');
        const editModalNumberOfPages = editModalWindow.querySelector(
            '#edit-number-of-pages'
        );
        const closeBtn = editModalWindow.querySelector('.close');

        // Show in editModalWindow-current book info
        editModalTitle.value = currentBookTitle.textContent;
        editModalAuthor.value = currentBookAuthor.textContent;
        editModalNumberOfPages.value = currentBookNumberOfPages.textContent;

        //Show editModal window
        editModalWindow.style.display = 'block';

        editModalBtn.addEventListener(
            'click',
            (e) => {
                e.preventDefault();

                //Collect provided info
                const newTitle = editModalTitle.value;
                const newAuthor = editModalAuthor.value;
                const newNumberOfPages = editModalNumberOfPages.value;

                //Check user input,if at least on field equals to nothing-show alert
                if (newTitle === '' || newAuthor === '' || newNumberOfPages === '') {
                    UI.showAlert('edit');
                } else {
                    //Change info on current book element to provided data
                    bookItem.querySelector('#title').textContent = newTitle;
                    bookItem.querySelector('#author').textContent = newAuthor;
                    bookItem.querySelector(
                        '#number-of-pages'
                    ).textContent = newNumberOfPages;

                    //Update info in repository
                    Repository.editBook(bookId, newTitle, newAuthor, newNumberOfPages);
                    //Close modal window after click on submit btn
                    editModalWindow.style.display = 'none';
                }
            },
            {once: true}
        );

        //If user click on close button,close modal window
        closeBtn.addEventListener(
            'click',
            (e) => (editModalWindow.style.display = 'none')
        );
    }
}

function main() {
    UI.renderBookRepository();
    receiveDataFromUser();
    UI.listenToDelete();
    UI.listenToEditBook();
}

function receiveDataFromUser() {
    const modalBtn = document.querySelector('.submit-btn');

    modalBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const libraryBody = document.querySelector('.library-body');
        const form = document.querySelector('.form-modal');
        const title = form.querySelector('#title').value;
        const author = form.querySelector('#author').value;
        const numberOfPages = form.querySelector('#number-of-pages').value;
        if (!title || !author || !numberOfPages) {
            UI.showAlert('add');
        } else {
            const modal = document.querySelector('.modal');
            modal.style.display = 'none';
            const book = new Book(title, author, numberOfPages);
            const bookHTMLItem = UI.createBookItem(
                book.title,
                book.author,
                book.numberOfPages,
                book.id
            );
            Repository.addBook(book);
            libraryBody.append(bookHTMLItem);
            UI.clearFields();
            UI.listenToDelete();
            UI.listenToEditBook();
        }
    });
}

const searchBar = document.querySelector('.search');

searchBar.addEventListener('keyup', UI.search);
