import mongoose from 'mongoose'

let models = {}

console.log("connecting to mongodb")

//TODO: put your connection string below
await mongoose.connect('mongodb+srv://harmanzhang60:HarmanInfo441Zhang@cluster0.ktcnj.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0');

//mongodb+srv://websharerUser:pa55w0rd@cluster0.4pad9.mongodb.net/userDemo?retryWrites=true&w=majority&appName=Cluster0
//            password here:  ^^^^^^^^      Database name here:   ^^^^^^^^

console.log("successfully connected to mongodb!")

const newPost = new mongoose.Schema({
    username: String,
    url: String,
    description: String,
    likes: [String],
    created_date: Date
})

models.Post = mongoose.model('Post', newPost)

const newComment = new mongoose.Schema({
    username: String,        
    comment: String,
    post: {type: mongoose.Schema.Types.ObjectId, ref: "post"}, // ObjectId referencing a Post
    created_date: Date       
});

UserInfo

const newUserInfo = new mongoose.Schema({
    FavorateIceCream: String    
});

models.newUserInfo = mongoose.model('UserInfo', newUserInfo)

console.log("mongoose models created")

export default models