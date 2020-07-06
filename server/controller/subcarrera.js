const express = require('express');
const app = express();

let { verificaToken, verificaAdmin_Role } = require('../middlewares/autenticacion');

let SubCarrera= require('../models/subcarreraM');

// ============================
// Mostrar todas las SubCarrera
// ============================
app.get('/subCarrera', (req, res) => {
    
    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    SubCarrera.find({estado: true })
        .skip(desde)
        .limit(limite)
        .sort('nombre')
        .exec((err, SubCarreras) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                SubCarreras
            });

        })
});
app.get('/subCarreraT', (req, res) => {

    SubCarrera.find({estado: true })
        .sort('nombre')
        .exec((err, SubCarreras) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                SubCarreras
            });

        })
});

// ============================
// Mostrar una SubCarrerapor ID
// ============================
app.get('/subCarrera/:id', (req, res) => {
    // SubCarrera.findById(....);

    let id = req.params.id;

    SubCarrera.findById(id, (err, SubCarreraDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!SubCarreraDB) {
            return res.status(500).json({
                ok: false,
                err: {
                    message: 'El ID no es correcto'
                }
            });
        }


        res.json({
            ok: true,
            SubCarrera: SubCarreraDB
        });

    });


});

// ============================
// Crear nueva SubCarrera
// ============================
app.post('/subCarrera', [verificaToken, verificaAdmin_Role], (req, res) => {
    // regresa la nueva SubCarrera
    // req.usuario._id
    let body = req.body;

    let subCarrera= new SubCarrera({
        nombre: body.nombre,
        descripcion: body.descripcion,            
        url: body.url,  
        carrera: body.carrera
    });


    subCarrera.save((err, SubCarreraDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!SubCarreraDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            SubCarrera: SubCarreraDB
        });


    });


});

// ============================
// Mostrar todas las SubCarreras
// ============================
app.put('/subCarrera/:id', [verificaToken, verificaAdmin_Role], (req, res) => {

    let id = req.params.id;
    let body = req.body;

    let descSubCarrera= {
        nombre: body.nombre,
        descripcion: body.descripcion,            
        url: body.url,  
        carrera: body.carrera
    };

    SubCarrera.findByIdAndUpdate(id, descSubCarrera, { new: true, runValidators: true }, (err, SubCarreraDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!SubCarreraDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            SubCarrera: SubCarreraDB
        });

    });


});

// ============================
// Mostrar todas las SubCarreras
// ============================
app.delete('/subCarrera/:id', [verificaToken, verificaAdmin_Role], (req, res) => {
    // solo un administrador puede borrar SubCarreras
    // SubCarrera.findByIdAndRemove
    let id = req.params.id;

    // Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {

    let cambiaEstado = {
        estado: false
    };

    SubCarrera.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, SubCarreraBorrada) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        if (!SubCarreraBorrada) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'SubCarrerano encontrado'
                }
            });
        }

        res.json({
            ok: true,
            SubCarrera: SubCarreraBorrada
        });

    });




});



module.exports = app;