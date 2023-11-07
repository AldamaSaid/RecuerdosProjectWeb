import {Gerente} from "../../models/gerente.js";
import db from "../../config/db.js";

const listaGerente = async (req, res) => {
    const gerentes = await Gerente.findAll();
    res.render('hotel/gerentes.pug', {
        pagina: "Datos Gerentes",
        gerentes
    });
}

export {
    listaGerente
}