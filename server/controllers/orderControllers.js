const { ObjectId } = require("mongodb");
const cartControllers = require("./cartControllers");

var mongoClient = require("mongodb").MongoClient;

const { Connection } = require("./dbConfig");

const dbUrl = Connection.dbUrl;
const dbName = Connection.dbName;
const collectionName = "orders";

function placeOrder(request, response) {
    mongoClient.connect(dbUrl, { useUnifiedTopology: true }, (err, dbHost) => {
        if (err) {
            response.status(500);
            response.json(err);
        }
        else {
            let db = dbHost.db(dbName);
            db.collection(collectionName, (err, coll) => {
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

function getOrders(request, response){
    mongoClient.connect(dbUrl, { useUnifiedTopology: true }, (err, dbHost) => {
        if (err) {
            response.status(500);
            response.json(err);
        }
        else {
            let db = dbHost.db(dbName);
            db.collection(collectionName, (err, coll) => {
                if (err) {
                    response.status(500);
                    response.json(err);
                }
                else {
                    let query = [
                      {
                        '$match': request.body
                      }, {
                        '$addFields': {
                          'productIdObj': {
                            '$toObjectId': '$productId'
                          }
                        }
                      }, {
                        '$lookup': {
                          'from': 'products', 
                          'localField': 'productIdObj', 
                          'foreignField': '_id', 
                          'as': 'productDetails'
                        }
                      }, {
                        '$unwind': {
                          'path': '$productDetails'
                        }
                      }, {
                        '$project': {
                          'productCount': 1, 
                          'address': 1, 
                          'modeOfPayment': 1, 
                          'timestamp': 1, 
                          'productDetails': 1, 
                          'price': 1
                        }
                      }, {
                        '$sort': {
                          'timestamp': -1
                        }
                      }
                    ]
                    coll.aggregate(query).toArray((err, res) => {
                        if (err) {
                            response.status(500);
                            response.json(err);
                        }
                        else {
                            response.status(200);
                            response.json(res);
                        }
                    })
                }
            })
        }
    })
}

module.exports = { placeOrder, getOrders }