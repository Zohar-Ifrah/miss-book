export function BookPreview({ book }) {
    return (
        <article className="book-preview">
            <h2>Book Title: {book.title}</h2>
            <h4>Price: {book.listPrice.amount}</h4>
            <h5>Page Count {book.pageCount}: {
                book.pageCount > 500 ? 'Serious reading' : 
                book.pageCount > 200 ? 'Descent Reading' :'Light reading'
            } </h5>
            <img src={book.thumbnail} alt="" />
        </article>
    )
}