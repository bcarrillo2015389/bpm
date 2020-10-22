import { Injectable } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor(private domSanitizer:DomSanitizer) { }

  async takePhoto(){
    const { Camera } = Plugins;

    const result = await Camera.getPhoto({
      quality: 90,
      source: CameraSource.Camera,
      resultType: CameraResultType.DataUrl,
      saveToGallery:true
    });

    return this.domSanitizer.bypassSecurityTrustResourceUrl(result && result.dataUrl);
  }

  async getGalleryPhoto(){
    const { Camera } = Plugins;

    const result = await Camera.getPhoto({
      quality: 90,
      source: CameraSource.Photos,
      resultType: CameraResultType.DataUrl,
    });

    return this.domSanitizer.bypassSecurityTrustResourceUrl(result && result.dataUrl);
  }
}
