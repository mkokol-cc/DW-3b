import { AsyncPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Observable, startWith, map, BehaviorSubject, of } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { FormProvider } from '../../interfaces/form-provider';
import { OptionElement } from '../../interfaces/option-element';

@Component({
  selector: 'app-input-object-autocomplete',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
  ],
  templateUrl: './object-autocomplete.component.html',
  styleUrl: './object-autocomplete.component.scss'
})
export class ObjectAutocompleteComponent {
  @Input() instance!:FormProvider;
  control = new FormControl(null);
  options: OptionElement[] = [];
  filteredOptions!: Observable<OptionElement[]>;
  @Input() parentFormControlName?:string;

  constructor(private service:ApiService){}

  ngOnInit() {
    this.filteredOptions = this.control.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value: string): OptionElement[] {
    const filterValue = value.toLowerCase();
    if(value.trim().length>2){
      const url = this.instance.getUrl();
      this.service.list(url,{}).subscribe((response) => {
        this.options = response.map((item: any) => this.instance.anyToOption(item));
        //quiero poner un return aqui
      });
    }
    return this.options.filter(option => option.label.toLowerCase().includes(filterValue));
  }

  getSelected():any{
    if(this.control.value!==null){
      const selected = this.options.find(option => option.label == this.control.value!)
      return selected ? {id:selected.value} : undefined
    }
    return undefined
  }

}
