import { useEffect, useState } from "react"
import ItemDetail from "./ItemDetail";
import { Link, useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import atrasBtn from "../../assets/atrasBtn.svg"


const ItemDetailContainer = () => {

    const [item, setItem] = useState(null);
    const id = useParams().id;

    useEffect(() => {

      const docRef = doc(db, "productsListPrueba", id);
      getDoc(docRef)
        .then((resp) => {
          setItem(
            { ...resp.data(), id: resp.id }
          );
        })

    }, [id])
    
  return (
    <div>
        <Link to="/"><img className="atras-btn" src={atrasBtn} alt="atras"/></Link>    
        {item && <ItemDetail item={item} />}
    </div>
  )
}

export default ItemDetailContainer