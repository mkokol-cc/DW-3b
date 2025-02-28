import { Component, Input, SimpleChanges } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormProvider } from '../../interfaces/form-provider';
import { ApiService } from '../../services/api.service';
import { FormsModule } from '@angular/forms';
import { OptionElement } from '../../interfaces/option-element';

@Component({
  selector: 'app-input-object-select',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    FormsModule
  ],
  templateUrl: './object-select.component.html',
  styleUrl: './object-select.component.scss'
})
export class ObjectSelectComponent {
  @Input() instance!:FormProvider;
  options:OptionElement[] = []
  selectedId?:string = undefined;
  @Input() parentFormControlName?:string;

  constructor(private service:ApiService){}

  ngOnChanges(changes: SimpleChanges) {
    if(changes['instance']){
      const url = this.instance.getUrl();
      this.service.list(url,{}).subscribe((response) => {
        this.options = response.map((item: any) => this.instance.anyToOption(item));
      });
    }
  }

  getSelected(): any {
    return {id:this.selectedId}
  }
}
