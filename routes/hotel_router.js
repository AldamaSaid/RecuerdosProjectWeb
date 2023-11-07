import express from "express";
import {altaGerente,registrando} from "../controllers/hotel/gerente/altagerenteController.js";
import {modificarGerente,accionbuscarHotelGerente,accionLlenarFormulario,registrandoModificar} from "../controllers/hotel/gerente/modificargerenteController.js";
import {consultaGerente} from "../controllers/hotel/gerente/consultagerenteController.js";
import {borrarGerente,accionBuscarHotel,accionBorrarGerente} from "../controllers/hotel/gerente/borrargerenteController.js";
import {altahotel,registrandoHotel} from "../controllers/hotel/hoteles/altahotelController.js";
import {consultaHotel} from "../controllers/hotel/hoteles/consultahotelController.js";
import {modificarHotel, accionbuscarHotel, accionLlenarFormularioHotel, registrandoModificarHotel} from "../controllers/hotel/hoteles/modificarhotelController.js";
import {borrarHoteles, accionBuscarHoteles, accionBorrarHoteles} from "../controllers/hotel/hoteles/borrarhotelController.js";
import {consultaHabitacion} from "../controllers/hotel/habitaciones/consultahabitacionController.js";
import { altaHabitacion, registrandoHabitacion } from "../controllers/hotel/habitaciones/altahabitacionController.js";

const router_Hotel = express.Router();

//Routing

//rutas para dar de alta
router_Hotel.get('/gerente/altaGerente',altaGerente);
router_Hotel.post('/gerente/registrandoGerente',registrando);

router_Hotel.get('/hoteles/altaHotel', altahotel);
router_Hotel.post('/hoteles/registrandoHotel',registrandoHotel);

router_Hotel.get('/habitaciones/altaHabitacion', altaHabitacion);
router_Hotel.post('/habitaciones/registrandoHabitacion',registrandoHabitacion);
//rutas para consultar
router_Hotel.get('/gerente/consultaGerente',consultaGerente);

router_Hotel.get('/hoteles/consultaHotel', consultaHotel);

router_Hotel.get('/habitaciones/consultaHabitacion', consultaHabitacion);
//rutas para modificar
router_Hotel.get('/gerente/modificarGerente',modificarGerente);
router_Hotel.post('/gerente/buscarHotelGerente',accionbuscarHotelGerente);
router_Hotel.get('/gerente/llenarFormularioGerente',accionLlenarFormulario);
router_Hotel.post('/gerente/accionModificarGerente',registrandoModificar);

router_Hotel.get('/hoteles/modificarHotel',modificarHotel);
router_Hotel.post('/hoteles/buscarModificarHotel',accionbuscarHotel);
router_Hotel.get('/hoteles/llenarFormularioHotel',accionLlenarFormularioHotel);
router_Hotel.post('/hoteles/accionModificarHotel',registrandoModificarHotel);
//metodos para borrar
router_Hotel.get('/gerente/borrarGerente',borrarGerente);
router_Hotel.post('/gerente/buscarGerenteHotel',accionBuscarHotel);
router_Hotel.get('/gerente/eliminarGerente',accionBorrarGerente);

router_Hotel.get('/hoteles/borrarHotel', borrarHoteles);
router_Hotel.post('/hoteles/buscarHoteles',accionBuscarHoteles);
router_Hotel.get('/hoteles/eliminarHoteles',accionBorrarHoteles);

export default router_Hotel;
