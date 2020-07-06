const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();

const Usuario = require('../models/usuarioM');


const fs = require('fs');
const path = require('path');
const Noticias = require('../models/noticiasM');
const { verificaToken } = require('../middlewares/autenticacion');
const Campus = require('../models/campusM');
const Servicio = require('../models/servicioM');
const Carrera = require('../models/carreraM');
const modeloEdu = require('../models/modeloEdu');
const Materia = require('../models/materiaM');
const SubCarreras = require('../models/subcarreraM');
const areas = require('../models/areaM');


// default options
app.use(fileUpload());


app.put('/upload/:tipo/:id', verificaToken, function(req, res) {

    let tipo = req.params.tipo;
    let id = req.params.id;

    if (!req.files) {
        return res.status(400)
            .json({
                ok: false,
                err: {
                    message: 'No se ha seleccionado ningún archivo'
                }
            });
    }

    // Valida tipo
    let tiposValidos = ['noticia', 'usuarios', 'campus', 'servicio', 'carrera', 'modelEdu',
     'materia', 'subCarrera', 'area'];
    if (tiposValidos.indexOf(tipo) < 0) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'Los tipos permitidos son ' + tiposValidos.join(', ')
            }
        })
    }

    let archivo = req.files.archivo;
    let nombreCortado = archivo.name.split('.');
    let extension = nombreCortado[nombreCortado.length - 1];

    // Extensiones permitidas
    let extensionesValidas = ['png', 'jpg', 'gif', 'jpeg'];

    if (extensionesValidas.indexOf(extension) < 0) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'Las extensiones permitidas son ' + extensionesValidas.join(', '),
                ext: extension
            }
        })
    }

    // Cambiar nombre al archivo
    // 183912kuasidauso-123.jpg
    let nombreArchivo = `${ id }-${ new Date().getMilliseconds()  }.${ extension }`;


    archivo.mv(`uploads/${ tipo }/${ nombreArchivo }`, (err) => {

        if (err)
            return res.status(500).json({
                ok: false,
                err
            });

        // Aqui, imagen cargada
        if (tipo === 'usuarios') {
            imagenUsuario(id, res, nombreArchivo);
        } else if (tipo === 'noticia'){
            imagenNoticia(id, res, nombreArchivo);
        } else if (tipo === 'campus'){
            imagenCampus(id, res, nombreArchivo);
        } else if (tipo === 'servicio'){
            imagenServicio(id, res, nombreArchivo);
        }else if (tipo === 'carrera'){
            imagenCarrera(id, res, nombreArchivo);
        }else if (tipo === 'modelEdu'){
            imagenModelEdu(id, res, nombreArchivo);
        }else if (tipo === 'materia'){
            imagenmateria(id, res, nombreArchivo);
        }else if (tipo === 'subCarrera'){
            imagensubCarrera(id, res, nombreArchivo);
        }else if (tipo === 'area'){
            imagenArea(id, res, nombreArchivo);
        }else {
            imagenProducto(id, res, nombreArchivo);
        }

    });

});
app.put('/uploadP/:tipo/:id',  function(req, res) {

    let tipo = req.params.tipo;
    let id = req.params.id;

    if (!req.files) {
        return res.status(400)
            .json({
                ok: false,
                err: {
                    message: 'No se ha seleccionado ningún archivo'
                }
            });
    }

    // Valida tipo
    let tiposValidos = ['noticia', 'usuarios', 'campus', 'servicio', 'carrera'];
    if (tiposValidos.indexOf(tipo) < 0) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'Los tipos permitidos son ' + tiposValidos.join(', ')
            }
        })
    }

    let archivo = req.files.archivo;
    let nombreCortado = archivo.name.split('.');
    let extension = nombreCortado[nombreCortado.length - 1];

    // Extensiones permitidas
    let extensionesValidas = ['png', 'jpg', 'gif', 'jpeg'];

    if (extensionesValidas.indexOf(extension) < 0) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'Las extensiones permitidas son ' + extensionesValidas.join(', '),
                ext: extension
            }
        })
    }

    // Cambiar nombre al archivo
    // 183912kuasidauso-123.jpg
    let nombreArchivo = `${ id }-${ new Date().getMilliseconds()  }.${ extension }`;


    archivo.mv(`uploads/${ tipo }/${ nombreArchivo }`, (err) => {

        if (err)
            return res.status(500).json({
                ok: false,
                err
            });

        // Aqui, imagen cargada
        if (tipo === 'usuarios') {
            imagenUsuario(id, res, nombreArchivo);
        } else if (tipo === 'noticia'){
            imagenNoticia(id, res, nombreArchivo);
        } else if (tipo === 'campus'){
            imagenCampus(id, res, nombreArchivo);
        } else if (tipo === 'servicio'){
            imagenServicio(id, res, nombreArchivo);
        }else if (tipo === 'carrera'){
            imagenCarrera(id, res, nombreArchivo);
        }else {
            imagenProducto(id, res, nombreArchivo);
        }

    });

});

