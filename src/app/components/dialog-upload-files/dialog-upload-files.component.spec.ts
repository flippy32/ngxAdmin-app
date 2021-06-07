import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogUploadFilesComponent } from './dialog-upload-files.component';

describe('DialogUploadFilesComponent', () => {
  let component: DialogUploadFilesComponent;
  let fixture: ComponentFixture<DialogUploadFilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogUploadFilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogUploadFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
