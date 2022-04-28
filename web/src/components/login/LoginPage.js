import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../authentication/AuthContext";
import { types } from "../../types/types";
import profile from "./../image/logo.png";
import email from "./../image/email.png";
import pass from "./../image/pass.png";
import axios from 'axios';
import swal from 'sweetalert';
import './LoginUi.css';
export const LoginPage = () => {

  const history = useHistory();
  const context = useContext(AuthContext);
  const [user, setUser] = useState('')
  const [password_, setPassword_] = useState('')
  const [error, setError] = useState('')
  const [checked, setChecked] = useState(false);


  // console.log( 'context', context );

  const handleLogin = (rol_,comedor_, reparto_) => {
    // history.push('/marvel'); // Nos empuja a la página
    // history.replace('/marvel'); // Nos lleva a la página y reemplaza LoginPage por ésta en el historial
    console.log('datos ingresados :')
    console.log('Usuario : ' + user + '  Password  :  ' + password_)
    const lastPath = localStorage.getItem('lastPath') || '/';
   
    console.log("comedor : " + comedor_ + " Reparto : " + reparto_)
    context.dispatch({
      type: types.login,
      payload: {
        name: user,
        rol:rol_,
        idcomedor: comedor_,
        idreparto: reparto_,
      }
    });

    // history.replace( '/' ); 

    history.replace(lastPath);

  };
  const handleLoginAdmin = (rol_) => {
    // history.push('/marvel'); // Nos empuja a la página
    // history.replace('/marvel'); // Nos lleva a la página y reemplaza LoginPage por ésta en el historial
    console.log('datos ingresados :')
    console.log('Usuario : ' + user + '  Password  :  ' + password_)
    
    const lastPath = localStorage.getItem('lastPath') || '/';
   
    context.dispatch({
      type: types.login,
      payload: {
        name: user,
        rol:rol_,
      }
    });
    // history.replace( '/' ); 
    history.replace(lastPath);
  };
  const manejadorBoton = async () => {
    var login_ingreso = {
      "username": user,
      "password": password_,
    }
    if ((user === '') || (password_ === '')) {
      swal({
        text: "Ingrese usuario o contraseña ",
        icon: "warning"
      });
    }
    else {
      let url = `http://localhost:3000/usuario/login/${user}/${password_}`;
      await axios.get(url, login_ingreso)
        .then(response => {
          console.log(response.data)
          if (response.data.msg === "1" && response.data.id_rol === 3) {
            console.log('nav administrador admin')
            handleLoginAdmin(response.data.id_rol);
          }
          if (response.data.msg === "1" && response.data.id_rol === 2) {
            console.log("api comedor " + response.data.id_comedoradmin)
            handleLogin(response.data.id_rol,response.data.usuariocomedor_table, response.data.usuarioreparto_table)
            swal({
              text: "Bienvenido Administrador Ranchero, " + user,
              icon: "success"
            });
          } else {
            setChecked(true)
            setError(response.data.msg)
          }
        }).catch(error => {
          console.log(error);

        })
    }
  }
  return (
    <div className="main">
      <div className="sub-main">
        <div>
          <div className="imgs">
            <div className="container-image">
              <img src={profile} alt="profile" className="profile" />
            </div>
          </div>
          <div>
            <br />
            <h1 style={{ fontSize: "25px" }}>Login Page</h1>
            <div className="second_input">
              <img src={email} alt="email" className="email" />
              <input type="text" placeholder="username" className="name" onChange={(event) => setUser(event.target.value)} value={user} />
            </div>
            <br />
            <div className="second_input">
              <img src={pass} alt="pass" className="email" />
              <input type="password" placeholder="Contraseña" className="name" onChange={(event) => setPassword_(event.target.value)} value={password_} />
            </div>
            <div className="login-button">
              <button className="btnlogin" onClick={manejadorBoton}>Login</button>
            </div>
            <br />
            {checked === true &&

              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            }
          </div>
        </div>


      </div>
    </div>
  );

};
