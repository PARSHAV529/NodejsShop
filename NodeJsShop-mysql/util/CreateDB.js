const db = require('./db')



// db.execute('CREATE TABLE nodejsshop.products (id INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL, title VARCHAR(255) NOT NULL, description TEXT NOT NULL, price DOUBLE NOT NULL, imageURL VARCHAR(255) NOT NULL)')

db.execute("INSERT INTO nodejsshop.products (title, description, price, imageURL) VALUES ('Wireless Mouse', 'Ergonomic wireless mouse with USB receiver', 19.99, 'https://example.com/images/mouse.jpg'), ('Mechanical Keyboard', 'RGB mechanical keyboard with blue switches', 49.99, 'https://example.com/images/keyboard.jpg'), ('Noise Cancelling Headphones', 'Over-ear headphones with active noise cancellation', 99.99, 'https://example.com/images/headphones.jpg'), ('Laptop Stand', 'Adjustable aluminum laptop stand', 25.99, 'https://example.com/images/laptop-stand.jpg')")

