import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Text, View } from 'react-native';
import { getVideoMetaData } from 'react-native-compressor';

interface ImetaData{
    details:any,
    name:string
}

const  VideoMetadata:React.FC<ImetaData> = ({details,name}:ImetaData) => {
const [meta,setmeta]=useState<any>();

async function getting(){
   const data= await getVideoMetaData(details);
   setmeta(data);
};
useEffect(()=>{getting()},[]);


getting();
    return (
  <>     
  { meta ? <View style={{backgroundColor:'#2EDBA326',borderWidth:1,borderRadius:8,padding:20,paddingTop:5}}>
       <Text style={{color:'#2EFF8AFF',fontSize:16,fontWeight:'500',textDecorationLine:'underline'}}>{name} </Text>
        <Text style={{color:'#FFFFFF',fontWeight:'600',fontSize:16}}>
           Video Size :  {meta.size} kb
        </Text>
        <Text style={{color:'#FFFFFF',fontWeight:'600',fontSize:16}}>
        Video Extension : {meta.extension} 
        </Text>
        <Text style={{color:'#FFFFFF',fontWeight:'600',fontSize:16}}>
         Video Duration :  {meta.duration} Sec
        </Text>
        
    </View>:<ActivityIndicator color={'green'} size={'large'}/>
        }
        </>
  )
}

export default VideoMetadata;