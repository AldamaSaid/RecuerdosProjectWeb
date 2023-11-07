// import express from "express";
// import {credenciales, iniciarSesion ,registrandoCredenciales, registroEnlace, confirmarInscripcionEnlace} from "../controllers/credenciales/loginController.js";
// import { buscandoUsuario, cambioEnlace, confirmarCambiarContrasenia } from "../controllers/credenciales/cambiarController.js";
// import { confirmarCambioEnlace } from "../controllers/credenciales/cambiarController.js";
// const routerCredenciales=express.Router();

// //Routing
// //para la vista alta credenciales
// routerCredenciales.get('/',credenciales);

// //Proceso de alta de usuario
// routerCredenciales.get('/registrar', registroEnlace); //primer reenderizado
// routerCredenciales.post('/registrarUsuario',registrandoCredenciales); //para guardar datos del formulario

// //Confirmar token 
// routerCredenciales.get('/confirmarinscripcion/:token', confirmarInscripcionEnlace);
// routerCredenciales.get('/confirmarcambio/:token', confirmarCambioEnlace);

// routerCredenciales.post('/confirmarcambiarcontrasenia', confirmarCambiarContrasenia);

// // validar usuario
// routerCredenciales.post('/iniciarsesion', iniciarSesion);

// //cambiar la contraseña
// routerCredenciales.get('/cambiarcontrasenia', cambioEnlace);
// routerCredenciales.post('/buscarcorreo', buscandoUsuario);
// export default routerCredenciales;

import express from "express";
import {credenciales,registrando} from "../controllers/credenciales/loginController.js"
const routerCredenciales=express.Router();
//Routing
//para la vista alta credenciales
routerCredenciales.get('/credenciales',credenciales);
routerCredenciales.post('/registrar',registrando);
export default routerCredenciales