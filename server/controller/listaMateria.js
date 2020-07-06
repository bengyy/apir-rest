const express = require('express');
const app = express();

let { verificaToken, verificaAdmin_Role } = require('../middlewares/autenticacion');

let ListaMateria= require('../models/listaMateria');

// ============================
// Mostrar todas las ListaMateria
// ============================
app.get('/listaMateria', (req, res) => {
    
    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    ListaMateria.find({estado: true })
        .skip(desde)
        .limit(limite)
        .sort('nombre')
        .exec((err, ListaMaterias) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                ListaMaterias
            });

        })
});
app.get('/listaMateriaT', (req, res) => {

    ListaMateria.find({estado: true })
        .sort('nombre')
        .exec((err, ListaMaterias) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                ListaMaterias
            });

        })
});

// ============================
// Mostrar una ListaMateriapor ID
// ============================
app.get('/listaMateria/:id', (req, res) => {
    // ListaMateria.findById(....);

    let id = req.params.id;

    ListaMateria.findById(id, (err, ListaMateriaDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!ListaMateriaDB) {
            return res.status(500).json({
                ok: false,
                err: {
                    message: 'El ID no es correcto'
                }
            });
        }


        res.json({
            ok: true,
            ListaMateria: ListaMateriaDB
        });

    });


});

// ============================
// Crear nueva ListaMateria
// ============================
app.post('/listaMateria', [verificaToken, verificaAdmin_Role], (req, res) => {
    // regresa la nueva ListaMateria
    // req.usuario._id
    let body = req.body;

    let listaMateria= new ListaMateria({
        nombre: body.nombre,
        descripcion: body.descripcion,    
        area: body.area,
        materia1: body.materia1,
        materia2: body.materia2,
        materia3: body.materia3,
        materia4: body.materia4,
        materia5: body.materia5,
        materia6: body.materia6,
        materia7: body.materia7,
        materia8: body.materia8,
        materia9: body.materia9,
        materia10: body.materia10
    });


    listaMateria.save((err, ListaMateriaDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!ListaMateriaDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            ListaMateria: ListaMateriaDB
        });


    });


});

// ============================
// Mostrar todas las ListaMaterias
// ============================
app.put('/listaMateria/:id', [verificaToken, verificaAdmin_Role], (req, res) => {

    let id = req.params.id;
    let body = req.body;

    let descListaMateria= {
        nombre: body.nombre,
        descripcion: body.descripcion,    
        area: body.area,
        materia1: body.materia1,
        materia2: body.materia2,
        materia3: body.materia3,
        materia4: body.materia4,
        materia5: body.materia5,
        materia6: body.materia6,
        materia7: body.materia7,
        materia8: body.materia8,
        materia9: body.materia9,
        materia10: body.materia10
    };

    ListaMateria.findByIdAndUpdate(id, descListaMateria, { new: true, runValidators: true }, (err, ListaMateriaDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!ListaMateriaDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            ListaMateria: ListaMateriaDB
        });

    });


});

// ============================
// Mostrar todas las ListaMaterias
// ============================
app.delete('/listaMateria/:id', [verificaToken, verificaAdmin_Role], (req, res) => {
    // solo un administrador puede borrar ListaMaterias
    // ListaMateria.findByIdAndRemove
    let id = req.params.id;

    // Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {

    let cambiaEstado = {
        estado: false
    };

    ListaMateria.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, ListaMateriaBorrada) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        if (!ListaMateriaBorrada) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'ListaMateria no encontrado'
                }
            });
        }

        res.json({
            ok: true,
            ListaMateria: ListaMateriaBorrada
        });

    });




});



module.exports = app;