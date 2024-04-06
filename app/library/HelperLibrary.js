// const sharp = require('sharp')
const fs = require("fs");
const formidable = require("formidable");
const ffmpeg = require("fluent-ffmpeg");
const path = require('path');
// const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
// ffmpeg.setFfmpegPath(ffmpegPath);
module.exports = {
  // imageUpload: async (folderPath, tempFilePath, size, ext, image_name) => {

  //     var quality;

  //     if (size <= 500000) {  // less or equal to  500kb
  //         quality = 40;
  //     }
  //     if (size > 500000 && size <= 1000000) { // more than 500kb and less than 1 mb
  //         quality = 50;
  //     }
  //     if (size > 1000000) {   //more than 1 mb
  //         quality = 45;
  //     }

  //     if (!fs.existsSync(folderPath)) {
  //         await fs.mkdirSync(folderPath, {
  //             recursive: true
  //         });
  //     }
  //     //  else {

  //     //     await fs.mkdirSync(folderPath, {
  //     //         recursive: true
  //     //     });
  //     //     sharp(tempFilePath)
  //     //         .resize(1200)
  //     //         .toFormat(ext, { quality: quality })
  //     //         .toFile(folderPath + image_name, (err, info) => {
  //     //             if (err) {
  //     //       
  //     //             } else {
  //     //          
  //     //             }
  //     //         });
  //     // }

  //     sharp(tempFilePath)
  //         .resize(1200)
  //         .toFormat(ext, { quality: quality })
  //         .toFile(folderPath + image_name, (err, info) => {
  //             if (err) {
  //             }
  //             // else {
  //             // }
  //         });

  // },

  //For Upload Image
  imageUpload: async (folderPath, attachmentFile, image_name) => {
    if (!fs.existsSync(folderPath)) {
      await fs.mkdirSync(folderPath, {
        recursive: true,
      });
    }
    await attachmentFile.mv(folderPath + image_name);
  },
  //for delete existing image from folder
  deleteImage: async (folderPath, image_name) => {
    if (fs.existsSync(folderPath + image_name)) {
      fs.unlinkSync(folderPath + image_name, {
        recursive: true,
      });
    }
  },

  //getting video dimensions
  getFileDimensionsData: async function (path) {
    return new Promise((resolve, reject) => {
      ffmpeg.ffprobe(path, (ffprobeErr, metadata) => {
        if (ffprobeErr) {
          reject(ffprobeErr);
        } else {
          const {
            width,
            height
          } = metadata.streams[0];
          resolve({
            width,
            height
          });
        }
      });
    });
  },

  genrateInvoiceNumber: (numberLength, orderNumber) => {
    let invoice = "";
    for (let i = 0; i < numberLength; i++) {
      invoice += "0";
    }
    let orderLength = orderNumber.toString();
    orderLength = orderLength.length;
    if (orderLength <= numberLength) {
      return parseInt(
        (invoice = invoice.slice(0, numberLength - orderLength) + orderNumber)
      );
    } else {
      return (invoice = orderNumber);
    }
  },

  generateItemsHTML: async (items, type) => {
    let itemChar = "";
    if (type == "subscription") {
      items.map((item, index) => {
        itemChar =
          "<tr>" +
          `<td style="padding: 0.75rem;font-size:12px;color:#232323;font-weight:500;background: #FFFFFF;vertical-align: middle;border: 2px solid #DDE4EC;text-align: center;">${
            index + 1
          }</td>` +
          `<td style="padding: 0.75rem;font-size:12px;color:#232323;font-weight:500;background: #FFFFFF;vertical-align: middle;border: 2px solid #DDE4EC;text-align: center;">${item["vTitle"]}</td>` +
          `<td style="padding: 0.75rem;font-size:12px;color:#232323;font-weight:500;background: #FFFFFF;vertical-align: middle;border: 2px solid #DDE4EC;text-align: center;">${item["Date"]}</td>` +
          `${item["fPrice"] ? `<td style="padding: 0.75rem;font-size:12px;color:#232323;font-weight:500;background: #FFFFFF;vertical-align: middle;border: 2px solid #DDE4EC;text-align: center;">${item["fPrice"]}</td>` : ''}` +
          `<td style="padding: 0.75rem;font-size:12px;color:#232323;font-weight:500;background: #FFFFFF;vertical-align: middle;border: 2px solid #DDE4EC;text-align: center;">${item["fTotalPrice"]}</td>` +
          "</tr>";
      });
    } else {
      items.map((item, index) => {
        itemChar =
          "<tr>" +
          `<td style="padding: 0.75rem;font-size:12px;color:#232323;font-weight:500;background: #FFFFFF;vertical-align: middle;border: 2px solid #DDE4EC;text-align: center;">${
            index + 1
          }</td>` +
          `<td style="padding: 0.75rem;font-size:12px;color:#232323;font-weight:500;background: #FFFFFF;vertical-align: middle;border: 2px solid #DDE4EC;text-align: center;">${item["vTitle"]}</td>` +
          `<td style="padding: 0.75rem;font-size:12px;color:#232323;font-weight:500;background: #FFFFFF;vertical-align: middle;border: 2px solid #DDE4EC;text-align: center;">${item["iQuantity"]}</td>` +
          `${item["fPrice"] ? `<td style="padding: 0.75rem;font-size:12px;color:#232323;font-weight:500;background: #FFFFFF;vertical-align: middle;border: 2px solid #DDE4EC;text-align: center;">${item["fPrice"]}</td>` : ''}` +
          `<td style="padding: 0.75rem;font-size:12px;color:#232323;font-weight:500;background: #FFFFFF;vertical-align: middle;border: 2px solid #DDE4EC;text-align: center;">${item["fTotalPrice"]}</td>` +
          "</tr>";
      });
    }

    return itemChar;
  },
};