import {Hotel} from "../../models/Hotel.js";
import db from "../../config/db.js";

const listaHotel = async(req, res) => {
    const hotel = await Hotel.findAll();
    res.render('hotel/hotel.pug', {
        pagina: "Datos Del Hotel",
        hotel
    });
}

export {
    listaHotel
}