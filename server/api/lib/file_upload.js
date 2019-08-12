'use strict';
/*
 * Utility - utility.js
 * Author: smartData Enterprises
 * Date: 3rd Jan 2017
 */
// var mongoose = require('mongoose');
// var fs = require("fs");
// var path = require('path');
// var async = require('async');
var Config = require('../../config/config.js').get(process.env.NODE_ENV || 'staging');
var Constant = require('../../config/constant.js');
var file_upload = {};

var AWS = require('aws-sdk');
AWS.config.update({
    // accessKeyId: common.AWS.ACCESS_KEY_ID,
    // secretAccessKey: common.AWS.SECRET_ACCESS_KEY
    accessKeyId: Config.AWS.accessKeyId,
    secretAccessKey: Config.AWS.secretAccessKey
});
// AWS.config.loadFromPath('./s3_config.json');
var s3 = new AWS.S3();

file_upload.UploadFileToS3_base64 = function (buffer_string, file_name, path) {
    return new Promise((resolve, reject) => {
        if (buffer_string) {
            var base64Data = buffer_string;
            // const base64Data = new Buffer(img_src.replace(/^data:image\/\w+;base64,/, ""), 'base64');

            //  file_upload.resize_buffer(base64Data,400,300).then(function(response_t){
            var data = {
                Key: file_name,
                Body: base64Data,
                Bucket: Config.AWS.bucket + Constant.STAFF_PATH,
                ACL: 'public-read',
                ContentEncoding: 'base64',
                ContentType: 'image/png',
                CacheControl: 'no-cache'
            };
            s3.putObject(data, function (err, res) {
                if (err) {
                    console.log('*****err  here??********* ', err);

                    reject(0);
                } else {
                    var fileUrl = Config.AWS.path + Config.AWS.bucket + '/profile_img/' + file_name;
                    let params = {
                        'url': fileUrl,
                        'name': file_name,
                        'verId': res.ETag,
                    };
                    resolve(params);

                }
            });

            // }).catch(function(err){
            //     console.log('Error',err);
            //     reject(0);
            // });           
        } else {

        }


    });
}



file_upload.uploadProductImages = function (base64_string, file_name) {
    return new Promise((resolve, reject) => {
        try {
            this.UploadFileToS3_base64(base64_string, file_name, Constant.PRODUCT_PATH).then(function (response_t) {
                // resolve(response_t);
                file_upload.UploadThumbnail(base64_string, file_name, Constant.PRODUCT_PATH_THUMB, 450, 300).then(function (response_t1) {
                    console.log('response_t1', response_t1);
                    resolve(response_t1);
                });
            });
        } catch (err) {
            console.log('Error', err);
            reject(0);
        }

    });
}

file_upload.uploadStaffImage = function (buffer_string, file_name) {
    return new Promise((resolve, reject) => {
        try {
            this.UploadFileToS3_base64(buffer_string, file_name, Constant.STAFF_PATH).then(function (response_t) {
                resolve(response_t);
                // file_upload.UploadThumbnail(buffer_string, file_name, Constant.PRODUCT_PATH_THUMB, 450, 300).then(function (response_t1) {
                //     console.log('response_t1', response_t1);
                //     resolve(response_t1);
                // });
            });
        } catch (err) {
            console.log('Error', err);
            reject(0);
        }

    });
}

file_upload.uploadPdf = function (base64_string, file_name, path) {
    return new Promise((resolve, reject) => {
        try {
            if (base64_string) {
                var img_src = base64_string;
                const base64Data = new Buffer(img_src.replace(/^data:application\/\w+;base64,/, ""), 'base64');

                var data = {
                    Key: file_name,
                    Body: base64Data,
                    Bucket: Config.AWS.bucket + '/pdf/' + path,
                    ACL: 'public-read',
                    ContentEncoding: 'base64',
                    ContentType: 'image/pdf',
                    //CacheControl:'no-cache'

                };
                s3.putObject(data, function (err, data) {
                    if (err) {
                        reject(0);
                        console.log('Error uploading data: ', data);
                    } else {
                        resolve(file_name);
                        //console.log('data',data);
                        console.log('succesfully uploaded the image!');
                    }
                });

                // }).catch(function(err){
                //     console.log('Error',err);
                //     reject(0);
                // });           
            } else {

            }
        } catch (err) {
            // console.log('Error',err);
            reject(0);
        }

    });
}

file_upload.uploadMurals = function (base64_string, file_name, tiff) {
    return new Promise((resolve, reject) => {
        try {
            this.UploadFileToS3_base64(base64_string, file_name, Constant.MURAL_PATH).then(function (response_t) {
                file_upload.UploadThumbnail(base64_string, file_name, Constant.MURAL_PATH_THUMB, 250, 210).then(function (response_t1) {
                    resolve(response_t1);
                });
            });
        } catch (err) {
            console.log('Error', err);
            reject(0);
        }

    });
}


file_upload.uploadMediaImages = function (base64_string, file_name, type) {
    return new Promise((resolve, reject) => {
        try {
            this.UploadFileToS3_base64(base64_string, file_name, '/medias/' + type).then(function (response_t) {
                file_upload.UploadThumbnail(base64_string, file_name, '/medias/' + type + '/thumb', 450, 300).then(function (response_t1) {
                    //console.log('response_t1',response_t1);
                    resolve(response_t1);
                });
            });
        } catch (err) {
            console.log('Error', err);
            reject(0);
        }

    });
}

