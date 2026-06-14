import Database from 'better-sqlite3';
const db = new Database('inventory.db');

// Acknowledges foreign keys
db.pragma('foreign_keys=ON');

const create_user_data_table = `
  CREATE TABLE IF NOT EXISTS user_data (
    user_id VARCHAR(50) PRIMARY KEY NOT NULL,
    password_hash TEXT NOT NULL,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    email TEXT NOT NULL
    )
`;

const create_emp_data_table = `
  CREATE TABLE IF NOT EXISTS emp_data (
    emp_id VARCHAR(50) PRIMARY KEY NOT NULL,
    password_hash TEXT NOT NULL,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    email TEXT NOT NULL
    )
`;

const create_item_data_table = `
  CREATE TABLE IF NOT EXISTS item_data (
    item_id INT PRIMARY KEY UNIQUE NOT NULL,
    name VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    qty INT NOT NULL,
    current_price REAL NOT NULL
    )
`;

const create_user_transactions_table = `
  CREATE TABLE IF NOT EXISTS user_transactions (
    order_id INT PRIMARY KEY UNIQUE NOT NULL,
    user_id VARCHAR(50) NOT NULL,
    timestamp TEXT NOT NULL,
    paymentMethod TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user_data(user_id)
    )
`;

const create_inventory_transactions_table = `
  CREATE TABLE IF NOT EXISTS inventory_transactions (
    receipt_id INT PRIMARY KEY UNIQUE NOT NULL,
    emp_id VARCHAR(50) NOT NULL,
    timestamp TEXT NOT NULL,
    FOREIGN KEY (emp_id) REFERENCES emp_data(emp_id)
    )
`;

const create_user_order_items_table = `
  CREATE TABLE IF NOT EXISTS user_order_items (
    order_item_line INT NOT NULL,
    order_id VARCHAR(50) NOT NULL,
    item_id INT NOT NULL,
    PRIMARY KEY (order_item_line, order_id),
    FOREIGN KEY (order_id) REFERENCES user_transactions(order_id),
    FOREIGN KEY (item_id) REFERENCES item_data(item_id)
    )
  `;

const create_inventory_receipt_items_table = `
  CREATE TABLE IF NOT EXISTS inventory_receipt_items (
    receipt_item_line INT NOT NULL,
    receipt_id VARCHAR(50) NOT NULL,
    item_id INT NOT NULL,
    cost REAL NOT NULL,
    qty INT NOT NULL,
    PRIMARY KEY (receipt_item_line, receipt_id),
    FOREIGN KEY (receipt_id) REFERENCES inventory_transactions(receipt_id),
    FOREIGN KEY (item_id) REFERENCES item_data(item_id)
  )
`;

try {
  db.exec(create_user_data_table);
  db.exec(create_emp_data_table);
  db.exec(create_item_data_table);
  db.exec(create_user_transactions_table);
  db.exec(create_inventory_transactions_table);
  db.exec(create_user_order_items_table);
  db.exec(create_inventory_receipt_items_table);
  console.log('Database initialized successfully!');
} catch (err) {
  console.error('Database initialization failed:', err.message);
}

