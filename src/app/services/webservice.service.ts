import { Injectable } from '@angular/core';
import {HttpClient, HttpRequest, HttpEvent, HttpParams} from '@angular/common/http';

import {RegistroDato} from '../interfaces/registroDato.interface'

import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class WebserviceService {
  

  URL_API =  'http://localhost:4000/api/datos'

 datos: RegistroDato[] = []; 

  constructor(private http: HttpClient) { }

  getDatosFromAPI(){
    return this.http.get<RegistroDato[]>(this.URL_API);
  }

  saveNuevoRegistro(body){
    return this.http.post(this.URL_API,body);
  }

  getRegistroPorId(idRegistro) {
    return this.http.get(`${this.URL_API}/${idRegistro}`);
  }

  putRegistroPorId(idRegistro, body) {
    return this.http.put(`${this.URL_API}/${idRegistro}`, body);
  }

  //Servicios necesarios para añadir archivos
  
  //Enviar archivos al endpoint /upload
  upload(file: File): Observable<HttpEvent<any>>{
    const formData: FormData = new FormData();
    formData.append('files', file);

    const req = new HttpRequest('POST', `${this.URL_API}/upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }

  //Metodo para obtener los archivos
  getFiles(){
    return this.http.get(`${this.URL_API}/files`);
  }

  
};



