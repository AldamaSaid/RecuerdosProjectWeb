import Usuario from '../../models/Usuario.js';
import {check,validationResult} from 'express-validator';
import { correoRegistro } from '../../helpers/correos.js';
import { idGenera,JWTGenera } from "../../helpers/tokens.js";

const registroEnlace = (req,res)=>{
    res.render('credenciales/registro',{
        pagina:"Alta Credenciales",
        csrf:req.csrfToken()
    });
}
const credenciales=(req,res)=>{
    res.render('credenciales/login',{
        pagina:"Alta Usuariio",
        csrf:req.csrfToken()
    });
}
const registrandoCredenciales=async(req,res)=>{
    let valido=await validacionFormulario(req);
    if(!valido.isEmpty()){
        return res.render("credenciales/registro",{
            pagina:"Alta Usuario",
            dato:{
                nombre: req.body.nombre,
                correo: req.body.correo,
                password: req.body.password,
                token: idGenera()
            },
            errores:valido.array()
        });
    }
    const verificarCorreo=await Usuario.findOne({where:{correo:req.body.correo}});
    if(verificarCorreo){
        return res.render("credenciales/registro",{
            pagina:"Alta Usuario",
            dato:{
                nombre: req.body.nombre,
                correo: req.body.correo,
                password: req.body.password,
                token: idGenera()
            },
            errores:[{msg:"Ya esta registrado un usuario con el mismo correo"}]
        });
    }
    const usuario=await Usuario.create({
        nombre: req.body.nombre,
        correo: req.body.correo,
        password: req.body.password,
        confirmar: false,
        token: idGenera()
    });
    //Mandar el correo
    correoRegistro({
        nombre:usuario.nombre,
        correo: usuario.correo,
        token: usuario.token
    })
    res.render("credenciales/mensajes",{
        pagina: "Se envio un correo de confirmacion"
    });
}
const confirmarInscripcionEnlace= async(req,res)=>{
    console.log("Se ejecuta");
    const{token}= req.params;
    const usuario = await Usuario.findOne({
        where: {token}
    })
    if (!usuario){
        res.render("credenciales/mensajes", {
            pagina: "No se pudo confirmar la cuenta"
        })
    }
    usuario.token=null;
    usuario.confirmar = true;
    await usuario.save();
    res.render("credenciales/mensajes", {
        pagina: "Su registro fue exitoso"
    })
}
async function validacionFormulario(req){
    await check('nombre').notEmpty().withMessage("Nombre no debe ser vacio").run(req);
    await check('correo').notEmpty().withMessage("Correo no debe ser vacio").isEmail().withMessage("Correo no valido").run(req);
    await check('password').notEmpty().withMessage("Password no debe ser vacio").run(req);
    let salida=validationResult(req);
    return salida;
}

async function validacionInicio(req){
    await check('correo').notEmpty().withMessage("Correo no debe ser vacio").isEmail().withMessage("Correo no valido").run(req);
    await check('password').notEmpty().withMessage("Password no debe ser vacio").run(req);
    let salida=validationResult(req);
    return salida;
}
const iniciarSesion= async(req,res)=>{
    let validar = await validacionInicio(req);
    if(!validar.isEmpty()){
        return res.render("credenciales/login", {
            pagina:validar.array()
        })
    }
    //comprobar si el usuario existe respecto a su correo
    const {correo, password} = req.body;
    const usuario = await Usuario.findOne({
        where:{correo}
    })
    if (!usuario){
        res.render("credenciales/mensajes", {
            pagina: "No existe el usuario"
        })
    }
    //comprobar el password
    if(!usuario.verificandoClave(password)){
        res.render("credenciales/mensajes", {
            pagina: "No existe el usuario"
        })
    }
    //crean jsonwebtoken
    const token=JWTGenera({id:usuario.id_usr,mail:correo})
    return res.cookie('_token',token,{
        httpOnly:true, //no accesible desde el API de JavaScript
        maxAge:60*1000         
        //secure:true     //certificado ssh
    }).redirect("/inicio");
}
export {
    credenciales,
    registrandoCredenciales,
    registroEnlace,
    iniciarSesion,
    confirmarInscripcionEnlace
}