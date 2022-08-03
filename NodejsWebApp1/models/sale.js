const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//creating a schema in mongoose
const saleSchema = new Schema({
    itemName: {
        type: String,
        required: true
    },
    itemDesc: {
        type: String,
        required: true
    },
    quantity: {
        type: String,
        required: true
    }
}, {timestamps: true});

//creating a model in mongoose
const Sale = mongoose.model('Sale', saleSchema);//this must match with name in your MongoDB

// export the model so that it can be used in the programme
module.exports = Sale;
