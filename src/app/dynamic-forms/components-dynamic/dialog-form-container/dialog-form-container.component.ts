import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { FormProvider } from '../../interfaces/form-provider';
import { Persistable } from '../../persistable';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormComponent } from '../form/form.component';
import { FormGroup } from '@angular/forms';
import { FormFieldConfiguration } from '../../interfaces/form-field-configuration';
import { DynamicFormComponent } from '../dynamic-form/dynamic-form.component';

@Component({
  selector: 'app-dialog-form-container',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,

    FormComponent,

    DynamicFormComponent
  ],
  templateUrl: './dialog-form-container.component.html',
  styleUrl: './dialog-form-container.component.scss'
})
export class DialogFormContainerComponent {

  form!:FormGroup
  formFieldConfig!:FormFieldConfiguration[]

  constructor(
    public dialogRef: MatDialogRef<DialogFormContainerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      instance: Persistable<any> & FormProvider,
      title: string,
      type: "edit" | "new" | "subform"
    },
  ) {
    if(this.data.type == "edit"){
      this.form = this.data.instance.getEditGroupForm()
    }else if(this.data.type == "new"){
      this.form = this.data.instance.getCreateGroupForm()
    }
    this.formFieldConfig = this.data.instance.getListOptions()
  }

  save(data:any){
    if(this.data.type == "edit"){
      data.id = this.data.instance.getId()
      this.data.instance.update(data,this.data.instance.getId()).subscribe(obj=>{
        this.closeDialog(true);
      },error=>{
        this.closeDialog(false);
        console.error("Error en el Form Dynamic: ")
        console.error(error)
      });
    }else if(this.data.type == "new"){
      this.data.instance.create(data).subscribe(obj=>{
        this.closeDialog(true);
      },error=>{
        this.closeDialog(false);
        console.error("Error en el Form Dynamic: ")
        console.error(error)
      });
    }
  }

  closeDialog(res:boolean) {
    this.dialogRef.close(res);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
