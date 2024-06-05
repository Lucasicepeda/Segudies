import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, addDoc, coleccionFirebase } from 'firebase/firestore'
import { db } from '../../firebase/config'


function Create() {
  const [ marca, setMarca ] = useState ('')
  const [ codigo, setCodigo ] = useState ('')
  const [ categoria, setCategoria ] = useState ('')
  const [ descripcion, setDescripcion ] = useState ('')
  const [ titulo, setTitulo ] = useState ('')
  // const [ images, setImages ] = useState ([])
  const navigate = useNavigate()


  const productsColeccion = collection(db, coleccionFirebase )

  const store = async (e) => {
    e.preventDefault()
    await addDoc( productsColeccion, { marca: marca, codigo: codigo, categoria: categoria, descripcion: descripcion, titulo: titulo} )
    navigate ('/admin')
  }

  return (
    <div>
      <h2>Crear producto</h2>
        <form className='form-create' onSubmit={store}>
          <div className="form-item">
              <label className='label'>Marca</label>
            <input 
              value={marca}
              onChange={ (e)=> setMarca(e.target.value)}
              type="text"
              className='form-control'
            />
          </div>
          <div className="form-item">
            <label className='label'>Codigo</label>
            <input 
              value={codigo}
              onChange={ (e)=> setCodigo(e.target.value)}
              type="text"
              className='form-control'
            />
          </div>
          <div className="form-item">
            <label className='label'>Categoria</label>
            <input 
              value={categoria}
              onChange={ (e)=> setCategoria(e.target.value)}
              type="text"
              className='form-control'
            />
          </div>
          <div className="form-item">
            <label className='label'>Descripcion</label>
            <input 
              value={descripcion}
              onChange={ (e)=> setDescripcion(e.target.value)}
              type="text"
              className='form-control'
            />
          </div>
          <div className="form-item">
            <label className='label'>Titulo</label>
            <input 
              value={titulo}
              onChange={ (e)=> setTitulo(e.target.value)}
              type="text"
              className='form-control'
            />
          </div>
          <button type='submit' className='btn-submit'>Enviar</button>
        </form>
    </div>
  )
}

export default Create