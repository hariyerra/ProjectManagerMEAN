import { NG_VALIDATORS, Validator, AbstractControl } from "@angular/forms";

import * as moment from 'moment';
import { Input, Directive} from "@angular/core";
declare var jquery:any;
declare var $ :any;

@Directive({
    selector: '[dateCompare]',
    providers: [{ provide: NG_VALIDATORS, useExisting: DateCompareValidatorDirective, multi: true }]
})
export class DateCompareValidatorDirective implements Validator {
    @Input('dateCompare') compareDate: string;
    @Input('operation') operation: string;

    validate(control: AbstractControl): { [key: string]: any } | null {

        var source =moment(control.value).add(-1, 'months').toDate();
        var target = moment(this.compareDate).add(-1, 'months').toDate();
     
        
        console.log(control.value);
        console.log(this.compareDate);

        if(this.operation=='less than'){
            if (target < source) {
                return {
                    dateCompare: {
                        valid: false
                    }
                }
            }
        }
        else
        {
            if (target > source) {
                return {
                    dateCompare: {
                        valid: false
                    }
                }
            }
        }

       
        return null;
    }
}