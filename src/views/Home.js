import React from "react";
import NavBar from "../components/globals/NavBar";
// import TableAsociacion from "../components/Table/TableUsers";
import "./Home.scss";
import dashboard from "../imgs/dashboard.jpeg"

const Home = () => {
  return (
    <div className="container-info">
       <NavBar titule='Inicio' />
      <div id="" className="">
        <h1>DASHBOARD DEL PRODUCTO</h1>
        <img className="dhb" src={dashboard} alt="no image"></img>
      </div>
    </div>
  );
};

export default Home;
