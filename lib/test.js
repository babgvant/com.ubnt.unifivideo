'use strict';

var fs = require('fs');

const UfvConstants = require('./ufvconstants');
const UfvApi = require('./ufvapi');
const UfvDiscovery = require('./ufvdiscovery');

let _onDevice = function (device) {
    console.log('Device found: ' + device.platform, '@', device.ip, '(' + device.hostname + ')');
};

let callback = function (error, data) {
    console.log(JSON.stringify(data, null, 2));
};

// let discovery = new UfvDiscovery();
// discovery.on(UfvConstants.DEVICE, _onDevice.bind(this));

// discovery.scan()
//     .then(devices => callback(null, devices))
//     .catch(error => callback(error));

let api = new UfvApi();
api.on(UfvConstants.API_HOST, apihost => {
    console.log(`API_HOST: ${apihost}`);
});
api.on(UfvConstants.API_KEY, apikey => {    
    console.log(`API_KEY: ${apikey}`);
});
api.Discover();
api.SetApiHost('192.168.1.13');
api.SetApiKey('DF6goEArz8wYw390JAOJytatvyTbfSeh');
api.GetSysInfo()
    .then(sysinfo => {
        console.log('[DEVICE] UVC-NVR found running UniFi Video version: ' + sysinfo.version);
    })
    .catch(sysinfo => {
        console.log('error');
    });

api.GetServer()
    .then(server => {
        console.log('[DEVICE] Server name: ' + server.name + ', address: ' + server.host);
    })
    .catch();

let n = new Date()

// api.FindCamera('F09FC22FCEA2')
//     .then(camera=>{
//         // console.log(camera);
//             let d = new Date(camera.lastRecordingStartTime);
            
//             console.log(d);
//             console.log(n.getTime());
//             console.log(n-d);
//     }).catch(e=>{
//         console.log(e);
//     });

// api.GetRecordings(n.getTime()-60000)
//     .then(recordings => {
//         console.log(recordings);
//     })
//     .catch(sysinfo => {
//         console.log('error');
//     });

// api.DownloadRecording('5b4f4a8ae4b05b21ca7eb945')
//     .then(rec => {
//         // console.log(rec.meta);
//         for (var i = 0; i < rec.length; i++) {
//             fs.writeFile(`${rec[i].meta.cameraName}-${rec[i].meta.key}.mp4`, rec.buffer, function(err) {
//                 if(err) {
//                     return console.log(err);
//                 }
            
//                 console.log("The file was saved!");
//             }); 
//         }
//     });

api.GetCameras()
    .then(cameras => {
        this._cameras = cameras;
        // console.log(this._cameras.length);
        for (let i = 0; i < this._cameras.length; i++) {
            let camera = this._cameras[i];

            // console.log(camera);
            // let d = new Date(camera.lastRecordingStartTime);
            // console.log(d);

            console.log('[DEVICE] Camera name: ' + camera.name
                + ', model: ' + camera.model
                + ', address: ' + camera.host);
            // api.Snapshot(camera, 1920)
            //     .then(img => {
            //         fs.writeFile(camera.name+'.jpg', img, function(err) {
            //             if(err) {
            //                 return console.log(err);
            //             }
                    
            //             console.log("The file was saved!");
            //         }); 
            //     });
        }
    })
    .catch();