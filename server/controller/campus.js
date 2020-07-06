const express = require('express');
const app = express();

let { verificaToken, verificaAdmin_Role } = require('../middlewares/autenticacion');

let Campus = require('../models/campusM');

// ============================
// Mostrar todas las Campuss
// ============================
app.get('/campus', (req, res) => {
    
    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    Campus.find({estado: true })
        .skip(desde)
        .limit(limite)
        .sort('nombre')
        .exec((err, Campuss) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                Campuss
            });

        })
});

//mostar todos
app.get('/campusT', (req, res) => {
    

    Campus.find({estado: true })
        .sort('nombre')
        .exec((err, Campuss) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                Campuss
            });

        })
});


// ============================
// Mostrar una Campus por ID
// ============================
app.get('/campus/:id', (req, res) => {
    // Campus.findById(....);

    let id = req.params.id;

    Campus.findById(id, (err, CampusDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!CampusDB) {
            return res.status(500).json({
                ok: false,
                err: {
                    message: 'El ID no es correcto'
                }
            });
        }


        res.json({
            ok: true,
            Campus: CampusDB
        });

    });


});

// ============================
// Crear nueva Campus
// ============================
app.post('/campus', [verificaToken, verificaAdmin_Role], (req, res) => {
    // regresa la nueva Campus
    // req.usuario._id
    let body = req.body;

    let campus = new Campus({
        nombre: body.nombre,
        descripcion: body.descripcion,
        cors: body.cors,        
        url: body.url        
    });


    campus.save((err, CampusDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!CampusDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            Campus: CampusDB
        });


    });


});

// ============================
// Mostrar todas las Campuss
// ============================
app.put('/campus/:id', [verificaToken, verificaAdmin_Role], (req, res) => {

    let id = req.params.id;
    let body = req.body;

    let descCampus = {
        nombre: body.nombre,
        descripcion: body.descripcion,
        cors: body.cors,
        url: body.url
    };

    Campus.findByIdAndUpdate(id, descCampus, { new: true, runValidators: true }, (err, CampusDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!CampusDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            Campus: CampusDB
        });

    });


});

// ============================
// Mostrar todas las Campuss
// ============================
app.delete('/campus/:id', [verificaToken, verificaAdmin_Role], (req, res) => {
    // solo un administrador puede borrar Campuss
    // Campus.findByIdAndRemove
    let id = req.params.id;

    // Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {

    let cambiaEstado = {
        estado: false
    };

    Campus.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, CampusBorrada) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        if (!CampusBorrada) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Campusno encontrado'
                }
            });
        }

        res.json({
            ok: true,
            Campus: CampusBorrada
        });

    });




});



module.exports = app;