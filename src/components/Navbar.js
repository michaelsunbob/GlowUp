import { Link } from 'react-router-dom'

export default function Navbar() {
    return (
        <nav className='nav'>
            <li className='site-title'>
                <Link to='/'>GlowUp</Link>
            </li>
            <ul>
                <li>
                    <Link to='/routines'>Routines</Link>
                </li>
                <li>
                    <Link to='/products'>Products</Link>
                </li>
                <li>
                    <Link to='/recommendations'>Recommendations</Link>
                </li>
                <li>
                    <Link to='/account'>
                        <img src='profile-icon.png' alt='Profile Icon' className='profile-icon-img'></img>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}