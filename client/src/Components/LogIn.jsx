import React, { useState, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginWithEmailPassword, loginWithGoogle, registerUserInDatabase } from '../services/authService';
import './css/components.css';
import Navbar from './Navbar';

const LogIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await loginWithEmailPassword(email, password);
            // Redirigir a la vista Home después de iniciar sesión
            navigate('/');
        } catch (error) {
            alert("Error logging in: " + error.message);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            const user = await loginWithGoogle();
            await registerUserInDatabase(user);
            // Redirigir a la vista Home después de iniciar sesión
            navigate('/');
        } catch (error) {
            alert("Error logging in with Google: " + error.message);
        }
    };

    return (
        <Fragment>
            <Navbar />
            <main className="login d-flex vh-100">
                <div className="container align-self-center bg-light shadowbox rounded-5 p-5">
                    <form className="form-login" onSubmit={handleSubmit}>
                        <h2 className="text-center mb-4">LogIn</h2>

                        <div className="mb-2 col-5 mx-auto">
                            <label>Email address</label>
                            <input
                                type="email"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="mb-2 col-5 mx-auto">
                            <label>Password</label>
                            <input
                                type="password"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="d-flex justify-content-center mb-2">
                            <button type="submit" className="btn btn-secondary mx-4">Submit</button>
                        </div>

                        <div className="d-flex justify-content-center mb-2">
                            <button type="button" className="btn btn-primary mx-4" onClick={handleGoogleLogin}>Login with Google</button>
                        </div>
                    </form>
                </div>
            </main>
        </Fragment>
    );
};

export default LogIn;