import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//Firebase
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment.prod';
import { HomeComponent } from './components/home/home.component';
import { AuthService } from './services/auth.service';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { EstudianteModule } from './components/estudiante/estudiante.module';
import { SharedModule } from './components/shared/shared.module';
import { DasboardComponent } from './components/dasboard/dasboard.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    DasboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    EstudianteModule,
    SharedModule,
    
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
