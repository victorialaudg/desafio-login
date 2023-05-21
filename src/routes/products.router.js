import {Router} from 'express'
import productModel from '../models/products.model.js'
const router = Router()
/*
router.get('/', async (req,res)=>{
    //res.send('Listando productos...')
    const products = await productModel.find().lean().exec()
    console.log(products)
    res.render('list', {products})
})*/

router.get('/', (req,res) => (res.render('index')))

router.get('/products', async(req,res) => {
    let page = parseInt(req.query.page)
    if(!page) page = 1
    const result= await productModel.paginate({}, {page, limit:3, lean: true})
    result.prevLink = result.hasPrevPage ? `/products?page=${result.prevPage}` : '' 
    result.nextLink = result.hasNextPage ? `/products?page=${result.nextPage}` : '' 
    console.log(result)
    res.render('products', result)
})


//ruta products/create
router.get('/create', (req, res) =>{
    res.render('create',{})
})
router.get('/products/create', (req, res) =>{
    res.render('create',{})
})
//ruta products/update
router.get('/update/:name', async (req, res) =>{
    const name = req.params.name
    const products = await productModel.findOne({name}).lean().exec()
    res.render('update',{products})
})

router.get('/:name', async (req, res)=>{
    const name = req.params.name
    //res.send(`Listando producto ${name}`)
    const products = await productModel.findOne({name}).lean().exec()
    res.render('one', {products})
})

router.post('/', async (req, res) => {
    //res.send('Creando producto...')
    const productNew= req.body
    const productGenerated = new productModel(productNew)
    await productGenerated.save()
    res.redirect(`/products/${productGenerated.name}`)
})

router.put('/:name', async (req,res)=>{
    const name= req.params.name
    const productNewData = req.body
    try{
        await productModel.updateOne({name}, {...productNewData})
    }catch(err){
        res.send({err})
    }
})

router.delete('/:name', async (req, res) => {
    const name = req.params.name
    try{
        await productModel.deleteOne({name})
        res.send(`Producto ${name} borrado exitosamente!`)
    }catch (err){
        res.send({err})
    }
    
})

export default router