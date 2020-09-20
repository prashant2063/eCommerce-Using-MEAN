const { ObjectId } = require("mongodb");

var mongoClient = require("mongodb").MongoClient;

var mongodbUrl = "mongodb://localhost:27017/";

function addToCart(request, response) {
    mongoClient.connect(mongodbUrl, { useUnifiedTopology: true }, (err, dbHost) => {
        if (err) {
            response.status(500);
            response.json(err);
        }
        else {
            let db = dbHost.db("shopSpot");
            db.collection("cart", (err, coll) => {
                if (err) {
                    response.status(500);
                    response.json(err);
                }
                else {
                    let filterQuery = {
                        userId: request.body['userId'],
                        productId: request.body['productId']
                    }
                    let updateQuery = {
                        $inc: { "productCount": parseInt(request.body['productCount']) }
                    }
                    coll.findOneAndUpdate(filterQuery, updateQuery, (err, res) => {
                        if (err) {
                            // console.log("err: ",err)
                            response.status(500);
                            response.json(err);
                        }
                        else {
                            if (res.value) {
                                // console.log("res_1: ",res)
                                response.status(200);
                                response.json(res);
                            }
                            else {
                                let product = request.body;
                                coll.insertOne(product, (err, res) => {
                                    if (err) {
                                        response.status(500);
                                        response.json(err);
                                    }
                                    else {
                                        if (res) {
                                            // console.log("res: ",res)
                                            response.status(200);
                                            response.json(res);
                                        }
                                        else {
                                            response.status(401);
                                            response.json(res);
                                        }
                                    }
                                })
                            }
                        }
                    })
                }

            })

        }
    })
}


function getItemsCount(request, response) {
    mongoClient.connect(mongodbUrl, { useUnifiedTopology: true }, (err, dbHost) => {
        if (err) {
            response.status(500);
            response.json(err);
        }
        else {
            let db = dbHost.db("shopSpot");
            db.collection("cart", (err, coll) => {
                if (err) {
                    response.status(500);
                    response.json(err);
                }
                else {
                    let query = request.body;
                    coll.countDocuments(query, (err, res) => {
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

function getItems(request, response) {
    mongoClient.connect(mongodbUrl, { useUnifiedTopology: true }, (err, dbHost) => {
        if (err) {
            response.status(500);
            response.json(err);
        }
        else {
            let db = dbHost.db("shopSpot");
            db.collection("cart", (err, coll) => {
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
                                'path': '$productDetails',
                                'preserveNullAndEmptyArrays': false
                            }
                        }, {
                            '$project': {
                                'productCount': 1,
                                'productDetails': 1
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

function removeItem(request, response) {
    mongoClient.connect(mongodbUrl, { useUnifiedTopology: true }, (err, dbHost) => {
        if (err) {
            response.status(500);
            response.json(err);
        }
        else {
            let db = dbHost.db("shopSpot");
            db.collection("cart", (err, coll) => {
                if (err) {
                    response.status(500);
                    response.json(err);
                }
                else {
                    let query = { '_id': ObjectId(request.body['_id']) }
                    coll.deleteOne(query, (err, res) => {
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

function updateItem(request, response) {
    mongoClient.connect(mongodbUrl, { useUnifiedTopology: true }, (err, dbHost) => {
        if (err) {
            response.status(500);
            response.json(err);
        }
        else {
            let db = dbHost.db("shopSpot");
            db.collection("cart", (err, coll) => {
                if (err) {
                    response.status(500);
                    response.json(err);
                }
                else {
                    let filterQuery = {
                        '_id': ObjectId(request.body['_id'])
                    }
                    let updateQuery = {
                        '$set': {
                            'productCount': parseInt(request.body['productCount'])
                        }
                    }
                    coll.updateOne(filterQuery, updateQuery, (err, res) => {
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

function removeItemsBYUserId(userId) {
    mongoClient.connect(mongodbUrl, { useUnifiedTopology: true }, (err, dbHost) => {
        if (err) {
            console.log(err)
        }
        else {
            let db = dbHost.db("shopSpot");
            db.collection("cart", (err, coll) => {
                if (err) {
                    console.log(Err)
                }
                else {
                    let query = { userId }
                    coll.deleteMany(query, (err, res) => {
                        if (err) {
                            console.log(err)
                        }
                        else {
                            console.log(res)
                        }
                    })
                }
            })
        }
    })
}

module.exports = { addToCart, getItemsCount, getItems, removeItem, updateItem, removeItemsBYUserId }