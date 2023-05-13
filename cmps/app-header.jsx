const { Link, NavLink } = ReactRouterDOM


export function AppHeader({ onSetPage }) {

    return (
        <header className="app-header">
                <h1>Miss Book</h1>
                <nav className="app-nav">
                    <NavLink to="/" >Home</NavLink>
                    <NavLink to="/about" >About</NavLink>
                    <NavLink to="/book" >Books</NavLink>
                    <a href="https://zohar-ifrah.github.io/Appsus/">AppSUS</a>
                    {/* <Link to="/https://zohar-ifrah.github.io/Appsus/" >AppSUS</Link> */}
                </nav>
        </header>
    )
}