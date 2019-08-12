'use strict';

const XLSX = require('xlsx'),
    Config = require('../../config/config.js').get(process.env.NODE_ENV || 'staging'),
    fs = require('fs');
const Aftership = require('aftership');
(Config.AFTERSHIP.API_KEY);



class FileUtility {
    // Convert the excel file in to json format;
    static readDataFromDownloadedFile(file) {
        return new Promise((resolve, reject) => {
            try {
                const workbook = XLSX.readFile(file);
                const sheet_name_list = workbook.SheetNames;
                const excel_data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
                if (excel_data) {
                    resolve(excel_data);
                } else {
                    reject(false);
                }
            } catch (err) {
                console.log('errorr ', err);
            }
        });
    }
    static readFile(path) {
        try {
            fs.readFile(path, function (err, data) {
                if (err) throw err;
                return data
            });
        } catch (error) {
            console.log('errorr ', error);

        }
    }
    static downloadFileFromBuffer(path, buffer) {
        try {
            fs.writeFileSync(path, buffer);
            return true;
        } catch (error) {
            console.log('errorr ', error);
        }
    }
    static removeFile(path) {
        try {
            fs.unlinkSync(path);
        } catch (error) {
            console.log('error in while remove file ', error);
        }
    }
    static getCourire(test) {
        new Promise((resolv, reject) => {
            try {
                Aftership.call('POST', '/couriers/detect', {
                    body: test
                }, function (err, result) {
                    if (result) {
                        console.log('sdfsdfsdf result ', result);
                        return resolv(result);
                        //let resObj = packageTrack.getTest(result['data'].couriers[0].slug, );
                        //console.log('res object ', resObj);
                    } else {
                        console.log('sdfsdfsfsd ', err);
                        return reject(err);
                        //return response(res, Constant.ERROR_CODE, Constant.CANNOT_TRACK_SHIPMENT)
                    }
                });
            } catch (error) {
                console.log('errd ', error);
            }

        });
    }
    //    getTest(slug) {               
    //         console.log('slugs ', slug);
    //         Aftership.call('GET', '/trackings/' + slug + '/' + query.tracking_number,
    //          function(err, result) {
    //              if(!err) {
    //                  return result;
    //              } else {
    //                  return err;
    //              }
    //          }                    
    //         );
    //     }
}
module.exports = {
    readDataFromDownloadedFile: FileUtility.readDataFromDownloadedFile,
    downloadFileFromBuffer: FileUtility.downloadFileFromBuffer,
    removeFile: FileUtility.removeFile,
    readFile: FileUtility.readFile,
    getCourire: FileUtility.getCourire
}