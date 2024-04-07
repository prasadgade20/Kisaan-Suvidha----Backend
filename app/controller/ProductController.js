//Npx Module
const catchAsync = require("../utils/catchAsync.js");

AppError = require("../utils/appError.js");
const { v4: uuidv4 } = require("uuid");
const { Op, Sequelize } = require("sequelize");

const ProductModel = require("../model/ProductModel.js");
const HelperLibrary = require("../library/HelperLibrary.js");

exports.getAllProducts = catchAsync(async (req, res, next) => {
  //user register code here
  let path = "http://localhost:5007/";
  let productsData = await ProductModel.getAllProducts(req);

  return res.send({
    status: "success",
    code: 200,
    path: path,
    message: "Product Data found",
    data: productsData,
  });
});

exports.addProducts = catchAsync(async (req, res, next) => {
  let folderPath = __dirname + "../../uploads/";
  let image = req.files.vImage;
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
      throw new AppError("Only (png,jpg,jpeg,webp) is Valid.", 400);
    } else if (postImage[i].size > fileSize) {
      throw new AppError("please select image less then 5mb", 400);
    } else {
      imageName = Date.now() + i + 1 + ext;
      await HelperLibrary.imageUpload(folderPath, image, imageName);
      imageArray.push(imageName);
    }
  }
  const productsData = {
    iUserId: req.body.iUserId || null,
    vName: req.body.vName || null,
    vDescription: req.body.vDescription || null,
    vAddress: req.body.vAddress || null,
    vPrice: req.body.vPrice || null,
    eType: req.body.eType || null,
    eSold: "UnRented",
    vImage: imageArray[0],
    dtAddedDate: new Date(),
    dtUpdatedDate: new Date(),
    manufacturer: req.body.manufacturer || null,
    availableDuration: req.body.availableDuration || null,
    ageOfEquipment: req.body.ageOfEquipment || null,
    area: req.body.area || null,
    soilType: req.body.soilType || null,
    waterSupply: req.body.waterSupply == "Yes" ? true  : false,
    electricitySupply: req.body.electricitySupply == "Yes" ? true  : false,
    availability: req.body.availability || null,
  };

  let productRes = await ProductModel.create(productsData);

  if (productRes) {
    return res.send({
      status: "success",
      code: 200,
      message: "Product Created Successfully",
      data: productRes,
    });
  } else {
    throw new AppError("Something went wrong while create Product", 500);
  }
});

exports.updateProducts = catchAsync(async (req, res, next) => {
  let folderPath = __dirname + "../../uploads/";
  let imageArray = [];
  if (!req.body.vImage) {
    let image = req?.files?.vImage;
    let postImage = [];
    let imageName;
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
        throw new AppError("Only (png,jpg,jpeg,webp) is Valid.", 400);
      } else if (postImage[i].size > fileSize) {
        throw new AppError("please select image less then 5mb", 400);
      } else {
        imageName = Date.now() + i + 1 + ext;
        await HelperLibrary.imageUpload(folderPath, image, imageName);
        imageArray.push(imageName);
      }
    }
  }
  // let vImage = imageArray[0]
  const productsData = {
    vName: req.body.vName || "",
    vDescription: req.body.vDescription || "",
    vPrice: req.body.vPrice || "",
    eType: req.body.eType || "smallTools",
    vImage: req?.body?.vImage || imageArray[0],
    eSold: req?.body?.eSold || "UnRented",
    vAddress: req.body.vAddress,
    dtAddedDate: new Date(),
    dtUpdatedDate: new Date(),
  };
  console.log(productsData);
  console.log(req.body.iProductId);
  let productRes = await ProductModel.update(productsData, {
    where: { iProductId: req.body.iProductId },
  });
  if (productRes) {
    return res.send({
      status: "success",
      code: 200,
      message: "Product Updated Successfully",
      data: productRes,
    });
  } else {
    throw new AppError("Something went wrong while updating Product", 500);
  }
});

exports.deleteProducts = catchAsync(async (req, res, next) => {
  await ProductModel.destroy({
    where: { iProductId: req.body.iProductId },
  });
  return res.send({
    status: "success",
    code: 200,
    message: "Product Deleted Successfully",
  });
});
