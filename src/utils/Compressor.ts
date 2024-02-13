import { Video } from 'react-native-compressor';
import { Alert } from 'react-native';
import RNFS from 'react-native-fs';

async function compressed(filepath: string, CompressedUrl: Function) {
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
  Alert.alert("Video Compresssion Successful");
  CompressedUrl(result,result);

};


async function Movefile(tempLocation:string,videoName:string){
  try {
    const destinationPath = `${RNFS.PicturesDirectoryPath}/${videoName}`;
    await RNFS.moveFile(tempLocation,destinationPath );
    console.log('Video moved successfully to gallery directory');
    Alert.alert("Video Download Successful");
  }
   catch (error) {
    console.error('Error moving video to gallery directory:', error);
  }
  
}






export { compressed,Movefile };

