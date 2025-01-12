-- how to execute ?
-- mysql -u root -p
-- USE ecommerce;
-- SOURCE /home/coder/project/insights.sql;

-- Query 1: Sales Trends
SELECT MONTH(Date) AS Month, YEAR(Date) AS Year, SUM(Amount) AS TotalSales
FROM Orders
GROUP BY YEAR(Date), MONTH(Date)
ORDER BY Year, Month;

-- Query 2: Average Order Value by Region
SELECT ShipState, ROUND(AVG(Amount), 2) AS AvgOrderValue
FROM Shipping s
JOIN Orders o ON s.OrderID = o.OrderID
GROUP BY ShipState
ORDER BY AvgOrderValue DESC;

-- Query 3: Revenue by Category
SELECT p.Category, SUM(o.Amount) AS TotalRevenue
FROM Orders o
JOIN OrderProducts op ON o.OrderID = op.OrderID
JOIN Products p ON op.SKU = p.SKU
GROUP BY p.Category
ORDER BY TotalRevenue DESC;

-- Query 4: Top-Selling Products
SELECT p.SKU, p.Category, COUNT(op.OrderID) AS TotalSales
FROM OrderProducts op
JOIN Products p ON op.SKU = p.SKU
GROUP BY p.SKU, p.Category
ORDER BY TotalSales DESC
LIMIT 10;

-- Query 5: Regions with the Highest Sales
SELECT ShipState, SUM(o.Amount) AS TotalRevenue
FROM Shipping s
JOIN Orders o ON s.OrderID = o.OrderID
GROUP BY ShipState
ORDER BY TotalRevenue DESC
LIMIT 10;

-- Query 6: Orders Fulfilled by Amazon vs Merchant
SELECT FulfilledBy, COUNT(*) AS OrderCount
FROM Fulfillment
GROUP BY FulfilledBy;

-- Query 7: Orders with Promotions and Without
SELECT 
    CASE 
        WHEN p.PromotionIDs IS NOT NULL AND p.PromotionIDs NOT LIKE '%No Promotion%' THEN 'With Promotions'
        ELSE 'No Promotions'
    END AS PromotionStatus,
    COUNT(o.OrderID) AS OrderCount
FROM Orders o
LEFT JOIN Promotions p ON o.OrderID = p.OrderID
GROUP BY PromotionStatus;

-- Query 8: Revenue by Fulfillment Type
SELECT f.FulfilledBy, SUM(o.Amount) AS TotalRevenue
FROM Orders o
JOIN Fulfillment f ON o.OrderID = f.OrderID
GROUP BY f.FulfilledBy
ORDER BY TotalRevenue DESC;

