// const aws = require('aws-sdk')
// const multer = require('multer')
// const multerS3 = require('multer-s3')

// var s3 = new aws.S3({
//   accessKeyId: "abcd",
//   secretAccessKey: "abcd"
// })

// const Bucket_Name = ''

// const upload = multer({
//   storage: multerS3({
//     s3: s3,
//     bucket: "abcd",
//     metadata: function (_, file, cb) {
//       cb(null, { fieldName: file.fieldname });
//     },
//     key: function (_, file, cb) {
//       console.log("file name", file)
//       cb(null, Date.now().toString())
//     }
//   })
// })


// const getSignedUrl = (key) => {
//   return s3.getSignedUrl('getObject', {
//     Bucket: "abcd",
//     Key: key
//   })

// }

// const deleteFileFromS3 = (req, cb) => {
//   var params = {
//     Bucket: "abcd",
//     Key: req.key
//   };
//   s3.deleteObject(params, function (err, data) {
//     if (err) {
//       cb(() => {
//         return {
//           success: false,
//           error: err
//         }
//       })
//       console.log(err, err.stack); // an error occurred
//     }
//     else {
//       cb(() => {
//         return {
//           success: true

//         }
//       })
//     }
//   });

// }

// module.exports = { upload, s3, deleteFileFromS3, getSignedUrl }