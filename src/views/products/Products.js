import React from 'react';
import NavBar from '../../components/globals/NavBar';
import TableProducts from '../../components/Table/TableProducts';

const Products = () => {
    return (
        <div className="container-info">
        <NavBar titule='Productos'  />
       <div id="" className="">
         <h1>PRODUCTOS</h1>
         <TableProducts />
       </div>
     </div>
    );
};

export default Products;