
//Edit this to set controller prefix
const controllerPrefix = 'vendorCategories';
///////////////////////////////////
const controller = require('../controllers/'+controllerPrefix+'.controller');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const fileUpload = require('express-fileupload');



// function decodeBase64Image(dataString) {
//     var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
//       response = {};
  
//     if (matches.length !== 3) {
//       return new Error('Invalid input string');
//     }
  
//     response.type = matches[1];
//     response.data = new Buffer.from(matches[2], 'base64');
  
//     return response;
//   }

// router.post('/add', function (req, res, next) {

//     // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
//     var decodedImg = decodeBase64Image(req.body.file);
//     var imageBuffer = decodedImg.data;
//     var fileName =  "image." + '.jpg';
//     var startup_image = imageBuffer;
//    console.log(startup_image);
//    // Use the mv() method to place the file somewhere on your server
// //    startup_image.mv('app/uploads/' + fileName, function(err) {
// //      if(err){
// //        console.log(err);
// //      }else{
// //        console.log("yeah baby");
//     fs.writeFile("app/uploads/imagesaved.jpg", startup_image, function(err) {
// 		if(err) {
// 			return console.log(err);
// 		}
// 		console.log("The file was saved!");
// 	}); 
//     }
// );

router.post('/add', controller.add);
router.patch('/patch', controller.update);
router.get('/list', controller.list);
router.delete('/delete/:id', controller.delete);
router.delete('/deleteMany', controller.deleteMany);
router.get('/getMany', controller.getMany);
router.get('/:id',controller.getById);
module.exports = router;


