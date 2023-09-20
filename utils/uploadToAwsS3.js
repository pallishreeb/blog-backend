// const { s3, getSignedUrl, deleteFileFromS3 } = require("../utils/s3");
// const { v4: uuidv4 } = require("uuid");

//save multiple images and docs to s3 
// let images = [];
// let docs = [];
// if (req.files.images && req.files.images.length > 0) {
//   for (const element of req.files.images) {
//     let url = getSignedUrl(element.key);
//     images.push({
//       id: uuidv4(),
//       originalname: element.originalname,
//       url: url,
//       key: element.key,
//     });
//   }
// }
// if (req.files.docs && req.files.docs.length > 0) {
//   for (const element of req.files.docs) {
//     let url = getSignedUrl(element.key);
//     docs.push({
//       id: uuidv4(),
//       originalname: element.originalname,
//       url: url,
//       key: element.key,
//     });
//   }
// }

//delete multiple images to s3
// for (const element of post.images) {
//   deleteFileFromS3({ key: element.key }, (d) => {
//     if (d.success === false) {
//       console.log("Error occured in delete file from s3", d.error);
//     } else {
//       console.log("Successfully delted from s3 bucket");
//     }
//   });
// }
// for (var i = 0; i < post.docs.length; i++) {
//   deleteFileFromS3({ key: post.images[i].key }, (data) => {
//     if (data.success === false) {
//       console.log("Error occured in delete file from s3", data.error);
//     } else {
//       console.log("Successfully delted from s3 bucket");
//     }
//   });
// }

// "@aws-sdk/client-s3": "^3.405.0",
// "aws-sdk": "^2.1302.0",
// "multer-s3": "^3.0.1",
// "nanoid": "^4.0.0",