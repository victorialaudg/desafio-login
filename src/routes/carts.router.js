import {Router} from 'express'
const router = Router()

router.get('/', (req,res)=>{
    //res.send('Listando carritos...')
    res.render('list',{})
})

router.get('/:name', (req, res)=>{
    const name = req.params.name
    res.send(`Listando carrito ${name}`)
})

router.post('/', (req, res) => {
    res.send('Creando carrito')
})

router.delete('/:name', (req, res) => {
    const name = req.params.name
    res.send(`Borrando carrito ${name}`)
})

export default router