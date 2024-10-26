import './SignIn.scss';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box } from '@mui/material';
import { Button } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import CasinoIcon from '@mui/icons-material/Casino';

export default function Register(props) {
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  // Definir el estado para el valor del input
  const [email, setEmail] = useState('');
  // Definir el estado para el valor del input
  const [inputValue, setInputValue] = useState('');
  // Definir el estado para el valor del input
  const [inputValueConfirm, setInputValueConfirm] = useState('');

  const navigate = useNavigate();

  // Manejar el cambio en el input
  const handleInputChange = (event) => {
    setEmail(event.target.value);  // Actualizar el valor del estado con el nuevo valor del input
  };

  // Manejar el cambio en el input
  const handleInputChange2 = (event) => {
    setInputValue(event.target.value);  // Actualizar el valor del estado con el nuevo valor del input
  };

    // Manejar el cambio en el input
    const handleInputChange3 = (event) => {
      setInputValueConfirm(event.target.value);  // Actualizar el valor del estado con el nuevo valor del input
    };

  function generarCadenaAleatoria(longitud) {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789<>!#$%&()=?¡¿/*+-';
    let resultado = '';

    for (let i = 0; i < longitud; i++) {
        const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
        resultado += caracteres.charAt(indiceAleatorio);
    }

    return resultado;
  }

  const setRandomPassword = () => {
    const cadenaAleatoria = generarCadenaAleatoria(12);
    setInputValue(cadenaAleatoria);
    setInputValueConfirm(cadenaAleatoria);
  }

  const register = () => {

    if (!email.includes("@") || !email.includes(".com"))
      return;
    if (inputValue.length < 12)
      return;
    if (inputValue != inputValueConfirm)
      return;

    let users = localStorage.getItem("users");

    if (users) {
      users = JSON.parse(users);
    }
    else {
      users = [];
    }
    
    users.push({
      email: email,
      password: inputValue
    })

    localStorage.setItem("users", JSON.stringify(users));
    navigate("/");
  }

  return (
    <>
    <div className="container">
      <div className="top"></div>
      <div className="bottom"></div>
      <div className="center">

        <Box sx={{
          display: "flex",
          flexDirection: "row",
          gap: "12px"
        }}>
          <CasinoIcon           
          onClick={setRandomPassword}
          sx={{
            cursor: "pointer"
          }}
          />
        {
          passwordVisibility ?
          <VisibilityIcon
          onClick={() => { setPasswordVisibility(!passwordVisibility) }}
          sx={{
            cursor: "pointer"
          }}
          />
        :
          <VisibilityOffIcon
          onClick={() => { setPasswordVisibility(!passwordVisibility) }}
          sx={{
            cursor: "pointer"
          }}
          />
        }
        </Box>

        <input type="email" placeholder="Correo" 
            value={email}  // Asignar el valor del estado al input
            onChange={handleInputChange}  // Cambiar el valor cuando el usuario escriba
        />
        <input type={passwordVisibility ? "text" : "password"} placeholder="Contraseña" 
          value={inputValue}  // Asignar el valor del estado al input
          onChange={handleInputChange2}  // Cambiar el valor cuando el usuario escriba
        />
        <input type={passwordVisibility ? "text" : "password"} placeholder="Confirmar contraseña" 
          value={inputValueConfirm}  // Asignar el valor del estado al input
          onChange={handleInputChange3}  // Cambiar el valor cuando el usuario escriba
        />
        <Box sx={{
          marginTop: "12px",
          width: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "6px"
        }}>
          <Button variant='outlined' onClick={register}>
            Registrarse
          </Button>
        </Box>
      </div>



    </div>
    </>
  )

}