const stockSchema = require('../model/stock');
const exchangeSchema = require('../model/exchange');

exports.buy = (req, res) => {
    var stock = req.body.stockName;
    var exchange = req.body.stockExchange;

    if(!stock){
        return res.status(400).send({
            message: "Stock Name is required.!!!"
        });
    } else if(!exchange) {
        return res.status(400).send({
            message: "Exchange Board Name is required.!!!"
        });
    };

    var stockPrice;
    const getPrice = (stock) => {
        let price;
        exchangeSchema.findOne({stockName: stock}, (err, doc) => {
            // console.log('price', doc.price);
            stockPrice = doc.price;
            // console.log('price', price);
        });
        // return price;
    };

    getPrice(stock);
    console.log('price after call: ', stockPrice);

    const newStock = stockSchema({
        stockName: stock,
        stockExchange: exchange,
        buyPrice: stockPrice,
    });

    stockSchema.findOne({stockName: newStock.stockName}, (err, note) => {
        console.log(newStock.buyPrice)
        if(note) return res.status(400).json({message: 'You have already bought this stock.!'});
        
        newStock.save((err, doc) => {
            if(err) return res.status(400).send(err);

            res.status(201).json({
                post: true,
                status: "success",
                details: doc
            });
        });
    });
};

// exports.list = ((req, res) => {
//     stockSchema.find((err, doc) => {
//         if(err) return res.status(400).send(err);
//         res.status(200).json(doc);
//     });
// });

// exports.find = ((req, res) => {
//     stockSchema.findById(req.params.stockName, (err, doc) => {
//         if(err) return res.status(400).send(err);
//         if(!doc) return res.status(404).json({message: 'Stock with given Name Not found.!'});

//         res.status(200).json(doc);
//     });
// });

// exports.update = ((req, res) => {
//     if(!req.body.title || !req.body.author || !req.body.content) {
//         return res.status(400).send({
//             message: "Every field is required"
//         });
//     }

//     stockSchema.findByIdAndUpdate(req.params.stockName), {
//         title: req.body.title,
//         author: req.body.author,
//         content: req.body.content
//     }, {new: true}, ((err, doc) => {
//         if(err) return res.status(400).send(err);
//         if(!doc) return res.status(404).json({message: 'Stock with given Name NOT found.!'})

//         res.status(200).json({
//             post: true,
//             note: doc
//         });
//     });
// });

// exports.sell = ((req, res) => {
//     stockSchema.findByIdAndDelete(req.params.stockName, (err, doc) => {
//         if(err) return res.status(400).send(err);
//         if(!doc) return res.status(404).json({message: 'You dont have any Stock with this Name.!'})

//         res.status(200).send({
//             delete: true,
//             note: doc 
//         });
//     });
// });