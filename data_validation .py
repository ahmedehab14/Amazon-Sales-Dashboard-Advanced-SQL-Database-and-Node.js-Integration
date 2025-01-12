# steps to run the validation file:

# 1. pip install pandas  
# 2. pip install mysql-connector-python
# 3. python data_validation.py

import mysql.connector
import pandas as pd

# Connect to the MySQL database
def connect_to_database():
    try:
        conn = mysql.connector.connect(
            host='localhost',         
            user='root',              
            password='',              
            database='ecommerce'      
        )
        print("\n--- Database Validation ---\n")
        return conn
    except mysql.connector.Error as e:
        print(f"Error: {e}")
        exit()

# 1. Validate Tables Exist
def validate_tables(cursor):
    print("Validating table existence...")
    cursor.execute("SHOW TABLES;")
    tables = [table[0] for table in cursor.fetchall()]
    print("Tables in the database:")
    for table in tables:
        print(f"- {table}")
    print("\n")

# 2. Validate Row Counts and Sample Data
def validate_table_data(cursor):
    tables = ["Orders", "Products", "Shipping", "Fulfillment", "Promotions", "OrderProducts"]
    for table in tables:
        print(f"Validating {table} table...")
        cursor.execute(f"SELECT COUNT(*) FROM {table}")
        count = cursor.fetchone()[0]
        print(f"{table} table contains {count} rows.")

        cursor.execute(f"SELECT * FROM {table} LIMIT 5")
        rows = cursor.fetchall()
        print(f"Sample rows from {table} table:")
        for row in rows:
            print(row)
        print("\n")

# 3. Validate Relationships Between Tables
def validate_relationships(conn):
    print("Validating relationships between tables...")

    # Orders and Shipping
    query = """
    SELECT o.OrderID, o.Date, s.ShipCity, s.ShipCountry
    FROM Orders o
    JOIN Shipping s ON o.OrderID = s.OrderID
    LIMIT 5;
    """
    print("Orders and Shipping relationship:")
    df = pd.read_sql_query(query, conn)
    print(df, "\n")

    # Orders and Promotions
    query = """
    SELECT o.OrderID, o.Date, p.PromotionIDs
    FROM Orders o
    JOIN Promotions p ON o.OrderID = p.OrderID
    LIMIT 5;
    """
    print("Orders and Promotions relationship:")
    df = pd.read_sql_query(query, conn)
    print(df, "\n")

    # Orders and Products via OrderProducts
    query = """
    SELECT o.OrderID, op.SKU, p.Category, p.Style
    FROM Orders o
    JOIN OrderProducts op ON o.OrderID = op.OrderID
    JOIN Products p ON op.SKU = p.SKU
    LIMIT 5;
    """
    print("Orders and Products relationship:")
    df = pd.read_sql_query(query, conn)
    print(df, "\n")

# 4. Check for Missing or Unmatched Data
def validate_missing_data(cursor):
    print("Validating missing or unmatched data...")

    # Unmatched OrderIDs in Shipping
    query = """
    SELECT OrderID
    FROM Shipping
    WHERE OrderID NOT IN (SELECT OrderID FROM Orders);
    """
    cursor.execute(query)
    unmatched_shipping = cursor.fetchall()
    if unmatched_shipping:
        print("Unmatched OrderIDs in Shipping:")
        print(unmatched_shipping)
    else:
        print("No unmatched OrderIDs in Shipping.\n")

    # Unmatched OrderIDs in Fulfillment
    query = """
    SELECT OrderID
    FROM Fulfillment
    WHERE OrderID NOT IN (SELECT OrderID FROM Orders);
    """
    cursor.execute(query)
    unmatched_fulfillment = cursor.fetchall()
    if unmatched_fulfillment:
        print("Unmatched OrderIDs in Fulfillment:")
        print(unmatched_fulfillment)
    else:
        print("No unmatched OrderIDs in Fulfillment.\n")

    # Unmatched SKUs in OrderProducts
    query = """
    SELECT SKU
    FROM OrderProducts
    WHERE SKU NOT IN (SELECT SKU FROM Products);
    """
    cursor.execute(query)
    unmatched_products = cursor.fetchall()
    if unmatched_products:
        print("Unmatched SKUs in OrderProducts:")
        print(unmatched_products)
    else:
        print("No unmatched SKUs in OrderProducts.\n")

# Main function to execute validations
def main():
    conn = connect_to_database()
    cursor = conn.cursor()

    # Perform validation steps
    validate_tables(cursor)
    validate_table_data(cursor)
    validate_relationships(conn)
    validate_missing_data(cursor)

    # Close the connection
    cursor.close()
    conn.close()

if __name__ == "__main__":
    main()
