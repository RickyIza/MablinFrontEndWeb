import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DasboardComponent } from './components/dasboard/dasboard.component';
import { EstudianteComponent } from './components/estudiante/estudiante.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './shared/guard/auth.guard';
import { HistorialEstudianteComponent } from './components/historial-estudiante/historial-estudiante.component';


const routes: Routes = [


  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'detalle/:idEstudiante', component: HistorialEstudianteComponent},
  { path: 'dashboard', component: DasboardComponent , canActivate: [AuthGuard]},
  {
    path: 'estudiante', component: EstudianteComponent,
         loadChildren: () => import('./components/estudiante/estudiante.module')
          .then(m => m.EstudianteModule), canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
