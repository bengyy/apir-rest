const express = require('express');
const app = express();

let { verificaToken, verificaAdmin_Role } = require('../middlewares/autenticacion');

let Nivel= require('../models/nivelM');

// ============================
// Mostrar todas las Nivel
// ============================
app.get('/nivel', (req, res) => {
    
    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    Nivel.find({estado: true })
        .skip(desde)
        .limit(limite)
        .sort('nombre')
        .exec((err, Nivels) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                Nivels
            });

        })
});

// ============================
// Mostrar una Nivelpor ID
// ============================
app.get('/nivel/:id', (req, res) => {
    // Nivel.findById(....);

    let id = req.params.id;

    Nivel.findById(id, (err, NivelDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!NivelDB) {
            return res.status(500).json({
                ok: false,
                err: {
                    message: 'El ID no es correcto'
                }
            });
        }


        res.json({
            ok: true,
            Nivel: NivelDB
        });

    });


});

// ============================
// Crear nueva Nivel
// ============================
app.post('/nivel', [verificaToken, verificaAdmin_Role], (req, res) => {
    // regresa la nueva Nivel
    // req.usuario._id
    let body = req.body;

    let nivel= new Nivel({
        nombre: body.nombre,
        descripcion: body.descripcion,            
        url: body.url,  
        subcarrera: body.subcarrera
    });


    nivel.save((err, NivelDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!NivelDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            Nivel: NivelDB
        });


    });


});

// ============================
// Mostrar todas las Nivels
// ============================
app.put('/nivel/:id', [verificaToken, verificaAdmin_Role], (req, res) => {

    let id = req.params.id;
    let body = req.body;

    let descNivel= {
        nombre: body.nombre,
        descripcion: body.descripcion,            
        url: body.url,  
        subcarrera: body.subcarrera
    };

    Nivel.findByIdAndUpdate(id, descNivel, { new: true, runValidators: true }, (err, NivelDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!NivelDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            Nivel: NivelDB
        });

    });


});

// ============================
// Mostrar todas las Nivels
// ============================
app.delete('/nivel/:id', [verificaToken, verificaAdmin_Role], (req, res) => {
    // solo un administrador puede borrar Nivels
    // Nivel.findByIdAndRemove
    let id = req.params.id;

    // Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {

    let cambiaEstado = {
        estado: false
    };

    Nivel.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, NivelBorrada) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        if (!NivelBorrada) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Nivelno encontrado'
                }
            });
        }

        res.json({
            ok: true,
            Nivel: NivelBorrada
        });

    });




});



module.exports = app;