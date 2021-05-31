import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RegistroDato} from '../interfaces/registroDato.interface'



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
};



