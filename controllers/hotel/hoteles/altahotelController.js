import db from '../../../config/db.js';
import {check,validationResult} from 'express-validator';
import {Hotel} from '../../../models/Hotel.js';
import {MisDatos} from '../../../models/MisDatos.js';


//se traen todos los hoteles que no tienen Gerente
async function consulta(){
    let hoteles = await db.query( 
        "select id_htl as dato1,nombre as dato2 " + 
        "from hoteles where id_htl not in (select id_htl from gerentes)"
    ,{
        model:MisDatos,
        mapToModel:true
    });
    return hoteles;
}


const altahotel=async(req,res)=>{
    if(req.query.id){
        modificar=true;
        const id=await Hotel.findByPk(req.query.id)
        res.render('hotel/hoteles/altahotel',{
            pagina:"Alta Hotel",
            info:await consulta(),
            dato:{
                sucursal:id.nombre,
                direccion:id.direccion,
                telefono:id.telefono,
                correo:id.correo
            },
        });
    }else{
        res.render('hotel/hoteles/altahotel',{
            pagina:"Alta Hotel",
            info:await consulta()
        });
    }
}


const registrandoHotel=async(req,res)=>{
    let valido=await validacionFormulario(req);
    if(!valido.isEmpty()){
        return res.render("hotel/hoteles/altahotel",{
            pagina:"Alta Hotel",
            info:await consulta(),
            dato:{
                sucursal:req.body.nombre,
                direccion:req.body.direccion,
                telefono:req.body.telefono,
                correo:req.body.correo
            },
            hotelselect:req.body.hotelid,
            errores:valido.array()
        });
    }
//verificar que no se tenga un hotel con el mismo telefono
    const verificarTelefono=await Hotel.findOne({where:{telefono:req.body.telefono}});
    if(verificarTelefono){
        return res.render("hotel/hoteles/altahotel",{
            pagina:"Alta Hotel",
            info:await consulta(),
            dato:{
                sucursal:req.body.nombre,
                direccion:req.body.direccion,
                telefono:req.body.telefono,
                correo:req.body.correo
            },
            hotelselect:req.body.hotelid,
            errores:[{msg:"Ya esta registrado un hotel con el mismo telefono"}]
        });
    }
    const hotel=await Hotel.create(req.body);
    res.render("hotel/hoteles/altahotel",{
        pagina:"El hotel se registro exitosamente",
        info:await consulta()
    });
}
async function validacionFormulario(req){
    await check('nombre').notEmpty().withMessage("Sucursal no debe ser vacio").run(req);
    await check('direccion').notEmpty().withMessage("Direccion no debe ser vacio").run(req);
    await check('telefono').notEmpty().withMessage("Telefono no debe ser vacio").run(req);
    await check('correo').notEmpty().withMessage("Correo no debe ser vacio").run(req);
    let salida=validationResult(req);
    return salida;
}


export {
    altahotel,
    registrandoHotel
}