import React from 'react';
import NavBar from '../../components/globals/NavBar';
import TableUsers from '../../components/Table/TableUsers';

const Users = () => {
    return (
        <div className="container-info">
        <NavBar titule='Usuarios'  />
       <div id="" className="">
         <h1>USUARIOS</h1>
         <TableUsers />
       </div>
     </div>
    );
};

export default Users;