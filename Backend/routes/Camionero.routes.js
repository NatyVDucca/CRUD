const router = require('express').Router()
const {Camionero } = require('../database/models')

router.get("/:id", (req, res) => {
    Camionero.findByPk(req.params.id).then(obj => {
        res.json(obj)
    })
})

router.get("/", (req, res) => {
    Camionero.findAll({}).then(list => {
        res.json(list)
    })
})

router.post("/create", (req, res) => {
    Camionero.create({
        nombre: req.body.nombre,
        telefono: req.body.telefono,
        direccion: req.body.direccion,
        salario: req.body.salario,
        region: req.body.region
    }).then(Camionero => {
        res.json(Camionero)
    })
})

router.put('/update/:id', (req, res) => {
    Camionero.update({
        nombre: req.body.nombre,
        telefono: req.body.telefono,
        direccion: req.body.direccion,
        salario: req.body.salario,
        region: req.body.region     
        
        
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
    Camionero.destroy({
        where: {
            id: req.params.id
        }
    }).then(data => {
        res.json(data)
    }).catch(error => {
        res.json(error)
    })
})

module.exports = router