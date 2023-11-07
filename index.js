import express from "express";
import inicio from "./routes/inicio_router.js";
//Crear la aplicación
const app = express();
//accesos a los datos del formulario
app.use(express.urlencoded({ extended: true }));
//pug
app.set("view engine", "pug");
app.set("views", "./views");
//carpeta publica
app.use(express.static("public"));
//routing
app.use("/", inicio);
//definiendo el puerto
const port = 2800;
app.listen(port, () => {
  console.log(`Esperando peticiones en el puerto ${port}`);
});
