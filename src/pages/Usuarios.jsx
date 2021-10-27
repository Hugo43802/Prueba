import React, { useEffect, useState } from "react";
import Layoutadmin from "layouts/LayoutAdmin";
import axios from "axios";

function Usuarios() {
  const uri = "https://backendcompraequi.herokuapp.com/users";
  const [data, setData] = useState({
    nombre_usuario: "",
    nombre: "",
    apellido: "",
    identificacion: "",
    telefono: "",
    direccion: "",
    correo: "",
    rol: "",
    estado: "",
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
      .finally(() => alert("Usuario agregado exitosamente"))
      .catch((e) => console.error(e));
    setData({
      nombre_usuario: "",
      nombre: "",
      apellido: "",
      identificacion: "",
      telefono: "",
      direccion: "",
      correo: "",
      rol: "",
      estado: "",
    });
  };
  const handleEliminarFila = async (id) => {
    await axios
      .delete(uri, { data: { _id: id } })
      .then(({ data }) => setFilas(data))
      .finally(() => alert("Usuario eliminado exitosamente"))
      .catch((e) => console.error(e));
  };
  const handleEditarFila = (id) => {
    setFilaParaEditar({ ...filaParaEditar, isEditing: true, id: id });
    const buscarFila = filas.find((fila) => fila._id === id);
    setData({
      nombre_usuario: buscarFila.nombre_usuario,
      nombre: buscarFila.nombre,
      apellido: buscarFila.apellido,
      identificacion: buscarFila.identificacion,
      telefono: buscarFila.telefono,
      direccion: buscarFila.direccion,
      correo: buscarFila.correo,
      rol: buscarFila.rol,
      estado: buscarFila.estado,
    });
  };
  const onActualizarVenta = async (e) => {
    e.preventDefault();
    await axios
      .put(uri + `/${filaParaEditar.id}`, {
        nombre_usuario: data.nombre_usuario,
        nombre: data.nombre,
        apellido: data.apellido,
        identificacion: data.identificacion,
        telefono: data.telefono,
        direccion: data.direccion,
        correo: data.correo,
        rol: data.rol,
        estado: data.estado,
      })
      .then(({ data }) => setFilas(data))
      .finally(() => alert("Usuario actualizado exitosamente"))
      .catch((e) => console.error(e));
    setFilaParaEditar({ ...filaParaEditar, isEditing: false, id: "" });
    setData({
      nombre_usuario: "",
      nombre: "",
      apellido: "",
      identificacion: "",
      telefono: "",
      direccion: "",
      correo: "",
      rol: "",
      estado: "",
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
        className="registro_usuarios"
        onSubmit={(e) => {
          !filaParaEditar.isEditing ? onSubmitForm(e) : onActualizarVenta(e);
        }}
      >
        <h4> REGISTRO DE USUARIOS</h4>
        <p>POR FAVOR INGRESE LA INFORMACION DEL USUARIO A REGISTRAR</p>
        <input
          onChange={(e) => onChangeInput(e)}
          className="informacion"
          type="text"
          name="nombre_usuario"
          id="nombre_usuario"
          placeholder="Ingrese el nombre de usuario"
          value={data.nombre_usuario}
          required
        />
        <input
          onChange={(e) => onChangeInput(e)}
          className="informacion"
          type="text"
          name="nombre"
          id="nombre"
          placeholder="Ingrese el nombre"
          value={data.nombre}
          required
        />
        <input
          onChange={(e) => onChangeInput(e)}
          className="informacion"
          type="text"
          name="apellido"
          id="apellido"
          placeholder="Ingrese el apellido"
          value={data.apellido}
          required
        />
        <input
          onChange={(e) => onChangeInput(e)}
          className="informacion"
          type="text"
          name="identificacion"
          id="identificacion"
          placeholder="Ingrese el numero de identificacion"
          value={data.identificacion}
          required
        />
        <input
          onChange={(e) => onChangeInput(e)}
          className="informacion"
          type="text"
          name="telefono"
          id="telefono"
          placeholder="Ingrese el telefono"
          value={data.telefono}
          required
        />
        <input
          onChange={(e) => onChangeInput(e)}
          className="informacion"
          type="text"
          name="direccion"
          id="direccion"
          placeholder="Ingrese la direccion"
          value={data.direccion}
          required
        />
        <input
          onChange={(e) => onChangeInput(e)}
          className="informacion"
          type="text"
          name="correo"
          id="correo"
          placeholder="Ingrese el correo electronico"
          value={data.correo}
          required
        />
        {/* <label className="titulo_select" htmlFor="rol">
          Seleccione el rol
        </label> */}
        <select
          id="rol"
          className="informacion_select"
          name="rol"
          value={data.rol}
          onChange={(e) => onChangeInput(e)}
        >
          <option value="Seleccion_rol">Seleccione el Rol</option>
          <option value="Administrador">Administrador</option>
          <option value="Vendedor">Vendedor</option>
        </select>
        {/* <label className="titulo_select" htmlFor="estado">Seleccion el estado</label> */}
        <select
          id="estado"
          className="informacion_select"
          name="estado"
          value={data.estado}
          onChange={(e) => onChangeInput(e)}
        >
          <option value="Seleccion_estado">Seleccione el Estado</option>
          <option value="Activo">Activo</option>
          <option value="Inactivo">Inactivo</option>
        </select>

        <button type="submit">
          {" "}
          {!filaParaEditar.isEditing
            ? "Registrar usuario"
            : "Actualizar usuario"}{" "}
        </button>
      </form>
      <section className="tabla_usuarios" id="tabla_usuarios">
        <table className="tabla_de_usuarios" id="id_tabla_usuarios">
          <thead>
            <tr>
              <th>Nombre de usuario</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Identificación</th>
              <th>Telefono</th>
              <th>Direccion</th>
              <th>Correo electronico</th>
              <th>Rol</th>
              <th>Estado</th>
              <th>Acciones</th>
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
                  <td>{fila.nombre_usuario}</td>
                  <td>{fila.nombre}</td>
                  <td>{fila.apellido}</td>
                  <td>{fila.identificacion}</td>
                  <td>{fila.telefono}</td>
                  <td>{fila.direccion}</td>
                  <td>{fila.correo}</td>
                  <td>{fila.rol}</td>
                  <td>{fila.estado}</td>
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
            placeholder="Ingrese el nombre, telefono, direccion o correo a buscar"
          />
        </form>
      </section>
    </Layoutadmin>
  );
}

export default Usuarios;
