import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { Estudiante } from '../models/estudiante';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {
  url : string = environment.urlGlobal + "/estudiantes";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'x-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjp7Il9pZCI6IjhjVzcyM2ZXNHo5cTRTRTJJbnB5Iiwibm9tYnJlIjoiUnViZW4iLCJlbWFpbCI6InJ1YmVuMkBlc3BlLmVkdS5lYyJ9LCJpYXQiOjE2MzA1NzU4MDksImV4cCI6MTYzMzE2NzgwOX0.ZhwIBtYIFuMYzvsFpMFc4RY3-UQgeJW4ORlxVrLi_t8'
    })
  };

  constructor(
    private router: Router,
    private http:HttpClient,
    private toastr: ToastrService,
  ) { }


  save(a: Estudiante): Observable<any> {
    let estudianteBody = JSON.stringify(a);
    if (a.idEstudiante === undefined) {
      return this.http.post<any>(this.url, estudianteBody, this.httpOptions);
    } else {
      return this.http.put<any>(this.url + '/' + a.idEstudiante, estudianteBody, this.httpOptions);
    }
  }

  delete(id:string): Observable<any> {
    return this.http.delete<any>(this.url + '/' + id, this.httpOptions)
    .pipe(map((res:any)=>{
      return res
    })
    );
}

  updateEstudiantes(data:any,id:number)
  {
    return this.http.put<any>(this.url + '/' + id, data, this.httpOptions)
    .pipe(map((res:any)=>{
      return res;
    })
    );
}




  

  list(): Observable<Estudiante[]>{
    return this.http.get<Estudiante[]>(this.url, this.httpOptions)
      .pipe(
        retry(1)
      );
  }

  listUno(a: Estudiante): Observable<Estudiante[]>{
    return this.http.get<Estudiante[]>(this.url + '/' + a.idEstudiante, this.httpOptions)
      .pipe(
        retry(1)
      );
  }
}
