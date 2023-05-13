import { LongTxt } from "../cmps/long-txt.jsx"
import { bookService } from "../services/book.service.js"

const { useEffect, useState } = React
const { useParams, useNavigate } = ReactRouterDOM

export function BookDetails() {
    const CURR_YEAR = 2023
    const [book, setBook] = useState(null)
    const params = useParams()
    const navigate = useNavigate()
    console.log('params:', params)

    useEffect(() => {
        loadBook()
    }, [])

    function loadBook() {
        bookService.get(params.bookId)
            .then(setBook)
            .catch(err => {
                console.log('Had issued in book details:', err);
                navigate('/book')
            })
    }

    function onBack() {
        navigate('/book')
    }

    if (!book) return <div>Loading...</div>
    return (
        <section className="book-details">
            <h1>Book title: {book.title}</h1>
            <h5>Price: {book.listPrice.amount} {book.listPrice.currencySymbol}</h5>
            <h5>Page count: {
                book.pageCount > 500 ? 'Serious reading' :
                    book.pageCount > 200 ? 'Descent reading' :
                        'Light Reading'}</h5>
            <h5>Published date: {CURR_YEAR - book.publishedDate > 10 ? 'Vintage' : 'New'}</h5>
            <img src={book.thumbnail} alt="" />
            <LongTxt txt={book.description} />
            <button onClick={onBack}>Back</button>
        </section>
    )

}

////sameee