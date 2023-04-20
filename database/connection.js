const mongoose = require('mongoose');

const connection = async() => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/my_blog")
        console.log("Connected to database my_blog")

        // parameters for mongoose.connect it throws warning:
        // useNewUrlParser: true
        // useUnifiedTopology: true
        // useCreateIndex: true

    } catch (error) {
        console.log(error);
        throw new Error('Cannot connect to database');
    }
}

module.exports = { connection }