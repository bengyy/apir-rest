const express = require('express');
const app = express();

let { verificaToken, verificaAdmin_Role } = require('../middlewares/autenticacion');

let DetCampArea= require('../models/detCampusCarrera');

// ============================
// Mostrar todas las DetCampArea
// ============================
app.get('/detCampArea', (req, res) => {
    
    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    DetCampArea.find({estado: true })
        .skip(desde)
        .limit(limite)
        .sort('nombre')
        .exec((err, DetCampAreas) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                DetCampAreas
            });

        })
});
app.get('/detCampAreaT', (req, res) => {

    DetCampArea.find({estado: true })
        .sort('nombre')
        .exec((err, DetCampAreas) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                DetCampAreas
            });

        })
});

// ============================
// Mostrar una DetCampAreapor ID
// ============================
app.get('/detCampArea/:id', (req, res) => {
    // DetCampArea.findById(....);

    let id = req.params.id;

    DetCampArea.findById(id, (err, DetCampAreaDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!DetCampAreaDB) {
            return res.status(500).json({
                ok: false,
                err: {
                    message: 'El ID no es correcto'
                }
            });
        }


        res.json({
            ok: true,
            DetCampArea: DetCampAreaDB
        });

    });


});

// ============================
// Crear nueva DetCampArea
// ============================
app.post('/detCampArea', [verificaToken, verificaAdmin_Role], (req, res) => {
    // regresa la nueva DetCampArea
    // req.usuario._id
    let body = req.body;

    let detCampArea= new DetCampArea({
        nombre: body.nombre,
        descripcion: body.descripcion,            
        area: body.area,
        campus: body.campus
    });


    detCampArea.save((err, DetCampAreaDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!DetCampAreaDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            DetCampArea: DetCampAreaDB
        });


    });


});

// ============================
// Mostrar todas las DetCampAreas
// ============================
app.put('/detCampArea/:id', [verificaToken, verificaAdmin_Role], (req, res) => {

    let id = req.params.id;
    let body = req.body;

    let descDetCampArea= {
        nombre: body.nombre,
        descripcion: body.descripcion,            
        url: body.url,  
        area: body.area,
        carrera: body.carrera
    };

    DetCampArea.findByIdAndUpdate(id, descDetCampArea, { new: true, runValidators: true }, (err, DetCampAreaDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!DetCampAreaDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            DetCampArea: DetCampAreaDB
        });

    });


});

// ============================
// Mostrar todas las DetCampAreas
// ============================
app.delete('/detCampArea/:id', [verificaToken, verificaAdmin_Role], (req, res) => {
    // solo un administrador puede borrar DetCampAreas
    // DetCampArea.findByIdAndRemove
    let id = req.params.id;

    // Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {

    let cambiaEstado = {
        estado: false
    };

    DetCampArea.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, DetCampAreaBorrada) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        if (!DetCampAreaBorrada) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'DetCampAreano encontrado'
                }
            });
        }

        res.json({
            ok: true,
            DetCampArea: DetCampAreaBorrada
        });

    });




});



module.exports = app;