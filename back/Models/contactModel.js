let mongoose = require ("mongoose");

let contactSchema = new mongoose.Schema({
    name:{
        type: String,
        require:true,
    },

    email:{
        type:String,
        require:true,

    },

    comment:{
        type: String,
        require:true,
    },

    date:{
        type: String,
        require:true,
    }
});

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;