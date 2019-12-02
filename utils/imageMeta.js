'use strict';
const ExifImage = require('exif').ExifImage;

const getCoordinates = (imgFile) => { // imgFile = full path to uploaded image
    return new Promise((resolve, reject) => {
        try {
            new ExifImage({ image : imgFile }, (error, exifData) => {
                if (error) {
                    console.log('Error: ' + error.message);
                    reject(error);
                }
                else {
                    const latitude = gpsToDecimal(exifData.gps.GPSLongitude, exifData.gps.GPSLongitudeRef);
                    const longitude = gpsToDecimal(exifData.gps.GPSLatitude, exifData.gps.GPSLatitudeRef);
                    resolve([latitude, longitude]);
                }
            });
        }
        catch (error) {
            reject(error);
        }
    });
};

// convert GPS coordinates to decimal format
// for longitude, send exifData.gps.GPSLongitude, exifData.gps.GPSLongitudeRef
// for latitude, send exifData.gps.GPSLatitude, exifData.gps.GPSLatitudeRef
const gpsToDecimal = (gpsData, hem) => {
    try {
        let d = parseFloat(gpsData[0]) + parseFloat(gpsData[1] / 60) +
            parseFloat(gpsData[2] / 3600);
        return (hem === 'S' || hem === 'W') ? d *= -1 : d;
    } catch (e) {
        console.log('no coords');
        return (60);
    }
};

module.exports = {
    getCoordinates,
};