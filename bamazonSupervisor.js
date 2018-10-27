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
    console.log(`============================================================================================`);
    console.log(`|   #  |  Department                          |  Overhead      |  Sales      |  Profit     |`);
    console.log(`============================================================================================`);
}


function displayProductGrid(p_itm, p_prd, p_cat, p_prc, p_qty) {
    console.log(`|  ${p_itm}  |  ${p_prd}           | ${p_cat}      |  ${p_prc}  |  ${p_qty}  |`);
    console.log(`--------------------------------------------------------------------------------------------`)
}


function displayMenu() {

    inquirer.prompt([{
        type: 'list',
        name: 'menuopt',
        message: '\n\nSelect from the following menu options:\n',
        choices: [
            'View product sales by department',
            'Create a new department',
            'Exit'
        ]
    }])
        .then(function (answers) {
            if (answers.menuopt === "View product sales by department") {
                listProductSales();
            }
            if (answers.menuopt === "Create a new department") {
                createNewDepartment();
            }
            if (answers.menuopt === "Exit") {
                console.clear();
                process.exit();
            }
        });
}
displayMenu();


function listProductSales() {

    var sql = "SELECT departments.department_id, departments.department_name, departments.over_head_costs, product.product_sales, (product.product_sales - departments.over_head_costs) AS total_profit FROM departments LEFT JOIN product ON departments.department_name = product.department_name GROUP BY departments.department_name;";
    connection.query(sql, function (err, res) {
        if (err) throw err;
        displayHeaderGrid();
        for (var i = 0; i < res.length; i++) {
            var p_did = new PaddedWord(res[i].department_id, 2, " ", "left");
            var p_dnm = new PaddedWord(res[i].department_name, 25, " ");
            var p_ohc = new PaddedWord(res[i].over_head_costs, 9, " ", "left");
            var p_psl = new PaddedWord(res[i].product_sales, 9, " ", "left");
            var p_tpr = new PaddedWord(res[i].total_profit, 9, " ", "left");
            displayProductGrid(p_did.padded(), p_dnm.padded(), p_ohc.padded(), p_psl.padded(), p_tpr.padded());
        }

        displayMenu();
    });
}


function createNewDepartment() {
    console.clear();
    console.log("Provide an 'x' at any prompt to prevent the create\n");
    inquirer.prompt([{
        name: "addDeptName",
        message: "What is the name of the department you wish to add?\n ==>"
    }, {
        name: "addOverhead",
        message: "What is the overhead in dollars for this department?\n ==>"
    }
    ]).then(function (answers) {
        if ((answers.addDeptName === "x") || (answers.addOverhead === "x")) {
            process.exit();
        };
        var insertDeptName = answers.addDeptName.toLowerCase();
        var insertOverhead = answers.addOverhead;
        var sql = "INSERT INTO departments SET ?";
        connection.query(sql, [{
            department_name: insertDeptName,
            over_head_costs: insertOverhead}
        ], function (err, res) {
            if (err) throw err;
        });
        console.clear();
        // connection.end();
        displayMenu();
    });
}



