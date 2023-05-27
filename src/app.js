import express from 'express'
import mongoose from 'mongoose'
import handlebars from 'express-handlebars'


import session from "express-session"
import MongoStore from "connect-mongo"
import ecommerceRouter from './routes/products.router.js'
import cartsRouter from './routes/carts.router.js'

import sessionRouter from './routes/session.router.js'

const uri='mongodb+srv://coder:coder@backend39755.v9fwrug.mongodb.net/'


const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//Config. del motor de plantillas
app.engine('handlebars', handlebars.engine())
app.set('views', './src/views')
app.set('view engine', 'handlebars')


//start config. de carpeta de archivos estáticos
app.use(express.static('./src/public'))
//end config. archivos estáticos



app.get('/', (req, res) => res.send('Server OK!'))
app.use('/carts', cartsRouter)

app.use('/', ecommerceRouter)
app.use('/products', ecommerceRouter)
app.use('/sessions', sessionRouter)

mongoose.set('strictQuery', false)


app.use(session({
    store: MongoStore.create({
            //mongoUrl: 'mongodb://localhost:8080',
            mongoUrl: uri,
            dbName: 'integradora1',
            ttl:300,
    }),
    secret: 'vicsecret',
    resave: true,
    saveUninitialized: true
}))


await mongoose.connect(uri, {
    dbName: 'integradora1'
})

/*
app.get('/session',(req,res)=>{
    if(req.session.counter){
        req.session.counter++;
        res.send(`Se ha visitado el sitio ${req.session.counter} veces.`)
    }else{
        req.session.counter=1;
        res.send('¡Bienvenido!')
    }
})*/




app.listen(8080, ()=> console.log('Server Up!'))
