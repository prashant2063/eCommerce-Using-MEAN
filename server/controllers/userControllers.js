const mongoClient = require("mongodb").MongoClient;
var CryptoJS = require("crypto-js");

const { Connection } = require("./dbConfig");

const dbUrl = Connection.dbUrl;
const dbName = Connection.dbName;
const collectionName = "users";
const encryptionKey = "556B58703273357638792F423F4528482B4B6250655368566D597133743677397A24432646294A404E635166546A576E5A7234753778214125442A472D4B6150";

function checkUser(request, response) {
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
                    let userToBeChecked = request.body;
                    coll.findOne({ email: userToBeChecked.email }, (err, res) => {
                        if (err) {
                            response.status(500);
                            response.json(err);
                        }
                        else {
                            if (res) {
                                let enteredPassword = CryptoJS.AES.decrypt(userToBeChecked.password, encryptionKey).toString(CryptoJS.enc.Utf8);
                                let correctPassword = CryptoJS.AES.decrypt(res.password, encryptionKey).toString(CryptoJS.enc.Utf8);
                                console.log(enteredPassword, correctPassword)
                                if (enteredPassword == correctPassword) {
                                    response.status(200);
                                    response.json(res);
                                }
                                else {
                                    response.status(401);
                                    response.json(res);
                                }
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
    mongoClient.connect(dbUrl, { useUnifiedTopology: true }, (err, dbHost) => {
        if (err) {
            response.status(500);
            response.json(err);
        }
        else {
            var db = dbHost.db(dbName);
            db.collection(collectionName, (err, coll) => {
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