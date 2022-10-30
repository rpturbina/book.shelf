const WEBSITE_IDENTITY = {
    'app-name': 'book.self',
    title: 'book.self by rpturbina',
    copyright: `© ${new Date().getFullYear()} by Rizki Pratama Turbina. All rights reserved.`,
};

document.querySelector('title').textContent = WEBSITE_IDENTITY.title;
document.querySelector('.header-logo').textContent = WEBSITE_IDENTITY['app-name'];
document.querySelector('#copyright').textContent = WEBSITE_IDENTITY.copyright;

const OVERLAY_TOGGLE_EVENT = 'overlay-toggle';
const RENDER_EVENT = 'render-books';
const ADD_BOOK_MODAL_TOGGLE_EVENT = 'add-book-modal-toggle';
const EDIT_BOOK_MODAL_TOGGLE_EVENT = 'edit-book-modal-toggle';
const ACCORDION_UNCOMPLETED_BOOKS_TOGGLE_EVENT = 'accordion-uncompleted-books-toggle';
const ACCORDION_COMPLETED_BOOKS_TOGGLE_EVENT = 'accordion-completed-books-toggle';
const SAVED_EVENT = 'save-books';

const useDispatchEvent = (eventName) => document.dispatchEvent(new Event(eventName));

const books = [];

const STORAGE_KEY = 'BOOKSELF_APPS';

const overlay = document.querySelector('.overlay');
const openAddBookButton = document.getElementById('addBookButton');
const closeAddBookModal = document.querySelector('#addBookForm .exit-icon');
const closeEditBookModal = document.querySelector('#editBookForm .exit-icon');
const accordionButtons = document.querySelectorAll('.accordion-button');
const accordionUncompletedSection = document.getElementById('uncompletedSection');
const accordionCompletedSection = document.getElementById('completedSection');
const uncompletedBooks = document.getElementById('uncompletedBooks');
const completedBooks = document.getElementById('completedBooks');
const addBookForm = document.getElementById('addBookForm');
const editBookForm = document.getElementById('editBookForm');
const searchFormQuery = document.getElementById('searchFormQuery');
const searchForm = document.getElementById('searchForm');
const confirmationDeleteModal = document.querySelector('.confirmation-modal');
const deleteButton = document.querySelector('.delete-button');
const cancelButton = document.querySelector('.cancel-button');

document.addEventListener(OVERLAY_TOGGLE_EVENT, () => {
    document.body.classList.toggle('body-overlay-show');
    overlay.classList.toggle('overlay-show');
});

document.addEventListener(ADD_BOOK_MODAL_TOGGLE_EVENT, () => {
    document.getElementById('bookTitle').focus();
    addBookForm.classList.toggle('form-add-book-show');
});

document.addEventListener(EDIT_BOOK_MODAL_TOGGLE_EVENT, () => {
    document.getElementById('editBookTitle').focus();
    editBookForm.classList.toggle('form-edit-book-show');
});

document.addEventListener(ACCORDION_UNCOMPLETED_BOOKS_TOGGLE_EVENT, () => {
    accordionUncompletedSection.classList.toggle('accordion-show');
});

document.addEventListener(ACCORDION_COMPLETED_BOOKS_TOGGLE_EVENT, () => {
    accordionCompletedSection.classList.toggle('accordion-show');
});

accordionButtons.forEach((button) => {
    button.addEventListener('click', () => {
        button.parentElement.classList.toggle('accordion-show');
    });
});

openAddBookButton.addEventListener('click', () => {
    useDispatchEvent(ADD_BOOK_MODAL_TOGGLE_EVENT);
    useDispatchEvent(OVERLAY_TOGGLE_EVENT);
});

closeAddBookModal.addEventListener('click', () => {
    useDispatchEvent(ADD_BOOK_MODAL_TOGGLE_EVENT);
    useDispatchEvent(OVERLAY_TOGGLE_EVENT);
});

closeEditBookModal.addEventListener('click', () => {
    useDispatchEvent(EDIT_BOOK_MODAL_TOGGLE_EVENT);
    useDispatchEvent(OVERLAY_TOGGLE_EVENT);
});

document.addEventListener(RENDER_EVENT, () => {
    uncompletedBooks.innerHTML = '';
    completedBooks.innerHTML = '';

    books.forEach((book) => {
        const bookElement = makeBook(book);

        if (!book.isCompleted) {
            uncompletedBooks.append(bookElement);

            const isAccordionShowed =
                accordionUncompletedSection.classList.contains('accordion-show');

            if (!isAccordionShowed) useDispatchEvent(ACCORDION_UNCOMPLETED_BOOKS_TOGGLE_EVENT);
        }
        if (book.isCompleted) {
            completedBooks.append(bookElement);

            const isAccordionShowed =
                accordionCompletedSection.classList.contains('accordion-show');

            if (!isAccordionShowed) useDispatchEvent(ACCORDION_COMPLETED_BOOKS_TOGGLE_EVENT);
        }
    });
});

