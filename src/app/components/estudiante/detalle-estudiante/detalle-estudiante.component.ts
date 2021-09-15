import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router ,ActivatedRoute,Params } from '@angular/router';
import { EstudianteService } from '../../../services/estudiante.service';
import { Nota } from '../../../models/nota';
import { NotasService } from '../../../services/notas.service';
import { Chart,registerables } from 'chart.js';

@Component({
  selector: 'app-detalle-estudiante',
  templateUrl: './detalle-estudiante.component.html',
  styleUrls: ['./detalle-estudiante.component.css']
})
export class DetalleEstudianteComponent implements OnInit {
  nota:Nota[];

  resp:Nota;
  resultado:any;
  tipo:any;
  suma:any;
  chart:any=[];

  constructor(    
    public authService:AuthService,
    public estudiantesService:EstudianteService,
    public notaService:NotasService,
    private _router:ActivatedRoute) { 
      Chart.register(...registerables);
 
    }



  ngOnInit(): void {


    this._router.params.subscribe((params:Params)=>{
      this.notaService.listUno(params).subscribe(res=>{
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



      })

 

    }
  }
  
  
