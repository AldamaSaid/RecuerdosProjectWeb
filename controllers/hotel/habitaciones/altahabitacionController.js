import db from '../../../config/db.js';
import {check,validationResult} from 'express-validator';
import {Habitacion} from '../../../models/Habitacion.js';
import {MisDatos} from '../../../models/MisDatos.js';


//se traen todos los hoteles que no tienen Gerente
async function consulta(){
    let hoteles = await db.query( 
        "select id_htl as dato1,nombre as dato2 " + 
        "from hoteles"
    ,{
        model:MisDatos,
        mapToModel:true
    });
    return hoteles;
}


const altaHabitacion=async(req,res)=>{
    if(req.query.id){
        modificar=true;
        const id=await Habitacion.findByPk(req.query.id)
        res.render('hotel/habitaciones/altahabitacion',{
            pagina:"Alta Habitaciones",
            info:await consulta(),
            dato:{
                piso:id.piso,
                nombre:id.nombre,
                refrigerador:id.refrigerador
            },
        });
    }else{
        res.render('hotel/habitaciones/altahabitacion',{
            pagina:"Alta Habitaciones",
            info:await consulta()
        });
    }
}


const registrandoHabitacion=async(req,res)=>{
    let valido=await validacionFormulario(req);
    if(!valido.isEmpty()){
        return res.render("hotel/habitaciones/altahabitacion",{
            pagina:"Alta Habitacion",
            info:await consulta(),
            dato:{
                piso:req.body.piso,
                nombre:req.body.nombre,
                refrigerador:req.body.refrigerador,
            },
            hotelselect:req.body.hotelid,
            errores:valido.array()
        });
    }

    const habitacion=await Habitacion.create(req.body);
    res.render("hotel/habitaciones/altahabitacion",{
        pagina:"La habitacion se registro exitosamente",
        info:await consulta()
    });
}
async function validacionFormulario(req){
    await check('piso').notEmpty().withMessage("Piso no debe ser vacio").run(req);
    await check('nombre').notEmpty().withMessage("Nombre no debe ser vacio").run(req);
    await check('refrigerador').notEmpty().withMessage("Refrigerador no debe ser vacio").run(req);
    let salida=validationResult(req);
    return salida;
}


export {
    altaHabitacion,
    registrandoHabitacion
}