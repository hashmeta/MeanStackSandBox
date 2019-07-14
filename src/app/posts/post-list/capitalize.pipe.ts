import { PipeTransform, Pipe } from '@angular/core';
@Pipe({
    name:'capitalize'
})
export class capitalizePipe implements PipeTransform{
    transform(value:any){
        return value.toUpperCase()
    }
}