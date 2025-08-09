// ===============================
// Global Variables & DOM Elements
// ===============================
let library = [];
const BookForm = document.getElementById('book-form');
const formContainer = document.getElementById('form-container');
const addBookBtn = document.getElementById('add-book-btn');
const libraryDisplay = document.getElementById('books_container');

// ===============================
// Book Constructor
// ===============================
function Book(title, author, pages) {
    if (!new.target) {
        throw new Error("Constructor Book requires 'new'");
    }
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.id = crypto.randomUUID();
    this.read = false;
    this.info = function() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? 'read' : 'not read yet'}`;
    };
}

// ===============================
// Library Functions
// ===============================
function addBookToLibrary(title, author, pages) {
    if (!Array.isArray(library)) {
        throw new Error("Library must be an array");
    }
    let book = new Book(title, author, pages);
    library.push(book);
    console.log(`Books in library: ${library.length}`);
    displayLibrary();
}

function displayLibrary() {
    // Clear the current display
    libraryDisplay.innerHTML = '';
    // Display a test book
    const testbook = new Book("Test Title", "Test Author", 123);
    libraryDisplay.appendChild(document.createTextNode(testbook.info()));
    
    // Display all books
    library.forEach(book => {
        const bookElement = document.createElement('div');
        bookElement.textContent = book.info();
        libraryDisplay.appendChild(bookElement);
    });
}

function getLibrary() {
    return library.map(book => book.info());
}

// ===============================
// Event Listeners
// ===============================
addBookBtn.addEventListener('click', function() {
    console.log("Add book button clicked");
    formContainer.style.display = 'flex'; // Show the form
});

BookForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const title = document.getElementById('title').value.trim();
    const author = document.getElementById('author').value.trim();
    const pages = document.getElementById('pages').value.trim();

    if (title && author && pages) {
        addBookToLibrary(title, author, pages);
    } else {
        console.warn("Please fill in all fields.");
    }

    BookForm.reset(); // Clear the form
    formContainer.style.display = 'none'; // Hide the form
    console.log("Form submitted and reset");
});

// ===============================
// Initial Display
// ===============================
displayLibrary();
