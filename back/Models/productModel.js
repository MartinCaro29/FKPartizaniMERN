let mongoose = require ("mongoose");

let productSchema = new mongoose.Schema({
    name:{
        type: String,
        require:true,
    },

    image:{
        type: String,
        require:true,
    },
    category:{
        type: String,
        require: true,
        enum: ['Bluza', 'Uniforma', 'Veshje te tjera', 'Aksesore'],
    },
    slug:{
        type: String,
        require:true,
    },
    description:{
        type: String,
        require: true,
    },

    price:{
        type: Number,
        require: true,
        min: 0,
    validate: {
      validator: Number.isInteger,
    },
    },
    
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;