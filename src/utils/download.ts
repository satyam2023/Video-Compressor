
import RNFetchBlob from 'rn-fetch-blob';
const downloadVideo = async (url:string) => {
  
    
    let date = new Date();
    
    let Video_URL = url;
  
    let ext = getExtention(Video_URL) as any;
    ext = '.' + ext[0];
    const {config, fs} = RNFetchBlob;
    let PictureDir = fs.dirs.PictureDir;
    let options =  {
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
    try{
    await config(options)
      .fetch('GET', Video_URL)
      .then(res => {
      });
    }
      catch(error){
      }
  };

  const getExtention = (filename:any) => {
    
    return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
  };

  export {downloadVideo};
