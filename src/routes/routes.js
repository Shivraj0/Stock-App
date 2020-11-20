module.exports = (app) => {
    const controller = require('../controller/controller');

    // Buy stock.
    app.post('/api/buy', controller.buy);

    // List all stocks.
    app.get('/api/list', controller.list);

    // Fetch stock details.
    app.get('/api/:stockName', controller.find);

    // Update stock
    app.put('/api/update', controller.update);

    // sell stock.
    app.delete('/api/sell/:stockName', controller.sell);
}