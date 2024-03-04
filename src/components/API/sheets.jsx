
export function Sheets() {

    let productos;

    return (


        async function getProductos() {
            let response;
            try {
                response = await gapi.client.sheets.spreadsheets.values.get({
                    spreadsheetId: '1PjlBRfdwQmTLgTZCes1evkAWpJL7pvm8CYdxAz6A5J0',
                    range: 'Majors!A:G',
                });
            } catch (err) {
                console.error(err)
                return;
            }
            const range = response.result;
            if (!range || !range.values || range.values.length == 0) {
                console.warn("No se encontraron valores")
                return;
            }

            productos = [];
            range.values.forEach((fila) => {
                if (isNaN(parseInt(fila[0])))
                    return;
                const nuevoProducto = {
                    id: fila[0],
                    cliente: fila[1],
                    email: fila[2],
                    modelo: fila[3],
                    problema: fila[4],
                    fecha_terminado: fila[5],
                    extracurricular: fila[6]
                };
                productos.push(nuevoProducto);

            });
            console.log(productos)
        }
    )

}
export default Sheets;