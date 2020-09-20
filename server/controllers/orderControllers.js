const { ObjectId } = require("mongodb");
const cartControllers = require("./cartControllers");

var mongoClient = require("mongodb").MongoClient;

var mongodbUrl = "mongodb://localhost:27017/";

function placeOrder(request, response) {
    mongoClient.connect(mongodbUrl, { useUnifiedTopology: true }, (err, dbHost) => {
        if (err) {
            response.status(500);
            response.json(err);
        }
        else {
            let db = dbHost.db("shopSpot");
            db.collection("orders", (err, coll) => {
                if (err) {
                    response.status(500);
                    response.json(err);
                }
                else {
                    let query = request.body;
                    let userId = request.body[0]['userId'];
                    coll.insertMany(query, (err, res) => {
                        if (err) {
                            response.status(500);
                            response.json(err);
                        }
                        else {
                            cartControllers.removeItemsBYUserId(userId);
                            response.status(200);
                            response.json(res);
                        }
                    })
                }
            })
        }
    })
}

module.exports = { placeOrder }