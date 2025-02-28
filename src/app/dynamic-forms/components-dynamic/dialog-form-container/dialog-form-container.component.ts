import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { FormProvider } from '../../interfaces/form-provider';
import { Persistable } from '../../persistable';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormComponent } from '../form/form.component';

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
  ],
  templateUrl: './dialog-form-container.component.html',
  styleUrl: './dialog-form-container.component.scss'
})
export class DialogFormContainerComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogFormContainerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      instance: Persistable<any> & FormProvider,
      title: string,
      type: "edit" | "new" | "subform"
    },
  ) {}

  closeDialog(res:boolean) {
    this.dialogRef.close(res);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
