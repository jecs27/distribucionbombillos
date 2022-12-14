const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const {
  uploadFile,
  showPage,
} = require('../controllers/bombillos');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, 'uploads/')
  },
  filename: function(req, file, cb) {
      cb(null, file.originalname)
  }
});

const upload = multer({
  storage,
  fileFilter: function(req, file, callback) {
      let ext = path.extname(file.originalname);
      if (ext !== '.txt') {
          return callback(new Error('Only txt files.'))
      }
      callback(null, true)
  }
});

router.post('/uploadFile', upload.array('file'), uploadFile);
router.get('/', showPage);

module.exports = router;
