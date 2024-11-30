import { Fragment, useState } from "react";
import { signUpWithEmailPassword, registerUserInDatabase } from "../services/authService";

export const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const userCredential = await signUpWithEmailPassword(email, password);
            await registerUserInDatabase(userCredential.user);
            alert("User registered successfully!");
        } catch (error) {
            alert("Error registering user: " + error.message);
        }
    };

    return (
        <Fragment>
            <main className="login">
                <div className="container-login justify-content-center bg-light rounded-5 shadow-lg">
                    <form className="form-login" onSubmit={handleSubmit}>
                        <h2 className="text-center mb-4">SignUp</h2>

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

                        <div className="d-flex justify-content-center mb-2">
                            <button type="submit" className="btn btn-secondary mx-4 " onClick={handleSubmit}>Submit</button>
                        </div>
                    </form>
                </div>
            </main>
        </Fragment>
    );
};

export default SignUp;