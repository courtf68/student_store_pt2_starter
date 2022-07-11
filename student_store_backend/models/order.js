const db = require("../db");

class Order {
  static async listOrdersForUser() {
    const results = db.query(
      ` SELECT o.id as "orderId" 
               o.customer_id as "customerId"
               o.quantity as "quantity"
               p.name as "name"
               p.price as "price"

        FROM orders as o
        FROM products as p
            JOIN users as u ON u.id=p.user_id
  `
    );
    //ret all orders that auth user has made
  }
  static async createOrder() {
    //take order n store in db
    const results = db.query(
      ` INSERT INTO orders (customer_id)
      VALUES ( SELECT id from users WHERE email = $1)
      RETURNING id as "orderId"
`
    );
  }
}
module.exports = Order;
