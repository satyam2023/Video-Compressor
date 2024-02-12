import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import { compressed } from '../utils/Compressor';
import { getVideoMetaData } from 'react-native-compressor';
import VideoMetadata from '../component/VideoMetadata';
import { downloadVideo} from '../utils/download';


const Video = () => {
  const [videoUri, setVideoUri] = useState<any>(null);
  const [compressedVideoUri, setCompressedVideoUri] = useState(null);
  const [metaurl,setmetaUrl]=useState(null);
  const [videoSelect,setVideoSelectStatus]=useState(false);
  const [compressSelect,setCompressSelectStatus]=useState(false);
  const pickVideo = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.video],
        copyTo:'cachesDirectory'
      });
      setVideoUri(res);
      setVideoSelectStatus(true);
      const metaData = await getVideoMetaData(res[0].fileCopyUri as any);

    } catch (err) {
      
    }
  };

  function CompressedUrl(url:any,metaurl:any){
    setCompressedVideoUri(url);
    setmetaUrl(metaurl);

  }

  function handlecompress(){
    if(!compressSelect){
      setCompressSelectStatus(true);
      compressed(videoUri[0].fileCopyUri,videoUri[0].name,CompressedUrl);
    }
    else if(compressSelect && compressedVideoUri){
      downloadVideo(compressedVideoUri);
      
    }
  }

  return (
    <>
    <Text style={{color:'#2EFF8AFF',fontWeight:'900',fontSize:30,alignSelf:'center',}}> Video Compressor</Text>
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
   
     {!videoSelect?<TouchableOpacity onPress={pickVideo} style={{backgroundColor:'#2EFF8AFF',borderRadius:10,padding:5}}>
<Text style={{color:'black',fontWeight:'600',fontSize:18}}> Select Video</Text>
     </TouchableOpacity>:<VideoMetadata details={!metaurl?videoUri[0].fileCopyUri:metaurl} name={!metaurl?"Selected Video Details":"Compressed Video Details"}/>}
      {
        videoUri && 
     <TouchableOpacity onPress={handlecompress} style={{backgroundColor:'#2EFF8AFF',borderRadius:10,padding:5,margin:20}}>
     <Text style={{color:'black',fontWeight:'600',fontSize:18}}> {!compressSelect?"Compress the Video":!compressedVideoUri?"Compressing....":"Download Video"}</Text>
     </TouchableOpacity>
      }
    </View>
    </>
  );
};

export default Video;
