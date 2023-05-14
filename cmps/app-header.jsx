const { Link, NavLink } = ReactRouterDOM


export function AppHeader({ onSetPage }) {

    return (
        <header className="app-header main-layout">
            <section className="nav flex space-between align-center">
                <h1>Miss Book</h1>
                <nav className="app-nav clean-list flex">
                    {/* <NavLink to="/" >Home</NavLink> */}
                    {/* <NavLink to="/about" >About</NavLink> */}
                    <NavLink to="/book" >Books</NavLink>
                    <a href="https://zohar-ifrah.github.io/Appsus/">AppSUS</a>
                </nav>
                </section>
        </header>
    )
}