const express = require('express');
const app = express();

let { verificaToken, verificaAdmin_Role } = require('../middlewares/autenticacion');

let Area= require('../models/areaM');

// ============================
// Mostrar todas las Area
// ============================
app.get('/area', (req, res) => {
    
    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    Area.find({estado: true })
        .skip(desde)
        .limit(limite)
        .sort('nombre')
        .exec((err, Areas) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                Areas
            });

        })
});
app.get('/areaT', (req, res) => {

    Area.find({estado: true })
        .sort('nombre')
        .populate('Carrera','nombre descripcion img url')
        .populate('Campus','nombre descripcion url img cors')
        .exec((err, Areas) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                Areas
            });

        })
});

// ============================
// Mostrar una Areapor ID
// ============================
app.get('/area/:id', (req, res) => {
    // Area.findById(....);

    let id = req.params.id;

    Area.findById(id, (err, AreaDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!AreaDB) {
            return res.status(500).json({
                ok: false,
                err: {
                    message: 'El ID no es correcto'
                }
            });
        }


        res.json({
            ok: true,
            Area: AreaDB
        });

    });


});

// ============================
// Crear nueva Area
// ============================
app.post('/area', [verificaToken, verificaAdmin_Role], (req, res) => {
    // regresa la nueva Area
    // req.usuario._id
    let body = req.body;    
    let area= new Area({
        nombre: body.nombre,
        ing: body.ing,
        descripcion: body.descripcion,            
        area: body.area,
        campus: body.campus,
        url: body.url,
        cautrimestre1: body.cautrimestre1,
        cautrimestre2: body.cautrimestre2,
        cautrimestre3: body.cautrimestre3,
        cautrimestre4: body.cautrimestre4,
        cautrimestre5: body.cautrimestre5,
        cautrimestre6: body.cautrimestre6,
        cautrimestre7: body.cautrimestre7,
        cautrimestre8: body.cautrimestre8,
        cautrimestre9: body.cautrimestre9,
        cautrimestre10: body.cautrimestre10,
        cautrimestre11: body.cautrimestre11,
        carrera: body.carrera  
    });


    area.save((err, AreaDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!AreaDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            Area: AreaDB
        });


    });


});

// ============================
// Mostrar todas las Areas
// ============================
app.put('/area/:id', [verificaToken, verificaAdmin_Role], (req, res) => {

    let id = req.params.id;
    let body = req.body;

    let descArea= {
        nombre: body.nombre,
        ing: body.ing,
        descripcion: body.descripcion,            
        area: body.area,
        campus: body.campus,
        url: body.url,
        img: body.img,
        cautrimestre1: body.cautrimestre1,
        cautrimestre2: body.cautrimestre2,
        cautrimestre3: body.cautrimestre3,
        cautrimestre4: body.cautrimestre4,
        cautrimestre5: body.cautrimestre5,
        cautrimestre6: body.cautrimestre6,
        cautrimestre7: body.cautrimestre7,
        cautrimestre8: body.cautrimestre8,
        cautrimestre9: body.cautrimestre9,
        cautrimestre10: body.cautrimestre10,
        cautrimestre11: body.cautrimestre11,
        carrera: body.carrera  
    };

    Area.findByIdAndUpdate(id, descArea, { new: true, runValidators: true }, (err, AreaDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!AreaDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            Area: AreaDB
        });

    });


});

// ============================
// Mostrar todas las Areas
// ============================
app.delete('/area/:id', [verificaToken, verificaAdmin_Role], (req, res) => {
    // solo un administrador puede borrar Areas
    // Area.findByIdAndRemove
    let id = req.params.id;

    // Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {

    let cambiaEstado = {
        estado: false
    };

    Area.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, AreaBorrada) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        if (!AreaBorrada) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Area no encontrado'
                }
            });
        }

        res.json({
            ok: true,
            Area: AreaBorrada
        });

    });




});



module.exports = app;