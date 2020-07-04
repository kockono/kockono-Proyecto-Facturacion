import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, arg: any): any {
   
    const resultadoPosts =[];

    for(const post of value) {

      if(post.nombreDeLaEmpresa.toLowerCase().indexOf(arg.toLowerCase())  > -1){
        resultadoPosts.push(post);
      }
    }
    return resultadoPosts;
  }

}
