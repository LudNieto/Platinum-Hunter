import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { auth } from '../config/firebase.js';

export const Admin = () => {
    const [nombre, setNombre] = useState('');
    const [plataforma, setPlataforma] = useState('');
    const [genero, setGenero] = useState('');
    const [juegos, setJuegos] = useState([]);

    useEffect(() => {
        // Obtener la lista de juegos al cargar el componente
        const fetchJuegos = async () => {
            try {
                const response = await axios.get('https://platinum-hunter.onrender.com/api/games');
                setJuegos(response.data);
            } catch (error) {
                console.error('Error al obtener los juegos:', error);
            }
        };

        fetchJuegos();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const user = auth.currentUser;
            if (!user) {
                console.error('No user is signed in');
                return;
            }
            const token = await user.getIdToken();
            const newGame = { Nombre: nombre, Plataforma: plataforma, Genero: genero };
            const response = await axios.post('https://platinum-hunter.onrender.com/api/games', newGame, {
                headers: {
                    Authorization: `Bearer ${token}` // Envía el token en los encabezados de la solicitud
                }
            });
            setJuegos([...juegos, response.data]);
            setNombre('');
            setPlataforma('');
            setGenero('');
        } catch (error) {
            console.error('Error al crear el juego:', error);
        }
    };

    return (
        <Fragment>
            <Navbar />
            <main>
                <div className="container-fluid p-5 justify-content-center col-6">
                    <div className='row'>
                        <div className='container justify-content-center bg bg-light p-5 rounded-5 shadowbox'>
                            <h1 className="text-center mx-5">Admin</h1>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-2 col-6 mx-auto mt-5">
                                    <label>Nombre</label>
                                    <input
                                        type="text"
                                        className='form-control mb-2'
                                        value={nombre}
                                        onChange={(e) => setNombre(e.target.value)}
                                    />
                                </div>
                                <div className="mb-2 col-6 mx-auto mt-3">
                                    <label>Plataforma</label>
                                    <input
                                        type="text"
                                        className='form-control mb-2'
                                        value={plataforma}
                                        onChange={(e) => setPlataforma(e.target.value)}
                                    />
                                </div>
                                <div className="mb-2 col-6 mx-auto mt-3">
                                    <label>Género</label>
                                    <input
                                        type="text"
                                        className='form-control mb-2'
                                        value={genero}
                                        onChange={(e) => setGenero(e.target.value)}
                                    />
                                </div>
                                <div className="d-flex justify-content-center mb-2 col-2 mx-auto mt-5">
                                    <button type="submit" className="btn btn-success">Crear</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className='row mt-5'>
                        <div className="col-12 container justify-content-center bg bg-light p-5 rounded-5 shadowbox">
                            <h1 className="text-center">Juegos</h1>
                            <ul className='list-group'>
                                {juegos.map((juego) => (
                                    <li key={juego.id} className='list-group-item'>
                                        {juego.Nombre} - {juego.Plataforma} - {juego.Genero}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </main>
        </Fragment>
    );
};

export default Admin;
