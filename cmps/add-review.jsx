const { useEffect, useState } = React
const { useParams, useNavigate } = ReactRouterDOM

import { bookService } from "../services/book.service.js"
import { showErrorMsg } from "../services/event-bus.service.js"

export function AddReview() {
    const params = useParams()
    const [bookReview, setBookReview] = useState({})
    // const navigate = useNavigate()

    useEffect(() => {
        // setBookReview({ id: 5 })

    }, [])

    function onUploadReview(ev) {
        ev.preventDefault()
        bookService.updateReview(params.bookId, bookReview)
        // .then(() => {
        //     showSuccessMsg('Successfully Reviewed')
        // navigate('/book')
        // })
    }
    function handleChange({ target }) {
        const field = target.name
        const value = target.type === 'select-one' ? (+target.value || '') : target.value

        setBookReview(prevReview => ({ ...prevReview, [field]: value }))
    }

    return (
        <section className="review-section">
            <h2>Add Review</h2>

            <form onSubmit={onUploadReview} >

                <label htmlFor="name">Name:</label>
                <input onChange={handleChange} type="text" name="name" id="name" required />

                <label htmlFor="rating">Rating:</label>
                <select onChange={handleChange} id="rating" name="rating" required>
                    <option value="">Book rating</option>
                    {[5, 4, 3, 2, 1].map(num => (
                        <option key={num} value={num}>{'⭐️'.repeat(num)}</option>
                    ))}
                </select>

                <label htmlFor="readAt">Read At:</label>
                <input onChange={handleChange} type="date" name="readAt" required />


                <button>Upload</button>
            </form>

        </section>
    )

}