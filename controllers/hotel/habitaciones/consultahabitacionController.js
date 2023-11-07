import {Habitacion} from "../../../models/Habitacion.js";
import { Hotel } from "../../../models/Hotel.js";

const consultaHabitacion = async (req, res) => {
    const habitaciones = await Habitacion.findAll({
        include: {
            model: Hotel
        },
        raw:true,
        nest:true
    });
    res.render("hotel/habitaciones/consultahabitacion", {
        pagina: "Lista de Habitaciones",
        habitacion: habitaciones
    });
};

export { consultaHabitacion };