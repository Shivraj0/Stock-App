var mongoose = require('mongoose');

const myStocks = mongoose.Schema({
    stockName : {
        type: String
    },
    stockExchange : {
        type: String
    },
    buyPrice : {
        type : Number
    }
},{ 
    timestamps: true
});

module.exports = mongoose.model('Stocks', myStocks, 'stock');
