import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatStepperModule} from '@angular/material/stepper';
import { FileSelectorComponent } from '../../pages-custom/file-selector/file-selector.component';
import { Observable, startWith, map } from 'rxjs';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatSelectModule} from '@angular/material/select';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-form-conclusion',
  standalone: true,
  imports: [
    MatButtonModule,
    MatStepperModule,
    FileSelectorComponent,

    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,

    MatAutocompleteModule,
    MatSelectModule,

    AsyncPipe,
  ],
  templateUrl: './form-conclusion.component.html',
  styleUrl: './form-conclusion.component.scss'
})
export class FormConclusionComponent implements OnInit {
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['asd', Validators.required],
  });
  conclusionForm = this._formBuilder.group({
    conclusion: ['', Validators.required],
  });

  constructor(private _formBuilder: FormBuilder) {}

  foods: any[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'},
  ];

  myControl = new FormControl('');
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions!: Observable<string[]>;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

}
