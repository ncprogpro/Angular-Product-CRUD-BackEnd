module.exports = app => {
    const products = require("../controllers/product.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Product
    router.post("/", products.create);
  
    // Retrieve all Products
    router.get("/", products.findAll);
  
    // Retrieve a single Product with name
    router.get("/:name", products.findOne);
  
    // Update a Product with id
    router.put("/:id", products.update);
  
    // Delete a Product with id
    router.delete("/:id", products.delete);

    // Delete a Product with id
    router.get("/confirm_name/:name", products.confirmName);
  
    app.use('/api/products', router);
};