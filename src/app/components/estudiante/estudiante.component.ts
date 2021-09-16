import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-estudiante',
  templateUrl: './estudiante.component.html',
  styleUrls: ['./estudiante.component.css']
})
export class EstudianteComponent implements OnInit {

  handleSearch(value: string)
  {
    console.log(value)
  }

  constructor() { }

  ngOnInit(): void {
  }

}
