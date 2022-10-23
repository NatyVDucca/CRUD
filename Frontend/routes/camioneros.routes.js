const router = require('express').Router();
const path = require('path');

// Listar Camioneros --> /camionero
router.get('/', (_req, res) => {
    res.sendFile(path.resolve('./views/Camioneros/listarCamionero.html'));
})

// Crear Camionero --> /camionero/create
router.get('/create', (req, res) => {
    res.sendFile(path.resolve('./views/Camioneros/crearCamionero.html'));
})

// Editar Camionero --> /camionero/update/:id
router.get('/update/:id', (req, res) => {
    res.sendFile(path.resolve('./views/Camioneros/editarCamionero.html'));
})

module.exports = router;