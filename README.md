# Bamazon

## Premise
This is a node application built to demonstrate the use of MySql SQL with JavaScript.  It emulates the functions of an online shopping site where items are stocked, inventory is managed, items are purchased all affecting inventory levels and profitability of various departments.  

## Features
Among the key features of this project is the `paddedWord.js` file which is used as a constructor within the application.  The constructor is passed 4 parameters (a value, a target length, a padding character, and an optional padding direction).  It returns a string padded to the specified length which can be used to provide a more attractive layout for text tables in the console.  

The primary objective of this project was to perform a number of different operations with SQL.  The application demonstrates the ability to:

* SELECT records to display to application users
* INSERT records to add new products or departments
* UPDATE records to adjust inventory levels
* SELECT alias fields containing computed values

## Requirements
The application requires both the `mysql` and `inquirer` package libraries.  These are specified in the package.json file and will be installed for you by running the command `npm install`.

In addition, the application requires you to have MySQL installed and running.  Included in the repository is the file `schema.sql` which will build the required table structures and the file `seed.sql` which will load some basic data for you.  

## Usage
You interact with the application by assuming 1 of 3 personas:
* Customer
* Manager
* Supervisor

Each of these personas has features tailored to their role.  You will need to run the program corresponding to the persona as follows:

To be the | Run the command
---------   --------------
Customer | `node bamazonCustomer.js` 
Manager | `node bamazonManager.js` 
Supervisor | `node bamazonSupervisor.js` 


** Happy Shopping ** 
** or Managing ** 
** or Supervising **
