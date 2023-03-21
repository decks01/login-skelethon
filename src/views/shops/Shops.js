import React from 'react';
import NavBar from '../../components/globals/NavBar';
import TableShops from '../../components/Table/TableShops';

const Shops = () => {
    return (
        <div className="container-info">
        <NavBar titule='Pedidos'  />
       <div id="" className="">
         <h1>COMPRAS</h1>
         <TableShops />
       </div>
     </div>
    );
};

export default Shops;