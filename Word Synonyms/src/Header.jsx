import './Header.css';

function Header() {
    return (
        <header className="header">
            <h1 className="header-title">Word Synonyms Practice</h1>
            <ul className="header-menu">
                <li className="submenu-item"><a className="submenu-link" href="#"> Home</a></li>
                <li className="submenu-item"><a className="submenu-link" href="#"> About</a></li>
                <li className="submenu-item"><a className="submenu-link" href="#"> Events</a></li>
            </ul>
        </header>
    );
}

export default Header;