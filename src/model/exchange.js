var mongoose = require('mongoose');

const stockExchange = mongoose.Schema({
    stockName : {
        type : String
    },
    stockExchange : {
        type : String
    },
    price : {
        type : Number
    },
    volume : {
        type : Number
    }
},{
    timestamps: true
});

module.exports = mongoose.model('Stock Exchange', stockExchange, 'stockExchange');