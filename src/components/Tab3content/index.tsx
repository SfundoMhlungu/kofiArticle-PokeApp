import React, { useRef } from "react"
import {App} from "@capacitor/app"
import { useEffect } from "react"
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { Camera, CameraResultType } from '@capacitor/camera';
import { IonButton } from "@ionic/react";



`

handles high level App state and events

or example, this API emits events when the app enters and leaves the foreground, handles deeplinks,
opens other apps, and manages persisted plugin state.




`


const Tab3Content = () => {

  const imageRef = useRef<null|HTMLImageElement>(null)

  const takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri
    });
  

    const imageUrl = image.webPath;
  
    if(imageRef.current && imageUrl)
        imageRef.current.src = imageUrl;
    };

    
    useEffect(()=> {

      App.addListener('appStateChange', ({ isActive }) => {
        console.log('App state changed. Is active?', isActive);
      });

        console.log(App.getState().then((s)=> console.log(s)))


        App.exitApp().then(()=>{console.log("should close soon")}).catch((err)=> console.log(err))

        ;(async function(){
          const contents =   await Filesystem.writeFile({
            path: 'secrets/text.txt',
            data: 'This is a test',
            directory: Directory.Documents,
            encoding: Encoding.UTF8,
          });
  
          console.log('wrote:', contents);
        })()
       

    }, [])


  

    return  (
        <div>
        I am tab 3 content
          <div>
            <img ref={imageRef}/>
          </div>
            {/* take a picture button */}
        <IonButton  onClick={takePicture}>Take Image</IonButton>
        </div>
    )
  }

  

export default Tab3Content