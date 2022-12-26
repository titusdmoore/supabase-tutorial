import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <nav className='flex flex-row justify-between'>
            <Link to='/'>
                Home
            </Link>
            <ul>
                <li>
                    <Link to='/1'>
                        Message Board
                    </Link>
                </li>
            </ul>
        </nav>
    );
}