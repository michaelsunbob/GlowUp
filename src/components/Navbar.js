import { Link } from 'react-router-dom'

export default function Navbar() {
    return (
        <nav className='navbar'>
            <ul className='navbar-list'>
                <li className='item-title'>
                    <Link to='/'>GlowUp</Link>
                </li>
                <li className='item'>
                    <Link to='/routines'>Routines</Link>
                </li>
                <li className='item'>
                    <Link to='/products'>Products</Link>
                </li>
                <li className='item'>
                    <Link to='/recommendations'>Recommendations</Link>
                </li>
                <li className='item'>
                    <Link to='/account'>
                        <img src='profile-icon.png' alt='Profile Icon' className='profile-icon-img'></img>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}