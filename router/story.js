const express = require('express');
const router = express.Router();
const story = require('../models/story')
//path
const path = require('path')
const resResult = require('./common/resResult')

//multer 
const multer = require('multer');
//define multerStorage for the image
const storage = multer.diskStorage({
    //destination for files
    destination: function (req, file, callback) {
      callback(null, './public/uploades/images');
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

router.get('/storylist', async (req, res) => {
    let storyList

    try{  

      storyList = await story.find().sort({"_id" : -1})


      console.log("storyList", storyList)

    }catch(e){
      console.error(e);
    }finally{
      res.render('story/storyList', {storyList})
    }
   
})

router.get('/insert', (req, res) => {
    res.render('story/storyInsert')
})

router.post('/upload/img', upload.single('formFile'),  async(req, res) => {
    let result = new Object();

    const fileName = req.file ? req.file.filename : "";
    try{
     

        
      result = resResult(true, 200, "데이터 전송 완료", fileName);
    }catch(e){
        console.log(e);
        result = resResult(false, 500, "알수없는 오류입니다. 관리자에게 문의해주세요.", e.message);
    }finally{
        res.send(result);
    } 
})


router.post('/insert',  async(req, res) => {
    let result = new Object();
    const {title, textarea, imgName} = req.body
  
  try{   

    let randomNum = Math.floor(Math.random() * 400);
    
    const findSlug = await story.findOne({slug : randomNum})
    
    if(!findSlug){    
      const resultData = await story.create({
          slug : randomNum,
          title : title,
          content : textarea,
          img : imgName
      }) 
    }else{

      const id = findSlug.slug

      randomNum = Math.floor(Math.random() * 600);
      const updateData = await Calendar.findOneAndUpdate({id} , {
            slug : randomNum,
      })
      
    }

    result = resResult(true, 200, "데이터 전송 완료", "");
  }catch(e){
      console.log(e);
      result = resResult(false, 500, "알수없는 오류입니다. 관리자에게 문의해주세요.", e.message);
  }finally{
      res.send(result);
  } 
})

module.exports = router;