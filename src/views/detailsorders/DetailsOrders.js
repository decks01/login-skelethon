import React from 'react';
import NavBar from '../../components/globals/NavBar';
import TableDetailsorder from '../../components/Table/TableDetailsorder';

const DetailsOrders = () => {
    return (
        <div className="container-info">
        <NavBar titule='Pedidos'  />
       <div id="" className="">
         <h1>Detalles</h1>
         <TableDetailsorder />
       </div>
     </div>
    );
};

export default DetailsOrders;