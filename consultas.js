const { pool } = require("./connection");

const getDate = async () => {
  const result = await pool.query("SELECT NOW()");
  return result.rows[0].now;
  // console.log(result);
};

const agregarCliente = async (nombre, email) => {
  const consulta = "INSERT INTO clientes values (DEFAULT, $1, $2)";
  const values = [nombre, email];
  const result = await pool.query(consulta, values);
  // console.log("Cliente agregado");
};

// agregarCliente("nombre1", "correo1@email.com");

const obtenerClientes = async () => {
  const { rows } = await pool.query("SELECT * FROM clientes");
  // console.log(rows);
  return rows;
};


const modificarCliente = async (id, nombre, email) => {
  const consulta = "UPDATE clientes SET nombre = $1, email = $2 WHERE id = $3 RETURNING *";
  const values = [nombre, email, id];
  const result = await pool.query(consulta, values);
  if(result.rowCount === 0){
    throw { code: 404, message: "No se consiguió ningún cliente con este id" };
  }
  // console.log(result);
};

const eliminarCliente = async (id) => {
  const result = await pool.query("DELETE FROM clientes WHERE id = $1", [id]);
  if (result.rowCount === 0) {
    throw { code: 404, message: "No se consiguió ningún cliente con este id" };
  }
};

const obtenerClientesPorId = async (id) => {
  const result = await pool.query("SELECT * FROM clientes WHERE id = $1", [id]);
  const data = [result.rows[0]];
  if(result.rowCount === 0){
    throw { code: 404, message: "No se consiguió ningún cliente con este id" };
  }
  return data;
};

module.exports = { agregarCliente, obtenerClientes, getDate, modificarCliente, eliminarCliente, obtenerClientesPorId };
