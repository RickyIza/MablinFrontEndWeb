import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EstudianteRoutingModule } from './estudiante-routing.module';
import { EstudianteComponent } from './estudiante.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ListEstudiantesComponent } from './list-estudiantes/list-estudiantes.component';
import { CreateEstudiantesComponent } from './create-estudiantes/create-estudiantes.component';
import { HistorialComponent } from './historial/historial.component';
import { SharedModule } from '../shared/shared.module';
import { DetalleEstudianteComponent } from './detalle-estudiante/detalle-estudiante.component';



@NgModule({
  declarations: [
    EstudianteComponent,
    SidebarComponent,
    NavbarComponent,
    ListEstudiantesComponent,
    CreateEstudiantesComponent,
    HistorialComponent,
    DetalleEstudianteComponent,



  ],
  imports: [
    CommonModule,
    EstudianteRoutingModule,
    SharedModule,
  ]
})
export class EstudianteModule { }
