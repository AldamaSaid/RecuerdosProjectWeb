import express from "express";
import {
  crearDirectorio,
  borrarDirectorio,
  subirImagen,
  actualizarImagen,
  borrarImagen,
  descargarImagen,
  comprimirImagenes,
} from "../controllers/imagenController.js";

const router = express.Router();

// Rutas para la gestión de directorios
router.post("/directorios/crear", crearDirectorio);
router.delete("/directorios/borrar/:id", borrarDirectorio);

// Rutas para la gestión de imágenes
router.post("/imagenes/subir", subirImagen);
router.put("/imagenes/actualizar/:id", actualizarImagen);
router.delete("/imagenes/borrar/:id", borrarImagen);

// Rutas para descargar e comprimir imágenes
router.get("/imagenes/descargar/:id", descargarImagen);
router.post("/imagenes/comprimir", comprimirImagenes);

export default router;
