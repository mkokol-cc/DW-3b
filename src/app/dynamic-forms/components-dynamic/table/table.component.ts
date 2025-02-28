import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { FormProvider } from '../../interfaces/form-provider';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { TipoEstudio } from '../../../model/tipo-estudio';
import { Persistable } from '../../persistable';
import { ApiService } from '../../services/api.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogFormContainerComponent } from '../dialog-form-container/dialog-form-container.component';
import { ConfirmDialogComponent } from '../../../components/confirm-dialog/confirm-dialog.component';


@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    MatTableModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    MatDialogModule
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent{
  displayedColumns: string[] = []; // Columns will be dynamic
  dataSource = new MatTableDataSource<any>([]); // Dynamic data source
  entity: string | null = null;
  private routeSub!: Subscription;
  formProviderInstance?: Persistable<any> & FormProvider
  tableListObjects?:any[];

  constructor(private router:Router, private route: ActivatedRoute, private apiService:ApiService, public dialog: MatDialog) {
    this.routeSub = this.route.paramMap.subscribe(params => {
      this.entity = params.get('entity');
      console.log('Entity cambió:', this.entity);
      if(this.entity){
        this.setFormProviderInstance(this.entity);
        this.getAllObjects();
      }
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  openDialog(titulo:string, type:"edit" | "new" | "subform", id?:number|string) {
    if(this.formProviderInstance){
      if(id && type=="edit"){
        this.formProviderInstance?.getById(id).subscribe(obj=>{
          const dialogRef = this.dialog.open(DialogFormContainerComponent, {
            data: {instance: this.formProviderInstance?.getInstancedObjects(obj), title: titulo, type: type},
          });
          dialogRef.afterClosed().subscribe(result => {
            if(result){
              this.getAllObjects()
            }
            console.log(`Dialog result: ${result}`);
          });
        })
      }else{
        const dialogRef = this.dialog.open(DialogFormContainerComponent, {
            data: {instance: this.formProviderInstance, title: titulo, type: type},
          });
          dialogRef.afterClosed().subscribe(result => {
            if(result){
              this.getAllObjects()
            }
            console.log(`Dialog result: ${result}`);
          });
      }
    }
  }

  delete(id?:number|string){
    if(id){
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        data: "Seguro que quieres eliminar el Tipo de Estudio?",
      });
      dialogRef.afterClosed().subscribe(result => {
        if(result){
          this.formProviderInstance?.delete(id).subscribe(obj=>{
            this.getAllObjects()
          })
        }
        console.log(`Dialog result: ${result}`);
      });
    }
  }

  /**
   * Set dynamic columns and data
   */
  setTableData(data: any[]): void {
    if (data && data.length > 0) {
      // Get columns dynamically from keys of the first object
      this.displayedColumns = Object.keys(data[0]);
      this.displayedColumns.push('actions')
      console.log(this.displayedColumns)

      // Set the data source
      this.dataSource.data = data;
    }
  }

  setFormProviderInstance(entity:string){
    switch (entity) {
      case 'tipo-estudio':
        this.formProviderInstance = new TipoEstudio(this.apiService);
        break;
    
      default:
        break;
    }
  }

  getAllObjects(){
    this.formProviderInstance?.getAll({}).subscribe(obj=>{
      console.log(obj)
      this.tableListObjects = obj.map((item: any) => this.formProviderInstance?.getInstancedObjects(item).toTableData());
      console.log(this.tableListObjects)
      this.setTableData(this.tableListObjects)
    })
  }


}
