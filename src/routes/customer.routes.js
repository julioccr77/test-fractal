const express = require('express');
const router = express.Router();

// Customer Model
const Customer = require('../models/Customer');

// GET all Customers
router.get('/', async (req, res) => {
  const customer = await Customer.find();
  res.json(customer);
});

// GET a Customer
router.get('/:id', async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  res.json(customer);
});

// ADD a new Customer
router.post('/', async (req, res) => {
  const { firstName, lastName, email, phoneNumber } = req.body;
  const customer = new Customer({ firstName, lastName, email, phoneNumber });
  await customer.save();
  res.json({status: 'Customer Saved'});
});

// UPDATE a new Customer
router.put('/:id', async (req, res) => {
  const {firstName, lastName, email, phoneNumber } = req.body;
  const newCustomer = {firstName, lastName, email, phoneNumber };
  await Customer.findByIdAndUpdate(req.params.id, newCustomer, {
    useFindAndModify: false});
  res.json({status: 'Customer Updated'});
});

// DELETE a  Customer
router.delete('/:id', async (req, res) => {
  await Customer.findByIdAndRemove(req.params.id);
  res.json({status: 'Customer Deleted'});
});

module.exports = router;
