# eCommerce-Using-MEAN - ShopSpot

ShopSpot is an e-commerce website template created using MEAN stack

## Prerequisite

You need to have Angular and npm (Node Package Manager) installed on you system.
Easist way to do so is to install [node.js](https://nodejs.org/en/).
and then run the following command.

```cmd
npm install -g @angular/cli
```

You also need to install MongoDB in your local machine or you can use a remote database service.


## Setup

Navigate to server folder and run the following command

```cmd
npm install
```
Then navigate to the client folder and run the same command again.

In the client folder run the command:

```cmd
ng build --prod
```
You'll get dist folder within the client folder. Copy this dist folder to public folder within the server folder.

Copy the connection string of your MongoDB server and the database name into server/controllers/dbConfig.js

in your database create a collection named "products" and import data from db/products.json

## Usage

Finally in the server folder run the command:

```cmd
node index.js
```

You can go to [http://localhost:3000/](http://localhost:3000/) to view the resulted website.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
