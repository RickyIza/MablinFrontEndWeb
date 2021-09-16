import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Chart,registerables } from 'chart.js';
import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { EstudianteService } from 'src/app/services/estudiante.service';
import { NotasService } from 'src/app/services/notas.service';
import { Nota } from 'src/app/models/nota';

@Component({
  selector: 'app-historial-estudiante',
  templateUrl: './historial-estudiante.component.html',
  styleUrls: ['./historial-estudiante.component.css']
})
export class HistorialEstudianteComponent implements OnInit {
  searchKey:string="";

  public searchTerm:string="";
  nota:Nota[];
  resultado:any;
  tipo:any;
  conteo:any[];
  suma:any;
  resta:any;
  chart:any=[];
  id:string;
  constructor(
    public authService:AuthService,
    public estudiantesService:EstudianteService,
    public notaService:NotasService,
    private aRoute:ActivatedRoute
  ) { 
    this.id=this.aRoute.snapshot.paramMap.get('idEstudiante')||'';

    Chart.register(...registerables);
 
  }

  ngOnInit(): void {


    this.notaService.getEstudiante(this.id).subscribe(res=>{
    this.nota=res;
    this.notaService.search.subscribe((val:any)=>{
    this.searchKey=val;

   
    console.log(res);

    this.tipo=this.nota.map((nota)=>
    nota.tipoEjercicio);
    console.log(this.tipo);
    this.resultado=this.nota.map((nota)=>
    nota.nota);
  })

    this.chart=new Chart('canvas',{
      type:'line',
      data: {
        labels: this.tipo,
        datasets: [{
            label: 'Estudiantes',
            data: this.resultado,
            borderWidth: 3,
            fill:false,
            backgroundColor:'rgb(93,175,89,0.1)',
            borderColor:'#3e95cd'
        }]
    },


    })


    });
  }


  obtenerNota(){
    this.notaService.getEstudiante(this.id).subscribe(res=>{
      console.log(res.data());
    })
  }

  search(event:any){
    this.searchTerm=(event.target as HTMLInputElement).value;
    console.log(this.searchTerm);
    this.notaService.search.next(this.searchTerm);
  }





}

