const AppError = require("../utils/appError.js");
const HelperLibrary = require("../library/HelperLibrary.js");
module.exports = class ImageValidation {
  async validateImage(folderPath, image) {
    let postImage = [];
    let imageName;
    let imageArray = [];
    if (image.length) {
      postImage = image;
    } else {
      postImage.push(image);
    }
    //image size not more then 5mb
    var fileSize = 5 * 1024 * 1024;

    for (var i = 0; i < postImage.length; i++) {
      let ext;
      var fileType;
      const multiPosts = postImage[i];

      if (multiPosts.mimetype == "image/png") {
        ext = ".png";
        fileType = "image";
      }
      if (multiPosts.mimetype == "image/jpg") {
        ext = ".jpg";
        fileType = "image";
      }
      if (multiPosts.mimetype == "image/jpeg") {
        ext = ".jpeg";
        fileType = "image";
      }
      if (multiPosts.mimetype == "image/webp") {
        ext = ".webp";
        fileType = "image";
      }
      if (ext == undefined) {

        throw new AppError("Only (png,jpg,jpeg,webp) is Valid.", 400)
      } else if (postImage[i].size > fileSize) {

        throw new AppError("please select image less then 5mb", 400);
      } else {
        imageName = Date.now() + i + 1 + ext;
        await HelperLibrary.imageUpload(folderPath, image, imageName)
        imageArray.push(imageName)
      }
    }
    return imageArray;
  }
  async validateDocument(req,res,next) {
    try{
     
      if(req.files){
          let documentData  = []
          var fileSize = 20 * 1024 * 1024;
          if(req.files.document){
            if(req.files.document.length){
              documentData = req.files.document;
            }else{
              documentData.push(req.files.document);
            }
           
            for (var i = 0; i < documentData.length; i++) {
              let ext;
       
              const multiPosts = documentData[i];
              if (multiPosts.mimetype == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
                ext = ".xlsx";
              }
              if (multiPosts.mimetype == 'application/vnd.ms-excel') {
                ext = ".xls";
              }
              if (multiPosts.mimetype == 'application/pdf') {
                ext = ".pdf";
              }
              if (multiPosts.mimetype == 'application/msword') {
                ext = ".doc";
              }
              if (multiPosts.mimetype == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
                ext = ".docx";
              }
              if (multiPosts.mimetype == 'text/plain') {
                ext = ".txt";
              }
              if (ext == undefined) {
                throw new AppError("Only (xlsx,xls,pdf,doc,docx,txt) is Valid.", 400)
              } else if (documentData[i].size > fileSize) {
                throw new AppError("please select document less then 20mb", 400);
              }
            }
          }
        }
        next();
        
    }catch(error){
      next(error)
    }
  }
};