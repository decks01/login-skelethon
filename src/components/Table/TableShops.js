import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Swal from 'sweetalert2';

// Prime react
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "./Table.scss";
// import 'primeflex/primeflex.css';
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Ripple } from "primereact/ripple";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { Button } from "primereact/button";
import { GrAdd } from "react-icons/gr";
import { FilterMatchMode, FilterOperator } from "primereact/api";

import {
  locale,
  addLocale,
} from "primereact/api";
import constants from "../../utils/constants";

// COLUMNAS PARA USAR EN VEZ DEL MAP
function Columas() {
  return (
    <>
      <Column field="categoria" header="categoria" sortable></Column>
      <Column
        field="correo_alternativo"
        header="correo_alternativo"
        sortable
      ></Column>
    </>
  );
}

const TableShops = () => {


  var moment = require("moment");
  const [loader, setloader] = useState(true);

  const [first1, setFirst1] = useState(0);
  const [rows1, setRows1] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const [showcreate, setShowcreate] = useState(false);
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const [Datamodal, setDataModal] = useState([]);

  const [idCompra, setidCompra] = useState([]);
  const [pedidoID, setPedidoID] = useState([]);
  const [estado, setEstado] = useState([]);
  const [fecha, setFecha] = useState([]);
  const [fechaEntrega, setFechaEntrega] = useState([]);

  const [globalFilterValue1, setGlobalFilterValue1] = useState("");
  const [filters1, setFilters1] = useState(null);

  const cleardata = () => {
    setidCompra("")
    setPedidoID("")
    setEstado("")
    setFecha("")
    setFechaEntrega("")
  };
  
  const getShops = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(constants.api + "shops", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer" + token,
        },
      });
      const result = await response.json();
      setData(result);
      console.log(result);
    } catch (error) {
      console.log("Estan vacios los campos o esta mal la consulta");
    }
  };

  // DATA PARA EL FETCH
  useEffect(() => {
    getShops();
  }, []);

  const createShop = async () => {
    // setShow(true);
    try {
      const pedidoIDParse = parseInt(pedidoID);
      const fechaEntregaIni = moment(fechaEntrega).format("YYYY-MM-DD[T]HH:mm:ss[.000Z]");
      const response = await fetch(constants.api + "shops", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer" ,
        },
      body: JSON.stringify({
          pedidoID: pedidoIDParse,
          estado: estado,
          fechaEntrega: fechaEntregaIni
    }),
      });

      const result = await response.json();
      console.log(result);

      if(result){
        console.log("La Categoría fue creada");
        setShowcreate(false);
        getShops();
      }else{
        console.log("No se pudo crear la Categoría");
      }

  
} catch (error) {
  alert("error en el servidor, intentelo de nuevo", error);
}
};

const getShopById = async (idCompra) => {
  setShow(true);
  try {
    const response = await fetch(constants.api + "shops/" + idCompra, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    console.log(' result De getCats',result);
    console.log(result);
    setDataModal(result);
    setidCompra(result.idCompra)
    setPedidoID(result.pedidoID)
    setEstado(result.estado)
    setFecha(result.fecha)
    setFechaEntrega(result.fechaEntrega)
  } catch (error) {
    console.log(error);
    alert("error en el servidor, intentelo de nuevo", error);
  }
};

const updateShop = async (id) => {
  try {
    const idParse = parseInt(id);
    const pedidoIDParse = parseInt(pedidoID);
    const fechaEntregaIni = moment(fechaEntrega).format("YYYY-MM-DD[T]HH:mm:ss[.000Z]");
    const response = await fetch(constants.api + "shops/" + idParse, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer" ,
      },
      body: JSON.stringify({
        pedidoID: pedidoIDParse,
        estado: estado,
        fechaEntrega: fechaEntregaIni
    }),
    });

    const result = await response.json();
    console.log(result);

    if(result){
      console.log("Categoria actualizada correctamente");
      setShow(false);
      getShops();
    }else{
      console.log("Actualizacion de categoría fallada");
    }


} catch (error) {
alert("error en el servidor, intentelo de nuevo", error);
}
};

const deleteShop = async (id) => {
  try {
    const response = await fetch(constants.api + "shops/delete/" + id, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      
    });

    const result = await response.json();
    console.log(result);

    if(result){
      Swal.fire({
          position: "center",
          icon: "success",
          title: "Compra eliminada",
          showConfirmButton: false,
          timer: 3000,
        });
      getShops();
    }else{
      console.log("No se pudo eliminar la compra");
    }

    
  } catch (error) {
    alert("error en el servidor, intentelo de nuevo", error);
  }
};

const ConfirmAlert = async (id) => {

  Swal.fire({
    title: "¿Estás seguro?",
    text: "Este cambio será permanente!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, Eliminar!",
    cancelButtonText: "Cancelar",
    iconColor: "#d33",
  }).then((result) => {
  
      if (result.isConfirmed) {
        deleteShop(id);
        Swal.fire("Eliminado!", "El registro de teléfono fue eliminado.", "success");
        
      }

  });
};

