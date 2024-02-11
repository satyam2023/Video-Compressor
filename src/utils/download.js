
import React from 'react';
import { Alert } from 'react-native';


import RNFetchBlob from 'rn-fetch-blob';
const downloadImage = async (url) => {
    
console.log("downloding started....")
    
    let date = new Date();
    
    let image_URL = url;
  
    let ext = getExtention(image_URL);
    ext = '.' + ext[0];
    const {config, fs} = RNFetchBlob;
    let PictureDir = fs.dirs.PictureDir;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
      
        useDownloadManager: true,
        notification: true,
        path:
          PictureDir +
          '/video_' +
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          ext,
        description: 'Video',
      },
    };
    await config(options)
      .fetch('GET', image_URL)
      .then(res => {
       
        console.log('res -> ', JSON.stringify(res));
      Alert.alert('Video Downloaded Successfully.');
      });
  };

  const getExtention = filename => {
    return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
  };

  export {downloadImage};
