import mongoose from 'mongoose'
import mongoosePaginate from "mongoose-paginate-v2"
const productCollection = 'products'


const productSchema = new mongoose.Schema({
    id: Number,
    name: String,
    type: String,
    photo: String,
    category: String
})

productSchema.plugin(mongoosePaginate)
const productModel = mongoose.model(productCollection, productSchema)

export default productModel