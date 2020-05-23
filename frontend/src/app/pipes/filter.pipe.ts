import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, arg: any): any {
   
    const resultadoPosts =[];

    for(const post of value) {

      if(post.nombreDeLaEmpresa.indexOf(arg) > -1){
        resultadoPosts.push(post);
        console.log("Sip");
      }
    }
    return resultadoPosts;
  }

}
