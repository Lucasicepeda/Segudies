// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate, useParams } from 'react-router-dom';
// import { collection, doc, getDoc, updateDoc } from 'firebase/firestore';
// import { db, coleccionFirebase, storage } from '../../firebase/config';
// import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
// import atrasBtn from "../../assets/atrasBtn.svg"
// import "./admin.css";

// function Edit() {
//   const { id } = useParams();
//   const [formData, setFormData] = useState({
//     marca: '',
//     codigo: '',
//     categoria: '',
//     descripcion: '',
//     titulo: '',
//     medida: '',
//     medidas: [],
//     imagenes: [],
//     iva: '',
//     largo: '',
//     largos: [],
//     material: '',
//     unidxcaja: '',
//     images: []
//   });
//   const [isInitialDataLoaded, setIsInitialDataLoaded] = useState(false);

//   const navigate = useNavigate();
//   const productsColeccion = collection(db, coleccionFirebase);

//   useEffect(() => {
//     const fetchProduct = async () => {
//       const docRef = doc(productsColeccion, id);
//       const docSnap = await getDoc(docRef);
//       if (docSnap.exists()) {
//         const data = docSnap.data();
//         if (!isInitialDataLoaded) { // Condición añadida aquí
//           setFormData((prevFormData) => ({
//             ...prevFormData,
//             ...data,
//             medidas: data.medidas || [],
//             largos: data.largos || [],
//             imagenes: [],  // Reset the images array to handle new uploads
//             medida: '',
//             largo: ''
//           }));
//           setIsInitialDataLoaded(true);
//         }
//       } else {
//         console.log("No such document!");
//       }
//     };
//     fetchProduct();
//   }, [id, productsColeccion, isInitialDataLoaded]); // Agregué isInitialDataLoaded a la dependencia

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     const newValue = (name === 'marca' || name === 'titulo') ? value.toUpperCase() : value;
//     setFormData((prevFormData) => ({ ...prevFormData, [name]: newValue }));
//   };

//   const handleImageChange = (e) => {
//     const files = Array.from(e.target.files);
//     setFormData((prevFormData) => ({ ...prevFormData, imagenes: files }));
//   };

//   const store = async (e) => {
//     e.preventDefault();
//     const { imagenes, medidas, largos, medida, largo, ...productData } = formData;

//     const imageUrls = await Promise.all(
//       imagenes.map(async (imagen) => {
//         const imageRef = ref(storage, `images/${imagen.name}`);
//         await uploadBytes(imageRef, imagen);
//         return getDownloadURL(imageRef);
//       })
//     );

//     const updatedProductData = { 
//       ...productData,
//       medidas,
//       largos,
//       images: [...formData.images, ...imageUrls]
//     };

//     const docRef = doc(productsColeccion, id);
//     await updateDoc(docRef, updatedProductData);

//     navigate('/admin');
//   };

//   const addMedida = (e) => {
//     e.preventDefault();
//     if (formData.medida.trim() !== '') {
//       setFormData((prevFormData) => ({
//         ...prevFormData,
//         medidas: [...prevFormData.medidas, formData.medida],
//         medida: ''
//       }));
//     }
//   };

//   const removeMedida = (index) => {
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       medidas: prevFormData.medidas.filter((_, i) => i !== index)
//     }));
//   };

//   const addLargo = (e) => {
//     e.preventDefault();
//     if (formData.largo.trim() !== '') {
//       setFormData((prevFormData) => ({
//         ...prevFormData,
//         largos: [...prevFormData.largos, formData.largo],
//         largo: ''
//       }));
//     }
//   };

//   const removeLargo = (index) => {
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       largos: prevFormData.largos.filter((_, i) => i !== index)
//     }));
//   };

//   const renderInput = (label, name, type = "text") => (
//     <div className="form-item">
//       <label className='label'>{label}</label>
//       <input 
//         name={name}
//         value={formData[name]}
//         onChange={handleInputChange}
//         type={type}
//         className='form-control'
//       />
//     </div>
//   );

