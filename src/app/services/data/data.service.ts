import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Option } from '../../interfaces/interfaces';
import { map } from 'rxjs/operators';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  loginUrl = 'https://login.bpm.gt/LOGIN/API/API_login.php?';
  ayudaUrl = 'https://demo.bpm.gt/ROOT/API/API_ayuda.php?';
  ajustesUrl = '/ROOT/API/API_ajustes.php?';
  problemSweeperUrl = '/ROOT/API/API_problem_sweeper.php?';

  constructor(private http: HttpClient,
              private storage:Storage) { }

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

  getProfilePhoto(userDomain, code){
    return this.http.get('https://'+userDomain+this.ajustesUrl+'request=get_foto&usuario='+code).pipe(
      map(this.extractData)
    );
  }

  getProfileData(userDomain,code){
    return this.http.get('https://'+userDomain+this.ajustesUrl+'request=get_perfil&usuario='+code).pipe(
      map(this.extractData)
    );
  }

  setProfileData(userDomain, code, name, mail, phone){
    return this.http.get('https://'+userDomain+this.ajustesUrl+'request=set_perfil&usuario='+code+'&nombre='+name+'&mail='+mail+'&telefono='+phone).pipe(
      map(this.extractData)
    );
  }

  getPasswordData(userDomain, code){
    return this.http.get('https://'+userDomain+this.ajustesUrl+'request=get_pasword&usuario='+code).pipe(
      map(this.extractData)
    );
  }

  setPasswordData(userDomain, code, user, password){
    return this.http.get('https://'+userDomain+this.ajustesUrl+'request=set_pasword&usuario='+code+'&usu='+user+'&pass='+password).pipe(
      map(this.extractData)
    );
  }

  getAssignedTickets(userDomain, code){
    return this.http.get('https://'+userDomain+this.problemSweeperUrl+'request=tickets_asignados&usuario='+code).pipe(
      map(this.extractData)
    );
  }

  closeTicket(userDomain, code){
    return this.http.get('https://'+userDomain+this.problemSweeperUrl+'request=cerrar_ticket&ticket='+code).pipe(
      map(this.extractData)
    );
  }

  getReportedTickets(userDomain, code){
    return this.http.get('https://'+userDomain+this.problemSweeperUrl+'request=tickets_reportados&usuario='+code).pipe(
      map(this.extractData)
    );
  }

  changeStatus(userDomain, code, statusCode, description){
    return this.http.get('https://'+userDomain+this.problemSweeperUrl+'request=cambiar_status&ticket='+code+'&status='+statusCode+'&observacion='+description).pipe(
      map(this.extractData)
    );
  }

  getAllStatus(userDomain){
    return this.http.get('https://'+userDomain+this.problemSweeperUrl+'request=get_status').pipe(
      map(this.extractData)
    );
  }

  getOutUser(userDomain,ticketCode,userCode){
    return this.http.get('https://'+userDomain+this.problemSweeperUrl+'request=salir_usuario&ticket='+ticketCode+'&usuario='+userCode).pipe(
      map(this.extractData)
    );
  }

  getUsers(userDomain, sedes){
    return this.http.get('https://'+userDomain+this.problemSweeperUrl+'request=get_usuarios&sedes_in='+sedes).pipe(
      map(this.extractData)
    );
  }

  addUser(userDomain,ticketCode,userCode){
    return this.http.get('https://'+userDomain+this.problemSweeperUrl+'request=agregar_usuario&ticket='+ticketCode+'&usuario='+userCode).pipe(
      map(this.extractData)
    );
  }

  transferUser(userDomain,ticketCode,userCode){
    return this.http.get('https://'+userDomain+this.problemSweeperUrl+'request=trasladar_usuario&ticket='+ticketCode+'&usuario='+userCode).pipe(
      map(this.extractData)
    );
  }

  getAreas(userDomain){
    return this.http.get('https://'+userDomain+this.problemSweeperUrl+'request=get_areas').pipe(
      map(this.extractData)
    );
  }

  getIncidents(userDomain){
    return this.http.get('https://'+userDomain+this.problemSweeperUrl+'request=get_incidentes').pipe(
      map(this.extractData)
    );
  }

  getPriorities(userDomain){
    return this.http.get('https://'+userDomain+this.problemSweeperUrl+'request=get_prioridades').pipe(
      map(this.extractData)
    );
  }

  saveTicket(userDomain, campus, category, area, sector, incident, priority, description){
    return this.http.get('https://'+userDomain+this.problemSweeperUrl+'request=grabar&sede='+campus+'&categoria='
        +category+'&area='+area+'&sector='+sector+'&incidente='+incident+'&prioridad='+priority+'&descripcion='+description).pipe(
      map(this.extractData)
    );
  }

  modifyTicket(userDomain, code, campus, category, area, sector, incident, priority, description){
    return this.http.get('https://'+userDomain+this.problemSweeperUrl+'request=modificar&ticket='+code+'&sede='+campus+'&categoria='
        +category+'&area='+area+'&sector='+sector+'&incidente='+incident+'&prioridad='+priority+'&descripcion='+description).pipe(
      map(this.extractData)
    );
  }
}
