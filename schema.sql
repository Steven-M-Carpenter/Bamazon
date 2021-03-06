-- Quest #1
drop database if exists bamazon;
create database bamazon;

use bamazon;

drop table if exists products;
create table product (
    item_id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    product_name VARCHAR(150) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT NOT NULL
);


-- Quest #3
drop table if exists departments;
create table departments (
    department_id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    over_head_costs DECIMAL(10,2) NOT NULL 
);


-- Quest #3
alter table products 
add column product_sales DECIMAL(10,2);


