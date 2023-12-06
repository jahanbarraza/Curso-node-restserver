const { validationResult } = require('express-validator');
const usuario = require('../models/usuario');

const validarCampos = ( req, res, next ) => { // el next es el que dice si pasa este middlewares pasa el otro si hay 

    const errors = validationResult(req);
    if ( !errors.isEmpty() ){
        return res.status(400).json(errors);
    }
    next()
}



module.exports = {
    validarCampos
}