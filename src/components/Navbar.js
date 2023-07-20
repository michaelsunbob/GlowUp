import { Link } from 'react-router-dom'

export default function Navbar() {
    return (
        <nav className='nav'>
            <li className='site-title'>
                <Link style={{ textDecoration: 'none', color:'white'}} to ='/'>GlowUp</Link>
            </li>
            <ul>
                <li>
                    <Link style={{ textDecoration: 'none', color:'white' }} to='/routines'>Routines</Link>
                </li>
                <li>
                    <Link style={{ textDecoration: 'none', color:'white' }} to='/products'>Products</Link>
                </li>
                <li>
                    <Link style={{ textDecoration: 'none', color:'white' }} to='/recommendations'>Recommendations</Link>
                </li>
                <li>
                    <Link style={{ textDecoration: 'none', color:'white' }} to='/account'>
                        <img src='profile-icon.png' alt='Profile Icon' className='profile-icon-img'></img>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}