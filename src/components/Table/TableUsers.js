import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal'
import Swal from 'sweetalert2'

// Prime react
import 'primeicons/primeicons.css'
import 'primereact/resources/themes/lara-light-indigo/theme.css'
import 'primereact/resources/primereact.css'
import './Table.scss'
// import 'primeflex/primeflex.css';
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Ripple } from 'primereact/ripple'
import { Dropdown } from 'primereact/dropdown'
import { InputText } from 'primereact/inputtext'
import { classNames } from 'primereact/utils'
import { Button } from 'primereact/button'
import { GrAdd } from 'react-icons/gr'
import { FilterMatchMode, FilterOperator } from 'primereact/api'

import { locale, addLocale } from 'primereact/api'
import constants from '../../utils/constants'

// COLUMNAS PARA USAR EN VEZ DEL MAP
function Columas() {
  return (
    <>
      <Column field='usuario' header='usuario' sortable></Column>
      <Column
        field='correo_alternativo'
        header='correo_alternativo'
        sortable
      ></Column>
    </>
  )
}

const TableUsers = () => {
  var moment = require('moment')
  const [loader, setloader] = useState(true)

  const [first1, setFirst1] = useState(0)
  const [rows1, setRows1] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)

  const [showcreate, setShowcreate] = useState(false)
  const [show, setShow] = useState(false)
  const [data, setData] = useState([])
  const [Datamodal, setDataModal] = useState([])

  const [id, setidUsuario] = useState([])
  const [ID, setID] = useState([])
  const [nombre, setNombre] = useState([])
  const [apellido, setApellido] = useState([])
  const [correo, setCorreo] = useState([])
  const [contrasena, setContrasena] = useState([])
  const [rolUsuario, setrolUsuario] = useState([])

  const [globalFilterValue1, setGlobalFilterValue1] = useState('')
  const [filters1, setFilters1] = useState(null)

  const cleardata = () => {
    setidUsuario('')
    setID('')
    setNombre('')
    setApellido('')
    setCorreo('')
    setContrasena('')
    setrolUsuario('')
  }

  const getUser = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(constants.api + 'users', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer' + token,
        },
      })
      const result = await response.json()
      setData(result)
      console.log(result)
    } catch (error) {
      console.log('Estan vacios los campos o esta mal la consulta')
    }
  }

  const getUserLocal = () => {
    try {
      const users = JSON.parse(localStorage.getItem('users')) || []

      setData(users)
      console.log(users)
    } catch (error) {
      console.log('Estan vacios los campos o esta mal la consulta')
    }
  }

  // DATA PARA EL FETCH
  useEffect(() => {
    // getUser();
    getUserLocal()
  }, [])

  useEffect(() => {
    console.log('ESTE ES EL MODO', navigator.onLine)
  }, [])

  const getOnLineStatus = () =>
    typeof navigator !== 'undefined' && typeof navigator.onLine === 'boolean'
      ? navigator.onLine
      : true

  const useNavigatorOnLine = () => {
    const [status, setStatus] = React.useState(getOnLineStatus())

    const setOnline = () => setStatus(true)
    const setOffline = () => setStatus(false)

    React.useEffect(() => {
      window.addEventListener('online', setOnline)
      window.addEventListener('offline', setOffline)

      return () => {
        window.removeEventListener('online', setOnline)
        window.removeEventListener('offline', setOffline)
      }
    }, [])

    return status
  }

  const StatusIndicator = () => {
    const isOnline = useNavigatorOnLine()

    return <span>You are {isOnline ? 'online' : 'offline'}.</span>
  }

  var connection =
    navigator.connection ||
    navigator.mozConnection ||
    navigator.webkitConnection
  var tipo = connection.effectiveType

  function updateConnectionStatus() {
    console.log(
      'Connection type changed from ' + tipo + ' to ' + connection.effectiveType
    )
    tipo = connection.effectiveType
  }

  connection.addEventListener('change', updateConnectionStatus)

  // const createBothUser = () => {
  //   if(navigator.onLine) {
  //     createUser()
  //    createUserLocal()
  //   } else {
  //     createUserLocal()

  //   }
  // }

  const createUser = async () => {
    // setShow(true);
    try {
      const IDParse = parseInt(ID)
      const response = await fetch(constants.api + 'users', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer',
        },
        body: JSON.stringify({
          ID: IDParse,
          nombre: nombre,
          apellido: apellido,
          correo: correo,
          contrasena: contrasena,
          imagen: '',
          rolUsuario: rolUsuario,
        }),
      })

      const result = await response.json()
      console.log(result)

      if (result) {
        console.log('Fue creado el usuario')
        setShowcreate(false)
        getUser()
      } else {
        console.log('El usuario no se creo')
      }
    } catch (error) {
      alert('error en el servidor, intentelo de nuevo', error)
    }
  }

  const createUserLocal = () => {
    try {
      const IDParse = parseInt(ID)
      // Resto del código para obtener nombre, apellido, correo, etc.

      // Crear un nuevo objeto con los datos del usuario, incluido el ID
      const newUser = {
        idUsuarios: IDParse,
        nombre: nombre,
        apellido: apellido,
        correo: correo,
        contrasena: contrasena,
        imagen: '',
        rolUsuario: rolUsuario,
      }

      // Obtener la lista actual de usuarios del localStorage o inicializar una lista vacía
      const users = JSON.parse(localStorage.getItem('users')) || []

      // Agregar el nuevo usuario a la lista
      users.push(newUser)

      // Guardar la lista actualizada en el localStorage
      localStorage.setItem('users', JSON.stringify(users))

      console.log('Fue creado el usuario')
      setShowcreate(false)
      getUserLocal() // Llamamos a getUserLocal para actualizar el estado "data" con los nuevos datos
    } catch (error) {
      console.error('Error en el servidor, inténtelo de nuevo', error)
      alert('Error en el servidor, inténtelo de nuevo', error)
    }
  }

  const getUserById = async (ID) => {
    setShow(true)
    console.log(ID)
    try {
      const response = await fetch(constants.api + 'users/' + ID, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      const result = await response.json()
      console.log(' result De getUser', result)
      console.log(result)
      setDataModal(result)
      setidUsuario(result.idUsuarios)
      setNombre(result.nombre)
      setApellido(result.apellido)
      setCorreo(result.correo)
      setrolUsuario(result.rolUsuario)
    } catch (error) {
      alert('error en el servidor, intentelo de nuevo', error)
    }
  }

  const getUserLocalById = (ID) => {
    setShow(true)
    console.log(ID)

    try {
      // Obtenemos la lista de usuarios almacenada en localStorage
      const users = JSON.parse(localStorage.getItem('users')) || []

      // Buscamos el usuario con el ID proporcionado
      const result = users.find((user) => user.idUsuarios === ID)

      if (!result) {
        console.log('Usuario no encontrado')
        return
      }

      console.log('Result De getUser', result)

      // Actualizamos los estados con los datos del usuario encontrado
      setDataModal(result)
      setidUsuario(result.idUsuarios)
      setNombre(result.nombre)
      setApellido(result.apellido)
      setCorreo(result.correo)
      setrolUsuario(result.rolUsuario)
    } catch (error) {
      console.error('Error en el servidor, inténtelo de nuevo', error)
    }
  }

  //   const updateRoluser = async (id) => {
  //     try {
  //       const rolParse = parseInt(rolUsuario);
  //       const idParse = parseInt(id);
  //       const response = await fetch(constants.api + "users/Updaterol/" + idParse, {
  //         method: "PUT",
  //         headers: {
  //           Accept: "application/json",
  //           "Content-Type": "application/json",
  //           Authorization: "Bearer" ,
  //         },
  //         body: JSON.stringify({
  //           rolUsuario: rolParse
  //       }),
  //       });

  //       const result = await response.json();
  //       console.log(result);

  //       if(result){
  //         console.log("Fue editado el usuario");
  //         setShow(false);
  //         getUser();
  //       }else{
  //         console.log("el usuario no se actualizo");
  //       }

  // } catch (error) {
  //   alert("error en el servidor, intentelo de nuevo", error);
  // }
  // };

  const updateRolLocaluser = (id) => {
    try {
      const rolParse = parseInt(rolUsuario)

      // Obtenemos la lista de usuarios almacenada en localStorage
      let users = JSON.parse(localStorage.getItem('users')) || []

      // Buscamos el usuario con el id proporcionado
      const userToUpdate = users.find((user) => user.idUsuarios === id)

      if (!userToUpdate) {
        console.log('Usuario no encontrado')
        return
      }

      // Actualizamos el rol del usuario en la lista local
      userToUpdate.rolUsuario = rolParse

      // Actualizamos el arreglo en localStorage
      localStorage.setItem('users', JSON.stringify(users))

      console.log('Fue editado el usuario')
      setShow(false)
      getUserLocal() // Actualizamos el estado "data" con los nuevos datos
    } catch (error) {
      console.error('Error en el servidor, inténtelo de nuevo', error)
      alert('Error en el servidor, inténtelo de nuevo', error)
    }
  }

  const deleteUser = async (id) => {
    try {
      const response = await fetch(constants.api + 'users/delete/' + id, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })

      const result = await response.json()
      console.log(result)

      if (result) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Usuario eliminado',
          showConfirmButton: false,
          timer: 3000,
        })
        getUser()
      } else {
        console.log('el usuario no se borro')
      }
    } catch (error) {
      alert('error en el servidor, intentelo de nuevo', error)
    }
  }

  const ConfirmAlert = async (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Este cambio será permanente!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, Eliminar!',
      cancelButtonText: 'Cancelar',
      iconColor: '#d33',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUser(id)
        Swal.fire(
          'Eliminado!',
          'El registro de teléfono fue eliminado.',
          'success'
        )
      }
    })
  }

  const deleteUserLocal = (idLocal) => {
    try {
      // Obtenemos la lista de usuarios almacenada en localStorage
      let users = JSON.parse(localStorage.getItem('users')) || []

      // Filtramos la lista para eliminar el usuario con el idLocal proporcionado
      users = users.filter((item) => item.idUsuarios !== idLocal)

      // Actualizamos el arreglo en localStorage
      localStorage.setItem('users', JSON.stringify(users))

      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Usuario eliminado',
        showConfirmButton: false,
        timer: 3000,
      })

      setData(users)
    } catch (error) {
      console.error('Error al eliminar el usuario', error)

      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Error al eliminar el usuario',
        showConfirmButton: false,
        timer: 3000,
      })
    }
  }

  const ConfirmAlertLocal = async (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Este cambio será permanente!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, Eliminar!',
      cancelButtonText: 'Cancelar',
      iconColor: '#d33',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUserLocal(id)
        Swal.fire(
          'Eliminado!',
          'El registro de usuario fue eliminado.',
          'success'
        )
      }
    })
  }

  const handleClose = (id) => {
    setShow(false)
    cleardata()
  }

  const handleShowcreate = (id) => {
    setShowcreate(true)
    console.log('entre al modal create')
  }

  const handleClosecreate = (id) => {
    setShowcreate(false)
    cleardata()
  }

  const onCustomPage1 = (event) => {
    setFirst1(event.first)
    setRows1(event.rows)
    setCurrentPage(event.page + 1)
  }

  // FOOTER TABLA
  const template1 = {
    layout:
      'PrevPageLink PageLinks NextPageLink RowsPerPageDropdown CurrentPageReport',
    PrevPageLink: (options) => {
      return (
        <button
          type='button'
          className={options.className}
          onClick={options.onClick}
          disabled={options.disabled}
        >
          <span className='p-3'>Anterior</span>
          <Ripple />
        </button>
      )
    },
    NextPageLink: (options) => {
      return (
        <button
          type='button'
          className={options.className}
          onClick={options.onClick}
          disabled={options.disabled}
        >
          <span className='p-3'>Siguiente</span>
          <Ripple />
        </button>
      )
    },
    PageLinks: (options) => {
      if (
        (options.view.startPage === options.page &&
          options.view.startPage !== 0) ||
        (options.view.endPage === options.page &&
          options.page + 1 !== options.totalPages)
      ) {
        const className = classNames(options.className, { 'p-disabled': true })

        return (
          <span className={className} style={{ userSelect: 'none' }}>
            ...
          </span>
        )
      }

      return (
        <button
          type='button'
          className={options.className}
          onClick={options.onClick}
        >
          {options.page + 1}
          <Ripple />
        </button>
      )
    },
    RowsPerPageDropdown: (options) => {
      const dropdownOptions = [
        { label: 10, value: 10 },
        { label: 20, value: 20 },
        { label: 50, value: 50 },
        { label: 'Todo', value: options.totalRecords },
      ]

      return (
        <Dropdown
          value={options.value}
          options={dropdownOptions}
          onChange={options.onChange}
        />
      )
    },
  }

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setloader(false)
    }, 1000)
    return () => clearTimeout(timeout)
  }, [])

  useEffect(() => {
    initFilters1()
  }, [])

  // TEMPLATES PARA ACCCIONES DE ELIMINAR Y EDITAR
  // const actionBodyTemplate = (rowData) => {
  //   return (
  //     <div key={rowData.ID}>
  //         <Button
  //           icon="pi pi-pencil"
  //           className="p-button-rounded p-button-success mr-2" onClick={(e) => getUserById(rowData?.ID)}
  //         />
  //         <Button
  //           icon="pi pi-trash"
  //           className="p-button-rounded p-button-danger" onClick={(e) => ConfirmAlert(rowData?.idUsuarios)}
  //         />
  //     </div>
  //   );
  // };

  const actionBodyTemplate = (rowData) => {
    return (
      <div key={rowData.ID}>
        <Button
          icon='pi pi-pencil'
          className='p-button-rounded p-button-success mr-2'
          onClick={(e) => getUserLocalById(rowData?.idUsuarios)} // Call getUserById here
        />
        <Button
          icon='pi pi-trash'
          className='p-button-rounded p-button-danger'
          onClick={(e) => ConfirmAlertLocal(rowData?.idUsuarios)} // Usa ConfirmAlertLocal en lugar de deleteUser
        />
      </div>
    )
  }

  // FORMATEO DE FECHA
  const formatDate = (value) => {
    return moment.utc(value).format('yyyy/MM/DD')
  }
  // TEMPLATE PARA FECHA
  const dateBodyTemplate = (rowData) => {
    return formatDate(rowData.fecha_inicio)
  }

  //   INICIALIZAR FILTROS POR TODOS
  const initFilters1 = () => {
    setFilters1({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      fecha_inicio: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
      colonia: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
      num_empleado: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
      correos: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
      },
    })
    setGlobalFilterValue1('')
  }

  // DATOS PARA CAMBIAR EN ESPAÑOL
  locale('es')
  addLocale('es', {
    firstDayOfWeek: 1,
    dayNames: [
      'domingo',
      'lunes',
      'martes',
      'miércoles',
      'jueves',
      'viernes',
      'sábado',
    ],
    dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
    dayNamesMin: ['D', 'L', 'M', 'Mi', 'J', 'V', 'S'],
    monthNames: [
      'enero',
      'febrero',
      'marzo',
      'abril',
      'mayo',
      'junio',
      'julio',
      'agosto',
      'septiembre',
      'octubre',
      'noviembre',
      'diciembre',
    ],
    monthNamesShort: [
      'ene',
      'feb',
      'mar',
      'abr',
      'may',
      'jun',
      'jul',
      'ago',
      'sep',
      'oct',
      'nov',
      'dic',
    ],
    today: 'Hoy',
    clear: 'Limpiar',
    matchAll: 'Todo',
    apply: 'aplicar',
    matchAny: 'Coincidir con cualquiera',
    dateIs: 'Fecha',
    deteNot: 'No incluir fecha',
    removeRule: 'Remover regla',
    dateBefore: 'Fecha antes de',
    dateAfter: 'Fecha despues de',
    addRule: 'Agregar regla',
    Clear: 'Limpiar',
  })

  // BUSQUEDA HEADER, INPUT SEARCH
  const BusquedaHeader = () => {
    return (
      <div className='flex justify-content-between'>
        <Button
          type='button'
          icon='pi pi-filter-slash'
          label='Limpiar'
          className='p-button-outlined'
          onClick={clearFilter1}
        />
        <span className='p-input-icon-left'>
          <i className='pi pi-search' />
          {/* SE LE PASAN PARAMETROS DE BUSQUEDA EL VALUE Y ONCHANGE */}
          <InputText
            value={globalFilterValue1}
            onChange={onGlobalFilterChange1}
            placeholder='Busqueda'
          />
        </span>
      </div>
    )
  }

  const clearFilter1 = () => {
    initFilters1()
  }

  // FILTROS DE BUSQUEDA, POR QUE QUIERES FILTRAR
  const globalFilters = [
    'idUsuarios',
    'ID',
    'nombre',
    'apellido',
    'correo',
    'rol',
  ]

  // ONCHANGE DE BUSQUEDA SEARCH
  const onGlobalFilterChange1 = (e) => {
    const value = e.target.value
    let _filters1 = { ...filters1 }
    _filters1['global'].value = value
    setFilters1(_filters1)
    setGlobalFilterValue1(value)
  }

  const header1 = BusquedaHeader()

  // DATOS PARA COLUMNS, NOMBRE-TABLA --- NOMBRE QUE SE VE
  const rows = [
    { field: 'idUsuarios', header: 'ID' },
    // { field: "ID", header: "ID" },
    { field: 'nombre', header: 'Nombre' },
    { field: 'apellido', header: 'Apellido' },
    { field: 'correo', header: 'Correo' },
    { field: 'rolUsuario', header: 'RolUsuario' },
  ]

  return (
    <>
      <div className='table-responsivas'>
        {loader ? (
          <div className='loading'>
            <span class='loader'></span>
          </div>
        ) : (
          <div className=''>
            <div className='add-responsiva'>
              <h5>Tabla de usuarios </h5>
              <button
                className='btn btn-success btn-responsivas'
                onClick={handleShowcreate}
              >
                <GrAdd /> <p> Agregar Nuevo </p>
              </button>
            </div>
            <DataTable
              value={data}
              filterDisplay='menu'
              responsiveLayout='scroll'
              paginator
              dataKey='id'
              filters={filters1}
              paginatorTemplate={template1}
              first={first1}
              rows={rows1}
              onPage={onCustomPage1}
              scrollable
              header={header1}
              scrollHeight='600px'
              emptyMessage='Sin resultados'
              globalFilterFields={globalFilters}
              currentPageReportTemplate='Mostrando de {first} a {last} de {totalRecords}'
            >
              {/* <Column
                field="fecha"
                body={dateBodyTemplate}
                // filterElement={dateFilterTemplate}
                header="Fecha"
                dataType="date"
                exportable={false}
                style={{ minWidth: "8rem" }}
                sortable
                // filter
              ></Column> */}
              {rows.map((item, key) => {
                return (
                  <Column
                    field={item.field}
                    header={item.header}
                    sortable
                  ></Column>
                )
              })}

              <Column
                body={actionBodyTemplate}
                // header="editando"
                exportable={false}
                style={{ minWidth: '14rem' }}
              ></Column>
            </DataTable>
          </div>
        )}

        {/* MODAL CREATE */}

        <Modal show={showcreate} onHide={handleClosecreate}>
          <Modal.Header closeButton>
            <Modal.Title>Crear Usuario</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className='form-group mb-3'>
              <label>
                ID
                <input
                  className='form-control'
                  onChange={(e) => setID(e.target.value)}
                />
              </label>
            </div>
            <div className='row'>
              <div className='col mb-3'>
                <label>
                  Nombre
                  <input
                    className='form-control'
                    onChange={(e) => setNombre(e.target.value)}
                  />
                </label>
              </div>
              <div className='col mb-3'>
                <label>
                  Apellido
                  <input
                    className='form-control'
                    onChange={(e) => setApellido(e.target.value)}
                  />
                </label>
              </div>
            </div>
            <div className='row'>
              <div className='col mb-3'>
                <label>
                  Correo
                  <input
                    className='form-control'
                    onChange={(e) => setCorreo(e.target.value)}
                  />
                </label>
              </div>
              <div className='col mb-3'>
                <label>
                  Contraseña
                  <input
                    className='form-control'
                    onChange={(e) => setContrasena(e.target.value)}
                  />
                </label>
              </div>
            </div>
            <div className='form-group mb-3'>
              <label>
                Rol
                <input
                  className='form-control'
                  onChange={(e) => setrolUsuario(e.target.value)}
                />
              </label>
            </div>
          </Modal.Body>

          <Modal.Footer>
            <Button variant='secondary' onClick={handleClosecreate}>
              Close
            </Button>
            <Button variant='primary' onClick={(e) => createUserLocal(id)}>
              Create
            </Button>
          </Modal.Footer>
        </Modal>

        {/* MODAL EDIT */}

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Editar Usuario</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className='row'>
              <div className='col mb-3'>
                <label>
                  Nombre
                  <input
                    disabled
                    className='form-control'
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                  />
                </label>
              </div>
              <div className='col mb-3'>
                <label>
                  Apellido
                  <input
                    disabled
                    className='form-control'
                    value={apellido}
                    onChange={(e) => setApellido(e.target.value)}
                  />
                </label>
              </div>
            </div>
            <div className='row'>
              <div className='col mb-3'>
                <label>
                  Correo
                  <input
                    disabled
                    className='form-control'
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                  />
                </label>
              </div>
              <div className='col mb-3'>
                <label>
                  Rol
                  <input
                    className='form-control'
                    value={rolUsuario}
                    onChange={(e) => setrolUsuario(e.target.value)}
                  />
                </label>
              </div>
            </div>
          </Modal.Body>

          <Modal.Footer>
            <Button variant='secondary' onClick={handleClose}>
              Close
            </Button>
            <Button variant='primary' onClick={(e) => updateRolLocaluser(id)}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
        <StatusIndicator />
      </div>
    </>
  )
}

export default TableUsers
