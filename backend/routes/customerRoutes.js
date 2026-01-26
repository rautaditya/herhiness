const express = require("express");
const router = express.Router();
const Customer = require("../models/Customer");

// POST - Add customer
 
router.post("/", async (req, res) => {
  try {
    const customer = new Customer(req.body);
    await customer.save();
    res.status(201).json(customer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


//GET - All customers
 
router.get("/", async (req, res) => {
  try {
    const customers = await Customer.find().sort({ createdAt: -1 });
    res.json(customers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ GET - Get single customer by ID (Eye icon / View)
router.get("/:id", async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.json(customer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


 // GET - Search customers
 
router.get("/search", async (req, res) => {
  const { query } = req.query;

  try {
    const customers = await Customer.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { phone: { $regex: query } },
      ],
    });

    res.json(customers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


 //PUT - Update customer by ID
 
router.put("/:id", async (req, res) => {
  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // updated data return करतो
    );

    if (!updatedCustomer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.json(updatedCustomer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE - Delete customer by ID
 
router.delete("/:id", async (req, res) => {
  try {
    const deletedCustomer = await Customer.findByIdAndDelete(req.params.id);

    if (!deletedCustomer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.json({ message: "Customer deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;
