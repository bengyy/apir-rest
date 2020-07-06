const express = require('express');
const app = express();

let { verificaToken, verificaAdmin_Role } = require('../middlewares/autenticacion');

let Carrera= require('../models/carreraM');

// ============================
// Mostrar todas las Carrera
// ============================
app.get('/carrera', (req, res) => {
    
    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    Carrera.find({estado: true })
        .skip(desde)
        .limit(limite)
        .sort('nombre')
        .exec((err, Carreras) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                Carreras
            });

        })
});

app.get('/carreraT', (req, res) => {
    

    Carrera.find({estado: true })
        .sort('nombre')
        .exec((err, Carreras) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                Carreras
            });

        })
});

// ============================
// Mostrar una Carrerapor ID
// ============================
app.get('/carrera/:id', (req, res) => {
    // Carrera.findById(....);

    let id = req.params.id;

    Carrera.findById(id, (err, CarreraDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!CarreraDB) {
            return res.status(500).json({
                ok: false,
                err: {
                    message: 'El ID no es correcto'
                }
            });
        }


        res.json({
            ok: true,
            Carrera: CarreraDB
        });

    });


});

// ============================
// Crear nueva Carrera
// ============================
app.post('/carrera', [verificaToken, verificaAdmin_Role], (req, res) => {
    // regresa la nueva Carrera
    // req.usuario._id
    let body = req.body;

    let carrera= new Carrera({
        nombre: body.nombre,
        descripcion: body.descripcion,            
        url: body.url
    });


    carrera.save((err, CarreraDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!CarreraDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            Carrera: CarreraDB
        });


    });


});

// ============================
// Mostrar todas las Carreras
// ============================
app.put('/carrera/:id', [verificaToken, verificaAdmin_Role], (req, res) => {

    let id = req.params.id;
    let body = req.body;

    let descCarrera= {
        nombre: body.nombre,
        descripcion: body.descripcion,            
        url: body.url
    };

    Carrera.findByIdAndUpdate(id, descCarrera, { new: true, runValidators: true }, (err, CarreraDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!CarreraDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            Carrera: CarreraDB
        });

    });


});

// ============================
// Mostrar todas las Carreras
// ============================
app.delete('/carrera/:id', [verificaToken, verificaAdmin_Role], (req, res) => {
    // solo un administrador puede borrar Carreras
    // Carrera.findByIdAndRemove
    let id = req.params.id;

    // Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {

    let cambiaEstado = {
        estado: false
    };

    Carrera.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, CarreraBorrada) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        if (!CarreraBorrada) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Carrerano encontrado'
                }
            });
        }

        res.json({
            ok: true,
            Carrera: CarreraBorrada
        });

    });




});



module.exports = app;