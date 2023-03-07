import React from "react";
import NavBar from "../components/globals/NavBar";
import TableAsociacion from "../components/Table/TableAsociacion";
import "./Home.scss";

const Home = () => {
  return (
    <div className="container-info">
       <NavBar titule='Inicio' />
      <div id="" className="">
        <h1>Home</h1>
        {/* <TableAsociacion /> */}
      </div>
    </div>
  );
};

export default Home;
