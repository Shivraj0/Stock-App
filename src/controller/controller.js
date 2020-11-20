const stockSchema = require('../model/stock');
// const exchangeSchema = require('../model/exchange');

const verifyInput = (stock, exchange, price, volume) => {
    if(!stock){
        return res.status(400).send({
            message: "Stock Name is required.!!!"
        });
    } else if(!exchange) {
        return res.status(400).send({
            message: "Exchange Board Name is required.!!!"
        });
    } else if(!price) {
        return res.status(400).send({
            message: "Buying price is required.!!!"
        });
    } else if(!volume) {
        return res.status(400).send({
            message: "Quantity of shares is required.!!!"
        });
    };
};

exports.buy = (req, res) => {
    const stock = req.body.stockName;
    const exchange = req.body.stockExchange;
    const price = req.body.buyPrice;
    const volume = req.body.volume;

    verifyInput(stock, exchange, price, volume);

    const newStock = stockSchema({
        stockName: stock,
        stockExchange: exchange,
        buyPrice: price,
        volume: volume
    });

    stockSchema.findOne({stockName: newStock.stockName}, (err, note) => {

        if(note) return res.status(400).json({message: 'You have already bought this stock.!'});
        
        newStock.save((err, doc) => {
            if(err) return res.status(400).send(err);

            res.status(201).json({
                POST: true,
                status: "success",
                details: doc
            });
        });
    });
    
};

exports.list = ((req, res) => {
    stockSchema.find((err, doc) => {
        if(err) return res.status(400).send(err);
        if(!doc) return res.status(404).json({
            message: "You have not bought any stocks.!!!"
        });

        res.status(200).json({
            GET: true,
            status: "success",
            detais:doc
        });
    });
});

exports.find = ((req, res) => {
    stockSchema.findOne({stockName: req.params.stockName}, (err, doc) => {
        if(err) return res.status(400).send(err);
        if(!doc) return res.status(404).json({
            message: 'Stock with given Name Not found.!'
        });

        res.status(200).json({
            GET: true,
            status: "success",
            details: doc
        });
    });
});

exports.update = ((req, res) => {

    const stock = req.body.stockName;
    const exchange = req.body.stockExchange;
    const price = req.body.buyPrice;
    const volume = req.body.volume;

    verifyInput(stock, exchange, price, volume);

    stockSchema.findOneAndUpdate({stockName: stock}, {
        stockName: stock,
        stockExchange: exchange,
        buyPrice: price,
        volume: volume
    }, {returnNewDocument: true, useFindAndModify: false}).then((doc) => {
        res.status(200).json({
            PUT: true,
            status: "success",
            details: doc
        });
    })
    .catch((err) => {
        res.status(404).json({
            message: 'Stock with given Name NOT found.!',
        error: err
        });
    });
});

exports.sell = ((req, res) => {
    stockSchema.findOneAndDelete({stockName: req.params.stockName}, (err, doc) => {
        if(err) return res.status(400).send(err);
        if(!doc) return res.status(404).json({message: 'You dont have any Stock with this Name.!'})

        res.status(200).send({
            DELETE: true,
            status: "success",
            details: doc 
        });
    });
});