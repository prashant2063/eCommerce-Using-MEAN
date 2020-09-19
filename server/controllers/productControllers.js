var mongoClient = require("mongodb").MongoClient;

var mongodbUrl = "mongodb://localhost:27017/";

function fetchProducts(request, response){
    mongoClient.connect(mongodbUrl, { useUnifiedTopology: true }, (err, dbHost) => {
        if (err) {
            response.status(500);
            response.json(err);
        }
        else {
            let db = dbHost.db("shopSpot");
            db.collection("products", (err, coll) => {
                if (err) {
                    response.status(500);
                    response.json(err);
                }
                else {
                    let filter = request.body;
                    let query = {};
                    if(filter['for']){
                        query['for'] = filter['for'];
                    }
                    if(filter['category']){
                        query['category'] = filter['category'];
                    }
                    if(filter['mini'] && filter['maxi']){
                        query['price'] = {};
                        query['price']['$gt'] = filter['mini'];
                        query['price']['$lt'] = filter['maxi'];
                    }
                    else if(filter['mini']){
                        query['price'] = {};
                        query['price']['$gt'] = filter['mini'];
                    }
                    else if(filter['maxi']){
                        query['price'] = {};
                        query['price']['$lt'] = filter['maxi'];
                    }
                    coll.find(query).toArray((err, res) => {
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

module.exports = { fetchProducts }