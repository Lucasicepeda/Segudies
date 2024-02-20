import './filters.css';

function Filters() {

return (
        <div className="Filters">
             {/* <label for="filtro-marcas">Filtrar por </label>
             <select name="filtro-marcas" id="filtro-marcas">
                 <option value="" disabled selected hidden>Marca:</option>
                 <option value="Luqstoff">Luqstoff</option>
                 <option value="Truper">Truper</option>
                 <option value="Bremen">Bremen</option>
                 <option value="Libus">Libus</option>
             </select> */}

            <form id="make_checkbox_select">
                <select name="make">
                    <option data-count="2" value="Alfa Romeo">Alfa Romeo</option>
                    <option data-count="23" value="Audi">Audi</option>
                    <option data-count="433" value="BMW">BMW</option>
                    <option data-count="45" value="Chrysler">Chrysler</option>
                    <option data-count="476" value="Citroen">Citroen</option>
                    <option data-count="78" value="Dodge">Dodge</option>
                    <option data-count="123" value="Fiat">Fiat</option>
                    <option data-count="32" value="Ford">Ford</option>
                </select>
                <input type="submit" />
            </form>
        </div>
    )

}

export default Filters;