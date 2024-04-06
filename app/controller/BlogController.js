//Npx Module
const catchAsync = require("../utils/catchAsync.js");

AppError = require("../utils/appError.js");
const {
  v4: uuidv4
} = require("uuid");
const {
  Op,
  Sequelize
} = require("sequelize");

const BlogModel = require("../model/BlogModel.js");
const HelperLibrary = require("../library/HelperLibrary.js");

exports.getAllBlogs = catchAsync(async (req, res, next) => {
  //user register code here
  let path = "http://localhost:5007/";
  let blogsData = await BlogModel.getAllBlogs(req);

  return res.send({
    status: "success",
    code: 200,
    path: path,
    message: "Blogs Data found",
    data: blogsData,
  });
});


exports.addBlogs = catchAsync(async (req, res, next) => {

  let folderPath = __dirname + "../../uploads/";
  let image = req.files.vImage
  let blogImage = [];
  let imageName;
  let imageArray = [];
  if (image.length) {
    blogImage = image;
  } else {
    blogImage.push(image);
  }
  //image size not more then 5mb
  var fileSize = 5 * 1024 * 1024;

  for (var i = 0; i < blogImage.length; i++) {
    let ext;
    var fileType;
    const multiPosts = blogImage[i];

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
    } else if (blogImage[i].size > fileSize) {

      throw new AppError("please select image less then 5mb", 400);
    } else {
      imageName = Date.now() + i + 1 + ext;
      await HelperLibrary.imageUpload(folderPath, image, imageName)
      imageArray.push(imageName)
    }
  }
  console.log("===", imageArray);
  const blogData = {
    vTitle: req.body.vTitle,
    vDescription: req.body.vDescription,
    vImage: imageArray[0],
    dtAddedDate: new Date(),
    dtUpdatedDate: new Date(),
  };
  let blogRes = await BlogModel.create(blogData);

  if (blogRes) {
    return res.send({
      status: "success",
      code: 200,
      message: "Blog Created Successfully",
      data: blogRes,
    });
  } else {
    throw new AppError("Something went wrong while create Product", 500)
  }
});

exports.updateBlogs = catchAsync(async (req, res, next) => {

  let folderPath = __dirname + "../../uploads/";
  let imageArray = [];
  if (!req.body.vImage) {
    let image = req?.files?.vImage
    let blogImage = [];
    let imageName;
    if (image.length) {
      blogImage = image;
    } else {
      blogImage.push(image);
    }
    //image size not more then 5mb
    var fileSize = 5 * 1024 * 1024;

    for (var i = 0; i < blogImage.length; i++) {
      let ext;
      var fileType;
      const multiPosts = blogImage[i];

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
      } else if (blogImage[i].size > fileSize) {

        throw new AppError("please select image less then 5mb", 400);
      } else {
        imageName = Date.now() + i + 1 + ext;
        await HelperLibrary.imageUpload(folderPath, image, imageName)
        imageArray.push(imageName)
      }
    }
  }
  // let vImage = imageArray[0]
  const blogsData = {
    vTitle: req.body.vTitle || "",
    vDescription: req.body.vDescription || "",
    vImage: req?.body?.vImage || imageArray[0] ,
    dtAddedDate: new Date(),
    dtUpdatedDate: new Date(),
  };
  let blogRes = await BlogModel.update(blogsData, {
    where: { iBlogId: req.body.iBlogId }
  });
  if (blogRes) {
    return res.send({
      status: "success",
      code: 200,
      message: "Bog Updated Successfully",
      data: blogRes,
    });
  } else {
    throw new AppError("Something went wrong while updating Product", 500)
  }
});

exports.deleteBlogs = catchAsync(async (req, res, next) => {
  await BlogModel.destroy({
    where: { iBlogId: req.body.iBlogId }
  });
  return res.send({
    status: "success",
    code: 200,
    message: "Blog Deleted Successfully",
  });
});