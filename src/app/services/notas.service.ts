import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';

import { Nota } from '../models/nota';
@Injectable({
  providedIn: 'root'
})
export class NotasService {
  url : string = environment.urlGlobal + "/notas";
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

  save(n: Nota): Observable<any> {
    let notaBody = JSON.stringify(n);
    if (n.idResultado === undefined) {
      return this.http.post<any>(this.url, notaBody, this.httpOptions);
    } else {
      return this.http.put<any>(this.url + '/' + n.idResultado, notaBody, this.httpOptions);
    }
  }

  delete(n: Nota): Observable<any> {
    return this.http.delete<any>(this.url + '/' + n.idResultado, this.httpOptions);
  }

  list(): Observable<Nota[]> {
    return this.http.get<Nota[]>(this.url, this.httpOptions)
      .pipe(
        retry(1)
      );
  }


getEstudiante(id:string): Observable<any> {
  return this.http.get<any>(this.url + '/' + id, this.httpOptions)
  .pipe(map((res:any)=>{
    return res
  })
  );
}

  listUno(a): Observable<any>{
    return this.http.get(this.url + '/' + a, this.httpOptions)
      .pipe(
        retry(1)
      );
  }

}

