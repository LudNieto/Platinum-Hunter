import { Fragment } from "react/jsx-runtime";
import { useState } from "react";
import oro from "../assets/images/oro.png"
import plata from "../assets/images/plata.png"
import bronce from "../assets/images/bronce.png"


export const Home = () => {
    const [openDropdown, setOpenDropdown] = useState(null);

    const toggleDropdown = (index) => {
        setOpenDropdown(openDropdown === index ? null : index);
    };

    return (
        <Fragment>
            <div className="login container">
                <div className="d-flex justify-content-center bg-light rounded-5 shadow-lg p-lg-5 mt-lg-5 w-50">
                    <h1>Juegos</h1>
                </div>
            </div>

            <div className="login container">
                <div className="d-flex justify-content-center bg-light rounded-5 shadow-lg p-lg-5 my-5 w-100">
                    <div className="w-100">
                        {/* Dropdown 1 */}
                        <div className="d-flex justify-content-between text-bg-secondary rounded-5 shadow-lg p-lg-3 w-100">
                            <h4 className="m-3">Call Of Duty Black Ops III</h4>
                            <button
                                onClick={() => toggleDropdown(1)}
                                className="btn btn-light border rounded-circle">
                                <span className="m-3">▼</span>
                            </button>
                        </div>
                        {openDropdown === 1 && (
                            <div className="d-block overflow-hidden rounded-5 shadow-lg my-1 p-lg-3 w-100">
                                <div className="d-flex align-items-center justify-content-between bg-light rounded-5 shadow-lg my-1 p-lg-3 w-100">
                                    <div>
                                        <h3 className="m-2">Hasta la luna</h3>
                                        <p className="m-2">Usa todas las wunderspheres dos veces en Der Eisendrache.</p>
                                    </div>
                                    <img
                                        src={oro}
                                        className="w-25 img-fluid"
                                        style={{ maxWidth: "10%", height: "auto" }}
                                    />
                                </div>
                                <div className="d-flex align-items-center justify-content-between bg-light rounded-5 shadow-lg my-1 p-lg-3 w-100">
                                    <div>
                                        <h3 className="m-2">No puedes esconderte</h3>
                                        <p className="m-2">En la campaña, mara a un enemigo a traves de un muero u obstaculo.</p>
                                    </div>
                                    <img
                                        src={plata}
                                        className="w-25 img-fluid"
                                        style={{ maxWidth: "10%", height: "auto" }}
                                    />
                                </div>
                                <div className="d-flex align-items-center justify-content-between bg-light rounded-5 shadow-lg my-1 p-lg-3 w-100">
                                    <div>
                                        <h3 className="m-2">Gorila de negro</h3>
                                        <p className="m-2">Piratea la camara de datos y preparate para Cyber's Avengening en Dead Ops 2.</p>
                                    </div>
                                    <img
                                        src={bronce}
                                        className="w-25 img-fluid"
                                        style={{ maxWidth: "10%", height: "auto" }}
                                    />
                                </div>
                            </div>
                        )}

                        {/* Dropdown 2 */}
                        <div className="d-flex justify-content-between text-bg-secondary rounded-5 shadow-lg p-lg-3 my-3 w-100">
                            <h4 className="m-3">Among Us</h4>
                            <button
                                onClick={() => toggleDropdown(2)}
                                className="btn btn-light border rounded-circle">
                                <span className="m-3">▼</span>
                            </button>
                        </div>
                        {openDropdown === 2 && (
                            <div className="d-block rounded-5 shadow-lg my-1 p-lg-3 w-100">
                                <div className="d-flex align-items-center justify-content-between bg-light rounded-5 shadow-lg my-1 p-lg-3 w-100">
                                    <div>
                                        <h3 className="m-2">SHERLOCK</h3>
                                        <p className="m-2">Gana una partida como tripulante votando solo a impostores.</p>
                                    </div>
                                    <img
                                        src={oro}
                                        className="w-25 img-fluid"
                                        style={{ maxWidth: "10%", height: "auto" }}
                                        alt="Oro"
                                    />
                                </div>
                                <div className="d-flex align-items-center justify-content-between bg-light rounded-5 shadow-lg my-1 p-lg-3 w-100">
                                    <div>
                                        <h3 className="m-2">SUPERVIVIENTE</h3>
                                        <p className="m-2">Sobrevive y gana una partida como tripulante.</p>
                                    </div>
                                    <img
                                        src={plata}
                                        className="w-25 img-fluid"
                                        style={{ maxWidth: "10%", height: "auto" }}
                                        alt="Oro"
                                    />
                                </div>
                                <div className="d-flex align-items-center justify-content-between bg-light rounded-5 shadow-lg my-1 p-lg-3 w-100">
                                    <div>
                                        <h3 className="m-2">EN PRACTICAS</h3>
                                        <p className="m-2">Completa 10 tareas.</p>
                                    </div>
                                    <img
                                        src={bronce}
                                        className="w-25 img-fluid"
                                        style={{ maxWidth: "10%", height: "auto" }}
                                        alt="Oro"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Home;
