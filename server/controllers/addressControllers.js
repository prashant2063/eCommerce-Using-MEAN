const { ObjectId } = require("mongodb");

var mongoClient = require("mongodb").MongoClient;

var mongodbUrl = "mongodb://localhost:27017/";

function addNewAddress(request, response) {
    mongoClient.connect(mongodbUrl, { useUnifiedTopology: true }, (err, dbHost) => {
        if (err) {
            response.status(500);
            response.json(err);
        }
        else {
            let db = dbHost.db("shopSpot");
            db.collection("address", (err, coll) => {
                if (err) {
                    response.status(500);
                    response.json(err);
                }
                else {
                    let query = request.body;
                    coll.insertOne(query, (err, res) => {
                        if (err) {
                            response.status(500);
                            response.json(err);
                        }
                        else {
                            response.status(200);
                            // console.log(res)
                            response.json(res.ops[0]);
                        }
                    })
                }

            })

        }
    })
}

function removeAddress(request, response){
    mongoClient.connect(mongodbUrl, { useUnifiedTopology: true }, (err, dbHost) => {
        if (err) {
            response.status(500);
            response.json(err);
        }
        else {
            let db = dbHost.db("shopSpot");
            db.collection("address", (err, coll) => {
                if (err) {
                    response.status(500);
                    response.json(err);
                }
                else {
                    let query = {_id: ObjectId(request.body['_id'])};
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

function getAllAddresses(request, response){
    mongoClient.connect(mongodbUrl, { useUnifiedTopology: true }, (err, dbHost) => {
        if (err) {
            response.status(500);
            response.json(err);
        }
        else {
            let db = dbHost.db("shopSpot");
            db.collection("address", (err, coll) => {
                if (err) {
                    response.status(500);
                    response.json(err);
                }
                else {
                    let query = request.body;
                    coll.find(query).toArray( (err, res) => {
                        if (err) {
                            response.status(500);
                            response.json(err);
                        }
                        else {
                            response.status(200);
                            // console.log(res)
                            response.json(res);
                        }
                    })
                }

            })

        }
    })
}


module.exports = { addNewAddress, removeAddress, getAllAddresses }