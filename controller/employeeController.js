const Employee = require('../models/employee');
const fs = require('fs');

exports.index = async (req, res) => {
  const employees = await Employee.find({});
  try{
    res.status(201).json(employees);
  }catch(e){
    res.status(500).send(e);
  }
};

exports.show = async (req, res) => {
  const employee = await Employee.findById(req.params.id);
  try{
    if (employee) res.status(200).json(employee);
    else res.status(404).send("No item found");
  }catch(e){
    res.status(500).send(e);
  }
};

exports.store = async (req, res) => {
  const employee = new Employee({
    'first_name': req.body.first_name,
    'last_name': req.body.last_name,
    'about': req.body.about,
    'avatar': 'http://127.0.0.1:9000/'+req.files['avatar'][0].path,
    'cv': 'http://127.0.0.1:9000/'+req.files['cv'][0].path,
  });

  try {
    await employee.save();
    res.status(201).json(employee);
  }catch(e){
    res.status(500).send(e);
  }
}

exports.update = async (req, res) => {
  const employee = await Employee.findById(req.params.id);
  try{
    if (employee){
      await employee.updateOne({
        'first_name' : req.body.first_name ? req.body.first_name : employee.first_name,
        'last_name' : req.body.last_name ? req.body.last_name : employee.last_name,
        'about' : req.body.about ? req.body.about : employee.about,
        'avatar': req.file ? 'http://127.0.0.1:9000/'+req.files['avatar'][0].path : employee.avatar,
        'cv': req.file ? 'http://127.0.0.1:9000/'+req.files['cv'][0].path : employee.cv,
      });
      res.status(200).json(employee);
    }else res.status(404).send("No item found");
  }catch(e){
    res.status(500).send(e);
  }
};

exports.delete =  async (req, res) => {
  try{
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) res.status(404).send("No item found")
    res.status(200).send()
  }catch(e){
    res.status(500).send(e);
  }
};