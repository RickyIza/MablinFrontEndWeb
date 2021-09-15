import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistorialComponent } from './historial/historial.component';
import { ListEstudiantesComponent } from './list-estudiantes/list-estudiantes.component';
import { DetalleEstudianteComponent } from './detalle-estudiante/detalle-estudiante.component';

const routes: Routes = [

  { path: '', component: ListEstudiantesComponent },
  { path: 'historial', component: HistorialComponent },
  { path: 'detalle/:idEstudiante', component: HistorialComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstudianteRoutingModule { }
