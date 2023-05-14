const { Link } = ReactRouterDOM

export function BookList({ books, onRemoveBook }) {
  return (
    <div className="card-list">
  
      {books.map((book) => (
        <div className="card" key={book.id}>
          <div className="card-img">
            <img src={book.thumbnail} alt="" />
            {book.listPrice.isOnSale && <span className="on-sale">On Sale</span>}
          </div>
          <div className="card-info">
            <h2>{book.title}</h2>
            <div className={book.listPrice.amount > 150 ? "price red" : book.listPrice.amount < 20 ? "price green" : "price"}
            >{book.listPrice.amount} {book.listPrice.currencySymbol}</div>
            <div className="card-actions">
              <button onClick={() => onRemoveBook(book.id)}>Remove</button>
              <Link to={`/book/${book.id}`} ><button> Book review</button></Link>
             <Link to={`/book/edit/${book.id}`} > <button>Edit</button></Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}