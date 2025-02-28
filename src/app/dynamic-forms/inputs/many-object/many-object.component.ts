import { Component, Input, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormProvider } from '../../interfaces/form-provider';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormComponent } from '../../components-dynamic/form/form.component';
import { SubformComponent } from '../../components-dynamic/subform/subform.component';

@Component({
  selector: 'app-input-many-object',
  standalone: true,
  imports: [
    FormComponent,
    CommonModule,
    ReactiveFormsModule,
    SubformComponent,
    MatTableModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './many-object.component.html',
  styleUrl: './many-object.component.scss'
})
export class ManyObjectComponent {
  @Input() type!:"autocomplete" | "select" | "form"
  @Input() instance!:FormProvider
  list:FormProvider[] = []

  @ViewChild('subform') subform!: SubformComponent; // Obtén la referencia del componente hijo

  getValue() {
    if (this.subform) {
      this.list.push(this.subform.getValue());


      this.setTableData(this.list)
      // Castear aqui
      //this.table.data = this.list

    } else {
      console.error('No se encontró la instancia del SubformComponent.');
    }
  }







  displayedColumns: string[] = []; // Columns will be dynamic
  dataSource = new MatTableDataSource<any>([]); // Dynamic data source

  /**
   * Set dynamic columns and data
   */
  setTableData(data: any[]): void {
    if (data && data.length > 0) {
      // Get columns dynamically from keys of the first object
      this.displayedColumns = Object.keys(data[0]);
      this.displayedColumns.push('actions')
      //console.log(this.displayedColumns)

      // Set the data source
      this.dataSource.data = data;
    }
  }



  delete(element: any) {
    let daas = this.dataSource.data.filter(data => {
      // Retorna el resultado de la comparación
      return JSON.stringify(data) !== JSON.stringify(element);
    });
    this.dataSource.data = daas;
  }




}
