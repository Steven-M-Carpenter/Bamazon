
var inquirer = require("inquirer");
var mysql = require("mysql");
var PaddedWord = require("./paddedWord.js");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    supportBigNumbers: true,
    bigNumberStrings: true,
    database: "bamazon"
});


//********************************************************************************************/
//*
//* Create the display functions to support product presentation 
//*
//********************************************************************************************/
function displayHeaderGrid() {
    console.log(`\n\n`);
    console.log(`=========================================================================================`);
    console.log(`|   #  |  Product                             | Category             |  Price   |  Qty  |`);
    console.log(`=========================================================================================`);
}


function displayProductGrid(p_itm, p_prd, p_cat, p_prc, p_qty) {
    console.log(`|  ${p_itm}  |  ${p_prd}           | ${p_cat}      |  ${p_prc}  |  ${p_qty}  |`);
    console.log(`-----------------------------------------------------------------------------------------`)
}


function displayMenu() {

    inquirer.prompt([{
            type: 'list',
            name: 'menuopt',
            message: '\n\nSelect from the following menu options:\n',
            choices: [
                'View products for sale',
                'View items with low stock (<25 units)',
                'Add items to stock',
                'Add a new product',
                'Exit'
            ]
        }])
        .then(function (answers) {
            if (answers.menuopt === "View products for sale") {
                listProducts();
            }
            if (answers.menuopt === "View items with low stock (<25 units)") {
                viewLowStock();
            }
            if (answers.menuopt === "Add items to stock") {
                addStock();
            }
            if (answers.menuopt === "Add a new product") {
                addProduct();
            }
            if (answers.menuopt === "Exit") {
                console.clear();
                process.exit();
            }
        });
}
displayMenu();


//********************************************************************************************/
//*
//* Create the function to display available products 
//*
//********************************************************************************************/
function listProducts() {
    var sql = "SELECT * FROM product WHERE stock_quantity > 0";
    connection.query(sql, function (err, res) {
        if (err) throw err;
        displayHeaderGrid();
        for (var i = 0; i < res.length; i++) {
            var p_itm = new PaddedWord(res[i].item_id, 2, " ", "left");
            var p_prd = new PaddedWord(res[i].product_name, 25, " ");
            var p_cat = new PaddedWord(res[i].department_name, 15, " ");
            var p_prc = new PaddedWord(res[i].price, 6, " ", "left");
            var p_qty = new PaddedWord(res[i].stock_quantity, 3, " ", "left");

            displayProductGrid(p_itm.padded(), p_prd.padded(), p_cat.padded(), p_prc.padded(), p_qty.padded());
        }
        displayMenu();
    });
}


//********************************************************************************************/
//*
//* Create the function to display products with low stock 
//*
//********************************************************************************************/
function viewLowStock() {
    // connection.connect(function (err) {
    //     if (err) throw err;
    var sql = "SELECT * FROM product WHERE stock_quantity < 25";
    connection.query(sql, function (err, res) {
        if (err) throw err;
        displayHeaderGrid();
        for (var i = 0; i < res.length; i++) {
            var p_itm = new PaddedWord(res[i].item_id, 2, " ", "left");
            var p_prd = new PaddedWord(res[i].product_name, 25, " ");
            var p_cat = new PaddedWord(res[i].department_name, 15, " ");
            var p_prc = new PaddedWord(res[i].price, 6, " ", "left");
            var p_qty = new PaddedWord(res[i].stock_quantity, 3, " ", "left");

            displayProductGrid(p_itm.padded(), p_prd.padded(), p_cat.padded(), p_prc.padded(), p_qty.padded());
        }
        displayMenu();
    });
}


//********************************************************************************************/
//*
//* Create the function to add stock to available products 
//*
//********************************************************************************************/
function addStock() {
    var sql = "SELECT * FROM product WHERE stock_quantity > 0";
    connection.query(sql, function (err, res) {
        if (err) throw err;
        
        displayHeaderGrid();
        for (var i = 0; i < res.length; i++) {
            var p_itm = new PaddedWord(res[i].item_id, 2, " ", "left");
            var p_prd = new PaddedWord(res[i].product_name, 25, " ");
            var p_cat = new PaddedWord(res[i].department_name, 15, " ");
            var p_prc = new PaddedWord(res[i].price, 6, " ", "left");
            var p_qty = new PaddedWord(res[i].stock_quantity, 3, " ", "left");

            displayProductGrid(p_itm.padded(), p_prd.padded(), p_cat.padded(), p_prc.padded(), p_qty.padded());
        }

        console.log("Provide an 'x' at any prompt to prevent the add operation\n");

        inquirer.prompt([{
            name: "itemID",
            message: "To which item do you want to add inventory?\n ==>"
        }, {
            name: "quantity",
            message: "How many units do you now have in stock?\n ==>"
        }
        ]).then(function (answers) {
            if ((answers.itemID === "x") || (answers.quantity === "x")) {
                process.exit();
            }
            var stockItem = answers.itemID;
            var stockQty = answers.quantity;
            var sql = "UPDATE product SET ? WHERE ?";
            connection.query(sql, [{ stock_quantity: stockQty }, { item_id: stockItem }], function (err, res) {
                if (err) throw err;
            });
            console.clear();
            listProducts();
        });
    });
};


//********************************************************************************************/
//*
//* Create the function to add a new product to the inventory 
//*
//********************************************************************************************/
function addProduct() {
    console.clear();
    console.log("Provide an 'x' at any prompt to prevent the create\n");
    inquirer.prompt([{
        name: "addProdName",
        message: "What is the name of the product you wish to add?\n ==>"
    }, {
        name: "addProdCat",
        message: "What is the product category for this item?\n ==>"
    }, {
        name: "addProdQty",
        message: "How many units do you have on hand?\n ==>"
    }, {
        name: "addProdPrice",
        message: "What is the unit price for the item?\n ==>"
    }
    ]).then(function (answers) {
        if ((answers.addProdName === "x") || (answers.addProdCat === "x") || (answers.addProdQty === "x") || (answers.addProdPrice === "x")) {
            process.exit();
        }
        var stockProdName = answers.addProdName.toLowerCase();
        var stockProdCat = answers.addProdCat.toLowerCase();
        var stockProdQty = answers.addProdQty;
        var stockProdPrice = answers.addProdPrice;
        var sql = "INSERT INTO product SET ?";
        connection.query(sql, [{
            product_name: stockProdName,
            department_name: stockProdCat,
            price: stockProdPrice,
            stock_quantity: stockProdQty}
        ], function (err, res) {
            if (err) throw err;
        });
        console.clear();
        listProducts();
    });
};

