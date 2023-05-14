const { useEffect, useState } = React
const { useParams, useNavigate } = ReactRouterDOM

import { showErrorMsg } from "../services/event-bus.service.js"
import { bookService } from "../services/book.service.js"



export function BookEdit() {

    const [bookToEdit, setBookToEdit] = useState(bookService.getEmptybook()) //BBB
    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
        if (params.bookId) loadBook()
    }, [])

    function loadBook() {
        bookService.get(params.bookId)
            .then(setBookToEdit)
            .catch(err => {
                console.log('Had issued in book edit:', err)
                navigate('/book')
                showErrorMsg('Book not found!')
            })
    }

    function handleChange({ target }) {
        const field = target.name
        const value = target.type === 'number' ? (+target.value || '') :
            target.type === 'text' ? target.value :
                target.checked
        if (field === 'price') {
            setBookToEdit(prevBook => ({
                ...prevBook,
                listPrice: {
                    ...prevBook.listPrice,
                    amount: value
                }
            }))
        } else {
            setBookToEdit(prevBook => ({ ...prevBook, [field]: value }))
        }
    }

    function onSaveBook(ev) {
        ev.preventDefault()
        // setBookToEdit(prevBook => ({ ...prevBook, ['currencySymbol']: '$' }))
        bookService.save(bookToEdit)
            .then(() => {
                showSuccessMsg('Book updated successfully')
                navigate('/book')
            })
    }

    const { title, listPrice: { amount: price = '' } = {} } = bookToEdit
    return (
        <section className="book-edit">
            <h2>{bookToEdit.id ? 'Edit' : 'Add'} Book</h2> 

            <form onSubmit={onSaveBook} >
                <label htmlFor="title">Title:</label>
                <input onChange={handleChange} value={title} type="text" name="title" id="title" />

                <label htmlFor="price">Price:</label>
                <input onChange={handleChange} value={price} type="number" name="price" id="price" />
                
                <button>{bookToEdit.id ? 'Save' : 'Add'}</button>
            </form>

        </section>
    )

}