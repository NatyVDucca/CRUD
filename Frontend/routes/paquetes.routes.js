const router = require('express').Router();
const path = require('path');

// Listar paquetes --> /paquetes
router.get('/', (req, res) => {
    res.sendFile(path.resolve('./views/paquetes/listarpaquetes.html'));
})

// Crear Paquete --> /paquetes/create
router.get('/create', (req, res) => {
    res.sendFile(path.resolve('./views/paquetes/crearPaquete.html'));
})

// Editar Paquete --> /paquetes/update/:id
router.get('/update/:id', (req, res) => {
    res.sendFile(path.resolve('./views/paquetes/editarPaquete.html'));
})

module.exports = router;