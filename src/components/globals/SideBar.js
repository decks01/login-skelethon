import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Index.scss";
import logo from "../../imgs/logo.png"

const RouteLink = (props) => {


  const ColorClick = (id) => {
    const colore = document.getElementsByClassName("link-route");
    const color = document.getElementById(id);

    colore[`Inicio`].classList.remove("color-btn");
    colore[`Usuarios`].classList.remove("color-btn");
    colore[`Categorias`].classList.remove("color-btn");
    colore[`Productos`].classList.remove("color-btn");
    colore[`Direcciones`].classList.remove("color-btn");
    colore[`Pedidos`].classList.remove("color-btn");
    colore[`Detalles`].classList.remove("color-btn");
    colore[`Compras`].classList.remove("color-btn");
    
    if (id === color.id) {
      color.className += " color-btn";
    }                                                                   
  };

  return (
    <Link
      onClick={(e) => ColorClick(props.nombre)}
      id={`${props.nombre}`}
      name="routas"
      className="link-route"
      to={`${props.to}`}
    >
      {props.nombre}
    </Link>
  );
};
const SideBar = () => {
  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div id="side-bar" className="side-bar-menu animate__animated ">
      <div id="side-bar-option" className="container-side-bar">
        <div>
          <div className="title-logo">
            <img src={logo} alt="no image"></img>
          </div>
          <hr className="hr-title" />
          <RouteLink to="/" nombre="Inicio" />
          <RouteLink to="/usuarios" nombre="Usuarios" />
          <RouteLink to="/categorias" nombre="Categorias" />
          <RouteLink to="/productos" nombre="Productos" />
          <RouteLink to="/direcciones" nombre="Direcciones" />
          <RouteLink to="/pedidos" nombre="Pedidos" />
          <RouteLink to="/detalles" nombre="Detalles" />
          <RouteLink to="/compras" nombre="Compras" />
        </div>
        <div className="btnlog d-flex justify-content-center w-100">
          <button className="btn btn-primary w-100 bt-logout" onClick={logout}>
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
