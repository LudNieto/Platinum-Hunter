import { Fragment } from "react"

export const SignIn = () => {
    return (
        <Fragment>
            <main className="login">
                <div className="container-login justify-content-center bg-light rounded-5 shadow-lg">
                    <form className="form-login">
                        <h2 className="text-center mb-4">SignIn</h2>

                        <div className="mb-2 col-6 mx-auto">
                            <label >Email address</label>
                            <input type="email" className="form-control" />
                        </div>

                        <div className="mb-2 col-6 mx-auto">
                            <label>Password</label>
                            <input type="password" className="form-control" />
                        </div>

                        <div className="d-flex justify-content-center mb-2">
                            <button type="submit" className="btn btn-secondary mx-4">Submit</button>
                        </div>

                    </form>
                </div>
            </main>
        </Fragment>
    )
}