const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors')

const app = express();

app.use(cors())

const router = require("./routes");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/static'));

// mongoose.connect('mongodb://localhost/employees', { useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connect('mongodb+srv://employeesAdmin:3eZPATjsGDKRfwtp@node-employees-test-boyov.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;

if(!db)
  console.log("Error connecting db")
else
  console.log("Db connected successfully")

var port = process.env.PORT || 9000;

app.get('/', (req, res) => res.send('Hello World with Express'));
app.use('/api/v1', router);

app.listen(port, () => {
  console.log("Running server on port http://127.0.0.1:" + port);
});