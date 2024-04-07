import './banner.css';

export function Banner() {
    return (
        <div className="banner">
            <div className="left">
                <div className="texts">
                    <h3>Tu seguridad y éxito son nuestro prioridad</h3>
                    <h5>Descubre nuestro catálogo de productos especializados y confiá en nuestra experiencia en distribucion de seguridad industrial, maquinas y herramientas.</h5>
                </div>
                <div className="buttons">
                    <button className='catalogoBtn'>
                        <a href="/catalogo">Ver catálogo</a>
                    </button>
                    <button className='destacadosBtn'>
                        <a href="/catalogo">Destacados</a>
                    </button>
                </div>
            </div>
            <div className="right">
                <img src="../src/assets/lusqtoff-AMOLADORA.png" alt="" />
            </div>
        </div>
    )
}