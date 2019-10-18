const router = require('express').Router();
const multer = require('multer');

const employeeController = require('./controller/employeeController');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if(file.fieldname == 'avatar')
      cb(null, 'static/media')
    else if (file.fieldname == 'cv')
      cb(null, 'static/cv')
  },
  filename: function (req, file, cb) {
    let extArray = file.mimetype.split("/");
    let extension = extArray[extArray.length - 1];
    cb(null, file.fieldname + '-' + Date.now()+ '.' +extension)
  }
})
 
var upload = multer({ storage: storage })

router.get('/', function (req, res) {
  res.json({ status: 'API Its Working', message: 'Welcome to API REST' });
});

router.get('/employees',employeeController.index)
router.get('/employees/:id',employeeController.show)
router.post('/employees', upload.fields([{name:'avatar',maxCount: 1},{name:'cv', maxCount: 1}]), employeeController.store);
//router.post('/employees', employeeController.store);
router.put('/employees/:id',employeeController.update)
router.delete('/employees/:id',employeeController.delete);

module.exports = router;