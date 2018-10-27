insert into product (product_name, department_name, price, stock_quantity)
values ("metric socket set", "tools", 35.76, 15);

insert into product (product_name, department_name, price, stock_quantity)
values ("SAE socket set", "tools", 35.76, 18);

insert into product (product_name, department_name, price, stock_quantity)
values ("claw hammer", "tools", 18.88, 22);

insert into product (product_name, department_name, price, stock_quantity)
values ("tape measurer", "tools", 12.99, 37);

insert into product (product_name, department_name, price, stock_quantity)
values ("steel toe boots", "shoes", 87.97, 11);

insert into product (product_name, department_name, price, stock_quantity)
values ("reflective vest", "safety", 15.35, 42);

insert into product (product_name, department_name, price, stock_quantity)
values ("work gloves", "safety", 6.10, 103);

insert into product (product_name, department_name, price, stock_quantity)
values ("denim overalls", "clothing", 35.00, 15);

insert into product (product_name, department_name, price, stock_quantity)
values ("long sleeve coverall", "clothing", 28.19, 75);

insert into product (product_name, department_name, price, stock_quantity)
values ("waterproof boots", "shoes", 55.18, 8);

insert into product (product_name, department_name, price, stock_quantity)
values ("hooded raincoat", "outerwear", 65.35, 28);


-- Challenge #3
INSERT INTO `bamazon`.`departments`
(`department_id`,`department_name`,`over_head_costs`)
VALUES (1,"tools",500.00);

INSERT INTO `bamazon`.`departments`
(`department_id`,`department_name`,`over_head_costs`)
VALUES (2,"shoes",200.00);

INSERT INTO `bamazon`.`departments`
(`department_id`,`department_name`,`over_head_costs`)
VALUES (3,"safety",100.00);

INSERT INTO `bamazon`.`departments`
(`department_id`,`department_name`,`over_head_costs`)
VALUES (4,"clothing",200.00);

INSERT INTO `bamazon`.`departments`
(`department_id`,`department_name`,`over_head_costs`)
VALUES (5,"outerwear",400.00);



UPDATE `bamazon`.`product` SET `product_sales` = '715.20' WHERE (`item_id` = '2');
UPDATE `bamazon`.`product` SET `product_sales` = '1323.12' WHERE (`item_id` = '1');
UPDATE `bamazon`.`product` SET `product_sales` = '717.44' WHERE (`item_id` = '3');
UPDATE `bamazon`.`product` SET `product_sales` = '246.81' WHERE (`item_id` = '4');
UPDATE `bamazon`.`product` SET `product_sales` = '1583.46' WHERE (`item_id` = '5');
UPDATE `bamazon`.`product` SET `product_sales` = '383.75' WHERE (`item_id` = '6');
UPDATE `bamazon`.`product` SET `product_sales` = '457.50' WHERE (`item_id` = '7');
UPDATE `bamazon`.`product` SET `product_sales` = '420.00' WHERE (`item_id` = '8');
UPDATE `bamazon`.`product` SET `product_sales` = '253.71' WHERE (`item_id` = '9');
UPDATE `bamazon`.`product` SET `product_sales` = '1269.14' WHERE (`item_id` = '10');
UPDATE `bamazon`.`product` SET `product_sales` = '457.45' WHERE (`item_id` = '11');
UPDATE `bamazon`.`product` SET `product_sales` = '145.18' WHERE (`item_id` = '12');
