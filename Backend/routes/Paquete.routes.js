const router = require('express').Router()
const { Paquete, Camionero } = require('../database/models')

router.get("/:id", (req, res) => {
    Paquete.findByPk(req.params.id).then(obj => {
        res.json(obj)
    })
})

router.get("/", (req, res) => {
    Paquete.findAll({
        attributes: ['Codigo', 'descripcion', 'destinatario','direccion dest.'],
        include: [{
            model: Camionero,
            as: 'camionero',
            attributes: ["nombre", "dni"]
        }]
    }).then(list => {
        res.json(list)
    })
})

router.post("/create", (req, res) => {
    Paquete.create({
        codigo: req.body.codigo,
        descripcion: req.body.descripcion,
        destinatario: req.body.destinatario,
        direccionDest: req.body.direccionDest,
         
    }).then(Paquete => {
        res.json(Paquete)
    }).catch(error => {
        res.json(error)
    })
})

router.put('/update/:id', (req, res) => {
    Paquete.update({
        codigo: req.body.codigo,
        descripcion: req.body.descripcion,
        destinatario: req.body.destinatario,
        direccionDest: req.body.direccionDest,
    }, {
        where: {
            id: req.params.id
        }
    }).then(data => {
        res.json(data)
    }).catch(error => {
        res.json(error)
    })
})

router.delete('/delete/:id', (req, res) => {
    Paquete.destroy({
        where: {
            id: req.params.id
        }
    }).then(data => {
        res.json(data)
    }).catch(error => {
        res.json(error)
    })
})

module.exports = router;