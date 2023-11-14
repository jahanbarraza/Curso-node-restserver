const { response, request } = require( 'express' );


const usuarioGet = (req = request, res =  response ) => {

    const { q, nombre = 'No name', apikey} = req.query;

    res.json({
        msg: 'Peticion Get - controlador',
        q,
        nombre,
        apikey
    
    });
}

const usuariosPut = (req, res = response) => {
    const { id } = req.params;
    res.json({
        msg: 'Peticion put - controlador',
        id
    });
}

const usuariosPost = (req, res = response ) => {

    const { nombre, edad } = req.body;


    res.json({
        msg: 'Peticion post - controlador',
        nombre,
        edad

    });
}

const usuariosDelete = (req, res =  response ) => {
    res.json({
        msg: 'Peticion delete - controlador'
    });
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