const isStorageExist = () => {
    if (typeof Storage === undefined) {
        alert('Browser kamu tidak mendukung local storage');
        return false;
    }
    return true;
};

const checkUncompletedBooksState = () => {
    const isAccordionUncompletedShowed =
        accordionUncompletedSection.classList.contains('accordion-show');
    const isAccordionUncompletedBookEmpty = uncompletedBooks.children.length <= 0;

    return isAccordionUncompletedShowed && isAccordionUncompletedBookEmpty;
};

const checkCompletedBooksState = () => {
    const isAccordionCompletedShowed =
        accordionCompletedSection.classList.contains('accordion-show');
    const isAccordionCompletedBookEmpty = completedBooks.children.length <= 0;

    return isAccordionCompletedBookEmpty && isAccordionCompletedShowed;
};

let editBookId = 0;
let removeBookId = 0;

const confirmationModal = (message) => {
    confirmationDeleteModal.classList.add('confirmation-modal-show');
    overlay.classList.add('overlay-show');
    document.body.classList.add('body-overlay-show');
    const confirmMessage = document.querySelector('.confirmation-modal-message');
    confirmMessage.innerHTML = message;
};

const makeBook = (bookObject) => {
    const bookTitle = document.createElement('h3');
    bookTitle.textContent = bookObject.title;
    bookTitle.classList.add('book-title');

    const bookAuthor = document.createElement('p');
    bookAuthor.textContent = `Penulis : ${bookObject.author}`;
    bookAuthor.classList.add('book-author');

    const bookYear = document.createElement('p');
    bookYear.textContent = `Tahun : ${bookObject.year}`;
    bookYear.classList.add('book-year');

    const bookDescriptions = document.createElement('div');
    bookDescriptions.append(bookTitle, bookAuthor, bookYear);
    bookDescriptions.classList.add('book-descriptions');

    const removeButton = document.createElement('button');
    removeButton.classList.add('remove-button');

    removeButton.addEventListener('click', () => {
        removeBookId = bookObject.id;
        const confirmDeleteMessage = `Apakah Anda benar-benar ingin menghapus buku "<strong>${bookObject.title}</strong>"?<br /> Proses ini tidak dapat dibatalkan jika sudah dilakukan.`;
        confirmationModal(confirmDeleteMessage);
    });

    const editButton = document.createElement('button');
    editButton.classList.add('edit-button');

    editButton.addEventListener('click', () => {
        const editBookTitle = document.getElementById('editBookTitle');
        const editBookAuthor = document.getElementById('editBookAuthor');
        const editBookYear = document.getElementById('editBookYear');
        const editBookIsCompleted = document.getElementById('editBookIsCompleted');

        editBookId = bookObject.id;
        editBookTitle.value = bookObject.title;
        editBookAuthor.value = bookObject.author;
        editBookYear.value = bookObject.year;
        editBookIsCompleted.checked = bookObject.isCompleted;

        editBookTitle.focus();
        editBookForm.classList.add('form-edit-book-show');
        overlay.classList.add('overlay-show');
        document.body.classList.add('body-overlay-show');
    });

    const checkButton = document.createElement('button');

    const buttonsContainer = document.createElement('div');
    buttonsContainer.classList.add('book-buttons-container');
    buttonsContainer.append(removeButton, editButton, checkButton);

    if (!bookObject.isCompleted) {
        checkButton.classList.add('uncheck-button');

        checkButton.addEventListener('click', () => {
            moveBook(bookObject.id, true);

            if (checkUncompletedBooksState()) {
                useDispatchEvent(ACCORDION_UNCOMPLETED_BOOKS_TOGGLE_EVENT);
            }
        });
    }

    if (bookObject.isCompleted) {
        checkButton.classList.add('checked-button');

        checkButton.addEventListener('click', () => {
            moveBook(bookObject.id, false);

            if (checkCompletedBooksState()) {
                useDispatchEvent(ACCORDION_COMPLETED_BOOKS_TOGGLE_EVENT);
            }
        });
    }

    const bookContainer = document.createElement('li');
    bookContainer.classList.add('book-item');

    bookContainer.append(bookDescriptions, buttonsContainer);

    return bookContainer;
};

const generateBookId = () => {
    return +new Date();
};

const generateBookObject = ({ id, title, author, year, isCompleted }) => ({
    id,
    title,
    author,
    year,
    isCompleted,
});

const addBook = () => {
    const id = generateBookId();
    const title = document.getElementById('bookTitle').value;
    const author = document.getElementById('bookAuthor').value;
    const year = document.getElementById('bookYear').value;
    const isCompleted = document.getElementById('bookIsCompleted').checked;

    const bookObject = generateBookObject({ id, title, author, year, isCompleted });

    books.unshift(bookObject);
    useDispatchEvent(RENDER_EVENT);
    saveDataToStorage();
};

