import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Option } from '../../interfaces/interfaces';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  loginUrl = 'https://login.bpm.gt/LOGIN/API/API_login.php?';
  ayudaUrl = 'https://demo.bpm.gt/ROOT/API/API_ayuda.php?';
  ajustesUrl = 'https://demo.bpm.gt/ROOT/API/API_ajustes.php?';

  constructor(private http: HttpClient) { }

  private extractData(res: Response){
    let body = res;
    return body || [] || {};
  }

  getMenuLoginOptions(){
    return this.http.get<Option[]>('/assets/data/menu-login.json');
  }

  getMenuHomeOptions(){
    return this.http.get<Option[]>('/assets/data/menu-home.json');
  }

  handleLogin(user, password){
    return this.http.get(this.loginUrl+'request=login&usu='+user+'&pass='+password).pipe(
      map(this.extractData)
    );
  }

  handleRecoverPassword(email){
    return this.http.get(this.ayudaUrl+'request=password&mail='+email).pipe(
      map(this.extractData)
    );
  }

  handleContactAdmin(name,email,affair,message){
    return this.http.get(this.ayudaUrl+'request=contact&nombre='+name+'&mail='+email+'&subject='+affair+'&msj='+message).pipe(
      map(this.extractData)
    );
  }

  getProfilePhoto(code){
    return this.http.get(this.ayudaUrl+'request=get_foto&usuario='+code).pipe(
      map(this.extractData)
    );
  }

  getProfileData(code){
    return this.http.get(this.ajustesUrl+'request=get_perfil&usuario='+code).pipe(
      map(this.extractData)
    );
  }

  setProfileData(code, name, mail, phone){
    return this.http.get(this.ajustesUrl+'request=set_perfil&usuario='+code+'&nombre='+name+'&mail='+mail+'&telefono='+phone).pipe(
      map(this.extractData)
    );
  }

  getPasswordData(code){
    return this.http.get(this.ajustesUrl+'request=get_pasword&usuario='+code).pipe(
      map(this.extractData)
    );
  }

  setPasswordData(code, user, password){
    return this.http.get(this.ajustesUrl+'request=set_pasword&usuario='+code+'&usu='+user+'&pass='+password).pipe(
      map(this.extractData)
    );
  }
}
