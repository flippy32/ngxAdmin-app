import { Component, OnInit } from '@angular/core';
import { RegistroDato } from '../../interfaces/registroDato.interface';

import { LocalDataSource, Ng2SmartTableModule } from 'ng2-smart-table';
import { WebserviceService } from '../../services/webservice.service'
import { Router } from '@angular/router';

@Component({

  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
})

export class DashboardComponent implements OnInit {

  public registroDato: RegistroDato[] = [];
  public settings = {
    columns: {
      nuc: {
        title: 'nuc'
      },
      departamento: {
        title: 'departamento'
      },
      status: {
        title: 'status'
      }
    },
    mode: 'external',
    add: {
        addButtonContent: '<i class="nb-plus"></i>',
        createButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
        confirmCreate: 'true',
    },
    edit:{
        editButtonContent: '<i class="nb-edit"></i>',
        saveButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
        deleteButtonContent: '<i class="nb-trash"></i>',
        confirmDelete: true,
    },
    actions: {
        position: 'right',
        columnTitle: 'Acciones',
    },
    noDataMessage: 'No se han encontrado datos',
    pager: {
        display: true,
        perPage: 15,
    }
  };
  //public source;
  public source: LocalDataSource;

  constructor(
    private webService: WebserviceService,
    private router: Router) {
    this.source = new LocalDataSource();

  }

  ngOnInit() {
    this.getDatosFromAPI();
  }

  getDatosFromAPI() {
    this.webService.getDatosFromAPI().subscribe(
      res => {
        if (res) {
          if (res.length > 0) {
            //this.registrosDatos = res;
            console.log(res);
            this.registroDato = res;
            // this.source.load(res)
          }
        }
      },
      err => {
        alert('Ocurrió un error al traer los registros');
        console.error(err);
      }
    );
  }

  editRegistro(event) {
    this.router.navigateByUrl(`pages/registro/${event.data._id}`);
  }

 

}
