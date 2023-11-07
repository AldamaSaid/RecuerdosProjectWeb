import { Hotel } from "../../../models/Hotel.js";

const consultaHotel =async(req, res) => {
    const hoteles = await Hotel.findAll({
        raw:true,
        nest:true
    });
    res.render("hotel/hoteles/consultahotel", {
        pagina: "Lista de Sucursales",
        hotel: hoteles
    });
};

export {consultaHotel};