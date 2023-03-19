import React from 'react';
import NavBar from '../../components/globals/NavBar';
import TableDirectionorder from '../../components/Table/TableDirectionorders';

const DirectionsOrders = () => {
    return (
        <div className="container-info">
        <NavBar titule='Pedidos'  />
       <div id="" className="">
         <h1>Direcciones</h1>
         <TableDirectionorder />
       </div>
     </div>
    );
};

export default DirectionsOrders;