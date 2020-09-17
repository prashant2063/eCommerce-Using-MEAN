var mongoClient = require("mongodb").MongoClient;

var mongodbUrl = "mongodb://localhost:27017/";

function checkUser(request, response) {
    mongoClient.connect(mongodbUrl, { useUnifiedTopology: true }, (err, dbHost) => {
        if (err) {
            response.status(500);
            response.json(err);
        }
        else {
            let db = dbHost.db("shopSpot");
            db.collection("users", (err, coll) => {
                if (err) {
                    response.status(500);
                    response.json(err);
                }
                else {
                    let userToBeChecked = request.body;
                    coll.findOne({ email: userToBeChecked.email, password: userToBeChecked.password }, (err, res) => {
                        if (err) {
                            response.status(500);
                            response.json(err);
                        }
                        else {
                            if (res) {
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

            })

        }
    })
}

function registerUser(request, response) {
    mongoClient.connect(mongodbUrl, { useUnifiedTopology: true }, (err, dbHost) => {
        if (err) {
            response.status(500);
            response.json(err);
        }
        else {
            var db = dbHost.db("shopSpot");
            db.collection("users", (err, coll) => {
                if (err) {
                    response.status(500);
                    response.json(err);
                }
                else {
                    let user = request.body;
                    coll.findOne({ email: user.email }, (err, res) => {
                        if (err) {
                            response.status(500);
                            response.json(err);
                        }
                        else {
                            if (res) {
                                response.status(409);
                                response.json(res);
                            }
                            else {
                                coll.insertOne(user, (err, res) => {
                                    if (err) {
                                        response.status(500);
                                        response.json(err);
                                    }
                                    else {
                                        if (res) {
                                            response.status(201);
                                            response.json(res);
                                        }
                                        else {
                                            response.status(500);
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
module.exports = { checkUser, registerUser };