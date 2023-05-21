import mongoose from 'mongoose'
import productModel from './src/models/products.model.js'

const uri='mongodb+srv://coder:coder@backend39755.v9fwrug.mongodb.net/'

const main = async ()=> {
    await mongoose.connect(uri, {
        dbName: 'integradora1'
    })
    console.log('DB connected!')

    //const response = await productModel.find({type: "Blend"})
    const response = await productModel.paginate({type: "Blend"},{limit:1, page:1})    
    console.log(response)
}

main()