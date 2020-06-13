const mongoose = require('mongoose');
const { Schema } = mongoose;

const CustomerSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true  },
  email : {type: String},
  phoneNumber : {type: Number}
});

module.exports = mongoose.model('Customer', CustomerSchema);
