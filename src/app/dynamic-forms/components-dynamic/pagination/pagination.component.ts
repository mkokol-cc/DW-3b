import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { FormProvider } from '../../interfaces/form-provider';
import { Persistable } from '../../persistable';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [MatPaginatorModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent implements OnInit {
  @Input() instance!: Persistable<any> & FormProvider;
  @Output() tableData = new EventEmitter<any[]>();
  page:number = 0;
  size:number = 5;

  total?:number;

  ngOnInit(): void {
    this.getAllObjects()
  }

  getAllObjects(filters?:any){
    console.log(this.instance)
    this.instance?.getAll(filters).subscribe(obj=>{
      console.log(obj)
      let tableListObjects = obj.map((item: any) => this.instance?.getInstancedObjects(item).toTableData());
      //this.filtracionManual(tableListObjects)
      this.total = tableListObjects.length
      this.tableData.emit(this.filtracionManual(tableListObjects, this.page, this.size))
    })
  }

  handlePageEvent(e: PageEvent) {
    this.size = e.pageSize
    this.page = e.pageIndex
    this.getAllObjects()
  }

  filtracionManual(data:any[], page:number, size:number):any[]{
    this.total = data.length
    const start = page * size;
    const end = start + size;
    return data.slice(start, end);
  }

}
