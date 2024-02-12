import { Video } from 'react-native-compressor';
import { getVideoMetaData } from 'react-native-compressor';
import storage from '@react-native-firebase/storage';
import { Alert } from 'react-native';
async function compressed(filepath: string, filename: string, CompressedUrl: Function) {
  

  const result = await Video.compress(
    filepath,
    {
      progressDivider: 10,
      compressionMethod: 'manual',
    },
    (progress) => {
      console.log('Compression Progress percentage: ', progress * 100, "%");
    }
  );
  const metaData = await getVideoMetaData(result);
 

  UploadVideo(result, filename, CompressedUrl);
};
async function UploadVideo(result: string, uri: string, CompressedUrl: Function) {

  const reference = storage().ref(result);
  
  const pathToFile = result;

  await reference.putFile(pathToFile);
  const url = await storage().ref(result).getDownloadURL();
  
  CompressedUrl(url, result);
  Alert.alert("Video Compresssion Successful")
  // downloadImage(url);
}



export { compressed };