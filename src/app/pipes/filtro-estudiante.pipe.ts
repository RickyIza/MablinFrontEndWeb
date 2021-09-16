import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroEstudiante'
})
export class FiltroEstudiantePipe implements PipeTransform {
  transform(value: any[],filterString:string, prpoName:string): any[] {
    const result:any =[];
    if(!value || filterString==='' || prpoName===''){
      return value;

    }
    value.forEach((a:any)=>{
      if(a[prpoName].trim().toLowerCase().includes(filterString.toLowerCase())){
      result.push(a);
    }}
  );
  return result;
  }

}