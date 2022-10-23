const router = require('express').Router();
const path = require('path');

// Listar Camiones --> /Camion
router.get('/', (_req, res) => {
    res.sendFile(path.resolve('./views/Camiones/listarCamion.html'));
})

// Crear Camion --> /Camion/create
router.get('/create', (req, res) => {
    res.sendFile(path.resolve('./views/Camiones/crearCamion.html'));
})

// Editar Camion --> /Camion/update/:id
router.get('/update/:id', (req, res) => {
    res.sendFile(path.resolve('./views/Camiones/editarCamion.html'));
})

module.exports = router;