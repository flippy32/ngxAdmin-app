import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { RegistroDato } from "../../interfaces/registroDato.interface";
import { WebserviceService } from "../../services/webservice.service";

import { HttpEventType, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";

@Component({
  selector: "ngx-add-registro",
  templateUrl: "./add-registro.component.html",
  styleUrls: ["./add-registro.component.scss"],
})
export class AddRegistroComponent implements OnInit {
  public registroDato: RegistroDato = {};
  public editRegistroDato = false;
  public showMoreInfo = true;

  selectedFiles: FileList;
  progressInfo = [];
  message = "";
  fileName = "";
  fileInfos: Observable<any>;

  constructor(
    private webService: WebserviceService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getIdRegistro();
  }

  getIdRegistro(): void {
    this.activatedRoute.params.subscribe((params) => {
      const idRegistro: string = params["_id"];
      if (idRegistro.includes("new")) {
        // es un nuevo registro
      } else {
        // posiblemente sea un Id
        this.webService.getRegistroPorId(idRegistro).subscribe(
          (resp) => {
            // console.log(resp);
            this.registroDato = resp;
            this.editRegistroDato = true;
          },
          (err) => {
            console.error(err);
          }
        );
      }
    });
  }

  probarBoton(): void {
    console.log("registroData", this.registroDato);
  }

  changeStatusShowMoreInfo() {
    this.showMoreInfo = !this.showMoreInfo;
  }
  /*
    saveNuevoRegistro() {
      if (this.editRegistroDato) {
        // acutalizar
        this.webService
          .putRegistroPorId(this.registroDato._id, this.registroDato)
          .subscribe(
            (resp) => {
              console.log("registro actualizado OK", resp);
              if (resp.toString().includes("Registro actualizado OK")) {
                alert("El registro se actualizo correctamente");
                this.router.navigateByUrl("pages/dashboard");
              }
            },
            (err) => {
              console.error(err);
            }
          );
      } else {
        // crear nuevo
        this.webService.saveNuevoRegistro(this.registroDato).subscribe((res) => {
          console.log(res);
        });
      }
    }*/

  validarCamposVacios() {
    if (!this.registroDato.departamento) {
      alert("El campo DEPARTAMENTO es requerido");
    } else {
      if (!this.registroDato.nuc) {
        alert("El campo NUC es requerido");
      }
      else {
        if (!this.registroDato.oficio) {
          alert("El campo OFICIO es requerido");
        } else {
          if (!this.registroDato.equipo) {
            alert("El campo EQUIPO es requerido");
          } else {
            if (!this.registroDato.unidad) {
              alert("El campo UNIDAD es requerido");
            } else {
              if (!this.registroDato.zona) {
                alert("El campo ZONA es requerido");
              } else {
                if (!this.registroDato.fechaD) {
                  alert("El campo FECHA DEL DELITO  es requerido");
                } else {
                  if (!this.registroDato.hora) {
                    alert("El campo HORA DEL DELITO");
                  } else {
                    if (!this.registroDato.fechaR) {
                      alert("El campo FECHA DE RECEPCION es requerido");
                    }
                  }
                }
              }
            }
          }
        }
      }}
      this.saveNuevoRegistro()
    }


    saveNuevoRegistro() {
      if (this.editRegistroDato) {
        // acutalizar
        this.webService
          .putRegistroPorId(this.registroDato._id, this.registroDato)
          .subscribe(
            (resp) => {
              console.log("registro actualizado OK", resp);
              if (resp.toString().includes("Registro actualizado OK")) {
                alert("El registro se actualizo correctamente");
                this.router.navigateByUrl("pages/dashboard");
              }
            },
            (err) => {
              console.error(err);
            }
          );
      } else {
        // crear nuevo
        this.webService.saveNuevoRegistro(this.registroDato).subscribe((res) => {
          alert("El registro se guardó correctamente")
          console.log(res);
        });
      }
    }

    //Obtener archivos seleccionados
    selectFiles(event) {
      this.progressInfo = [];
      //Validacion para asignar nombre al archivo
      event.target.files.length == 1
        ? (this.fileName = event.target.files[0].name)
        : (this.fileName = event.target.files.length + "archivos");
      this.selectedFiles = event.target.files;
    }

    //recorrer los archivos seleccionados para llamarlos de uno a uno a upload
    uploadFiles() {
      this.message = "";
      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.upload(i, this.selectedFiles[i]);
      }
    }

    upload(index, file) {
      this.progressInfo[index] = { value: 0, fileName: file.name };
      this.webService.upload(file).subscribe(
        event => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progressInfo[index].value = Math.round(100 * event.loaded / event.total)
          } else if (event instanceof HttpResponse) {
            this.fileInfos = this.webService.getFiles();
          }
        },
        err => {
          this.progressInfo[index].value = 0;
          this.message = 'No fue posible enviar el archivo ' + file.name;
        });
    }

  }
