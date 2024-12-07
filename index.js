const {
  agregarCliente,
  obtenerClientes,
  getDate,
  modificarCliente,
  eliminarCliente,
  obtenerClientesPorId,
} = require("./consultas");
const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

app.post("/viajes", async (req, res) => {
  try {
    const { destino, presupuesto } = req.body;
    await agregarViaje(destino, presupuesto);
    res.send("Viaje agregado con éxito");
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(3000, console.log("¡Servidor encendido!"));

app.get("/", async (req, res) => {
  const fecha = await getDate();
  res.send("Hola mundo" + fecha);
});

app.get("/clientes", async (req, res) => {
  const clientes = await obtenerClientes();
  res.json(clientes);
});

app.get("/clientes/:id", async (req, res) => {
  const { id } = req.params;
try {
  const cliente = await obtenerClientesPorId(id);
  res.json(cliente);
} catch (error) {
  res.status(error.code).send(error.message);
}
});

//Post Clientes
app.post("/clientes", async (req, res) => {
  try {
    const { nombre, email } = req.body;
    await agregarCliente(nombre, email);
    res.send("Cliente generado correctamente");
  } catch (error) {
    const code = error.code;
    if (code == "23502") {
      res
        .status(400)
        .send(
          "Se ha violado la restricción de NOT NULL en uno de los campos de la tabla"
        );
    } else {
      res.status(500).send(error);
    }
  }
});

app.put("/clientes/:id", async (req, res) => {
  const { email } = req.body;
  const { nombre } = req.query;
  const { id } = req.params;
  try {
    const cliente = await modificarCliente(id, nombre, email);
    res.send("Cliente modificado correctamente");
  } catch (error) {
    res.status(error.code).send(error.message);
  }
});

app.delete("/clientes/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await eliminarCliente(id);
    res.send("Cliente eliminado correctamente");
  } catch (error) {
    res.status(error.code).send(error.message);
  }
});