function imagenUsuario(id, res, nombreArchivo) {

    Usuario.findById(id, (err, usuarioDB) => {

        if (err) {
            borraArchivo(nombreArchivo, 'usuarios');

            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!usuarioDB) {

            borraArchivo(nombreArchivo, 'usuarios');

            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no existe'
                }
            });
        }

        borraArchivo(usuarioDB.img, 'usuarios')

        usuarioDB.img = nombreArchivo;

        usuarioDB.save((err, usuarioGuardado) => {

            res.json({
                ok: true,
                usuario: usuarioGuardado,
                img: nombreArchivo
            });

        });


    });


}

function imagenProducto(id, res, nombreArchivo) {

    Producto.findById(id, (err, productoDB) => {

        if (err) {
            borraArchivo(nombreArchivo, 'productos');

            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!productoDB) {

            borraArchivo(nombreArchivo, 'productos');

            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuaro no existe'
                }
            });
        }

        borraArchivo(productoDB.img, 'productos')

        productoDB.img = nombreArchivo;

        productoDB.save((err, productoGuardado) => {

            res.json({
                ok: true,
                producto: productoGuardado,
                img: nombreArchivo
            });

        });


    });


}

function imagenNoticia(id, res, nombreArchivo) {

    Noticias.findById(id, (err, sitioDB) => {

        if (err) {
            borraArchivo(nombreArchivo, 'noticia');

            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!sitioDB) {

            borraArchivo(nombreArchivo, 'noticia');

            return res.status(400).json({
                ok: false,
                err: {
                    message: 'noticia no existe'
                }
            });
        }

        borraArchivo(sitioDB.img, 'noticia')

        sitioDB.img = nombreArchivo;

        sitioDB.save((err, sitioGuardado) => {

            res.json({
                ok: true,
                noticia: sitioGuardado,
                img: nombreArchivo
            });

        });


    });


}
function imagenCampus(id, res, nombreArchivo) {

    Campus.findById(id, (err, eventoDB) => {

        if (err) {
            borraArchivo(nombreArchivo, 'campus');

            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!eventoDB) {

            borraArchivo(nombreArchivo, 'campus');

            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Evento no existe'
                }
            });
        }

        borraArchivo(eventoDB.img, 'campus')

        eventoDB.img = nombreArchivo;

        eventoDB.save((err, eventoGuardado) => {

            res.json({
                ok: true,
                campus: eventoGuardado,
                img: nombreArchivo
            });

        });


    });


}
function imagenServicio(id, res, nombreArchivo) {

    Servicio.findById(id, (err, categoriaDB) => {

        if (err) {
            borraArchivo(nombreArchivo, 'servicio');

            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoriaDB) {

            borraArchivo(nombreArchivo, 'servicio');

            return res.status(400).json({
                ok: false,
                err: {
                    message: 'servicio no existe'
                }
            });
        }

        borraArchivo(categoriaDB.img, 'servicio')

        categoriaDB.img = nombreArchivo;

        categoriaDB.save((err, categoriaGuardado) => {

            res.json({
                ok: true,
                servicio: categoriaGuardado,
                img: nombreArchivo
            });

        });


    });


}
function imagenCarrera(id, res, nombreArchivo) {

    Carrera.findById(id, (err, categoriaDB) => {

        if (err) {
            borraArchivo(nombreArchivo, 'carrera');

            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoriaDB) {

            borraArchivo(nombreArchivo, 'carrera');

            return res.status(400).json({
                ok: false,
                err: {
                    message: 'carrera no existe'
                }
            });
        }

        borraArchivo(categoriaDB.img, 'carrera')

        categoriaDB.img = nombreArchivo;

        categoriaDB.save((err, categoriaGuardado) => {

            res.json({
                ok: true,
                carrera: categoriaGuardado,
                img: nombreArchivo
            });

        });


    });


}
function imagenModelEdu(id, res, nombreArchivo) {

    modeloEdu.findById(id, (err, categoriaDB) => {

        if (err) {
            borraArchivo(nombreArchivo, 'modelEdu');

            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoriaDB) {

            borraArchivo(nombreArchivo, 'modelEdu');

            return res.status(400).json({
                ok: false,
                err: {
                    message: 'modelEdu no existe'
                }
            });
        }

        borraArchivo(categoriaDB.img, 'modelEdu')

        categoriaDB.img = nombreArchivo;

        categoriaDB.save((err, categoriaGuardado) => {

            res.json({
                ok: true,
                modelEdu: categoriaGuardado,
                img: nombreArchivo
            });

        });


    });


}
function imagenmateria(id, res, nombreArchivo) {

    Materia.findById(id, (err, categoriaDB) => {

        if (err) {
            borraArchivo(nombreArchivo, 'materia');

            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoriaDB) {

            borraArchivo(nombreArchivo, 'materia');

            return res.status(400).json({
                ok: false,
                err: {
                    message: 'materia no existe'
                }
            });
        }

        borraArchivo(categoriaDB.img, 'materia')

        categoriaDB.img = nombreArchivo;

        categoriaDB.save((err, categoriaGuardado) => {

            res.json({
                ok: true,
                materia: categoriaGuardado,
                img: nombreArchivo
            });

        });


    });


}
function imagensubCarrera(id, res, nombreArchivo) {

    SubCarreras.findById(id, (err, categoriaDB) => {

        if (err) {
            borraArchivo(nombreArchivo, 'subCarrera');

            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoriaDB) {

            borraArchivo(nombreArchivo, 'subCarrera');

            return res.status(400).json({
                ok: false,
                err: {
                    message: 'subCarrera no existe'
                }
            });
        }

        borraArchivo(categoriaDB.img, 'subCarrera')

        categoriaDB.img = nombreArchivo;

        categoriaDB.save((err, categoriaGuardado) => {

            res.json({
                ok: true,
                subCarrera: categoriaGuardado,
                img: nombreArchivo
            });

        });


    });


}
function imagenArea(id, res, nombreArchivo) {

    areas.findById(id, (err, categoriaDB) => {

        if (err) {
            borraArchivo(nombreArchivo, 'area');

            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoriaDB) {

            borraArchivo(nombreArchivo, 'area');

            return res.status(400).json({
                ok: false,
                err: {
                    message: 'area no existe'
                }
            });
        }

        borraArchivo(categoriaDB.img, 'area')

        categoriaDB.img = nombreArchivo;

        categoriaDB.save((err, categoriaGuardado) => {

            res.json({
                ok: true,
                area: categoriaGuardado,
                img: nombreArchivo
            });

        });


    });


}

function borraArchivo(nombreImagen, tipo) {

    let pathImagen = path.resolve(__dirname, `../../uploads/${ tipo }/${ nombreImagen }`);
    if (fs.existsSync(pathImagen)) {
        fs.unlinkSync(pathImagen);
    }


}


module.exports = app;