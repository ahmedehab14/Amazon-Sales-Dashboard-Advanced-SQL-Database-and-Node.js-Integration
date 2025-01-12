const express = require('express');
const mysql = require('mysql2/promise');
const path = require('path');
const app = express();

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Database connection pool
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '', // Update with your password
    database: 'ecommerce',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Endpoint: Revenue by Category
app.get('/api/revenue-by-category', async (req, res) => {
    const query = `
        SELECT p.Category, SUM(o.Amount) AS TotalRevenue
        FROM Orders o
        JOIN OrderProducts op ON o.OrderID = op.OrderID
        JOIN Products p ON op.SKU = p.SKU
        GROUP BY p.Category
        ORDER BY TotalRevenue DESC;
    `;
    try {
        const [results] = await pool.query(query);
        res.json(results);
    } catch (err) {
        console.error('Error fetching revenue by category:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// Endpoint: Top-Selling Products
app.get('/api/top-selling-products', async (req, res) => {
    const query = `
        SELECT p.SKU, p.Category, COUNT(op.OrderProductID) AS TotalSales
        FROM OrderProducts op
        JOIN Products p ON op.SKU = p.SKU
        GROUP BY p.SKU, p.Category
        ORDER BY TotalSales DESC
        LIMIT 10;
    `;
    try {
        const [results] = await pool.query(query);
        res.json(results);
    } catch (err) {
        console.error('Error fetching top-selling products:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// Endpoint: Regions with the Highest Sales
app.get('/api/highest-sales-regions', async (req, res) => {
    const query = `
        SELECT s.ShipState, SUM(o.Amount) AS TotalRevenue
        FROM Orders o
        JOIN Shipping s ON o.OrderID = s.OrderID
        GROUP BY s.ShipState
        ORDER BY TotalRevenue DESC
        LIMIT 10;
    `;
    try {
        const [results] = await pool.query(query);
        res.json(results);
    } catch (err) {
        console.error('Error fetching regions with the highest sales:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// Endpoint: Percentage of Orders Fulfilled by Amazon
app.get('/api/orders-fulfilled-by-amazon', async (req, res) => {
    const query = `
        SELECT f.FulfilledBy, 
               ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM Orders), 2) AS Percentage
        FROM Fulfillment f
        GROUP BY f.FulfilledBy;
    `;
    try {
        const [results] = await pool.query(query);
        res.json(results);
    } catch (err) {
        console.error('Error fetching orders fulfilled by Amazon:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// Endpoint: Total Orders with Promotions and Without Promotions
app.get('/api/orders-with-promotions', async (req, res) => {
    const query = `
        SELECT 
            CASE 
                WHEN p.PromotionIDs IS NOT NULL AND p.PromotionIDs NOT LIKE '%No Promotion%' THEN 'With Promotions'
                ELSE 'No Promotions'
            END AS PromotionStatus,
            COUNT(o.OrderID) AS OrderCount
        FROM Orders o
        LEFT JOIN Promotions p ON o.OrderID = p.OrderID
        GROUP BY PromotionStatus;

    `;
    try {
        const [results] = await pool.query(query);
        res.json(results);
    } catch (err) {
        console.error('Error fetching orders with and without promotions:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



// Endpoint: Revenue by Fulfillment Type
app.get('/api/revenue-by-fulfillment', async (req, res) => {
    const query = `
        SELECT f.FulfilledBy, SUM(o.Amount) AS TotalRevenue
        FROM Orders o
        JOIN Fulfillment f ON o.OrderID = f.OrderID
        GROUP BY f.FulfilledBy
        ORDER BY TotalRevenue DESC;
    `;
    try {
        const [results] = await pool.query(query);
        res.json(results);
    } catch (err) {
        console.error('Error fetching revenue by fulfillment type:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// Endpoint: Average Order Value by Region
app.get('/api/average-order-value-by-region', async (req, res) => {
    const query = `
        SELECT s.ShipState, ROUND(AVG(o.Amount), 2) AS AvgOrderValue
        FROM Orders o
        JOIN Shipping s ON o.OrderID = s.OrderID
        GROUP BY s.ShipState
        ORDER BY AvgOrderValue DESC;
    `;
    try {
        const [results] = await pool.query(query);
        res.json(results);
    } catch (err) {
        console.error('Error fetching average order value by region:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// Endpoint: Regional Sales by Product Category
app.get('/api/regional-sales-by-category', async (req, res) => {
    const query = `
        SELECT s.ShipState, p.Category, SUM(o.Amount) AS TotalSales
        FROM Orders o
        JOIN OrderProducts op ON o.OrderID = op.OrderID
        JOIN Products p ON op.SKU = p.SKU
        JOIN Shipping s ON o.OrderID = s.OrderID
        GROUP BY s.ShipState, p.Category
        ORDER BY TotalSales DESC
        LIMIT 10;
    `;
    try {
        const [results] = await pool.query(query);
        res.json(results);
    } catch (err) {
        console.error('Error fetching regional sales by category:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});