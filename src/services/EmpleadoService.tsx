//va a contener todos las funciones y métodos relacionados con la comunicación de la API, aquí vamos a crear 5 métodos para tener un ABM completo
import { ChangeEvent, useEffect, useState } from "react";
import Form from "./Form";

export default function Table() {


// const BASE_URL = 'http://localhost:10000/api/v1/empleados';
const [formVisible, setFormVisible] = useState(false)
  const [guardando, setGuardando] = useState(false)
  const [texto, setTexto] = useState('')
  const [token, setToken] = useState('')
  const [mode, setMode] = useState('new')

  enum Rol {
    Administrador = 'Administrador',
    Cajero = 'Cajero',
    Delivery = 'Delivery',
    Cliente = 'Cliente',
    Cocinero = 'Cocinero',
}

  type Empleado = {
    id: number;
    nombre: string;
    apellido: string;
    rol: Rol;
    email: string;
    telefono: string;
    localidad: string;
    calle: string;
    numero: number;
    claveProvisoria: string;
  }

  const [empleado, setEmpleado] = useState<Empleado>({
    id: 0,
    nombre: '',
    apellido: '',
    rol: Rol.Cajero,
    email: '',
    telefono: '',
    localidad: '',
    calle: '',
    numero: 0,
    claveProvisoria: ''
  })

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === 'id' || name === 'numero') {
      if (parseInt(value) >= 0) {
        setEmpleado({
          ...empleado,
          [name]: parseInt(value),
        });
      }
      
    } else {
      setEmpleado({
        ...empleado,
        [name]: value,
      });
    }
  };
    

    const [data, setData] = useState<Empleado[]>([])

      useEffect(() => {
        fetch("http://localhost:10000/auth/login", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "username": "paulaf",
            "password": "sincodigos"
          })
        })
        .then((res) => res.json())
        .then((res) => {
          localStorage.setItem('token', res.token)
          setToken(res.token)
    
          fetch("http://localhost:10000/api/v1/empleados/listaEmpleados",
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
          })
          .then(res => res.json())
          .then(res => setData(res))
        })

      }, [])

    // Crear un nuevo empleado
  
    function postEmpleado() {
      setGuardando(true)
      fetch("http://localhost:10000/api/v1/empleados/registerEmpleado", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(empleado)
      })
      .then(() => {
        setGuardando(false)
        setTexto('Guardado')
      })
    }

    function putEmpleado() {
      setGuardando(true)
      fetch("http://localhost:10000/api/v1/empleados/modifyEmpleado", {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(empleado)
      })
      .then(() => {
        setGuardando(false)
        setTexto('Guardado')
      })
    }

    function deleteEmpleado(id) {
      const parsedId = parseInt(id, 10); // Intenta convertir `id` a un número
      if (isNaN(parsedId)) {
        console.error('El ID no es un número válido:', id);
        return;
      }
    
      setGuardando(true);
      fetch(`http://localhost:10000/api/v1/empleados/deleteEmpleado/${parsedId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(empleado)
      })
      .then(() => {
        setGuardando(false);
        setTexto('Eliminado');
      });
    }
    
  
    function handleEdit(empleado: Empleado) {
      setEmpleado(empleado)
    }

  return(
    <>
    <div className="button-containerH4" style={{alignItems:'center', width:'100%', display:'flex'}}>
          <button className="buttonH4_2" style={{width:'100%', height:'100px', borderTop:'none', borderLeft:'none' }}> <h3>Empleados</h3></button>
          <button className="buttonH4_2" style={{width:'100%', height:'100px', borderTop:'none', borderLeft:'none', borderRight:'none' }} ><h3>Clientes</h3></button>
        </div>
    <div className='flex flex-row justify-between items-center px-10 py-4'>
        <div className='flex flex-row' style={{marginLeft:'20px'}}>
          <button 
          style={{backgroundColor:'rgb(88, 195, 80)', borderRadius:'15px', border:'none', padding:'5px 10px'}}
          onClick={() => setFormVisible(true)}>
            Nuevo
          </button>
        </div>
        {/* <div className='flex flex-row gap-2'>
          <input className='border-[1px] border-gray-400 rounded-md shadow-md shadow-gray-400' type="text" />
          <img className='object-contain' src='/lupa.png' width={20} height={20}/>
        </div> */}
    </div>
    <div className='px-10 w-screen'>
      <table className='w-full' style={{width:'100%', textAlign:'center', padding:'8px', borderRadius:'5px', marginBottom:'99px'}}>
        <thead className='w-full bg-gray-300'>
          <tr style={{backgroundColor:'rgb(198, 198, 198)'}}>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Email</th>
            <th>Telefono</th>
            <th>Calle</th>
            <th>Numero</th>
            <th>Localidad</th>
            <th>Rol</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody className='w-full'>
          {
            data.length > 0 ? 
            data.map((empleado) => {
              return (
                <tr key={empleado.id} className='w-full'>
                  <td className='text-center'>{empleado.nombre}</td>
                  <td className='text-center'>{empleado.apellido}</td>
                  <td className='text-center'>{empleado.email}</td>
                  <td className='text-center'>{empleado.telefono}</td>
                  <td className='text-center'>{empleado.calle}</td>
                  <td className='text-center'>{empleado.numero}</td>
                  <td className='text-center'>{empleado.localidad}</td>
                  <td className='text-center'>{empleado.rol}</td>
                  <td className='text-center'>
                    <button 
                    onClick={() => {
                      handleEdit(empleado)
                      setFormVisible(true)
                      setMode('edit')
                    }}
                    className='bg-yellow-300 rounded-lg shadow-md shadow-gray-400 px-2 py-1 hover:shadow-white font-semibold'
                    style={{marginRight:'15px', backgroundColor:'black', color:'white'}}>
                      Editar
                    </button>
                    <button 
                    onClick={() => {
                      deleteEmpleado(empleado.id) 
                    }}
                    className='bg-yellow-300 rounded-lg shadow-md shadow-gray-400 px-2 py-1 hover:shadow-white font-semibold'
                    style={{backgroundColor:'black', color:'white'}}>
                      Eliminar
                    </button>
                  </td>

                </tr>
              )
            })
            : <tr><td className='text-center' colSpan={10}>Cargando...</td></tr>
          }
        </tbody>
      </table>
    </div>
    {setFormVisible && (
      <Form 
      formVisible={setFormVisible}
      empleado={empleado}
      handleInputChange={handleInputChange}
      mode={mode}
      postEmpleado={postEmpleado}
      putEmpleado={putEmpleado}
      deleteEmpleado={deleteEmpleado}
      guardando={guardando}
      texto={texto}
      />
    )}
    </>
  )
}