//   if (!isInitialDataLoaded) {
//     return <div>Cargando...</div>;
//   }

//   return (
//     <div>
//       <Link to="/admin"><img className="atras-btn" src={atrasBtn} alt="atras"/></Link>
//       <h2 className='create-product'>Editar producto</h2>
//       <form className='form-create' onSubmit={store}>
//         {renderInput("Titulo", "titulo")}
//         {renderInput("Marca", "marca")}
//         {renderInput("Descripcion", "descripcion")}
//         {renderInput("Categoria", "categoria")}
//         {renderInput("Codigo", "codigo")}
//         {renderInput("IVA", "iva")}
//         {renderInput("Unidades x Caja", "unidxcaja")}
//         {renderInput("Material", "material")}
//         <div className="form-item">
//           <label className='label'>Medidas</label>
//           <input 
//             name="medida"
//             value={formData.medida}
//             onChange={handleInputChange}
//             type="text"
//             className='form-control'
//           />
//           <button onClick={addMedida} className='btn-Add'>Agregar Medida</button>
//         </div>
//         <div className="form-item">
//           <label className='label'>Medidas: </label>
//           <ul>
//             {formData.medidas.map((op, index) => (
//               <li key={index}>
//                 {op}
//                 <button onClick={() => removeMedida(index)} className='btn-remove'>Eliminar</button>
//               </li>
//             ))}
//           </ul>
//         </div>
//         <div className="form-item">
//           <label className='label'>Largo</label>
//           <input 
//             name="largo"
//             value={formData.largo}
//             onChange={handleInputChange}
//             type="text"
//             className='form-control'
//           />
//           <button onClick={addLargo} className='btn-Add'>Agregar Largo</button>
//         </div>
//         <div className="form-item">
//           <label className='label'>Largos:</label>
//           <ul>
//             {formData.largos.map((op, index) => (
//               <li key={index}>
//                 {op}
//                 <button onClick={() => removeLargo(index)} className='btn-remove'>Eliminar</button>
//               </li>
//             ))}
//           </ul>
//         </div>
//         <div className="form-item">
//           <label className='label'>Imágenes</label>
//           <input 
//             type="file" 
//             multiple 
//             onChange={handleImageChange} 
//             className='form-control'
//           />
//         </div>
//         <button type='submit' className='btn-submit'>Enviar</button>
//       </form>
//     </div>
//   );
// }

// export default Edit;

import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db, coleccionFirebase, storage } from '../../firebase/config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import imageCompression from 'browser-image-compression';
import atrasBtn from "../../assets/atrasBtn.svg"
import "./admin.css";

