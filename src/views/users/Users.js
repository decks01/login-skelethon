import React from 'react';
import NavBar from '../../components/globals/NavBar';
import TableAsociacion from '../../components/Table/TableAsociacion';

const Users = () => {
    return (
        <div className="container-info">
       <NavBar titule='Usuarios' />
      <div id="" className="">
        <h1>USERS</h1>
        {/* <TableAsociacion /> */}
        Estos son los usuarios
      </div>
    </div>
    );
};

export default Users;