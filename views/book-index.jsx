const { Link } = ReactRouterDOM
const { useEffect, useState } = React

import { BookFilter } from "../cmps/book-filter.jsx"
import { BookList } from "../cmps/book-list.jsx"
import { bookService } from "../services/book.service.js"
import { BookDetails } from "./book-details.jsx"

export function BookIndex() {

    const [books, setBooks] = useState([])
    const [selectedBook, setSelectedBook] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())

    useEffect(() => {
        loadbooks()
    }, [filterBy])

    function loadbooks() {
        bookService.query(filterBy).then(books => setBooks(books))
        // bookService.query().then(setBooks)
    }

    function onRemoveBook(bookId) {
        bookService.remove(bookId).then(() => {
            const updatedBooks = books.filter(book => book.id !== bookId)
            showSuccessMsg
            setBooks(updatedBooks)
        })
    }

    function onSetFilter(filterBy) {
        setFilterBy(prevFilterBy => ({ ...prevFilterBy, ...filterBy }))
    }

    // function onSelectBook(book) {
    //     // setSelectedBook(book)
    //     // setFilterBy(bookService.getDefaultFilter)

    // }

    console.log('render')
    return (
        <section className="books-page">
            <div className="book-index" >
                {!selectedBook && <React.Fragment>
                    <BookFilter onSetFilter={onSetFilter} filterBy={filterBy} />
                    <button className="add-btn"><Link to="/book/edit">Add Book</Link></button>
                    <BookList books={books} onRemoveBook={onRemoveBook} />
                </React.Fragment>}
            </div>
            {selectedBook && <BookDetails onBack={() => setSelectedBook(null)} book={selectedBook} />}
        </section>
    )
}
