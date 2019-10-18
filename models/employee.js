var mongoose = require('mongoose');

const employeeSchema =  new mongoose.Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  about: {
    type: String,
    required: true
  },
  avatar: String,
  cv: String,
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

const Employee = mongoose.model('employees', employeeSchema);

// module.exports.get = function (callback, limit) {
//   Employee.find(callback).limit(limit);
// }

module.exports = Employee;