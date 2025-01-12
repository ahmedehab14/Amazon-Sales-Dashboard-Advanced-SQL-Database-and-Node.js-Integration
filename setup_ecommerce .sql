-- Step 1: Create the database
CREATE DATABASE IF NOT EXISTS ecommerce;

-- Step 2: Create a new user without a password
CREATE USER IF NOT EXISTS 'ecommerce_user'@'localhost';

-- Step 3: Grant full privileges to the user for the ecommerce database
GRANT ALL PRIVILEGES ON ecommerce.* TO 'ecommerce_user'@'localhost';

-- Step 4: Apply changes
FLUSH PRIVILEGES;
