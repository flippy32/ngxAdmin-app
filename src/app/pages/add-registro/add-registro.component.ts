import { Component, OnInit } from '@angular/core';
import { RegistroDato } from '../../interfaces/registroDato.interface';
import { WebserviceService } from '../../services/webservice.service';

@Component({
  selector: 'ngx-add-registro',
  templateUrl: './add-registro.component.html',
  styleUrls: ['./add-registro.component.scss']
})
export class AddRegistroComponent implements OnInit {

  public registroDato: RegistroDato ={}
  public showMoreInfo = true;

  constructor(private webService: WebserviceService) { }

  ngOnInit(): void {
  }

  probarBoton(): void {
    console.log('registroData', this.registroDato)
  }

  changeStatusShowMoreInfo(){
    this.showMoreInfo = !this.showMoreInfo;
  }

  saveNuevoRegistro(){
    this.webService.saveNuevoRegistro(this.registroDato)
      .subscribe(res => {
        console.log(res);
      })

  }

}
