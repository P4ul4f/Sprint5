export default function Form({setFormVisible, guardando, texto, mode, empleado, handleInputChange, postEmpleado, putEmpleado}: any) {
    const getHeaderText = () => {
      return mode === 'edit' ? 'Editar empleado' : 'Crear empleado';
    }
    
  return (
        <>
        <div style={{maxWidth:'600px', margin:'0 auto'}}>
        <div style={{paddingBottom:'10px'}}>
          <h3>{getHeaderText()}</h3>
        </div>
        <div>
          <form className="row g-3">
              <div className='col-md-6'>
                <label htmlFor='nombre' className='form-label'>Nombre</label>
                <input  
                type="text" 
                name='nombre'
                className="form-control"
                value={empleado.nombre}
                onChange={handleInputChange}/>
              </div>
              <div className='col-md-6'>
                <label htmlFor='apellido' className='form-label'>Apellido</label>
                <input  
                type="text" 
                name='apellido'
                className="form-control"
                value={empleado.apellido}
                onChange={handleInputChange}/>
              </div>
              <div className='col-md-6'>
                <label htmlFor='email' className='form-label'>Email</label>
                <input 
                type="text" 
                name='email'
                className="form-control"
                value={empleado.email}
                onChange={handleInputChange}
                />
              </div>
              <div className='col-md-6'>
                <label htmlFor='telefono' className='form-label'>Telefono</label>
                <input 
                type="text" 
                name='telefono'
                className="form-control"
                value={empleado.telefono}
                onChange={handleInputChange}
                />
              </div>
              <div className='col-md-6'>
                <label htmlFor='calle' className='form-label'>Calle</label>
                <input 
                type="text" 
                className="form-control"
                name='calle'
                value={empleado.calle}
                onChange={handleInputChange}
                />
              </div>
               <div className='col-md-6'>
                <label htmlFor='numero' className='form-label'>Número</label>
                <input 
                type="number" 
                name='numero'
                className="form-control"
                value={empleado.numero === 0 ? '' : empleado.numero}
                onChange={handleInputChange}
                />
              </div>
              <div className='col-md-6'>
                <label htmlFor='localidad' className='form-label'>Localidad</label>
                <input 
                type="text" 
                name='localidad'
                className="form-control"
                value={empleado.localidad}
                onChange={handleInputChange}
                />
              </div>
              <div className='col-md-6'>
                <label htmlFor='claveProvisoria' className='form-label'>Clave provisoria</label>
                <input
                type="text" 
                name='claveProvisoria'
                className="form-control"
                value={empleado.claveProvisoria}
                onChange={handleInputChange}
                />
              </div>
              <div className='col-md-6'>
                <label htmlFor='rol' className='form-label'>Rol</label>
                <select 
                name='rol'
                className='form-select'
                value={empleado.rol}
                onChange={handleInputChange}>
                  <option>Administrador</option>
                  <option>Cocinero</option>
                  <option>Cajero</option>
                  <option>Delivery</option>
                </select>
              </div>
                
          </form>
          
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop:'20px'}}>
          <button 
              className="btn btn-dark"
              onClick={() => setFormVisible(false)}>
              Cerrar
          </button>
          <button
          className="btn btn-success" 
          onClick={() => {
            if (mode === 'edit') {
              putEmpleado()
            } else {
              postEmpleado()
            }
            
          }}
          style={{marginLeft:'auto'}}
          >
            Guardar
          </button>
          {
            guardando ? (
              <p>
                Guardando...
              </p>
            ) : (
              <p>{texto}</p>
            )
          }
        </div>
      </div>
      </>
  )
}
