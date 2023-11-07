import {check,validationResult} from 'express-validator';
import { Hotel } from "../../../models/Hotel.js";


const borrarHoteles=async(req,res)=>{
    let msg;
    if(req.query.exito)
        msg="El hotel se borro correctamente"
    else
        msg="Borrar Hotel"
    res.render('hotel/hoteles/borrarhotel',{
        pagina:msg
    });
}


const accionBuscarHoteles=async(req,res)=>{
    await check('nombre').notEmpty().withMessage("Nombre del hotel no debe ser vacio").run(req);
    let salida= validationResult(req);
    if(!salida.isEmpty()){
        return res.render('hotel/hoteles/borrarhotel',{
            pagina:"Borrar Hoteles",
            errores:salida.array()
        });
    }
    const nombreHotel=req.body.nombre;
//buscar el hotel con su nombre; recogiendo gerente
    const ht = await Hotel.findAll({
        raw:true,
        nest:true,
        where: {
            nombre: nombreHotel,
        }
    });
    if(ht.length===0){
        return res.render('hotel/hoteles/borrarhotel',{
            pagina:"Borrar Hoteles",
            nombre:nombreHotel,
            errores:[{msg:"Ese hotel no existe"}]
        });
    }
    res.render('hotel/hoteles/borrarhotel',{
        pagina:"Borrar Hoteles",
        nombre:nombreHotel,
        hot:ht
    });
}

const accionBorrarHoteles=async(req,res)=>{
    await Hotel.destroy({
        where:{
            id_htl:req.query.id
        }
    })
    res.redirect('/hotel/hoteles/borrar?exito=true');
}

export {
    borrarHoteles,
    accionBorrarHoteles,
    accionBuscarHoteles
}