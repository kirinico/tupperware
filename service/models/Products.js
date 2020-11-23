const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    photoURL: {
        type: String,
        required: true,
        trim: true
    },
    descripcion:{
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
})

module.exports = mongoose.model('Productos',userSchema )