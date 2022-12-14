const router = require('express').Router();
const path = require('path');

const camionerosRouter = require('./camionero.routes')
const productosRouter = require('./paquetes.routes')

router.get('/', (req, res) => {
    res.sendFile(path.resolve('./views/index.html'));
})

router.use('/camioneros',camionerosRouter)
router.use('/paquetes', paquetesRouter)



module.exports = router;