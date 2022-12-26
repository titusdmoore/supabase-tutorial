import { Link, Outlet } from 'react-router-dom';

export default function MessageBoard() {
    return (
        <div>
            <Link to='/1'>
                <h1>Message Board</h1>
            </Link>
            <Outlet />
        </div>
    );
}