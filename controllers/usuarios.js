const { response, request } = require( 'express' );
const bcrypjs = require('bcryptjs')
const Usuario = require('../models/usuario');



const usuarioGet =  async(req = request, res =  response ) => {

    //obtener todos los usuarios de forma paginada
    const { limite = 5, desde = 0 } = req.query;

    const [total, usuarios ] =  await Promise.all([
        Usuario.countDocuments({estado : true} ),
        Usuario.find( {estado : true} ) 
            .skip(Number(desde))   //el metodo skip te ayuda a traer la data desde el dato que le envies 
            .limit(Number(limite))  // limitamos la busqueda y number la convertimos a numerico
    ]);

    res.json({
        total,
        usuarios
    });
}

const usuariosPut = async(req, res = response) => {

    const { id } = req.params;

    const { _id, password, correo, google, ...resto } = req.body;

    //Todo Validar contra Base de datos 
    if ( password ) {
        //Encriptamos la contraseña
        const salt = bcrypjs.genSaltSync();
        resto.password = bcrypjs.hashSync( password, salt )
    }
    //findbyidandupadte nos permite buscar el id y actualizarlo
    const usuario = await Usuario.findByIdAndUpdate(id, resto );
    console.log(usuario);
    res.json(usuario);
}

const usuariosPost = async(req, res = response ) => {


    const  { nombre, correo, password, rol }  = req.body;
    const usuario = new Usuario( { nombre, correo, password, rol } );
    try {
        

        //Encriptamos la contraseña
        const salt = bcrypjs.genSaltSync();
        usuario.password = bcrypjs.hashSync( password, salt )

        //Guardamos en BD
        await usuario.save();

        res.json({
            msg: 'Usuario Creado',
            usuario
    
        });
    } catch (error) {
        res.status(500).json({
            msg: error.message,
    
        });
    }
    
}

const usuariosDelete = async(req, res =  response ) => {
    
    const {id} = req.params;

    // para borrarlo fisicamente
    //const usuario = await Usuario.findByIdAndDelete( id );

    const usuario = await Usuario.findByIdAndUpdate( id, {estado:false});

    res.json({
        usuario
    })
}



const usuariosPatch = (req, res = response ) => {
    res.json({
        msg: 'Peticion patch - controlador '
    });
}

module.exports = {
    usuarioGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch
}