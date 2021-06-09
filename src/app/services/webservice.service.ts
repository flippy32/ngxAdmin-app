import { Injectable } from '@angular/core';
import {HttpClient, HttpRequest, HttpEvent, HttpParams} from '@angular/common/http';

import {RegistroDato} from '../interfaces/registroDato.interface'

import {Observable} from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})

export class WebserviceService {
  

  //URL_API =  'http://localhost:4000/api/datos'
  URL_API = '';

 datos: RegistroDato[] = []; 

  constructor(private http: HttpClient) {
    this.URL_API=environment.URL_API;
   }

  getDatosFromAPI(){
    return this.http.get<RegistroDato[]>(`${this.URL_API}/datos`);
  }

  saveNuevoRegistro(body){
    return this.http.post(`${this.URL_API}/datos`,body);
  }

  getRegistroPorId(idRegistro) {
    return this.http.get(`${this.URL_API}/datos/${idRegistro}`);
  }

  putRegistroPorId(idRegistro, body) {
    return this.http.put(`${this.URL_API}/datos/${idRegistro}`, body);
  }

  //Servicios necesarios para añadir archivos
  
  //Enviar archivos al endpoint /upload
  upload(body){
    console.log(body);
    return this.http.post(`${this.URL_API}/datos/files`,body, {
      reportProgress: true,
      observe: 'events'
    }
      );
    /*try {
      console.log("enviar archivos al endpoint, webSerivice")
    const formData: FormData = new FormData();
    formData.append('files', file);

    const req = new HttpRequest('POST', `${$this.URL_API}/files`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
    } catch (error) {
      console.log(error)
    }*/
  }

  //Metodo para obtener los archivos
  getFiles(){
    return this.http.get(`${this.URL_API}/datos/files`);
  }

  
};



