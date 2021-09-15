import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interaces/usuario';
import { Tutor } from 'src/app/models/tutor';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Input() newTutor : Tutor = new Tutor();


  constructor(
    public authService: AuthService,
    public router: Router, 
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
  }

  async loginGoogle(){
    this.authService.GoogleAuth().then(res=>{
      const newt:Usuario=JSON.parse(localStorage.getItem('user')||'{}');
      this.newTutor.idTutor=newt.uid;
      this.newTutor.displayName=newt.displayName;
      this.newTutor.email=newt.email;
 
      console.log(this.newTutor);
      this.authService.loginUserData(this.newTutor).subscribe(result=>{

        this.authService.saveDates(result.token, result.idTutor);
        

      });
    }).catch(error=>{
    
    })
  }

}




