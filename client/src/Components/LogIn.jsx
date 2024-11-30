import { Fragment } from "react"
import { useState } from "react";
import { loginWithEmailPassword, loginWithGoogle } from '../services/authService';

export const LogIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleEmailLogin = async () => {
        try {
            await loginWithEmailPassword(email, password);
            // Manejar el inicio de sesión exitoso
        } catch (error) {
            // Manejar el error de inicio de sesión
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await loginWithGoogle();
            // Manejar el inicio de sesión exitoso
        } catch (error) {
            // Manejar el error de inicio de sesión
            console.error('Error al iniciar sesión con Google:', error);
        }
    };

    return (
        <Fragment>
            <main className="login">
                <div className="container-login justify-content-center bg-light rounded-5 shadow-lg">
                    <form className="form-login" onSubmit={handleEmailLogin}>
                        <h2 className="text-center mb-4">LogIn</h2>

                        <div className="mb-2 col-6 mx-auto">
                            <label>Email address</label>
                            <input
                                type="email"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="mb-2 col-6 mx-auto">
                            <label>Password</label>
                            <input
                                type="password"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className="mb-2 col-6 mx-auto">
                            <input type="checkbox" className="form-check-input" />
                            <label className="form-check-label">Check me out</label>
                        </div>

                        <div className="d-flex justify-content-center mb-2">
                            <button type="submit" className="btn btn-secondary mx-4" onClick={handleEmailLogin}>Submit</button>
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

export default LogIn