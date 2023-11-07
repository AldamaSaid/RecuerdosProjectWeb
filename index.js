// import express from "express";
// import inicio from "./routes/inicio_router.js";
// //Crear la aplicación
// const app = express();
// //accesos a los datos del formulario
// app.use(express.urlencoded({ extended: true }));
// //pug
// app.set("view engine", "pug");
// app.set("views", "./views");
// //carpeta publica
// app.use(express.static("public"));
// //routing
// app.use("/", inicio);
// //definiendo el puerto
// const port = 2800;
// app.listen(port, () => {
//   console.log(`Esperando peticiones en el puerto ${port}`);
// });
import express from "express";
import inicio from "./routes/inicio_router.js";
import credenciales_router from "./routes/credenciales_router.js";
import db from "./config/db.js";
//Crear la aplicación
const app = express();
//accesos a los datos del formulario
app.use(express.urlencoded({ extended: true }));
//conectando a la base de datos
try {
  await db.authenticate();
  db.sync();
  console.log("Conexion exitosa a la b.d");
} catch (error) {
  console.log(error);
}
//pug
app.set("view engine", "pug");
app.set("views", "./views");
//carpeta publica
app.use(express.static("public"));
//routing
app.use("/", inicio);
app.use("/cred", credenciales_router);
//definiendo el puerto
const port = 2800;
app.listen(port, () => {
  console.log(`Esperando peticiones en el puerto ${port}`);
});
