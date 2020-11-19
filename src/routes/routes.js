module.exports = (app) => {
    const controller = require('../controller/controller');

    // Buy stock.
    app.post('/api/buy', controller.buy);

    // List all stocks.
    // app.get('/api/list', controller.list);

    // Fetch stock details.
    // app.get('/api/stock/stockName', controller.find);

    // Update note with note id.
    // app.put('/api/update/stockName', controller.update);

    // sell stock.
    // app.delete('/api/sell/stockName', controller.sell);
}