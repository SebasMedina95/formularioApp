import { Directive, Input } from "@angular/core";
import { FormControl, NG_VALIDATORS, Validator } from "@angular/forms";


@Directive({
    selector  : '[directivaCustomMin][ngModel]',
    providers : [{
        provide : NG_VALIDATORS,
        useExisting : CustomMinDirective,
        multi : true
    }] 
})

/**Usamos el Validator para realizar validaciones como required, minlenght ... */
export class CustomMinDirective implements Validator {

    /**Existencias */
    @Input() valorMinimo! : number;

    constructor() {
        console.log('Directiva' , this.valorMinimo);
    }

    validate( control : FormControl ) {
       const inputValue =  control.value;
       console.log(inputValue);
       console.log('Mínimo enviado: ' , this.valorMinimo);
       return (inputValue < this.valorMinimo) ? {'directivaCustomMin' : true} : null;
    }

}