var inquirer = require("inquirer");
// var mysql = require("mysql");


function promptUserPurchase() {
    inquirer.prompt([
        {   name: "itemID",
            message: "What is the id number of the item you wish to purchase?"}, 
        {   name: "quantity",
            message: "How many do you wish to buy?"}
    ]).then(function (answers) {
        // initializes the variable newProgrammer to be a programmer object which will take
        // in all of the user's answers to the questions above
        var customerPurchase = [{
            purchaseItem: answers.itemID,
            purchaseQty: answers.quantity
        }];
        return customerPurchase;
    });
};


function checkStockQuantity() {

}


function processCustomerOrder() {

}


// 5. Then create a Node application called `bamazonCustomer.js`. Running this application will first display all of the items 
//available for sale. Include the ids, names, and prices of products for sale.

// 6. The app should then prompt users with two messages.

//    * The first should ask them the ID of the product they would like to buy.
//    * The second message should ask how many units of the product they would like to buy.

// 7. Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.

//    * If not, the app should log a phrase like `Insufficient quantity!`, and then prevent the order from going through.

// 8. However, if your store _does_ have enough of the product, you should fulfill the customer's order.
//    * This means updating the SQL database to reflect the remaining quantity.
//    * Once the update goes through, show the customer the total cost of their purchase.









// * List a set of menu options:

// * View Products for Sale

// * View Low Inventory

// * Add to Inventory

// * Add New Product

// * If a manager selects `View Products for Sale`, the app should list every available item: the item IDs, names, prices, and quantities.

// * If a manager selects `View Low Inventory`, then it should list all items with an inventory count lower than five.

// * If a manager selects `Add to Inventory`, your app should display a prompt that will let the manager "add more" of any item currently in the store.

// * If a manager selects `Add New Product`, it should allow the manager to add a completely new product to the store.



