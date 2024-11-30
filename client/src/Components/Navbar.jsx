import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCurrentUser, getUserRole, logout } from '../services/authService';

const Navbar = () => {
    const [role, setRole] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserRole = async () => {
            const user = getCurrentUser();
            if (user) {
                const userRole = await getUserRole(user.uid);
                setRole(userRole);
                setEmail(user.email); // Establecer el correo electrónico del usuario
            }
        };

        fetchUserRole();
    }, []);

    const handleLogout = async () => {
        await logout();
        setRole(''); // Solo limpia el estado local, no modifica el rol en Firebase
        setEmail(''); // Limpiar el correo electrónico del usuario
        navigate('/login');
    };

    return (
        <nav className="navbar navbar-expand-lg gradient-bg">
            <div className="container-fluid">
                <Link className="navbar-brand bg-secondary rounded-3 p-3 text-light" to="/">Platinum Hunter</Link>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link bg-secondary rounded-3 p-2 text-light mx-2" to="/signup">Signup</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link bg-secondary rounded-3 p-2 text-light mx-2" to="/login">Login</Link>
                        </li>
                        {role === 'admin' && (
                            <li className="nav-item">
                                <Link className="nav-link bg-secondary rounded-3 p-2 text-light mx-2" to="/admin">Admin</Link>
                            </li>
                        )}
                    </ul>
                    {role && (
                        <div className="ms-auto d-flex align-items-center">
                            <span className="navbar-text bg-secondary rounded-3 p-2 text-light mx-2">{email}</span>
                            <button className="btn btn-secondary rounded-3 p-2 text-light mx-2" onClick={handleLogout}>Logout</button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;