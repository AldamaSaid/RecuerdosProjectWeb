import { check, validationResult } from "express-validator";
import { Op } from "sequelize";
import {Hotel} from "../../../models/Hotel.js";
//se traen todos los gerentes de los hoteles que considan
async function consulta(valor) {
    let hoteles = await Hotel.findAll({
        raw: true,
        nest: true,
        where: {
            nombre: {
                [Op.like]: "%" + valor + "%",
            },
        },
    });
    return hoteles;
}

const modificarHotel = async (req, res) => {
    res.render("hotel/hoteles/modificarhotel", {
        pagina: "Modificar Hotel",
        vista: true,
    });
};
//buscar gerente por el nombre del hotel
const accionbuscarHotel = async (req, res) => {
    const datos = await consulta(req.body.nombre);
    res.render("hotel/hoteles/modificarhotel", {
        pagina: "Modificar Hotel",
        dato: {
            nombre: req.body.nombre,
        },
        info: datos,
        vista: true,
    });
};

const accionLlenarFormularioHotel = async (req, res) => {
    const info = await Hotel.findByPk(req.query.id);
    console.log(info.nombre);
    res.render("hotel/hoteles/modificarhotel", {
        pagina: "Modificar Hotel",
        valores: {
            sucursal: info.nombre,
            direccion: info.direccion,
            telefono: info.telefono,
            correo: info.correo,
            id_htl: info.id_htl,
        },
    });
};
//validando que se tiene todo
const registrandoModificarHotel = async (req, res) => {
    let valido = await validacionFormulario(req);
    if (!valido.isEmpty()) {
        return res.render("hotel/hoteles/modificarhotel", {
            pagina: "Modificar Hotel",
            valores: {
                sucursal: req.body.nombre,
                direccion: req.body.direccion,
                telefono: req.body.telefono,
                correo: req.body.correo,
                id_htl: req.body.id_h,
            },
            errores: valido.array(),
        });
    }
//verificar que no se tenga un gerente con el mismo telefono 2 veces
    const telVerificar = await Hotel.findByPk(req.body.id_h);
//Si es diferente el telefono del formulario al de la base de datos
    if (telVerificar.telefono !== req.body.telefono) {
//verificar que no tenga mas de uno
        const { count } = await Hotel.findAndCountAll({
            where: { telefono: req.body.telefono },
        });
        console.log(count);
        if (count >= 1) {
            return res.render("hotel/hoteles/modificarhotel", {
                pagina: "Modificar Hotel",
                valores: {
                    sucursal: req.body.nombre,
                    direccion: req.body.direccion,
                    telefono: req.body.telefono,
                    correo: req.body.correo,
                    id_htl: req.body.id_h,
                },
                errores: [
                    { msg: "Ya esta registrado un hotel con el mismo telefono" },
                ],
            });
        }
    }

    const { id_h: id_htl, nombre, direccion, telefono, correo } = req.body;
    console.log(req.body);
//const gerente = await Gerente.findByPk(id_grt);
    telVerificar.set({
        nombre,
        direccion,
        telefono,
        correo,
    });
    telVerificar.save();
    res.render("hotel/hoteles/modificarhotel", {
        pagina: "El hotel se registro exitosamente",
        vista: true,
    });
};

async function validacionFormulario(req) {
    await check("nombre")
    .notEmpty()
    .withMessage("Nombre no debe ser vacio")
    .run(req);
    await check("direccion")
    .notEmpty()
    .withMessage("Direccion no debe ser vacio")
    .run(req);
    await check("telefono")
    .notEmpty()
    .withMessage("Telefono no debe ser vacio")
    .run(req);
    await check("correo")
    .notEmpty()
    .withMessage("Correo no debe ser vacio")
    .run(req);
    let salida = validationResult(req);
    return salida;
}
export {
    modificarHotel,
    accionbuscarHotel,
    accionLlenarFormularioHotel,
    registrandoModificarHotel,
}