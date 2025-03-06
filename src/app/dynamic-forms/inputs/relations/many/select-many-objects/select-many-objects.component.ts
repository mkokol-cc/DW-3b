import { Component, Input, OnInit } from '@angular/core';
import { FormProvider } from '../../../../interfaces/form-provider';
import { Persistable } from '../../../../persistable';
import { OptionElement } from '../../../../interfaces/option-element';

@Component({
  selector: 'app-select-many-objects',
  standalone: true,
  imports: [],
  templateUrl: './select-many-objects.component.html',
  styleUrl: './select-many-objects.component.scss'
})
export class SelectManyObjectsComponent implements OnInit {
  @Input() instance!: Persistable<any> & FormProvider;
  @Input() filters?: any;
  options:OptionElement[] = []
  
  ngOnInit(): void {
    this.instance.getAll(this.filters).subscribe(obj=>{
      this.options = obj.map((item: any) => this.instance?.getInstancedObjects(item).toSelectData());
      console.log(this.options)
    })
  }
}
