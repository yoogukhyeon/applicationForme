const express = require('express');
const router = express.Router();
const short = require('short-uuid');
const { db } = require('../models/couple');
const resResult = require('./common/resResult')
const shortid = require('shortid');
//multer 
const multer = require('multer');
//define multerStorage for the image
const storage = multer.diskStorage({
    //destination for files
    destination: function (req, file, callback) {
      callback(null, './src/public/uploades/images');
    },
  
    //add back the extension
    filename: function (req, file, callback) {
        const extension = path.extname(file.originalname);
        const basename = path.basename(file.originalname , extension);
        callback(null , basename + "_" + Date.now() + extension)
    },
  });

//upload parameters for multer
const upload = multer({
    storage: storage,
    limits: {
      files: 1,
      fieldSize: 1024 * 1024 * 100,
    },
  });

router.get('/storylist', (req, res) => {
    res.render('story/storyList')
})

router.get('/insert', (req, res) => {
    res.render('story/storyInsert')
})

router.post('/story/upload', upload.single('formFile'),  async(req, res) => {
    console.log("req.file", req.file)
    try{

        
    }catch(err){
        console.error(err)
    }
})


module.exports = router;