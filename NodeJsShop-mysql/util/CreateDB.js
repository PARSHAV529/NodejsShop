const db = require('./db')



// db.execute('CREATE TABLE nodejsshop.products (id INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL, title VARCHAR(255) NOT NULL, description TEXT NOT NULL, price DOUBLE NOT NULL, imageUrl TEXT NOT NULL)').then(()=>{
//     console.log("Successfully created");
    
// }).catch(err => console.log(err))

db.execute("INSERT INTO nodejsshop.products (title, description, price, imageUrl) VALUES ('Wireless Mouse', 'Ergonomic wireless mouse with USB receiver', 19.99, 'https://www.google.com/imgres?q=wireless%20mouse&imgurl=https%3A%2F%2Fm.media-amazon.com%2Fimages%2FI%2F51sTLdrBAPL._AC_UF1000%2C1000_QL80_.jpg&imgrefurl=https%3A%2F%2Fwww.amazon.in%2FWireless-Computer-Cimetech-Cordless-Ergonomic%2Fdp%2FB07T8HFPDM&docid=ovC1b4IBJsWyWM&tbnid=mSRhuwj2MwnCYM&vet=12ahUKEwjH69LjqJuJAxVlzTgGHb59MqIQM3oFCIQBEAA..i&w=1000&h=649&hcb=2&ved=2ahUKEwjH69LjqJuJAxVlzTgGHb59MqIQM3oFCIQBEAA'), ('Mechanical Keyboard', 'RGB mechanical keyboard with blue switches', 49.99, 'https://www.google.com/imgres?q=mechanical%20keyboard&imgurl=https%3A%2F%2Fm.media-amazon.com%2Fimages%2FI%2F61UPYnYqHDL.jpg&imgrefurl=https%3A%2F%2Fwww.amazon.in%2FKeychron-Mechanical-Programmable-Hot-swappable-Black-Translucent%2Fdp%2FB0B2DKNC4G&docid=MbokbscxW7KIVM&tbnid=Fmba0nJpZTna5M&vet=12ahUKEwjhwc6vqpuJAxXwTGcHHdAoCg8QM3oECFsQAA..i&w=2000&h=2000&hcb=2&ved=2ahUKEwjhwc6vqpuJAxXwTGcHHdAoCg8QM3oECFsQAA'), ('Noise Cancelling Headphones', 'Over-ear headphones with active noise cancellation', 99.99, 'https://www.google.com/imgres?q=noise%20cancelling%20headphones&imgurl=https%3A%2F%2Fm.media-amazon.com%2Fimages%2FI%2F51QeS0jkx-L.jpg&imgrefurl=https%3A%2F%2Fwww.amazon.in%2FBose-QuietComfort-Cancelling-Headphones-Bluetooth%2Fdp%2FB0CCZ26B5V&docid=QpNnBhQxYs5SaM&tbnid=mx8V2PJvgcb8bM&vet=12ahUKEwijz4LAqpuJAxXXTGwGHUNVFgYQM3oECGUQAA..i&w=1600&h=1600&hcb=2&ved=2ahUKEwijz4LAqpuJAxXXTGwGHUNVFgYQM3oECGUQAA')").then(()=>{
    console.log("Successfully inserted");
    
}).catch(err => console.log(err))

