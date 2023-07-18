import React, { useState } from 'react';
import '../Index.scss'
import constants from '../utils/constants';
import Swal from 'sweetalert2';
import { type } from '@testing-library/user-event/dist/type';

const FormButton = props => (
    <div id="button" className="row log">
        <button>{props.title}</button>
    </div>
);

const FormInput = props => (
    <div className="row log">
        <label>{props.description}</label>
        <input className='lgpr' onChange={props.onChange} type={props.type} placeholder={props.placeholder} />
    </div>
);


const FormHeader = props => (
    <h2 id="headerTitle">{props.title}</h2>
);


const Form = props => (
    <div>
        <FormInput description="Usuario" placeholder="Escribe tu usuario" type="text" />
        <FormInput description="Contraseña" placeholder="Escribe tu contraseña" type="password" />
        <FormButton title="Log in" />
    </div>
);



const Index = () => {

    const [correo, setCorro] = useState("");
    const [contrasena, setContrasena] = useState("");

    const handleInputUser = (event) => {
        setCorro(event.target.value);
    };
    const handleInputPass = (event) => {
        setContrasena(event.target.value);
    };

    const submit = async () => {
        if(correo.length > 0 && contrasena.length > 0){
            try {
                console.log(correo);
                const Id = parseInt(correo, 10) 
                const rawResponse = await fetch(constants.api + "login", {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ ID: Id, contrasena: contrasena }),
                });
                const result = await rawResponse.json();
                console.log('resutlado');
                // console.log(result, 'result');

                if (result) {
                    localStorage.setItem("token", result.data.token);
                    localStorage.setItem("data", JSON.stringify(result.data));
                    if (result.data.rolUsuario == 1) {
                        window.location.replace("/");
                    }
                    if (result.data.rolUsuario == 2) {
                        window.location.replace("/");
                    }
                
                } else  {
                    console.log('dlskjfbalksdj');
                    Swal.fire({
                        title: "El nombre de usuario o contraseña son incorrectos",
                        timer: 3000,
                        showCancelButton: false,
                        showConfirmButton: false,
                        position: "top",
                    });
                
                }
            } catch (err) {
                // console.log(err);
                Swal.fire({
                    title: "El nombre de usuario o contraseña son incorrectos",
                    timer: 3000,
                    showCancelButton: false,
                    showConfirmButton: false,
                    position: "top",
                });
            }
        }else{
            Swal.fire({
                title: "LLena todos los campos",
                timer: 3000,
                showCancelButton: false,
                showConfirmButton: false,
                position: "top",
            });    
        }
    };

    return (
        <>
        
        <div className='login-container'>
            <div id="loginform">
                <FormHeader title="Login" />
                <div className="row log">
                    <label className="lbuser">Usuario</label>
                    <input required className='form-control' onChange={handleInputUser} type='number' placeholder={'Escribe tu usuario'} />
                </div>
                <div className="row log">
                    <label className="lbpass">Contraseña</label>
                    <input required className='form-control' onChange={handleInputPass} type="password" placeholder={'Escribe tu contraseña'} />
                </div>
                <div id="button" className="row log">
                    <button onClick={submit}>Log in</button>
                </div>
            </div>
        </div>
        </>
    
    );
};




export default Index;

