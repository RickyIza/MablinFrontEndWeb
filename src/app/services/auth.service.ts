import { Injectable,NgZone, Input } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { environment } from 'src/environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { retry, catchError } from 'rxjs/operators';
import { User } from '../models/user';
import { Observable,throwError } from 'rxjs';
import { Tutor } from '../models/tutor';
import { Usuario } from '../interaces/usuario';
import { ToastrService } from 'ngx-toastr';


@Injectable(
)

export class AuthService {
  userData: any; // Save logged in user data
  token:any;
  nuevoUsu:any;
  @Input() newTutor : Tutor = new Tutor();
  user$: Observable<User>;
  user: User;
  url : string = environment.urlGlobal + "/auth";

  httpOptions={
    headers:new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    })
  };

  constructor(
    private afs: AngularFirestore,   // Inject Firestore service
    private afAuth: AngularFireAuth, // Inject Firebase auth service
    private router: Router,  
    private ngZone: NgZone, // NgZone service to remove outside scope warning
    private http:HttpClient,
    private toastr: ToastrService,

    ) {    
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', null!);
        JSON.parse(localStorage.getItem('user')!);
      }
    })
  }

  // Iniciar Sesión con Google
  GoogleAuth(){
    return this.AuthLogin(new firebase.auth.GoogleAuthProvider()).then(res => {
      console.log('Successfully logged in!');  
 
  }).catch(error => {
      console.log(error)
  });
  }

  loginUserData(user: Tutor):Observable<any>{
    let tutorBody = JSON.stringify(user);
    return this.http.post<any>(this.url, tutorBody, this.httpOptions);
  }


  addUser(data): Observable<Tutor> {
    return this.http.post<Tutor>(this.url , JSON.stringify(data),this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.processError)
      )
  }

    // Auth logic to run auth providers
    AuthLogin(provider) {
      return this.afAuth.signInWithPopup(provider)
      .then(result => {
         this.ngZone.run(() => { 
          this.router.navigate(['/dashboard']);
          })
          this.SetUserData(result.user);
          this.toastr.success("Inicio Sesión","Exito");

      }).catch((error) => {
        
      })
    }

  SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {    
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    }  
  return userRef.set(userData, {
    merge: true
  })
  } 

  SetLocalStorage(idt:any){
    const usuario1:Usuario={
      uid:idt.uid,
      email:idt.email,
      displayName: idt.displayName
    }
    localStorage.setItem('idt', JSON.stringify(usuario1));
  }
  saveDates(token: string, idTutor: string):void{
    localStorage.setItem('token', token);
    localStorage.setItem('id', idTutor);
  }
  // Sign out 
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      localStorage.removeItem('idt');
      this.router.navigate(['login']);
    })
  }


  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return (user !== null && user.emailVerified !== false) ? true : false;
  }
  
  processError(err) {
    let message = '';
    if(err.error instanceof ErrorEvent) {
     message = err.error.message;
    } else {
     message = `Error Code: ${err.status}\nMessage: ${err.message}`;
    }
    console.log(message);
    return throwError(message);
 }
}