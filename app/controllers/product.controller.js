const db = require("../models");
const Product = db.product;

// Create and Save a new Product
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    console.log(" req.boy ===== ", req.body);
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Product
  const product = new Product({
    name        : req.body.name,
    description : req.body.description,
    price       : req.body.price
  });

  // Save Product in the database
  product
    .save()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Product."
      });
    });
};

// Retrieve all products from the database.
exports.findAll = (req, res) => {
  Product.find()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving products."
      });
    });
};

// Find a single Product with an name
exports.findOne = (req, res) => {
  const name = req.params.name;

  Product.findOne({name: name})
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Product with name " + name });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Product with name=" + name });
    });
};

// Update a Product by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Product.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Product with id=${id}. Maybe Product was not found!`
        });
      } else res.send({ message: "Product was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Product with id=" + id
      });
    });
};

// Delete a Product with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Product.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Product with id=${id}. Maybe Product was not found!`
        });
      } else {
        res.send({
          message: "Product was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Product with id=" + id
      });
    });
};

// Confirm if a product name exists
exports.confirmName = (req, res) => {
  const name = req.params.name;

  Product.findOne({name: name})
    .then(data => {
      if (!data)
        res.send({ isExist: false });
      else res.send({ isExist: true });
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error"});
    });
};