file_upload.uploadMediaPdf = function (base64_string, file_name, path) {
    return new Promise((resolve, reject) => {
        try {
            if (base64_string) {
                var img_src = base64_string;
                const base64Data = new Buffer(img_src.replace(/^data:application\/\w+;base64,/, ""), 'base64');

                var data = {
                    Key: file_name,
                    Body: base64Data,
                    Bucket: Config.AWS.bucket + '/medias/' + path,
                    ACL: 'public-read',
                    ContentEncoding: 'base64',
                    ContentType: 'image/pdf',
                    //CacheControl:'no-cache'
                };
                s3.putObject(data, function (err, data) {
                    if (err) {
                        reject(0);
                        console.log('Error uploading data: ', data);
                    } else {
                        resolve(file_name);
                        //console.log('data',data);
                        console.log('succesfully uploaded the image!');
                    }
                });

                // }).catch(function(err){
                //     console.log('Error',err);
                //     reject(0);
                // });           
            } else {

            }
        } catch (err) {
            // console.log('Error',err);
            reject(0);
        }

    });
}

file_upload.uploadBufferPdf = function (buffer, file_name, path = "/pdf") {
    return new Promise((resolve, reject) => {
        try {
            if (Buffer.isBuffer(buffer)) {
                //console.log('Config.AWS.bucket', Config.AWS.bucket, path)
                let data = {
                    Key: file_name,
                    Body: buffer,
                    Bucket: Config.AWS.bucket + path,
                    ACL: 'public-read',
                    ContentEncoding: 'base64',
                    ContentType: 'image/pdf',
                    // CacheControl:'no-cache'
                };
                s3.putObject(data, function (err, data) {
                    if (err) {
                        reject(0);
                        console.log('Error uploading data: ', err);
                    } else {
                        resolve(file_name);
                        //console.log('data',data);
                        console.log('succesfully uploaded the PDF!',
                            data);
                    }
                });

            } else {

            }
        } catch (err) {
            // console.log('Error',err);
            reject(0);
        }

    });
}

file_upload.deleteFile = function (file_name, path = "", delete_thumb = false) {
    return new Promise((resolve, reject) => {
        try {
            if (file_name) {
                let params = {
                    Bucket: Config.AWS.bucket + Constant.STAFF_PATH,
                    Key: file_name
                }
                s3.deleteObject(params, function (err, data) {
                    if (err) reject(err); // an error occurred
                    else {
                        resolve(data);
                    } // successful response
                });
            } else {
                reject(Constant.NOT_PROPER_DATA);
            }
        } catch (err) {
            reject(err);
        }

    });
}

file_upload.userprofile = function (base_64, file_name, path = "/user") {
    return new Promise((resolve, reject) => {
        try {
            if (file_name && base_64) {
                let params = {
                    Bucket: Config.AWS.bucket + path,
                    Key: file_name
                }
                s3.deleteObject(params, function (err, data) {
                    if (err) {} // an error occurred
                    // else (data) {
                    //     resolve(data);
                    // }
                    file_upload.UploadFileToS3_base64(base_64, file_name, path)
                        .then(result => {
                            return resolve({
                                file_name: file_name,
                                path: path
                            });
                        }).catch(err => {
                            console.log(err)
                            return reject(err);
                        })
                });
            } else {
                return reject(Constant.NOT_PROPER_DATA);
            }
        } catch (err) {
            return reject(err);
        }

    });
}

// file_upload.createTiff = function (buffer, file_name, path = "/pdf") {
//     return new Promise((resolve, reject) => {
//         try {
//             if (Buffer.isBuffer(buffer)) {
//                 //console.log('Config.AWS.bucket', Config.AWS.bucket, path)
//                 let data = {
//                     Key: file_name,
//                     Body: buffer,
//                     Bucket: Config.AWS.bucket + '/tiff',
//                     ACL: 'public-read',
//                     ContentEncoding: 'base64',
//                     ContentType: 'image/pdf',
//                     // CacheControl:'no-cache'
//                 };
//                 s3.putObject(data, function (err, data) {
//                     if (err) {
//                         reject(0);
//                         console.log('Error uploading data: ', err);
//                     } else {
//                         resolve(file_name);
//                         //console.log('data',data);
//                         //console.log('succesfully uploaded the PDF!',data);
//                     }
//                 });

//             } else {

//             }
//         } catch (err) {
//             // console.log('Error',err);
//             reject(0);
//         }

//     });
// }



file_upload.getBuffer = function (path, file_name) {
    return new Promise((resolve, reject) => {
        if (file_name) {
            try {
                var getParams = {
                    Bucket: Config.AWS.bucket, // your bucket name,
                    Key: path + file_name // path to the object you're looking for
                }

                s3.getObject(getParams, function (err, data) {
                    if (!err) {
                        if (Buffer.isBuffer(data.Body)) {
                            return resolve(data.Body);
                        } else {
                            return reject('Not a buffer')
                        }
                    } else {
                        return reject(err);
                    }
                });

            } catch (err) {
                return reject(err);
            }
        } else {
            return reject('File name not present')
        }

    });
}


module.exports = file_upload;