function Edit() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    marca: '',
    codigo: '',
    categoria: '',
    descripcion: '',
    titulo: '',
    medida: '',
    medidas: [],
    imagenes: [],
    iva: '',
    largo: '',
    largos: [],
    material: '',
    unidxcaja: '',
    images: []
  });
  const [isInitialDataLoaded, setIsInitialDataLoaded] = useState(false);

  const navigate = useNavigate();
  const productsColeccion = collection(db, coleccionFirebase);

  useEffect(() => {
    const fetchProduct = async () => {
      const docRef = doc(productsColeccion, id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (!isInitialDataLoaded) { // Condición añadida aquí
          setFormData((prevFormData) => ({
            ...prevFormData,
            ...data,
            medidas: data.medidas || [],
            largos: data.largos || [],
            imagenes: [],  // Reset the images array to handle new uploads
            medida: '',
            largo: ''
          }));
          setIsInitialDataLoaded(true);
        }
      } else {
        console.log("No such document!");
      }
    };
    fetchProduct();
  }, [id, productsColeccion, isInitialDataLoaded]); // Agregué isInitialDataLoaded a la dependencia

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newValue = (name === 'marca' || name === 'titulo') ? value.toUpperCase() : value;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: newValue }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prevFormData) => ({ ...prevFormData, imagenes: files }));
  };

  const compressImage = async (imageFile) => {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 800,
      useWebWorker: true
    };
    try {
      const compressedFile = await imageCompression(imageFile, options);
      return compressedFile;
    } catch (error) {
      console.error('Error compressing image:', error);
    }
  };

  const store = async (e) => {
    e.preventDefault();
    const { imagenes, medidas, largos, medida, largo, ...productData } = formData;

    const compressedImages = await Promise.all(
      imagenes.map((imagen) => compressImage(imagen))
    );

    const imageUrls = await Promise.all(
      compressedImages.map(async (imagen) => {
        const imageRef = ref(storage, `images/${imagen.name}`);
        await uploadBytes(imageRef, imagen);
        return getDownloadURL(imageRef);
      })
    );

    const updatedProductData = { 
      ...productData,
      medidas,
      largos,
      images: [...formData.images, ...imageUrls]
    };

    const docRef = doc(productsColeccion, id);
    await updateDoc(docRef, updatedProductData);

    navigate('/admin');
  };

  const addMedida = (e) => {
    e.preventDefault();
    if (formData.medida.trim() !== '') {
      setFormData((prevFormData) => ({
        ...prevFormData,
        medidas: [...prevFormData.medidas, formData.medida],
        medida: ''
      }));
    }
  };

  const removeMedida = (index) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      medidas: prevFormData.medidas.filter((_, i) => i !== index)
    }));
  };

  const addLargo = (e) => {
    e.preventDefault();
    if (formData.largo.trim() !== '') {
      setFormData((prevFormData) => ({
        ...prevFormData,
        largos: [...prevFormData.largos, formData.largo],
        largo: ''
      }));
    }
  };

  const removeLargo = (index) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      largos: prevFormData.largos.filter((_, i) => i !== index)
    }));
  };

  const renderInput = (label, name, type = "text") => (
    <div className="form-item">
      <label className='label'>{label}</label>
      <input 
        name={name}
        value={formData[name]}
        onChange={handleInputChange}
        type={type}
        className='form-control'
      />
    </div>
  );

  if (!isInitialDataLoaded) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <Link to="/admin"><img className="atras-btn" src={atrasBtn} alt="atras"/></Link>
      <h2 className='create-product'>Editar producto</h2>
      <form className='form-create' onSubmit={store}>
        {renderInput("Titulo", "titulo")}
        {renderInput("Marca", "marca")}
        {renderInput("Descripcion", "descripcion")}
        {renderInput("Categoria", "categoria")}
        {renderInput("Codigo", "codigo")}
        {renderInput("IVA", "iva")}
        {renderInput("Unidades x Caja", "unidxcaja")}
        {renderInput("Material", "material")}
        <div className="form-item">
          <label className='label'>Medidas</label>
          <input 
            name="medida"
            value={formData.medida}
            onChange={handleInputChange}
            type="text"
            className='form-control'
          />
          <button onClick={addMedida} className='btn-Add'>Agregar Medida</button>
        </div>
        <div className="form-item">
          <label className='label'>Medidas: </label>
          <ul>
            {formData.medidas.map((op, index) => (
              <li key={index}>
                {op}
                <button onClick={() => removeMedida(index)} className='btn-remove'>Eliminar</button>
              </li>
            ))}
          </ul>
        </div>
        <div className="form-item">
          <label className='label'>Largo</label>
          <input 
            name="largo"
            value={formData.largo}
            onChange={handleInputChange}
            type="text"
            className='form-control'
          />
          <button onClick={addLargo} className='btn-Add'>Agregar Largo</button>
        </div>
        <div className="form-item">
          <label className='label'>Largos:</label>
          <ul>
            {formData.largos.map((op, index) => (
              <li key={index}>
                {op}
                <button onClick={() => removeLargo(index)} className='btn-remove'>Eliminar</button>
              </li>
            ))}
          </ul>
        </div>
        <div className="form-item">
          <label className='label'>Imágenes</label>
          <input 
            type="file" 
            multiple 
            onChange={handleImageChange} 
            className='form-control'
          />
        </div>
        <button type='submit' className='btn-submit'>Enviar</button>
      </form>
    </div>
  );
}

export default Edit;