const handleClose = (id) => {
  setShow(false);
  cleardata();
};

const handleShowcreate = (id) => {
  setShowcreate(true);
  console.log("entre al modal create");

};

const handleClosecreate = (id) => {
  setShowcreate(false);
  cleardata();
};

  const onCustomPage1 = (event) => {
    setFirst1(event.first);
    setRows1(event.rows);
    setCurrentPage(event.page + 1);
  };

  // FOOTER TABLA
  const template1 = {
    layout:
      "PrevPageLink PageLinks NextPageLink RowsPerPageDropdown CurrentPageReport",
    PrevPageLink: (options) => {
      return (
        <button
          type="button"
          className={options.className}
          onClick={options.onClick}
          disabled={options.disabled}
        >
          <span className="p-3">Anterior</span>
          <Ripple />
        </button>
      );
    },
    NextPageLink: (options) => {
      return (
        <button
          type="button"
          className={options.className}
          onClick={options.onClick}
          disabled={options.disabled}
        >
          <span className="p-3">Siguiente</span>
          <Ripple />
        </button>
      );
    },
    PageLinks: (options) => {
      if (
        (options.view.startPage === options.page &&
          options.view.startPage !== 0) ||
        (options.view.endPage === options.page &&
          options.page + 1 !== options.totalPages)
      ) {
        const className = classNames(options.className, { "p-disabled": true });

        return (
          <span className={className} style={{ userSelect: "none" }}>
            ...
          </span>
        );
      }

      return (
        <button
          type="button"
          className={options.className}
          onClick={options.onClick}
        >
          {options.page + 1}
          <Ripple />
        </button>
      );
    },
    RowsPerPageDropdown: (options) => {
      const dropdownOptions = [
        { label: 10, value: 10 },
        { label: 20, value: 20 },
        { label: 50, value: 50 },
        { label: "Todo", value: options.totalRecords },
      ];

      return (
        <Dropdown
          value={options.value}
          options={dropdownOptions}
          onChange={options.onChange}
        />
      );
    },
  };

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setloader(false);
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    initFilters1();
  }, []);

  // TEMPLATES PARA ACCCIONES DE ELIMINAR Y EDITAR
  const actionBodyTemplate = (rowData) => {
    return (
      <div key={rowData.id}>
          <Button
            icon="pi pi-pencil"
            className="p-button-rounded p-button-success mr-2" onClick={(e) => getShopById(rowData?.idCompra)}
          />
          <Button
            icon="pi pi-trash"
            className="p-button-rounded p-button-danger" onClick={(e) => ConfirmAlert(rowData?.idCompra)}
          />
      </div>
    );
  };

  // FORMATEO DE FECHA
  const formatDate = (value) => {
    return moment.utc(value).format("yyyy/MM/DD");
  };
  // TEMPLATE PARA FECHA
  const dateBodyTemplate = (rowData) => {
    return formatDate(rowData.fecha);
  };

  const dateBodyTemp = (rowData) => {
    return formatDate(rowData.fechaEntrega);
  };

  //   INICIALIZAR FILTROS POR TODOS
  const initFilters1 = () => {
    setFilters1({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        'fecha_inicio': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'colonia': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'num_empleado': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'correos': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
    });
    setGlobalFilterValue1("");
  };

  // DATOS PARA CAMBIAR EN ESPAÑOL
  locale("es");
  addLocale("es", {
    firstDayOfWeek: 1,
    dayNames: [
      "domingo",
      "lunes",
      "martes",
      "miércoles",
      "jueves",
      "viernes",
      "sábado",
    ],
    dayNamesShort: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
    dayNamesMin: ["D", "L", "M", "Mi", "J", "V", "S"],
    monthNames: [
      "enero",
      "febrero",
      "marzo",
      "abril",
      "mayo",
      "junio",
      "julio",
      "agosto",
      "septiembre",
      "octubre",
      "noviembre",
      "diciembre",
    ],
    monthNamesShort: [
      "ene",
      "feb",
      "mar",
      "abr",
      "may",
      "jun",
      "jul",
      "ago",
      "sep",
      "oct",
      "nov",
      "dic",
    ],
    today: "Hoy",
    clear: "Limpiar",
    matchAll: "Todo",
    apply: "aplicar",
    matchAny: "Coincidir con cualquiera",
    dateIs: "Fecha",
    deteNot: "No incluir fecha",
    removeRule: "Remover regla",
    dateBefore: "Fecha antes de",
    dateAfter: "Fecha despues de",
    addRule: "Agregar regla",
    Clear: "Limpiar",
  });




  // BUSQUEDA HEADER, INPUT SEARCH
  const BusquedaHeader = () => {
    return (
      <div className="flex justify-content-between">
        <Button
          type="button"
          icon="pi pi-filter-slash"
          label="Limpiar"
          className="p-button-outlined"
          onClick={clearFilter1}
        />
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          {/* SE LE PASAN PARAMETROS DE BUSQUEDA EL VALUE Y ONCHANGE */}
          <InputText
            value={globalFilterValue1}
            onChange={onGlobalFilterChange1}
            placeholder="Busqueda"
          />
        </span>
      </div>
    );
  };

  const clearFilter1 = () => {
    initFilters1();
  };

  // FILTROS DE BUSQUEDA, POR QUE QUIERES FILTRAR
  const globalFilters = ["idCompra", "pedidoID", "estado", "fecha", "fechaEntrega"];

  // ONCHANGE DE BUSQUEDA SEARCH
  const onGlobalFilterChange1 = (e) => {
    const value = e.target.value;
    let _filters1 = { ...filters1 };
    _filters1["global"].value = value;
    setFilters1(_filters1);
    setGlobalFilterValue1(value);
  };

  const header1 = BusquedaHeader();

  // DATOS PARA COLUMNS, NOMBRE-TABLA --- NOMBRE QUE SE VE 
  const rows = [
    { field: "idCompra", header: "ID" },
    { field: "pedidoID", header: "pedido_ID" },
    { field: "estado", header: "Estado" },
    // { field: "fecha", header: "Fecha" }
    // { field: "fechaEntrega", header: "Fecha de Entrega" }
  ];

  return (
    <>
      <div className="table-responsivas">
        {loader ? (
          <div className="loading">
            <span class="loader"></span>
          </div>
        ) : (
          <div className="">
            <div className="add-responsiva">
              <h5>Tabla de Compras </h5>
                <button className="btn btn-success btn-responsivas" onClick={handleShowcreate}>
                  <GrAdd /> <p> Agregar Nueva </p>
                </button>
            </div>
            <DataTable
              value={data}
              filterDisplay="menu"
              responsiveLayout="scroll"
              paginator
              dataKey="id"
              filters={filters1}
              paginatorTemplate={template1}
              first={first1}
              rows={rows1}
              onPage={onCustomPage1}
              scrollable
              header={header1}
              scrollHeight="600px"
              emptyMessage="Sin resultados"
              globalFilterFields={globalFilters}
              currentPageReportTemplate="Mostrando de {first} a {last} de {totalRecords}"
            >
              {rows.map((item, key) => {
                return (
              
                  <Column
                    field={item.field}
                    header={item.header}
                    sortable
                  ></Column>
               
                );
              })}

              <Column
                field="fecha"
                body={dateBodyTemplate}
                // filterElement={dateFilterTemplate}
                header="Fecha"
                dataType="date"
                exportable={false}
                style={{ minWidth: "8rem" }}
                sortable
                // filter
              ></Column>

              <Column
                field="fechaEntrega"
                body={dateBodyTemp}
                // filterElement={dateFilterTemplate}
                header="Fecha de Entrega"
                dataType="date"
                exportable={false}
                style={{ minWidth: "8rem" }}
                sortable
                // filter
              ></Column>

              <Column
                body={actionBodyTemplate}
                // header="editando"
                exportable={false}
                style={{ minWidth: "14rem" }}
              ></Column>
            </DataTable>
          </div>
        )}

         {/* MODAL CREATE */}

         <Modal show={showcreate} onHide={handleClosecreate}>
              <Modal.Header closeButton>
                <Modal.Title>Crear Compra</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                 
              <div className="row">
                <div className="col mb-3">
                  <label> 
                    Pedido_ID 
                  <input className="form-control" onChange={(e) => setPedidoID(e.target.value)}/>
                  </label>
                </div>
                <div className="col mb-3">
                  <label> 
                    Estado
                    <input className="form-control" onChange={(e) => setEstado(e.target.value)}/>
                  </label>
                </div>
              <div className="col mb-3">
                <label>
                  Fecha_Entrega
                  <input className="form-control" type="date" onChange={(e) => setFechaEntrega(e.target.value)}/>
                </label>
              </div>
            </div>
             
              </Modal.Body>

              <Modal.Footer>
                <Button variant="secondary" onClick={handleClosecreate}>
                  Close
                </Button>
                <Button variant="primary" onClick={(e) => createShop(idCompra)}>
                  Create
                </Button>
              </Modal.Footer>
            </Modal>

            {/* MODAL EDIT */}

            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Editar Compra</Modal.Title>
              </Modal.Header>
              <Modal.Body>
              <div className="row">
                <div className="col">
                  <label> 
                    Pedido_ID
                  <input className="form-control" value={pedidoID} onChange={(e) => setPedidoID(e.target.value)}/>
                  </label>
                </div>
                <div className="col">
                  <label> 
                    Estado
                    <input className="form-control" value={estado} onChange={(e) => setEstado(e.target.value)}/>
                  </label>
                </div>
              </div>
              
              </Modal.Body>
  

              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={(e) => updateShop(idCompra)}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>

      </div>
    </>
  );
};

export default TableShops;