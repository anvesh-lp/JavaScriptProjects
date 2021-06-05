class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }

}

class store {
    static getBooks() {
        let books = [];
        if (localStorage.getItem('books') != null) {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static addbBooks(book) {
        const books = store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

    static displayBooks() {
        const books = store.getBooks();
        let ui = new UI();
        books.forEach(function (book) {
            ui.addBookToUi(book);
        });
    }

    static deleteBook(isbn, author) {
        let books = store.getBooks();
        books.forEach(function (book, index) {
            if (book.isbn === isbn && book.author === author) {
                books.splice(index, 1);
            }
        });
        localStorage.setItem('books', JSON.stringify(books));
    }
}

document.addEventListener("DOMContentLoaded", store.displayBooks);

class UI {
    addBookToUi(book) {
        //    Get table list from ui
        const booklist = document.getElementById('book-list');
//    create table row
        const row = document.createElement('tr');
        row.innerHTML = `<td>${book.title}</td>
                     <td>${book.author}</td>
                     <td>${book.isbn}</td>
                     <td><a href="#" class="delete">X</a></td>`
        booklist.appendChild(row);

    }

    cleafields() {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';

    }

    showMessage(message, classe) {
        const divElement = document.createElement('div');
        divElement.className = `alert ${classe}`;
        divElement.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(divElement, form);
        setTimeout(function (x) {
            document.querySelector('.alert').remove();
        }, 3000);
    }

    deleteRow(element, ui) {
        if (element.target.className === 'delete') {
            const isbn = element.target.parentElement.previousElementSibling.textContent;
            const author = element.target.parentElement.previousElementSibling.previousElementSibling.textContent;
            element.target.parentElement.parentElement.remove();
            store.deleteBook(isbn, author);
            ui.showMessage("Book deleted", 'success');
        }
    }
}

//Delete element
//Get Table list for event delegation
document.getElementById('book-list').addEventListener('click', function (event) {
    const ui = new UI(null);
    ui.deleteRow(event, ui);
    event.preventDefault();
});

const submitButton = document.getElementById('submit');
//Add event listener
submitButton.addEventListener('click', function (event) {
    const container = document.querySelector('.container');

    /*  container.addEventListener('mousedown',function (x) {
          console.log(x.target.className);
          if (x.target.className.includes('u-full-width')){
              const divElement=document.querySelector('.alert')
              if (divElement!=null){
                  divElement.remove();
              }
          }
      });*/

//    get values from form
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;
    const book = new Book(title, author, isbn);
    console.log(book);
    const ui = new UI(book);
    if (title === '' || author === '' || isbn === '') {
        ui.showMessage("Enter all the details", 'error');
    } else {
        //Add book to UI
        ui.addBookToUi(book);
        store.addbBooks(book);
        ui.showMessage("Book added", 'success');
        ui.cleafields();
    }
    event.preventDefault();
});