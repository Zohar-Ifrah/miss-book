const { useState } = React
const { useNavigate } = ReactRouterDOM

import { bookService } from "../services/book.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { utilService } from "../services/util.service.js"



export function GoogleBookAdd() {

    const [searchInput, setSearchInput] = useState('')
    const [googleBooks, setgoogleBooks] = useState(bookService.googleBooksQuery())
    const [booksFiltered, setBooksFiltered] = useState(bookService.googleBooksQuery().items)
    const navigate = useNavigate()

    function handleChange({ target }) {
        const value = target.value
        setSearchInput(value)
        setBooksFiltered(googleBooks.items.filter(item => item.volumeInfo.title.toLowerCase().includes(searchInput.toLowerCase())))

        console.log(booksFiltered)
    }

    function handleAddBook(id) {
        const book = booksFiltered.find(book => book.id === id)
        const bookToAdd = {
            title: book.volumeInfo.title,
            listPrice: {
                isOnSale: !!utilService.getRandomIntInclusive(0, 1),
                amount: utilService.getRandomIntInclusive(1, 300),
                currencySymbol: '$'
            },
            publishedDate: book.volumeInfo.publishedDate,
            pageCount: book.volumeInfo.pageCount,
            thumbnail: `./assets/img/${utilService.getRandomIntInclusive(1,20)}.jpg`,
            description: book.volumeInfo.description,
        }
        bookService.save(bookToAdd)
        .then(() => {
            showSuccessMsg('Book updated successfully')
            navigate('/book')
        })
        console.log(bookToAdd)
    }

    function onSaveBook(ev) {
        ev.preventDefault()
    }


    return (
        <section className="book-edit">
            <h2>Add book from Goggle</h2>

            <form onSubmit={onSaveBook} >
                <label htmlFor="search">Title:</label>
                <input onChange={handleChange} value={searchInput} type="search" name="search" id="search" />
                <ul>


                    {booksFiltered.map(item => {
                        return (
                            <li key={`${item.id}`}>
                                {item.volumeInfo.title} <button onClick={() => handleAddBook(item.id)}>+</button>
                            </li>)
                    })}

                </ul>
            </form>

        </section>
    )

}