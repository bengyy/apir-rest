const express = require('express');
const app = express();

let { verificaToken, verificaAdmin_Role } = require('../middlewares/autenticacion');

let Noticia = require('../models/noticiasM');

app.get('/noticiaT', (req, res) => {
    

    Noticia.find({estado: true })
        .exec((err, Noticias) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                Noticias
            });

        })
});

// ============================
// Mostrar todas las Noticias
// ============================
app.get('/noticia', (req, res) => {
    
    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    Noticia.find({estado: true })
        .skip(desde)
        .limit(limite)
        .sort('nombre')
        .exec((err, Noticias) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                Noticias
            });

        })
});

// ============================
// Mostrar una Noticia por ID
// ============================
app.get('/noticia/:id', (req, res) => {
    // Noticia.findById(....);

    let id = req.params.id;

    Noticia.findById(id, (err, NoticiaDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!NoticiaDB) {
            return res.status(500).json({
                ok: false,
                err: {
                    message: 'El ID no es correcto'
                }
            });
        }


        res.json({
            ok: true,
            Noticia: NoticiaDB
        });

    });


});

// ============================
// Crear nueva Noticia
// ============================
app.post('/noticia', [verificaToken, verificaAdmin_Role], (req, res) => {
    // regresa la nueva Noticia
    // req.usuario._id
    let body = req.body;

    let noticia = new Noticia({
        nombre: body.nombre,
        descripcion: body.descripcion,
        descripcionCorta: body.descripcionCorta,        
        url: body.url        
    });


    noticia.save((err, NoticiaDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!NoticiaDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            Noticia: NoticiaDB
        });


    });


});

// ============================
// Mostrar todas las Noticias
// ============================
app.put('/noticia/:id', [verificaToken, verificaAdmin_Role], (req, res) => {

    let id = req.params.id;
    let body = req.body;

    let descNoticia = {
        nombre: body.nombre,
        descripcion: body.descripcion,
        descripcionCorta: body.descripcionCorta,
        url: body.url
    };

    Noticia.findByIdAndUpdate(id, descNoticia, { new: true, runValidators: true }, (err, NoticiaDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!NoticiaDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            Noticia: NoticiaDB
        });

    });


});

// ============================
// Mostrar todas las Noticias
// ============================
app.delete('/noticia/:id', [verificaToken, verificaAdmin_Role], (req, res) => {
    // solo un administrador puede borrar Noticias
    // Noticia.findByIdAndRemove
    let id = req.params.id;

    // Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {

    let cambiaEstado = {
        estado: false
    };

    Noticia.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, NoticiaBorrada) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        if (!NoticiaBorrada) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Noticiano encontrado'
                }
            });
        }

        res.json({
            ok: true,
            Noticia: NoticiaBorrada
        });

    });




});



module.exports = app;