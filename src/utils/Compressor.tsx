import { Video } from 'react-native-compressor';
import { getVideoMetaData } from 'react-native-compressor';
import storage from '@react-native-firebase/storage';
import { downloadImage } from './download';
import { Alert } from 'react-native';
async function compressed(filepath:any,filename:any,CompressedUrl:Function){
const result = await Video.compress(
    filepath,
    {  progressDivider: 10,
      compressionMethod: 'manual',
    },
    (progress) => {
      console.log('Compression Progress percentage: ', progress*100,"%");
    }
  );
  const metaData = await getVideoMetaData(result);
  console.log("Size after Compression:::",metaData);
  console.log("video Url after Compression:::",result);

    UploadVideo(result,filename,CompressedUrl);
};
async function UploadVideo(result :any,uri:any,CompressedUrl:Function){
  

  const reference = storage().ref(result);
  console.log("reference::",reference)
  const pathToFile = result;
  console.log("Path::",pathToFile)
  await reference.putFile(pathToFile);
  const url = await storage().ref(result).getDownloadURL();
  console.log('Download Url:::',url);
  CompressedUrl(url,result);
  Alert.alert("Video Compresssion Successful")
  // downloadImage(url);
}



export {compressed};