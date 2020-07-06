const express = require('express');
const app = express();

let { verificaToken, verificaAdmin_Role } = require('../middlewares/autenticacion');

let Contacto = require('../models/contacto');

app.get('/contactoT', (req, res) => {
    

    Contacto.find({estado: true })
        .exec((err, Contactos) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                Contactos
            });

        })
});

// ============================
// Mostrar todas las Contactos
// ============================
app.get('/contacto', (req, res) => {
    
    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    Contacto.find({estado: true })
        .skip(desde)
        .limit(limite)
        .sort('nombre')
        .exec((err, Contactos) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                Contactos
            });

        })
});

// ============================
// Mostrar una Contacto por ID
// ============================
app.get('/contacto/:id', (req, res) => {
    // Contacto.findById(....);

    let id = req.params.id;

    Contacto.findById(id, (err, ContactoDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!ContactoDB) {
            return res.status(500).json({
                ok: false,
                err: {
                    message: 'El ID no es correcto'
                }
            });
        }


        res.json({
            ok: true,
            Contacto: ContactoDB
        });

    });


});

// ============================
// Crear nueva Contacto
// ============================
app.post('/contacto', [verificaToken, verificaAdmin_Role], (req, res) => {
    // regresa la nueva Contacto
    // req.usuario._id
    let body = req.body;

    let contacto = new Contacto({
        nombre: body.nombre,
        puesto: body.puesto,
        correo: body.correo,
        telefono: body.telefono,
        extencion: body.extencion,
        telefonoDirecto: body.telefonoDirecto      
    });


    contacto.save((err, ContactoDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!ContactoDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            Contacto: ContactoDB
        });


    });


});

// ============================
// Mostrar todas las Contactos
// ============================
app.put('/contacto/:id', [verificaToken, verificaAdmin_Role], (req, res) => {

    let id = req.params.id;
    let body = req.body;

    let descContacto = {
        nombre: body.nombre,
        puesto: body.puesto,
        correo: body.correo,
        telefono: body.telefono,
        extencion: body.extencion,
        telefonoDirecto: body.telefonoDirecto  
    };

    Contacto.findByIdAndUpdate(id, descContacto, { new: true, runValidators: true }, (err, ContactoDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!ContactoDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            Contacto: ContactoDB
        });

    });


});

// ============================
// Mostrar todas las Contactos
// ============================
app.delete('/contacto/:id', [verificaToken, verificaAdmin_Role], (req, res) => {
    // solo un administrador puede borrar Contactos
    // Contacto.findByIdAndRemove
    let id = req.params.id;

    // Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {

    let cambiaEstado = {
        estado: false
    };

    Contacto.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, ContactoBorrada) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        if (!ContactoBorrada) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Contactono encontrado'
                }
            });
        }

        res.json({
            ok: true,
            Contacto: ContactoBorrada
        });

    });




});



module.exports = app;