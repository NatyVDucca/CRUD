const router = require('express').Router();
const path = require('path');

// Listar provincias --> /provincia
router.get('/', (req, res) => {
    res.sendFile(path.resolve('./views/provincias/listarprovincias.html'));
})

// Crear Provincia --> /provincia/create
router.get('/create', (req, res) => {
    res.sendFile(path.resolve('./views/provincias/crearProvincia.html'));
})

// Editar Provincia --> /provincia/update/:id
router.get('/update/:id', (req, res) => {
    res.sendFile(path.resolve('./views/provincias/editarProvincia.html'));
})

module.exports = router;