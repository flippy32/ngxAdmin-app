import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RegistroDato } from '../../interfaces/registroDato.interface';
import { WebserviceService } from '../../services/webservice.service';

@Component({
  selector: 'ngx-add-registro',
  templateUrl: './add-registro.component.html',
  styleUrls: ['./add-registro.component.scss']
})
export class AddRegistroComponent implements OnInit {

  public registroDato: RegistroDato = {}
  public editRegistroDato = false;
  public showMoreInfo = true;

  constructor(
    private webService: WebserviceService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.getIdRegistro();
  }

  getIdRegistro(): void {
    this.activatedRoute.params.subscribe(params => {
      const idRegistro: string = params['_id'];
      if ( idRegistro.includes('new')) {
        // es un nuevo registro
      } else {
        // posiblemente sea un Id
        this.webService.getRegistroPorId(idRegistro)
          .subscribe(resp => {
            // console.log(resp);
            this.registroDato = resp;
            this.editRegistroDato = true;
          }, err => {
            console.error(err)
          })
      }
    });
  }

  probarBoton(): void {
    console.log('registroData', this.registroDato)
  }

  changeStatusShowMoreInfo() {
    this.showMoreInfo = !this.showMoreInfo;
  }

  saveNuevoRegistro() {
    if (this.editRegistroDato) {
      // acutalizar
      this.webService.putRegistroPorId(this.registroDato._id, this.registroDato)
        .subscribe(
          resp => {
            console.log('registro actualizado OK', resp);
            if( resp.toString().includes('Registro actualizado OK')) {
              alert('El registro se actualizo correctamente');
              this.router.navigateByUrl('pages/dashboard')
            }
          },
          err => {
            console.error(err)
          }
        )
    } else {
      // crear nuevo
      this.webService.saveNuevoRegistro(this.registroDato)
      .subscribe(res => {
        console.log(res);
      })
    }
  }

}
