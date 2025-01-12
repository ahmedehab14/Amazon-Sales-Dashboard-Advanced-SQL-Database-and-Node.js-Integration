-- Step 1: Temporarily disable foreign key checks
SET FOREIGN_KEY_CHECKS = 0;

-- Drop existing tables
DROP TABLE IF EXISTS OrderProducts;
DROP TABLE IF EXISTS Promotions;
DROP TABLE IF EXISTS Fulfillment;
DROP TABLE IF EXISTS Shipping;
DROP TABLE IF EXISTS Products;
DROP TABLE IF EXISTS Orders;

-- Step 2: Enable foreign key checks
SET FOREIGN_KEY_CHECKS = 1;

-- Step 3: Create Tables

-- Orders Table
CREATE TABLE IF NOT EXISTS Orders (
    OrderID VARCHAR(50) PRIMARY KEY,
    Date DATE NOT NULL,
    Status VARCHAR(50),
    Qty INT NOT NULL,
    Amount FLOAT NOT NULL,
    Currency VARCHAR(10) DEFAULT 'INR',
    B2B BOOLEAN NOT NULL
);

-- Products Table
CREATE TABLE IF NOT EXISTS Products (
    SKU VARCHAR(50) PRIMARY KEY,
    Style VARCHAR(100),
    Category VARCHAR(50),
    Size VARCHAR(20),
    ASIN VARCHAR(50)
);

-- Shipping Table
CREATE TABLE IF NOT EXISTS Shipping (
    ShippingID INT AUTO_INCREMENT PRIMARY KEY,
    OrderID VARCHAR(50) NOT NULL,
    ShipCity VARCHAR(100) DEFAULT 'Unknown City',
    ShipState VARCHAR(100) DEFAULT 'Unknown State',
    ShipPostalCode VARCHAR(20) DEFAULT '0',
    ShipCountry VARCHAR(10) DEFAULT 'IN',
    CourierStatus VARCHAR(50) DEFAULT 'Unknown',
    FOREIGN KEY (OrderID) REFERENCES Orders(OrderID) ON DELETE CASCADE
);

-- Fulfillment Table
CREATE TABLE IF NOT EXISTS Fulfillment (
    FulfillmentID INT AUTO_INCREMENT PRIMARY KEY,
    OrderID VARCHAR(50) NOT NULL,
    FulfilledBy VARCHAR(50) DEFAULT 'Unknown',
    ShipServiceLevel VARCHAR(50),
    FOREIGN KEY (OrderID) REFERENCES Orders(OrderID) ON DELETE CASCADE
);

-- Promotions Table
CREATE TABLE IF NOT EXISTS Promotions (
    PromotionID INT AUTO_INCREMENT PRIMARY KEY,
    OrderID VARCHAR(50) NOT NULL,
    PromotionIDs TEXT,
    FOREIGN KEY (OrderID) REFERENCES Orders(OrderID) ON DELETE CASCADE
);

-- OrderProducts Table
CREATE TABLE IF NOT EXISTS OrderProducts (
    OrderProductID INT AUTO_INCREMENT PRIMARY KEY,
    OrderID VARCHAR(50) NOT NULL,
    SKU VARCHAR(50) NOT NULL,
    FOREIGN KEY (OrderID) REFERENCES Orders(OrderID) ON DELETE CASCADE,
    FOREIGN KEY (SKU) REFERENCES Products(SKU) ON DELETE CASCADE
);

 

-- Step 3: Import Data from CSV Files

-- Orders Table
LOAD DATA LOCAL INFILE '/home/coder/project/datatables/orders.csv'
INTO TABLE Orders
FIELDS TERMINATED BY ',' ENCLOSED BY '"' 
LINES TERMINATED BY '\n' 
IGNORE 1 ROWS 
(OrderID, Date, Status, Qty, Amount, Currency, B2B);

-- Products Table
LOAD DATA LOCAL INFILE '/home/coder/project/datatables/products.csv'
INTO TABLE Products
FIELDS TERMINATED BY ',' ENCLOSED BY '"' 
LINES TERMINATED BY '\n' 
IGNORE 1 ROWS 
(SKU, Style, Category, Size, ASIN);

-- Shipping Table
LOAD DATA LOCAL INFILE '/home/coder/project/datatables/shipping.csv'
INTO TABLE Shipping
FIELDS TERMINATED BY ',' ENCLOSED BY '"' 
LINES TERMINATED BY '\n' 
IGNORE 1 ROWS 
(OrderID, ShipCity, ShipState, ShipPostalCode, ShipCountry, CourierStatus);

-- Fulfillment Table
LOAD DATA LOCAL INFILE '/home/coder/project/datatables/fulfillment.csv'
INTO TABLE Fulfillment
FIELDS TERMINATED BY ',' ENCLOSED BY '"' 
LINES TERMINATED BY '\n' 
IGNORE 1 ROWS 
(OrderID, FulfilledBy, ShipServiceLevel);

-- Promotions Table
LOAD DATA LOCAL INFILE '/home/coder/project/datatables/promotions.csv'
INTO TABLE Promotions
FIELDS TERMINATED BY ',' ENCLOSED BY '"' 
LINES TERMINATED BY '\n' 
IGNORE 1 ROWS 
(OrderID, PromotionIDs);

-- OrderProducts Table
LOAD DATA LOCAL INFILE '/home/coder/project/datatables/order_products.csv'
INTO TABLE OrderProducts
FIELDS TERMINATED BY ',' ENCLOSED BY '"' 
LINES TERMINATED BY '\n' 
IGNORE 1 ROWS 
(OrderID, SKU);

-- Step 4: Re-enable foreign key checks
SET FOREIGN_KEY_CHECKS = 1;
