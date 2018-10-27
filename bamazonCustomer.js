var inquirer = require("inquirer");
var mysql = require("mysql");
var PaddedWord = require("./paddedWord.js");

var customerOrder = [];

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


//********************************************************************************************/
//*
//* Create the function to display available products 
//*
//********************************************************************************************/
function listProducts() {

    // connection.connect(function (err) {
    //     if (err) throw err;
        var sql = "SELECT * FROM product WHERE stock_quantity > 0";
        connection.query(sql, function (err, res) {
            if (err) throw err;
            displayHeaderGrid();   
            for (var j = 0; j < res.length; j++) {
                var p_itm = new PaddedWord(res[j].item_id, 2, " ", "left");
                var p_prd = new PaddedWord(res[j].product_name, 25, " ");
                var p_cat = new PaddedWord(res[j].department_name, 15, " ");
                var p_prc = new PaddedWord(res[j].price, 6, " ", "left");
                var p_qty = new PaddedWord(res[j].stock_quantity, 3, " ", "left");

                displayProductGrid(p_itm.padded(), p_prd.padded(), p_cat.padded(), p_prc.padded(), p_qty.padded());
            }
            // connection.end();
            promptUserPurchase()
        });
    // });
}
// listProducts();


//********************************************************************************************/
//*
//* Create the function to collect the user's order 
//*
//********************************************************************************************/
function promptUserPurchase() {
    inquirer.prompt([
        {
            name: "itemID",
            message: "What is the id number of the item you wish to purchase?"
        },
        {
            name: "quantity",
            message: "How many do you wish to buy?"
        }
    ]).then(function (answers) {
            if ((answers.itemID === "x") || (answers.quantity === "x")) {
                process.exit();
            }
            var purchaseItem = answers.itemID;
            var purchaseQty = answers.quantity;
            checkStockQuantity(purchaseItem, purchaseQty);
    });
};
// promptUserPurchase();


//********************************************************************************************/
//*
//* Create the function to confirm there is enough product to service the order. 
//*
//********************************************************************************************/
function checkStockQuantity(item, qty) {
        var sql = "SELECT stock_quantity FROM product WHERE ?";
        connection.query(sql, {item_id: item},function (err, res) {
            if (err) throw err;
            var inStock = res[0].stock_quantity;
            if (inStock >= qty) {
                processCustomerOrder(item, qty)
            } else {
                console.log("There is not sufficent stock to satisfy this order.");
                listProducts();
            }
        });
}
// checkStockQuantity(6,55);


//********************************************************************************************/
//*
//* Create the function to aggregate the customer's purchases. 
//*
//********************************************************************************************/
function processCustomerOrder(itm, qty) {
        var sql = "SELECT * FROM product WHERE ?";
        connection.query(sql, {item_id: itm},function (err, res) {
            if (err) throw err;
            var purchasedProduct = res[0].product_name;
            var purchasedPrice = parseFloat(res[0].price);
            var purchasedTotal = purchasedPrice * parseInt(qty);
            var newSalesTotal = parseFloat(res[0].product_sales) + parseFloat(purchasedTotal); //Challenge #3 additions
            var newQty = parseInt(res[0].stock_quantity) - parseInt(qty);  

            var orderObject = {
                item: itm,
                product: purchasedProduct,
                quantity: qty,
                price: purchasedPrice,
                subtotal: purchasedTotal.toFixed(2),
                sales: newSalesTotal.toFixed(2)  //Challenge #3 addition
            };

            customerOrder.push(orderObject);

            updateStock (itm, newQty);
        });
}


//********************************************************************************************/
//*
//* Create the function to deduct the customer's purchases from stock. 
//*
//********************************************************************************************/
function updateStock(itm, newQty) {
        var sql = "UPDATE product SET ? WHERE ?";
        connection.query(sql, [{stock_quantity: newQty}, {item_id: itm}],function (err, res) {
            if (err) throw err;
            if (res.affectedRows != 1) {
                console.log("\n\n");
                console.log("*****  There may have been a error  *****");
                console.log("*****  Report the following error to the administrator:  pCO" + res.affectedRows + "  *****");
            }
            // connection.end();

            displayOrder(customerOrder);
        });
}
// updateStock(9, 74);


//********************************************************************************************/
//*
//* Create the function to display the customer's order. 
//*
//********************************************************************************************/
function displayOrder(order) {

    console.log("\n\n");
    console.log(`  #   |  Product                              |  Qty  |  Price   |  SubTotal  `);
    console.log(`==============================================================================`);

    var grandTotal = 0;
    for (var q = 0; q < order.length; q++) {
        var p_item = new PaddedWord(order[q].item, 2, " ", "left");
        var p_prod = new PaddedWord(order[q].product, 35, " ");
        var p_quan = new PaddedWord(order[q].quantity, 3, " ", "left");
        var p_pric = new PaddedWord(order[q].price, 6, " ", "left");
        var p_subt = new PaddedWord(order[q].subtotal, 7, " ", "left");
        grandTotal += parseFloat(order[q].subtotal);

        console.log(`  ${p_item.padded()}  |  ${p_prod.padded()}  |  ${p_quan.padded()}  |  ${p_pric.padded()}  |  ${p_subt.padded()}  `);
        console.log(`-----------------------------------------------------------------------------`);
    }
    var gtot = grandTotal.toFixed(2);
    console.log(`                                                                      ${gtot}  `);
    console.log(`-----------------------------------------------------------------------------`);

    inquirer.prompt([{
         type: 'confirm',
         name: 'continue',
         message: 'Would you like continue shopping? ',
         default: true   
        }
    ]).then(function(response) {
        if (response.continue === true) {
            listProducts();
        } else {
            closeOrder(grandTotal);
        }
    });
}


//********************************************************************************************/
//*
//* Create the function to serve as the customer checkout. 
//*
//********************************************************************************************/
function closeOrder(gtotal) {
    console.log("**********************************************************");
    console.log("");
    console.log("Thank you for shopping!");
    console.log("");
    console.log("  Your total is:  " + gtotal.toFixed(2));
    console.log("");
    console.log("**********************************************************");

    inquirer.prompt([{
        type: 'confirm',
        name: 'continue',
        message: 'Would you like to place a new order? ',
        default: true  
       }
   ]).then(function(response) {
       if (response.continue === true) {
           listProducts();
       } else {
           console.log("Exiting session per request . . .")
           connection.end();
           process.exit();
       }
   });
}


//********************************************************************************************/
//*
//* Create a function with a more meaningful name to initiate the shopping process. 
//*
//********************************************************************************************/
function goShopping () { 
    listProducts();
};


goShopping();
