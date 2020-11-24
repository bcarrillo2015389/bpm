import { Injectable } from '@angular/core';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor() { }

  async takePhoto(){
    const { Camera } = Plugins;

    const result = await Camera.getPhoto({
      quality: 90,
      source: CameraSource.Camera,
      resultType: CameraResultType.DataUrl,
      saveToGallery:true
    });

    return result;
  }

  async getGalleryPhoto(){
    const { Camera } = Plugins;

    const result = await Camera.getPhoto({
      quality: 90,
      source: CameraSource.Photos,
      resultType: CameraResultType.DataUrl,
    });

    return result;
  }
}
