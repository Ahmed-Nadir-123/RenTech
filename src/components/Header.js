import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function Header() {
    const location = useLocation();
    const userType = localStorage.getItem('userType');
    const isLoggedIn = !!localStorage.getItem('userId');
    const navigate = useNavigate();

    // Logout function
    const handleLogout = () => {
        localStorage.removeItem('userId');
        localStorage.removeItem('userType');
        navigate('/'); // Redirect to home after logout
        window.location.reload(); // Reload the page to update the header
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
            <div className="container">
                <Link className="navbar-brand fw-bold text-white" to="/">
                    <i className="navbar-brand bi bi-car-front"></i> RenTech
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} to="/">
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/infos' ? 'active' : ''}`} to="/infos">
                                About us
                            </Link>
                        </li>
                        
                        {isLoggedIn ? (
                            <>
                                {userType === 'Customer' && (
                                    <>
                                        <li className="nav-item">
                                            <Link className={`nav-link ${location.pathname === '/offices' ? 'active' : ''}`} to="/offices">
                                                Offices
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className={`nav-link ${location.pathname === '/profile' ? 'active' : ''}`} to="/profile">
                                                Profile
                                            </Link>
                                        </li>
                                    </>
                                )}
                                {userType === 'Office Owner' && (
                                    <>
                                        <li className="nav-item">
                                            <Link className={`nav-link ${location.pathname === '/offices' ? 'active' : ''}`} to="/offices">
                                                Offices
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className={`nav-link ${location.pathname === '/owner-dashboard' ? 'active' : ''}`} to="/owner-dashboard">
                                                Owner Dashboard
                                            </Link>
                                        </li>
                                    </>
                                )}
                                <li className='nav-item'>
                                    <button onClick={handleLogout} className='nav-link btn btn-link'>Log Out</button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link className={`nav-link ${location.pathname === '/login' ? 'active' : ''}`} to="/login">
                                        Login
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className={`nav-link ${location.pathname === '/signup' ? 'active' : ''}`} to="/signup">
                                        Sign up
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Header;