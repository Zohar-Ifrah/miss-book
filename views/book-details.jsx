import { AddReview } from "../cmps/add-review.jsx"
import { LongTxt } from "../cmps/long-txt.jsx"
import { bookService } from "../services/book.service.js"

const { useEffect, useState } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

export function BookDetails() {
    const CURR_YEAR = 2023
    const [book, setBook] = useState(null)
    const [nextBookId, setNextBookId] = useState(null)
    const [prevBookId, setPrevBookId] = useState(null)
    const { bookId } = useParams()
    const navigate = useNavigate()
    // console.log('params:', bookId)

    useEffect(() => {
        loadBook()
        loadNextBookId()
        loadPrevBookId()
    }, [bookId])

    function loadBook() {
        bookService.get(bookId)
            .then(setBook)
            .catch(err => {
                console.log('Had issued in book details:', err);
                navigate('/book')
            })
    }

    function onBack() {
        navigate('/book')
    }

    function loadNextBookId() {
        bookService.getNextBookId(bookId)
            .then(setNextBookId)
    }

    function loadPrevBookId() {
        bookService.getPrevBookId(bookId)
            .then(setPrevBookId)
    }

    if (!book) return <div>Loading...</div>
    return (
        <section className="book-details">
            <h1>Book title: {book.title}</h1>
            <h5>Price: {book.listPrice.amount} {book.listPrice.currencySymbol}</h5>
            <h5>Published date: {CURR_YEAR - book.publishedDate > 10 ? 'Vintage' : 'New'}</h5>
            <h5>Page count: {
                book.pageCount > 500 ? 'Serious reading' :
                    book.pageCount > 200 ? 'Descent reading' :
                        'Light Reading'}</h5>

            <img src={book.thumbnail} alt="" />
            <section className="book-desc">
                <LongTxt txt={book.description} />

                <div className="prev-next-btn">
                    <Link to={`/book/${prevBookId}`}><button>Previous</button></Link>
                    <Link to={`/book/${nextBookId}`}><button>Next</button></Link>
                </div>

                <button onClick={onBack}>Back</button>

            </section>
            <AddReview />
        </section>
    )

}