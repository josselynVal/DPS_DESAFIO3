import React, { useContext } from "react";
import { UserContext } from "../providers/UserProvider";
import { auth } from "../firebase";
import { Router, Link } from "@reach/router";

import Info from "./Home/Info"
import Contacto from "./Home/Contacto"
import Help from "./Home/Help"
import User from "./Home/User"
import Empleados from "./Home/Empleado"

const ProfilePage = () => {

  // Asigna un user para leer el contexto del tema actual.
  // React encontrará el Provider superior más cercano y usará su valor.
  //            <a className="navbar-brand" href="/">WebSiteName</a>
  const user = useContext(UserContext);

  const { photoURL, displayName, email } = user;
  console.log(" Usuario ProfilePage : " + displayName + " - " + email);

  const signOut = () => {
    auth.signOut();  
  };

  return (
    <div>
      <nav className="navbar navbar-inverse">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand">WebSiteName</a>
          </div>
          <ul className="nav navbar-nav">
            <li className="active"><Link to="/">Inicio</Link></li>
            <li><Link to="info">Información</Link></li>
            <li><Link to="empleados">Empleado</Link></li>
            <li><Link to="user">User</Link></li>
            <button className="btn btn-danger" onClick={() => { signOut() }}>
              Sign out</button>
          </ul>
        </div>
      </nav>
      <Router>
        <Info exact path="info" />
        <Contacto exact path="contacto" />
        <Help exact path="help" />
        <User exact path="user" />
        <Empleados exact path="empleados" />
      </Router>

      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <span className="float-right">
              <div
                style={{
                  background: `url(${photoURL || 'https://res.cloudinary.com/dqcsk8rsc/image/upload/v1577268053/avatar-1-bitmoji_upgwhc.png'})  no-repeat center center`,
                  backgroundSize: "cover",
                  height: "100px",
                  width: "100px"
                }}
                className="border border-blue-300"
              ></div>
              <br></br>
             Nombre : <h2 className="text-2xl font-semibold">{displayName}</h2>
              <br></br>
             Correo: <h3 className="italic">{email}</h3>
            </span>
          </div>
        </div>
      </div>
          </div>
  )
};

export default ProfilePage;

