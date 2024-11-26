import mongoose from 'mongoose'

let models = {}

console.log("connecting to mongodb")

//TODO: put your connection string below
await mongoose.connect('mongodb+srv://harmanzhang60:HarmanInfo441Zhang@cluster0.ktcnj.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0');

//mongodb+srv://websharerUser:pa55w0rd@cluster0.4pad9.mongodb.net/userDemo?retryWrites=true&w=majority&appName=Cluster0
//            password here:  ^^^^^^^^      Database name here:   ^^^^^^^^

console.log("successfully connected to mongodb!")

const newItinerary = new mongoose.Schema({
    destination: { type: String, required: true } ,
    airline: { type: String, required: true } ,
    created_date: { type: Date, deafault: Date.now },
    summary: { type: String,  default: true },
    photo: { type: String, required: true}
})

models.Itinerary = mongoose.model('Itinerary', newItinerary)

console.log("mongoose models created")

export default models