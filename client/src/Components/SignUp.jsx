import React, { useState, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUpWithEmailPassword, registerUserInDatabase } from '../services/authService';
import Navbar from './Navbar';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const userCredential = await signUpWithEmailPassword(email, password);
            await registerUserInDatabase(userCredential.user);
            alert("User registered successfully!");
            // Redirigir a la vista LogIn después de crear la cuenta
            navigate('/login');
        } catch (error) {
            alert("Error registering user: " + error.message);
        }
    };

    return (
        <Fragment>
            <Navbar />
            <main className="login d-flex vh-100">
                <div className="container align-self-center bg-light shadowbox rounded-5 p-5">
                    <form className="form-login" onSubmit={handleSubmit}>
                        <h2 className="text-center mb-4">SignUp</h2>

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
                    </form>
                </div>
            </main>
        </Fragment>
    );
};

export default SignUp;