const express = require('express');
const app = express();

let { verificaToken, verificaAdmin_Role } = require('../middlewares/autenticacion');

let ModelEdu = require('../models/modeloEdu');

// ============================
// Mostrar todas las ModelEdu
// ============================
app.get('/modeledu', (req, res) => {
    
    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    ModelEdu.find({estado: true })
        .skip(desde)
        .limit(limite)
        .sort('nombre')
        .exec((err, ModelEdus) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                ModelEdus
            });

        })
});

app.get('/modeleduT', (req, res) => {
    
 

    ModelEdu.find({estado: true })
        .sort('nombre')
        .exec((err, ModelEdus) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                ModelEdus
            });

        })
});
// ============================
// Mostrar una ModelEdu por ID
// ============================
app.get('/modeledu/:id', (req, res) => {
    // ModelEdu.findById(....);

    let id = req.params.id;

    ModelEdu.findById(id, (err, ModelEduDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!ModelEduDB) {
            return res.status(500).json({
                ok: false,
                err: {
                    message: 'El ID no es correcto'
                }
            });
        }


        res.json({
            ok: true,
            ModelEdu: ModelEduDB
        });

    });


});

// ============================
// Crear nueva ModelEdu
// ============================
app.post('/modeledu', [verificaToken, verificaAdmin_Role], (req, res) => {
    // regresa la nueva ModelEdu
    // req.usuario._id
    let body = req.body;
    let modelEdu = new ModelEdu({
        nombre: body.nombre,
        descripcionCorta: body.descripcionCorta ,
        descripcion: body.descripcion,            
        url: body.url,  
        campus: body.campus
    });


    modelEdu.save((err, ModelEduDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!ModelEduDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            ModelEdu: ModelEduDB
        });


    });


});

// ============================
// Mostrar todas las ModelEdus
// ============================
app.put('/modeledu/:id', [verificaToken, verificaAdmin_Role], (req, res) => {

    let id = req.params.id;
    let body = req.body;

    let descModelEdu = {
        nombre: body.nombre,
        descripcionCorta: body.descripcionCorta ,
        descripcion: body.descripcion,            
        url: body.url,  
        campus: body.campus
    };

    ModelEdu.findByIdAndUpdate(id, descModelEdu, { new: true, runValidators: true }, (err, ModelEduDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!ModelEduDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            ModelEdu: ModelEduDB
        });

    });


});

// ============================
// Mostrar todas las ModelEdus
// ============================
app.delete('/modeledu/:id', [verificaToken, verificaAdmin_Role], (req, res) => {
    // solo un administrador puede borrar ModelEdus
    // ModelEdu.findByIdAndRemove
    let id = req.params.id;

    // Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {

    let cambiaEstado = {
        estado: false
    };

    ModelEdu.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, ModelEduBorrada) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        if (!ModelEduBorrada) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'ModelEduno encontrado'
                }
            });
        }

        res.json({
            ok: true,
            ModelEdu: ModelEduBorrada
        });

    });




});



module.exports = app;