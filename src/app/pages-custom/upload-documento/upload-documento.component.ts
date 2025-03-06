import { Component } from '@angular/core';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {MatExpansionModule} from '@angular/material/expansion';
import { ApiService } from '../../dynamic-forms/services/api.service';
import { TipoEstudio } from '../../model/tipo-estudio';
import { Paciente } from '../../model/paciente';

@Component({
  selector: 'app-upload-documento',
  standalone: true,
  imports: [
    MatExpansionModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './upload-documento.component.html',
  styleUrl: './upload-documento.component.scss'
})
export class UploadDocumentoComponent {

  tiposEstudio:TipoEstudio[] = []
  pacientes:Paciente[] = []

  constructor(private service: ApiService){
    this.service.list('api/tiposestudio',{}).subscribe(obj=>{
      this.tiposEstudio = obj.map((item: any) => new TipoEstudio(service,item))
      console.log(this.tiposEstudio)
    })
    this.service.list('api/pacientes',{}).subscribe(obj=>{
      this.pacientes = obj.slice(0, 9).map((item: any) => new Paciente(service,item))
    })
  }

}
