const router = require('express').Router()
const camioneroRouter = require('./Camionero.routes')
const paqueteRouter = require('./Paquete.routes')

router.use('/camioneros', camioneroRouter)
router.use('/paquetes', paqueteRouter)
module.exports = router;