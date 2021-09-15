import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { EstudianteService } from '../../../services/estudiante.service';
import { Nota } from '../../../models/nota';
import { NotasService } from '../../../services/notas.service';
import { Chart,registerables } from 'chart.js';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {

  nota:Nota[];
  resultado:any;
  tipo:any;
  suma:any;
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
    console.log(res);
    this.tipo=this.nota.map((nota)=>
    nota.tipoEjercicio);
    this.resultado=this.nota.map((nota)=>
    nota.nota);
    

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
}

