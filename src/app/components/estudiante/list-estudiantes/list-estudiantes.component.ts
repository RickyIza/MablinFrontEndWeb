import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Estudiante } from 'src/app/models/estudiante';
import { AuthService } from 'src/app/services/auth.service';
import { EstudianteService } from 'src/app/services/estudiante.service';
import {  ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-list-estudiantes',
  templateUrl: './list-estudiantes.component.html',
  styleUrls: ['./list-estudiantes.component.css']
})
export class ListEstudiantesComponent implements OnInit {
  estudiante:Estudiante[]

  nuevoEst:Estudiante=new Estudiante();

  fecha:any;
  age;
  showAge;

  nuevoForm : FormGroup;

  constructor(
    public authService: AuthService,
    public estudianteService:EstudianteService,
    public router: Router,
    public ngZone: NgZone,
    public formbuilder:FormBuilder,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.nuevoForm=this.formbuilder.group({
      nombre:[''],
      apellido:[''],
      fechaNacimiento:['']
    })
    this.estudianteService.list().subscribe(res=>{
      this.estudiante=res;
      this.fecha=this.estudiante.map((estudiante)=>
      estudiante.fechaNacimiento);
          const convertAge = new Date(this.fecha);
          const timeDiff = Math.abs(Date.now() - convertAge.getTime());
          this.showAge = Math.floor((timeDiff / (1000 * 3600 * 24))/365);
          console.log(this.showAge)  
    });
  }

  nuevoEstudiante(){
    this.nuevoEst.nombres=this.nuevoForm.value.nombre;
    this.nuevoEst.apellidos=this.nuevoForm.value.apellido;
    this.nuevoEst.fechaNacimiento=this.nuevoForm.value.fechaNacimiento;
    this.estudianteService.save(this.nuevoEst).subscribe(res=>{
      console.log(res);
    this.toastr.success('Nuevo Estudiante Creado','Estudiante')
    this.nuevoForm.reset();

    })

  }


}

