import React, { useEffect, useState } from "react";
import Layoutadmin from "layouts/LayoutAdmin";
import axios from "axios";

function Ventas() {
  const uri = "https://backendcompraequi.herokuapp.com/ventas";
  const [data, setData] = useState({
    id_venta: "",
    fecha_compra: "",
    cantidad: "",
    valor_compra: "",
    articulo: "",
    vendedor: "",
    comprador: "",
    id_comprador: "",
  });
  const onChangeInput = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const [filas, setFilas] = useState([]);
  const [filaParaEditar, setFilaParaEditar] = useState({
    isEditing: false,
    id: "",
  });
  const onSubmitForm = async (e) => {
    e.preventDefault();
    await axios
      .post(uri, data)
      .then(({ data }) => setFilas(data))
      .finally(() => alert("Venta agregada exitosamente"))
      .catch((e) => console.error(e));
    setData({
      id_venta: "",
      fecha_compra: "",
      cantidad: "",
      valor_compra: "",
      articulo: "",
      vendedor: "",
      comprador: "",
      id_comprador: "",
    });
  };
  const handleEliminarFila = async (id) => {
    await axios
      .delete(uri, { data: { _id: id } })
      .then(({ data }) => setFilas(data))
      .finally(() => alert("Venta eliminada exitosamente"))
      .catch((e) => console.error(e));
  };
  const handleEditarFila = (id) => {
    setFilaParaEditar({ ...filaParaEditar, isEditing: true, id: id });
    const buscarFila = filas.find((fila) => fila._id === id);
    setData({
      id_venta: buscarFila.id_venta,
      fecha_compra: buscarFila.fecha_compra,
      cantidad: buscarFila.cantidad,
      valor_compra: buscarFila.valor_compra,
      articulo: buscarFila.articulo,
      vendedor: buscarFila.vendedor,
      comprador: buscarFila.comprador,
      id_comprador: buscarFila.id_comprador,
    });
  };
  const onActualizarVenta = async (e) => {
    e.preventDefault();
    await axios
      .put(uri + `/${filaParaEditar.id}`, {
        id_venta: data.id_venta,
        fecha_compra: data.fecha_compra,
        cantidad: data.cantidad,
        valor_compra: data.valor_compra,
        articulo: data.articulo,
        vendedor: data.vendedor,
        comprador: data.comprador,
        id_comprador: data.id_comprador,
      })
      .then(({ data }) => setFilas(data))
      .finally(() => alert("Venta actualizada exitosamente"))
      .catch((e) => console.error(e));
    setFilaParaEditar({ ...filaParaEditar, isEditing: false, id: "" });
    setData({
      id_venta: "",
      fecha_compra: "",
      cantidad: "",
      valor_compra: "",
      articulo: "",
      vendedor: "",
      comprador: "",
      id_comprador: "",
    });
  };
  const [buscar, setBuscar] = useState("");
  const fetchData = async () => {
    await axios.get(uri).then(({ data }) => setFilas(data));
  };
  useEffect(() => {
    fetchData();
  }, []);
  //console.log(filas);
  return (
    <Layoutadmin>
      <form
        className="registro_ventas"
        onSubmit={(e) => {
          !filaParaEditar.isEditing ? onSubmitForm(e) : onActualizarVenta(e);
        }}
      >
        <h4> REGISTRO DE VENTAS</h4>
        <p>POR FAVOR INGRESE LA INFORMACION DE LA VENTA</p>
        <input
          onChange={(e) => onChangeInput(e)}
          className="informacion"
          type="text"
          name="id_venta"
          id="id_venta"
          placeholder="Ingrese el ID de la venta"
          value={data.id_venta}
          required
        />
        <input
          onChange={(e) => onChangeInput(e)}
          className="informacion"
          type="datetime-local"
          name="fecha_compra"
          id="fecha_compra"
          placeholder="Ingrese la fecha de la compra"
          value={data.fecha_compra}
          required
        />
        <input
          onChange={(e) => onChangeInput(e)}
          className="informacion"
          type="text"
          name="cantidad"
          id="cantidad"
          placeholder="Ingrese la cantidad de producto a vender"
          value={data.cantidad}
          required
        />
        <input
          onChange={(e) => onChangeInput(e)}
          className="informacion"
          type="text"
          name="valor_compra"
          id="valor_compra"
          placeholder="Ingrese el valor de la compta"
          value={data.valor_compra}
          required
        />
        <input
          onChange={(e) => onChangeInput(e)}
          className="informacion"
          type="text"
          name="articulo"
          id="articulo"
          placeholder="Ingrese el articulo a vender"
          value={data.articulo}
          required
        />
        <input
          onChange={(e) => onChangeInput(e)}
          className="informacion"
          type="text"
          name="vendedor"
          id="vendedor"
          placeholder="Ingrese el nombre del vendedor"
          value={data.vendedor}
          required
        />
        <input
          onChange={(e) => onChangeInput(e)}
          className="informacion"
          type="text"
          name="comprador"
          id="comprador"
          placeholder="Ingrese el nombre del comprador"
          value={data.comprador}
          required
        />
        <input
          onChange={(e) => onChangeInput(e)}
          className="informacion"
          type="text"
          name="id_comprador"
          id="id_comprador"
          placeholder="Ingrese el ID del comprador"
          value={data.id_comprador}
          required
        />
        
        <button type="submit">
          {" "}
          {!filaParaEditar.isEditing
            ? "Registrar venta"
            : "Actualizar venta"}{" "}
        </button>
      </form>
      <section className="tabla_ventas" id="pr">
        <table className="tabla_de_productos">
          <thead>
            <tr>
              <th>ID venta</th>
              <th>Fecha de compra</th>
              <th>Cantidad de elementos</th>
              <th>Valor de la compra</th>
              <th>Articulo comprado</th>
              <th>Vendedor</th>
              <th>Comprador</th>
              <th>ID comprador</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {filas
              .filter((fila) =>
                JSON.stringify(fila)
                  .toLowerCase()
                  .includes(buscar.toLowerCase())
              )
              .map((fila) => (
                <tr key={fila.id}>
                  <td>{fila.id_venta}</td>
                  <td>{fila.fecha_compra}</td>
                  <td>{fila.cantidad}</td>
                  <td>$-{fila.valor_compra}</td>
                  <td>{fila.articulo}</td>
                  <td>{fila.vendedor}</td>
                  <td>{fila.comprador}</td>
                  <td>{fila.id_comprador}</td>
                  <td style={{ display: "flex" }}>
                    <button
                      className="borrar"
                      onClick={() => handleEliminarFila(fila._id)}
                    >
                      <i className="fa fa-close"></i>
                    </button>
                    <button
                      style={{ marginLeft: "2px" }}
                      className="Editar"
                      onClick={() => handleEditarFila(fila._id)}
                    >
                      <i className="fa fa-edit"></i>
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <form>
          <input
            onChange={(e) => setBuscar(e.target.value)}
            value={buscar}
            type="text"
            name="producto_buscar"
            id="producto_buscar"
            class="buscar"
            placeholder="Ingrese el ID de Venta, el nombre del cliente o el ID del cliente"
          />
        </form>
      </section>
    </Layoutadmin>
  );
}

export default Ventas;
