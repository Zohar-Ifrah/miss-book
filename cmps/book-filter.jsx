const { useState, useEffect } = React

export function BookFilter({ filterBy, onSetFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)


    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const field = target.name
        const value = target.type === 'number' ? (+target.value || '') :
        target.type === 'text' ? target.value : 
        target.checked
        setFilterByToEdit(prevFilterBy => ({ ...prevFilterBy, [field]: value }))
    }

    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }

    const { txt, maxPrice, isOnSale } = filterByToEdit
    return (
        <section className="book-filter">
            <h2>Filter Our Books</h2>

            <form onSubmit={onSubmitFilter}>
                <label htmlFor="txt">Title:</label>
                <input value={txt} onChange={handleChange} name="txt" id="txt" type="text" placeholder="By Title" />

                <label htmlFor="maxPrice">Max Price:</label>
                <input value={maxPrice} onChange={handleChange} type="number" name="maxPrice" id="maxPrice" placeholder="By Max Price" />

                <label htmlFor="isOnSale">On Sale</label>
                <input value={isOnSale} type="checkbox" id="isOnSale" name="isOnSale" onChange={handleChange} />
                {/* <button>Filter Books</button> */}
            </form>

        </section>
    )
}