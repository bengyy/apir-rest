const express = require('express');
const app = express();

let { verificaToken, verificaAdmin_Role } = require('../middlewares/autenticacion');

let Servicio = require('../models/servicioM');

// ============================
// Mostrar todas las Servicios
// ============================
app.get('/servicio', (req, res) => {
    
    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    Servicio.find({estado: true })
        .skip(desde)
        .limit(limite)
        .sort('nombre')
        .exec((err, Servicios) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                Servicios
            });

        })
});

//mostar todos
app.get('/servicioT', (req, res) => {
    

    Servicio.find({estado: true })
        .sort('nombre')
        .exec((err, Servicios) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                Servicios
            });

        })
});


// ============================
// Mostrar una Servicio por ID
// ============================
app.get('/servicio/:id', (req, res) => {
    // Servicio.findById(....);

    let id = req.params.id;

    Servicio.findById(id, (err, ServicioDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!ServicioDB) {
            return res.status(500).json({
                ok: false,
                err: {
                    message: 'El ID no es correcto'
                }
            });
        }


        res.json({
            ok: true,
            servicio: ServicioDB
        });

    });


});

// ============================
// Crear nueva Servicio
// ============================
app.post('/servicio', [verificaToken, verificaAdmin_Role], (req, res) => {
    // regresa la nueva Servicio
    // req.usuario._id
    let body = req.body;

    let servicio = new Servicio({
        nombre: body.nombre,
        descripcion: body.descripcion,       
        url: body.url        
    });


    servicio.save((err, ServicioDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!ServicioDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            servicio: ServicioDB
        });


    });


});

// ============================
// Mostrar todas las Servicios
// ============================
app.put('/servicio/:id', [verificaToken, verificaAdmin_Role], (req, res) => {

    let id = req.params.id;
    let body = req.body;

    let descServicio = {
        nombre: body.nombre,
        descripcion: body.descripcion,
        url: body.url
    };

    Servicio.findByIdAndUpdate(id, descServicio, { new: true, runValidators: true }, (err, ServicioDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!ServicioDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            servicio: ServicioDB
        });

    });


});

// ============================
// Mostrar todas las Servicios
// ============================
app.delete('/servicio/:id', [verificaToken, verificaAdmin_Role], (req, res) => {
    // solo un administrador puede borrar Servicios
    // Servicio.findByIdAndRemove
    let id = req.params.id;

    // Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {

    let cambiaEstado = {
        estado: false
    };

    Servicio.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, ServicioBorrada) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        if (!ServicioBorrada) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Serviciono encontrado'
                }
            });
        }

        res.json({
            ok: true,
            servicio: ServicioBorrada
        });

    });




});



module.exports = app;