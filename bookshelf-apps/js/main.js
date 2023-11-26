const INCOMPLETED_LIST_BOOK = 'incompleteBookshelfList'
const COMPLETED_LIST_BOOK = 'completeBookshelfList'
const BOOK_ITEMID = 'itemId'


function makeBookList(bookTitle, bookAuthor, bookYear, isCompleted){
    const title = document.createElement('h2')
    title.innerText = bookTitle

    const author = document.createElement('h3')
    author.innerText = bookAuthor

    const year = document.createElement('p')
    year.innerText = bookYear

    const book_add = document.createElement('article')
    book_add.classList.add('book_item')
    book_add.append(title, author, year)
    
    const actionButton = document.createElement('div')
    actionButton.classList.add('action')

    book_add.append(actionButton)
    if(isCompleted){
        actionButton.append(
            createUndoGreenButton(),
            createRedButton())
    } else {
        actionButton.append(
            createGreenButton(),
            createRedButton())
    }
    return book_add
}

function addBook(){
    const incompletebookread = document.getElementById(INCOMPLETED_LIST_BOOK)
    const completedBookRead = document.getElementById(COMPLETED_LIST_BOOK)
    const bookTitle = document.getElementById('inputBookTitle').value;
    const bookAuthor = document.getElementById('inputBookAuthor').value;
    const bookYear = document.getElementById('inputBookYear').value;
    const isCompleted = document.getElementById('inputBookIsComplete')
    
    const bookList = makeBookList(bookTitle, bookAuthor, bookYear, false)
    const bookObject = composeBookObject(bookTitle, bookAuthor, bookYear, false)

    bookList[BOOK_ITEMID] = bookObject.id
    books.push(bookObject)

    if (isCompleted.checked){
        completedBookRead.append(bookList)
    } else{
        incompletebookread.append(bookList)
    }
    updateDataToStorage()
}

function addBookToCompleted(taskElement){
    const bookCompleted = document.getElementById(COMPLETED_LIST_BOOK)
    const titleBook = taskElement.querySelector('.book_item>h2').innerText
    const titleAuthor = taskElement.querySelector('.book_item>h3').innerText
    const titleYear = taskElement.querySelector('.book_item>p').innerText
    
    const newBook = makeBookList(titleBook, titleAuthor, titleYear, true)
    
    const book = findBook(taskElement[BOOK_ITEMID])
    book.isCompleted = true
    newBook[BOOK_ITEMID] = book.id

    bookCompleted.append(newBook)
    taskElement.remove()

    updateDataToStorage()
}

function removeBookFromCompleted(taskElement){
    const bookPosition = findBookIndex(taskElement[BOOK_ITEMID])
    books.splice(bookPosition, 1)
    taskElement.remove()

    updateDataToStorage()
}

// undo book from completed
function undoBookFromCompleted(taskElement){
    const bookIncomplete = document.getElementById(INCOMPLETED_LIST_BOOK)
    const titleBook = taskElement.querySelector('.book_item>h2').innerText
    const titleAuthor = taskElement.querySelector('.book_item>h3').innerText
    const titleYear = taskElement.querySelector('.book_item>p').innerText
    
    const newBook = makeBookList(titleBook, titleAuthor, titleYear, false)
    
    const book= findBook(taskElement[BOOK_ITEMID])
    book.isCompleted = false
    newBook[BOOK_ITEMID] = book.id

    bookIncomplete.append(newBook)
    taskElement.remove()

    updateDataToStorage()
}

//create function buttons
function createButton(buttonClass,buttonText, eventListener){
    const button = document.createElement('button')
    button.classList.add(buttonClass)
    button.innerText = buttonText
    button.addEventListener('click', function(event){
        eventListener(event)
    })
    return button;
}

//selesai dibaca
function createGreenButton(){
    return createButton('green','Finished',function(event){
        addBookToCompleted(event.target.parentElement.parentElement)
    })
}

//belum selesai dibaca
function createUndoGreenButton(){
    return createButton('green', 'Not Finished', function(event){
        undoBookFromCompleted(event.target.parentElement.parentElement)
    })
}

//hapus buku
function createRedButton(){
    return createButton('red', 'Delete', function(event){
        removeBookFromCompleted(event.target.parentElement.parentElement)
    })
}

