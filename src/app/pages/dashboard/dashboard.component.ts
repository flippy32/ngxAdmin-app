import { Component, OnInit } from '@angular/core';
import { RegistroDato } from '../../interfaces/registroDato.interface';

import { LocalDataSource, Ng2SmartTableModule } from 'ng2-smart-table';
import { WebserviceService } from '../../services/webservice.service'

@Component({

  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
})

export class DashboardComponent implements OnInit {

  public registroDato: RegistroDato[] = [];
  //public source;
  source: LocalDataSource;

  constructor(private webService: WebserviceService) {
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
            this.source.load(res)
          }
        }
      },
      err => {
        alert('Ocurrió un error al traer los registros');
        console.error(err);
      }
    );
  }

  settings = {
    columns: {
      nuc: {
        title: 'NUC'
      },
      departamento: {
        title: 'Departamento'
      },
      status: {
        title: 'Status'
      }
    }
  };

  onSearch(query: string = '') {
    this.source.setFilter([
      // fields we want to include in the search
      {
        field: 'nuc',
        search: query
      },
      {
        field: 'departamento',
        search: query
      },
      {
        field: 'status',
        search: query
      }
    ], false);
    // second parameter specifying whether to perform 'AND' or 'OR' search 
    // (meaning all columns should contain search query or at least one)
    // 'AND' by default, so changing to 'OR' by setting false here
  }

}
