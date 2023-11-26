const STORAGE_KEY = 'BOOKLIST'

let books= []

function isStorageExist(){
    if(typeof(Storage) === undefined){
        alert('Browser tidak mendukung')
        return false
    }
    return true
}

function saveData(){
    const parsed = JSON.stringify(books)
    localStorage.setItem(STORAGE_KEY, parsed)
    document.dispatchEvent(new Event('ondatasaved'))
}

function loadDataFromStorage(){
    const serializedData = localStorage.getItem(STORAGE_KEY)
    let data = JSON.parse(serializedData)

    if(data!== null)
        books = data
    
    document.dispatchEvent(new Event('ondataloaded'))
}

function updateDataToStorage(){
    if(isStorageExist())
        saveData()
}
function composeBookObject (bookName, bookAuthor, bookYear, isCompleted){
    return{
        id: +new Date(), //search for more
        bookName,
        bookYear,
        bookAuthor,
        isCompleted
    }
}

function findBook(bookId){
    for(book of books){
        if(book.id === bookId)
        return book
    }
    return null
}

function findBookIndex(bookId){
    let index = 0
    for(book of books){
        if(book.id === bookId)
            return index
        
        index++
    }
    return -1
}

function refreshDataFromBooks(){
    const bookIncompleted = document.getElementById(INCOMPLETED_LIST_BOOK)
    const bookCompleted = document.getElementById(COMPLETED_LIST_BOOK)
    
    for(book of books){
        const newBook = makeBookList(book.bookName, book.bookAuthor, book.bookYear, book.isCompleted)
        newBook[BOOK_ITEMID] = book.id

        if(book.isCompleted){
            bookCompleted.append(newBook)
        } else {
            bookIncompleted.append(newBook)
        }
    }
}



