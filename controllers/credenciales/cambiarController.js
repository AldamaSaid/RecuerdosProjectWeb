import { idGenera } from "../../helpers/tokens.js";
import Usuario from "../../models/Usuario.js";
import { check, validationResult } from 'express-validator';
import { correoCambio } from '../../helpers/correos.js';

const cambioEnlace = (req, res) => {
    res.render('credenciales/cambiarcontrasenia', {
        pagina: "Reestablecer contraseña"
    });
}

const buscandoUsuario = async (req, res) => {
    let validar = await validacionCorreo(req);
    if (!validar.isEmpty()) {
        return res.render("credenciales/cambiarcontrasenia", {
            errores: validar.array()
        })
    }
    //comprobar si el usuario existe respecto a su correo
    const { correo } = req.body;
    const usuario = await Usuario.findOne({
        where: { correo }
    })
    //evalua que exista el correo dentro de la base de datos
    if (!usuario) {
        res.render("credenciales/mensajes", {
            pagina: "No existe el usuario"
        })
    }
    //Se guarda un cambio localmente con el nuevo token 
    usuario.set({
        token: idGenera()
    });
    //Guarda el cambio en la bd
    usuario.save();
    //Mandar el correo
    correoCambio({
        nombre: usuario.nombre,
        correo: usuario.correo,
        token: usuario.token
    })
    res.render("credenciales/mensajes", {
        pagina: "Se envio un correo de confirmacion"
    });
}

const confirmarCambioEnlace = async (req, res) => {
    console.log("Se ejecuta");
    const { token } = req.params;
    const usuario = await Usuario.findOne({
        where:{token:token}
    })
    if (!usuario) {
        res.render("credenciales/mensajes", {
            pagina: "No se pudo confirmar la cuenta"
        })
    }
    res.render("credenciales/contrasenia", {
        valores:{
            token:token
        }
    })
}

const confirmarCambiarContrasenia = async (req, res) => {
    let validar = await validacionContraseña(req);
    if(!validar.isEmpty()){
        return res.render("credenciales/cambiarcontrasenia", {
            errores: validar.array()
        })
    }
    const { token, password, confirmar } = req.body;
    const usuario = await Usuario.findOne({
        where: {token:token}
    })
    if(password == confirmar){
        usuario.set({
            token: null,
            password: password
        });
        //Guarda el cambio en la bd
        usuario.save();
    }
    res.render("credenciales/mensajes", {
        pagina: "Se envio cambio la contraseña correctamente"
    });

}
async function validacionCorreo(req) {
    await check('correo').notEmpty().withMessage("Correo no debe ser vacio").isEmail().withMessage("Correo no valido").run(req);
    let salida = validationResult(req);
    return salida;
}

async function validacionContraseña(req) {
    await check('password').notEmpty().withMessage("Password no debe ser vacio").run(req);
    let salida = validationResult(req);
    return salida;
}

export {
    cambioEnlace,
    buscandoUsuario,
    confirmarCambioEnlace,
    confirmarCambiarContrasenia
}