const findBookIndex = (bookId) => {
    return books.findIndex((book) => book.id === bookId);
};

const findBook = (bookId) => {
    return books.find((book) => book.id === bookId);
};

const removeBookFromList = (bookId) => {
    const bookTarget = findBookIndex(bookId);

    if (bookTarget === -1) return;

    books.splice(bookTarget, 1);
    useDispatchEvent(RENDER_EVENT);
    saveDataToStorage();
};

const moveBook = (bookId, isCompleted) => {
    const bookTarget = findBook(bookId);

    if (bookTarget === undefined) return;

    bookTarget.isCompleted = isCompleted;
    useDispatchEvent(RENDER_EVENT);
    saveDataToStorage();
};

const checkPattern = (title, query) => {
    const pattern = query
        .split('')
        .map((q) => {
            return `(?=.*${q})`;
        })
        .join('');

    const regex = new RegExp(`${pattern}`, 'g');
    return title.match(regex);
};

const searchBook = (searchQuery) => {
    const processedSearchQuery = searchQuery.toLowerCase().substring(0, 3);
    const searchResults = books.filter((book) => {
        const processedBookTitle = book.title.substring(0, 3).toLowerCase();
        return (
            book.title.toLowerCase().includes(processedSearchQuery) ||
            checkPattern(processedBookTitle, processedSearchQuery)
        );
    });

    books.splice(0, books.length, ...searchResults);
    useDispatchEvent(RENDER_EVENT);
    if (isStorageExist() && searchQuery === '') {
        books.splice(0, books.length);
        getDataFromStorage();
    }
};

const editBook = (bookId) => {
    const bookTarget = findBookIndex(bookId);

    if (bookTarget === -1) return;

    const id = books[bookTarget].id;
    const title = document.getElementById('editBookTitle').value;
    const author = document.getElementById('editBookAuthor').value;
    const year = document.getElementById('editBookYear').value;
    const isCompleted = document.getElementById('editBookIsCompleted').checked;

    const newBookObject = generateBookObject({ id, title, author, year, isCompleted });

    books.splice(bookTarget, 1, newBookObject);
    useDispatchEvent(RENDER_EVENT);
    saveDataToStorage();
};

const clearAddBookForm = () => {
    let title = document.getElementById('bookTitle');
    let author = document.getElementById('bookAuthor');
    let year = document.getElementById('bookYear');
    let isCompleted = document.getElementById('bookIsCompleted');
    title.value = '';
    author.value = '';
    year.value = '';
    isCompleted.checked = false;
};

const saveDataToStorage = () => {
    if (isStorageExist()) {
        const parsed = JSON.stringify(books);
        localStorage.setItem(STORAGE_KEY, parsed);
        useDispatchEvent(SAVED_EVENT);
    }
};

const getDataFromStorage = () => {
    const serializedData = localStorage.getItem(STORAGE_KEY);
    let data = JSON.parse(serializedData);

    if (data !== null) {
        books.push(...data);
    }

    useDispatchEvent(RENDER_EVENT);
};

document.addEventListener(SAVED_EVENT, () => {
    console.log(localStorage.getItem(STORAGE_KEY));
});

document.addEventListener('DOMContentLoaded', () => {
    addBookForm.addEventListener('submit', (event) => {
        event.preventDefault();
        addBook();
        clearAddBookForm();
        useDispatchEvent(OVERLAY_TOGGLE_EVENT);
        useDispatchEvent(ADD_BOOK_MODAL_TOGGLE_EVENT);
    });

    editBookForm.addEventListener('submit', (event) => {
        event.preventDefault();

        editBook(editBookId);

        editBookForm.classList.remove('form-edit-book-show');
        overlay.classList.remove('overlay-show');
        document.body.classList.remove('body-overlay-show');
    });

    deleteButton.addEventListener('click', () => {
        removeBookFromList(removeBookId);

        confirmationDeleteModal.classList.remove('confirmation-modal-show');
        overlay.classList.remove('overlay-show');
        document.body.classList.remove('body-overlay-show');
    });

    cancelButton.addEventListener('click', () => {
        confirmationDeleteModal.classList.remove('confirmation-modal-show');
        overlay.classList.remove('overlay-show');
        document.body.classList.remove('body-overlay-show');
    });

    searchFormQuery.addEventListener('keyup', (event) => {
        event.preventDefault();
        const searchQuery = event.target.value;
        searchBook(searchQuery);
    });

    searchForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const searchQuery = searchFormQuery.value || '';
        searchBook(searchQuery);
    });

    if (isStorageExist()) {
        getDataFromStorage();
    }
});
