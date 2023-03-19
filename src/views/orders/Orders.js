import React from 'react';
import NavBar from '../../components/globals/NavBar';
import TableOrders from '../../components/Table/TableOrders';

const Orders = () => {
    return (
        <div className="container-info">
        <NavBar titule='Categorias'  />
       <div id="" className="">
         <h1>PEDIDOS</h1>
         <TableOrders />
       </div>
     </div>
    );
};

export default Orders;