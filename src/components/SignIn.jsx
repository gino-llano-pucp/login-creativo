import './SignIn.scss';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box } from '@mui/material';
import { Button } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export default function SignIn(props) {
  
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const navigate = useNavigate();

  // Definir el estado para el valor del input
  const [email, setEmail] = useState('');
  // Definir el estado para el valor del input
  const [password, setPassword] = useState('');

  // Manejar el cambio en el input
  const handleInputChange = (event) => {
    setEmail(event.target.value);  // Actualizar el valor del estado con el nuevo valor del input
  };

  // Manejar el cambio en el input
  const handleInputChange2 = (event) => {
    setPassword(event.target.value);  // Actualizar el valor del estado con el nuevo valor del input
  };


  const signIn = () => {

    let users = localStorage.getItem("users");

    if (users) {
      users = JSON.parse(users);
      console.log(users);
      console.log(email);
      console.log(password);
      
      for (let i=0; i<users.length; i++) {
        const user = users[i];
        console.log(user)
        if (user.email == email && user.password == password) {
          console.log("okk");
          navigate("/home");
        }
      }
    }

  }

  return (
    <>
    <div className="container">
      <div className="top"></div>
      <div className="bottom"></div>
      <div className="center">

        <Box>
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
            value={password}  // Asignar el valor del estado al input
            onChange={handleInputChange2}  // Cambiar el valor cuando el usuario escriba
        />
        <Box sx={{
          marginTop: "12px",
          width: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "6px"
        }}>
          <Button variant='outlined' onClick={signIn}>
            Iniciar sesión
          </Button>
          <div>o</div>
          <Button variant='outlined' onClick={() => navigate("/register")}>
            Registrarse
          </Button>
        </Box>
      </div>



    </div>
    </>
  )

}