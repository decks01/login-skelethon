import React from 'react';
import NavBar from '../../components/globals/NavBar';
import TableCats from '../../components/Table/TableCats';

const Cats = () => {
    return (
        <div className="container-info">
        <NavBar titule='Categorias'  />
       <div id="" className="">
         <h1>CATEGORIAS</h1>
         <TableCats />
       </div>
     </div>
    );
};

export default Cats;