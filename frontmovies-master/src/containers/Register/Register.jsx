import React, { useState } from 'react';
import './Register.scss';
import "antd/dist/antd.css";
import { notification } from "antd";
import { useHistory } from 'react-router-dom'
import axios from 'axios';


const Register = () => {
    const [newUser, setNewUser] = useState({});

    const history = useHistory({});

    const handleSubmit = event => {
        event.preventDefault(); // para evitar refrescar la página
        axios.post('https://peliculasdb.herokuapp.com/user/signup', {
            name: event.target.name.value,
            email: event.target.email.value,
            password: event.target.password.value,
        })
            .then(res => {
                setNewUser(res.data);
                notification.success({ message: 'Account created succesfully, please use your email and password to login', description: 'Bienvenide ' + newUser.name })
                setTimeout(() => {
                    history.push('/login')
                }, 1000);
            })
            .catch(error => { alert("user already exists"); console.log(process.env); })
    };

    return (
        <div className="formContainer">
            <div className="centered" id="basic">
                <form className="centered" onSubmit={handleSubmit} >
                    <input name="name" required placeholder="NAME"/>
                    <input name="email" required placeholder="EMAIL"/>
                    <input name="password" type="password" required placeholder="PASSWORD"/>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        </div>
    )
};
export default Register;