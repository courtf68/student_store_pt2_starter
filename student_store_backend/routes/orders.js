const express = require("express");
const router = express.Router();
const security = require("../middleware/security");
const Order = require("../models/order");

router.get("/", async (req, res, next) => {
  try {
    // const { user } = res.locals;
    const orders = await Order.listOrdersForUser();
    return res.status(200).json({ orders });
    //call list orders meth
    // pass them to the listOrdersForUser and createOrder methods on the Order class.
  } catch (err) {
    next(err);
  }
  //should return JSON where the array of orders is stored on the orders property
});

router.post("/", security.requireAuthenticatedUser, async (req, res, next) => {
  try {
    const { user } = res.locals;
    const order = await Order.createOrder({ user, post: req.body });
    return res.status(201).json({ order });
  } catch (error) {
    return error;
  }
  //call create order method
  //should return JSON where the new order is is stored on the order property
});

module.exports = router;
