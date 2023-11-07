import {Habitacion} from "../../models/Habitacion.js";
import db from "../../config/db.js";

const listaHabitaciones = async(req, res) => {
    const habitaciones = await Habitacion.findAll();
    res.render('hotel/habitaciones.pug', {
        pagina: "Datos Habitaciones",
        habitaciones
    });
}

export {
    listaHabitaciones
}