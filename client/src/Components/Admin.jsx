import { Fragment } from "react"


export const Admin = () => {
    return (
        <Fragment>
            <Fragment>
                <main className="container-fluid p-5 justify-content-center col-6">
                    <div className='row'>
                        <div className='container justify-content-center bg bg-light p-5 rounded-5 shadow-lg'>
                            <h1 className="text-center mx-5">Admin</h1>
                            <form >
                                <div className="mb-2 col-8 mx-auto mt-5">
                                    <label>Nombre</label>
                                    <input
                                        type="text"
                                        className='form-control mb-2'
                                    />
                                </div>
                                <div className=" d-flex justify-content-center mb-2 col-2 mx-auto mt-5">
                                    <button className="btn btn-success">crear</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className='row mt-5'>
                        <div className="col-12 container justify-content-center bg bg-light p-5 rounded-5 shadow-lg">
                            <h1 className="text-center">Juegos</h1>
                            <ul className='list-group'>
                            </ul>
                        </div>
                    </div>
                </main>
            </Fragment>
        </Fragment>
    )
}