import { Component, OnInit } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { Subject } from 'rxjs';
import { HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { takeUntil } from 'rxjs/operators';
import { WebserviceService } from '../../services/webservice.service';

@Component({
  selector: 'ngx-dialog-upload-files',
  templateUrl: './dialog-upload-files.component.html',
  styleUrls: ['./dialog-upload-files.component.scss']
})
export class DialogUploadFilesComponent implements OnInit {

 
    private destroy$: Subject<void> = new Subject<void>();
    private filesUploaded = 0;
    public uploadFiles: File[] = [];
    public filesToUpload: any[] = [];
    public typeFiles = '';
  
  
    constructor(
      protected ref: NbDialogRef<DialogUploadFilesComponent>,
      private webService: WebserviceService,
      private toastrService: NbToastrService,
  
    ) { }
  
    ngOnInit() {
      this.getTypeFiles();
    }
  
    getTypeFiles() {
      this.typeFiles = localStorage.getItem('typeFilesToUpload');
    }
  
    onFileChange(args) {
      // this.uploadFiles = args.target.files;
      for (let file of args.target.files) {
        this.filesToUpload.push({ progress: 0, file: file, error: false });
      }
      if (args.target.files.length >= 1) {
        document.getElementById('chooseFile').innerHTML = `${args.target.files.length} archivos seleccionados`;
      } else {
        document.getElementById('chooseFile').innerHTML = this.filesToUpload[0].file.name;
      }
      console.log(this.filesToUpload);
  
    }
  
    uploadFilesM() {
      //  if (this.uploadFiles.length > 0) {
      //   let formData = new FormData();
      //   for (let i = 0; i < this.uploadFiles.length; i++) {
      //     formData.append('uploads[]', this.uploadFiles[i], this.uploadFiles[i].name);
      //   }
      //   this.uploadFileToServer(formData);
      // } else {
      //   this.toastrService.danger('No haz seleccionado ningún archivo.', '¡Algo salió mal!', { icon: 'close-outline' });
      // } 
      if (this.filesToUpload.length > 0) {
        this.filesUploaded = 0;
        for (const obj of this.filesToUpload) {
          const formData = new FormData();
          formData.append('file', obj.file, obj.file.name);
          console.log(`uploadsFilesToSErver`, formData)
          this.uploadFileToServer(formData, this.filesToUpload.indexOf(obj));
          this.filesToUpload[0].progress = 30;
          console.log('subiendo archivo: ', obj.file.name);
          console.log(' index: ', this.filesToUpload.indexOf(obj));
        }
      } else {
        this.toastrService.danger('No haz seleccionado ningún archivo.', '¡Algo salió mal!', { icon: 'close-outline' });
      }
    }
    

  /*  uploadFilesM() {
     // this.message = "";
      for (let i = 0; i < this.filesToUpload.length; i++) {
        this.upload(i, this.filesToUpload[i]);
      }
    }

    upload(index, file) {
      console.log("metodo upload", file)
      this.filesToUpload[index].progress= { value: 0, fileName: file.file.name };
      this.webService.upload(file).subscribe(
        event => {
          console.log(event)
          if (event.type === HttpEventType.UploadProgress) {
            this.filesToUpload[index].progress.value = Math.round(100 * event.loaded / event.total)
          } else if (event instanceof HttpResponse) {
            //this.fileInfos = this.webService.getFiles();
          }
        },
        err => {
          this.filesToUpload[index].progress.value= 0;
          //this.message = 'No fue posible enviar el archivo ' + file.name;
        });
    } */
  
    cancel() {
      this.ref.close();
    }
  
    uploadFileToServer(formData: any, index: number) {
      console.log(`uploadsFilesToSErver`, formData)
      this.webService.upload(formData)
        .subscribe((event: HttpEvent<any>) => {
          switch (event.type) {
            case HttpEventType.Sent:
              console.log('Request has been made!');
              break;
            case HttpEventType.ResponseHeader:
              console.log('Response header has been received!');
              break;
            case HttpEventType.UploadProgress:
              this.filesToUpload[index].progress = Math.round(event.loaded / event.total * 100);
              console.log(`Uploaded! ${this.filesToUpload[index].progress}%`);
              break;
            case HttpEventType.Response:
              console.log('event', event.body.error);

              if (!event.body.error) {
               
              } else {
                this.filesToUpload[index].error = true;
                alert (`Error al subir ${this.filesToUpload[index].file.name}, ${event.body.message}`);
                /*this.toastrService
                        .danger(`Error al subir ${this.filesToUpload[index].file.name}, ${event.body.message}`,
                         '¡Algo salió mal!', { icon: 'close-outline' });*/
              }
  
          }
        },
          error => {
            this.toastrService.danger('Error al subir el archivo', '¡Algo salió mal!', { icon: 'close-outline' });
            console.log(error);
  
          }
        );
    }
  
    fileUploaded() {
      this.filesUploaded++;
      if (this.filesUploaded === this.filesToUpload.length) {
        this.toastrService.success('Los archivos se subieron correctamente', '¡Éxito');
        this.cancel();
      }
    }
  
  }
  