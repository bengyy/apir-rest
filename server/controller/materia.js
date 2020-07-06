const express = require('express');
const app = express();

let { verificaToken, verificaAdmin_Role } = require('../middlewares/autenticacion');

let Materia = require('../models/materiaM');

// ============================
// Mostrar todas las Materias
// ============================
app.get('/materia', (req, res) => {
    
    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    Materia.find({estado: true })
        .skip(desde)
        .limit(limite)
        .sort('nombre')
        .exec((err, Materias) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                Materias
            });

        })
});

//mostar todos
app.get('/materiaT', (req, res) => {
    

    Materia.find({estado: true })
        .sort('nombre')
        .exec((err, Materias) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                Materias
            });

        })
});


// ============================
// Mostrar una Materia por ID
// ============================
app.get('/materia/:id', (req, res) => {
    // Materia.findById(....);

    let id = req.params.id;

    Materia.findById(id, (err, MateriaDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!MateriaDB) {
            return res.status(500).json({
                ok: false,
                err: {
                    message: 'El ID no es correcto'
                }
            });
        }


        res.json({
            ok: true,
            Materia: MateriaDB
        });

    });


});

// ============================
// Crear nueva Materia
// ============================
app.post('/materia', [verificaToken, verificaAdmin_Role], (req, res) => {
    // regresa la nueva Materia
    // req.usuario._id
    let body = req.body;

    let materia = new Materia({
        nombre: body.nombre,
        descripcion: body.descripcion,
        cors: body.cors,        
        url: body.url        
    });


    materia.save((err, MateriaDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!MateriaDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            Materia: MateriaDB
        });


    });


});

// ============================
// Mostrar todas las Materias
// ============================
app.put('/materia/:id', [verificaToken, verificaAdmin_Role], (req, res) => {

    let id = req.params.id;
    let body = req.body;

    let descMateria = {
        nombre: body.nombre,
        descripcion: body.descripcion,
        cors: body.cors,
        url: body.url
    };

    Materia.findByIdAndUpdate(id, descMateria, { new: true, runValidators: true }, (err, MateriaDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!MateriaDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            Materia: MateriaDB
        });

    });


});

// ============================
// Mostrar todas las Materias
// ============================
app.delete('/materia/:id', [verificaToken, verificaAdmin_Role], (req, res) => {
    // solo un administrador puede borrar Materias
    // Materia.findByIdAndRemove
    let id = req.params.id;

    // Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {

    let cambiaEstado = {
        estado: false
    };

    Materia.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, MateriaBorrada) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        if (!MateriaBorrada) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Materiano encontrado'
                }
            });
        }

        res.json({
            ok: true,
            Materia: MateriaBorrada
        });

    });




});



module.exports = app;